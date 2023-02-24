import { createConnection } from '../utils/db.utils'
import { table } from '../utils/general.utils'

export const listCommand = async (): Promise<void> => {
  const { snaps } = await createConnection()
  const snapsList = await snaps.find().toArray()
  if (snapsList.length === 0) {
    console.log('No snaps found')
    process.exit(0)
  }
  const mapped = snapsList.map((x) => ({ tag: x.tag, 'file name': x.fileName, description: x.description }))
  table(mapped)
  process.exit(0)
}
