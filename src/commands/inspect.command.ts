import { createConnection } from '../utils/db.utils'

export async function inspectCommand (tag: string): Promise<void> {
  const { snaps } = await createConnection()
  const snapData = await snaps.findOne({ tag })
  if (snapData == null) {
    console.log('Snap not found')
    process.exit(0)
  }
  console.log(snapData)
  process.exit(0)
}
