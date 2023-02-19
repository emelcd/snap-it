import { program } from "commander";
import fs from 'fs'
import { generateTag } from './utils/generateTag';
import { ISnap } from './utils/snapModel';
import { config } from "dotenv";
import { Console } from 'console';
import { Transform } from 'stream';
import { MongoClient } from 'mongodb'

const MONGO_URI = "mongodb+srv://controllerDB:GX13iydToBEvEDq2@my-own.h5vekoq.mongodb.net/?retryWrites=true&w=majority"

function table(input: any) {
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })
    logger.table(input)
    const table = (ts.read() || '').toString()
    let result = '';
    for (let row of table.split(/[\r\n]+/)) {
        let r = row.replace(/[^┬]*┬/, '┌')
        r = r.replace(/^├─*┼/, '├');
        r = r.replace(/│[^│]*/, '');
        r = r.replace(/^└─*┴/, '└');
        r = r.replace(/'/g, ' ');
        result += `${r}\n`;
    }
    // replace all the strings using chalk
    console.log(
        result
    );
}

config()

const listCommand = async () => {
    const { snaps } = await createConnection();
    const snapsList = await snaps.find().toArray();
    // conserve only the fields we want to display
    const mapped = snapsList.map(x => ({ tag: x.tag, description: x.description }));
    table(mapped);
    process.exit(0);
};

const createConnection = async () => {
    const client = await MongoClient.connect(MONGO_URI)
    const db = client.db()
    const snaps = db.collection("snaps")
    return { client, db, snaps }

}


const saveSnap = async (snapData: ISnap) => {
    try {
        const { snaps } = await createConnection()
        const snapExists = await snaps.findOne({ tag: snapData.tag })
        if (snapExists) {
            console.log("Snap tag already exists")
            process.exit(0)
        }
        await snaps.insertOne(snapData)
        console.log("Snap saved")
        process.exit(0)
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
    .action(listCommand)

program.parse()


