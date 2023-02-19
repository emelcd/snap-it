import { program } from "commander";
import fs from 'fs'
import { generateTag } from './utils/generateTag';
import { ISnap, Snap } from "./utils/snapModel";
import { connect } from "mongoose";


const createConnection = async () => {
    try {
        connect("mongodb://localhost:27017/snapIt", (err) => {
            err ? console.log(err) : console.log("Connected to DB")
        })

    } catch (error) {
        console.log(error)
    }
}

const saveSnap = async (snapData: ISnap) => {
    try {
        const snap = new Snap(snapData)
        await snap.save()
        console.log("Snap saved")
    } catch (error) {
        console.log(error)
    }
}


async function snapCommand(file: string, options: any) {
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

program
    .name("snapIt")
    .version("0.0.1")
    .description("A simple CLI to take snaps of files")

program
    .command("snap")
    .argument("<file>", "File to take a snap of")
    .option("-t, --tag <tag>", "Tag to add to the snap")
    .option("-d, --description <description>", "Description of the snap")
    .description("Take a snap of a file")
    .action(snapCommand)

program.parse()


