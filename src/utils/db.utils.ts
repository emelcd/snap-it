import { config } from 'dotenv'
import { MongoClient, type Db, type Collection, type Document } from 'mongodb'

config()
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27018'

export const createConnection = async (): Promise<{
  client: MongoClient
  db: Db
  snaps: Collection<Document>
}> => {
  const client = await MongoClient.connect(MONGO_URI)
  const db = client.db()
  const snaps = db.collection('snaps')
  return { client, db, snaps }
}
