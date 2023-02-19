import { createConnection } from "../utils/dbutils"
import fs from 'fs'

export async function loadCommand (tag: string, options: any) {
    try {
        const { snaps } = await createConnection()
        const data = await snaps.findOne({ tag })
        if (!data) {
            console.log("Snap not found")
            process.exit(0)
        }
        const { fileName, fileContent } = data
        const name = options.name || fileName
        fs.writeFileSync(name, fileContent, 'utf8')
        console.log("Snap loaded")
        process.exit(0)
    
    } catch (error) {
        console.log(error)            
    }
    
}