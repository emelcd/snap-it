import { config } from "dotenv"
import { MongoClient } from "mongodb"

config()
const MONGO_URI = process.env.MONGO_URI!

export const createConnection = async () => {
    const client = await MongoClient.connect(MONGO_URI)
    const db = client.db()
    const snaps = db.collection("snaps")
    return { client, db, snaps }

}