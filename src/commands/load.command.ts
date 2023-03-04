import { catchError } from '../errors/catch.error'
import { createConnection } from '../utils/db.utils'
import { recursiveLoad } from './load.command/recursiveLoad'
import { singleLoad } from './load.command/singleLoad'

export async function loadCommand (tag: string, options: any): Promise<void> {
  try {
    const { snaps } = await createConnection()
    const data = await snaps.findOne({ tag })
    if (data == null) {
      console.log('Snap not found')
      process.exit(0)
    }
    const { isFolder } = data
    if (!isFolder) {
      const { name, fileContent } = data
      const fileName = options.name ?? name
      await singleLoad(fileName, fileContent)
    } else {
      await recursiveLoad(data)
    }
  } catch (error) { catchError(error) }
}
