import { createConnection } from '../utils/db.utils'

export async function inspectCommand (tag: string): Promise<void> {
  const { snaps } = await createConnection()
  const snapData = await snaps.findOne({ tag })
  if (snapData == null) {
    console.log('Snap not found')
    process.exit(0)
  }
  const cleanSnap = { tag: snapData.tag, fileName: snapData.fileName, fileExtension: snapData.fileExtension, description: snapData.description }
  console.log(cleanSnap)
  process.exit(0)
}
