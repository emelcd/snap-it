/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createConnection } from '../utils/db.utils'

export async function previewCommand (tag: string): Promise<void> {
  try {
    const { snaps } = await createConnection()
    const query = await snaps.findOne({ tag })
    if (query == null) {
      console.log('Snap not found')
      process.exit(0)
    }
    console.log(`FILE NAME: ${query.fileName}`)
    console.log(`FILE EXTENSION: ${query.fileExtension}`)
    console.log(`TAG: ${query.tag}`)
    query.description && console.log(`DESCRIPTION: ${query.description}`)
    // console.log(`DESCRIPTION: ${query.description}`)

    console.log('')
    console.log(query.fileContent.split('\n').slice(0, 10).join('\n'))
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
