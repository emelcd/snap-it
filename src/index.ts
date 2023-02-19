import { program } from "commander";
import fs from 'fs'
import { generateTag } from './utils/generateTag';
import { ISnap } from './utils/snapModel';
import { config } from "dotenv";
import { Console } from 'console';
import { Transform } from 'stream';
import mongodb from 'mongodb'


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/snapIt"

function table(input: any) {
  // @see https://stackoverflow.com/a/67859384
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })
  logger.table(input)
  const table = (ts.read() || '').toString()
  let result = '';
  for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    result += `${r}\n`;
  }
  console.log(result);
}
    
config()
const createConnection = async () => {
    const client = await mongodb.MongoClient.connect(MONGO_URI)
    const db = client.db()
    const snaps = db.collection("snaps")
    return { client, db, snaps }

}


const saveSnap = async (snapData: ISnap) => {
    try {
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

program
    .command("list")
    .description("List all the snaps")
    .action(async () => {
        const { snaps } = await createConnection()
        const snapsList = await snaps.find().toArray()
        table(snapsList)
        process.exit(0)
    })

program.parse()


