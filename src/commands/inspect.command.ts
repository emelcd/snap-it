import { createConnection } from '../utils/db.utils'
import { cleanStringLength } from '../utils/general.utils'

export async function inspectCommand (tag: string): Promise<void> {
  const { snaps } = await createConnection()
  const snapData = await snaps.findOne({ tag })

  if (snapData == null) {
    console.log('Snap not found')
    process.exit(0)
  }
  const cleanedContent = {
    fileName: snapData.fileName,
    tag: snapData.tag,
    description: snapData.description,
    fileContent: cleanStringLength(snapData.fileContent, 30)
  }
  console.table(cleanedContent)
  process.exit(0)
}
