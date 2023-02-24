import { createConnection } from '../utils/db.utils'
import { cleanStringLength, table } from '../utils/general.utils'

export const listCommand = async (): Promise<void> => {
  const { snaps } = await createConnection()
  const snapsList = await snaps.find().toArray()
  if (snapsList.length === 0) {
    console.log('No snaps found')
    process.exit(0)
  }
  const mapped = snapsList.map((x) => ({ tag: x.tag, 'file name': x.fileName, description: x.description }))
  const cleaned = mapped.map((x) => ({ tag: x.tag, 'file name': cleanStringLength(x['file name'], 20), description: cleanStringLength(x.description, 35) }))

  table(cleaned)
  process.exit(0)
}
