import { createConnection } from '../../utils/db.utils'
import { generateTag } from '../../utils/general.utils'
import { type ISnap } from '../../interfaces/snap.interface'
import { readFileSync } from 'fs'
import { isText } from 'istextorbinary'
import sizeof from 'object-sizeof'
import { catchError } from '../../errors/catch.error'

export const singleSnap = async (file: string, options: any): Promise<void> => {
  if (!isText(file)) {
    console.log(`File ${file} is not a text file`)
    process.exit(0)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const name = file.split('/').pop()!
  const fileContent = readFileSync(file, 'utf8').toString()
  const fileExtension = name.split('.').pop() ?? ''
  const tag = options.tag || generateTag()
  if (tag.length > 7) {
    console.log('Tag cannot be longer than 7 characters')
    process.exit(0)
  }
  const description = options.description || ''
  const size = sizeof(fileContent)
  const snapToSave = { name, fileContent, fileExtension, tag, description, size, isFolder: false }
  try {
    await createConnection()
    await saveSingleSnap(snapToSave)
  } catch (error) { catchError(error) }
}

const saveSingleSnap = async (snapData: ISnap): Promise<void> => {
  try {
    const { snaps } = await createConnection()
    const snapExists = await snaps.findOne({ tag: snapData.tag })
    if (snapExists != null) {
      console.log('Snap tag already exists, try again')
      process.exit(0)
    }
    if (snapData.name.toLowerCase() === 'all') {
      console.log('Snap tag cannot be ALL')
      process.exit(0)
    }
    await snaps.insertOne(snapData)
    console.log('Snap saved with tag:', snapData.tag)
    process.exit(0)
  } catch (error) { catchError(error) }
}
