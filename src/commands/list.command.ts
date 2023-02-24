import { createConnection } from '../utils/db.utils'
import { table } from '../utils/general.utils'

export const listCommand = async (): Promise<void> => {
  const { snaps } = await createConnection()
  const snapsList = await snaps.find().toArray()
  // conserve only the fields we want to display
  if (snapsList.length === 0) {
    console.log('No snaps found')
    process.exit(0)
  }
  const mapped = snapsList.map((x) => ({ tag: x.tag, description: x.description }))
  table(mapped)
  process.exit(0)
}
