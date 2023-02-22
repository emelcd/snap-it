import { createConnection } from "../utils/dbutils"
import { generateTag } from "../utils/generalUtils"
import { ISnap } from "../utils/snapModel"
import fs from 'fs'

const saveSnap = async (snapData: ISnap) => {
    try {
        const { snaps } = await createConnection()
        const snapExists = await snaps.findOne({ tag: snapData.tag })
        if (snapExists) {
            console.log("Snap tag already exists")
            process.exit(0)
        }
        if (snapData.fileName === "ALL" || snapData.fileName === "all") {
            console.log("Snap tag cannot be ALL")
            process.exit(0)
        }
        await snaps.insertOne(snapData)
        console.log("Snap saved")
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}


export async function snapCommand(file: string, options: any) {
    console.log({ file, options })
    const fileName = file.split("/").pop()!
    const fileContent = fs.readFileSync(file, 'utf8').toString().split("\n").filter(l => l).join("\n")
    const fileExtension = fileName.split(".").pop() || ""
    const tag = options.tag || generateTag()
    const description = options.description || ""
    try {
        await createConnection()
        await saveSnap({ fileName, fileContent, fileExtension, tag, description })
    } catch (error) {
        console.log(error)
    }

}