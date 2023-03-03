import { createConnection } from '../utils/db.utils'
import { writeFileSync } from 'fs'

export async function loadCommand (tag: string, options: any): Promise<void> {
  try {
    const { snaps } = await createConnection()
    const data = await snaps.findOne({ tag })
    if (data == null) {
      console.log('Snap not found')
      process.exit(0)
    }
    const { name, fileContent } = data
    const fileName = options.name || name
    writeFileSync(fileName, fileContent, 'utf8')
    console.log('Snap loaded')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
