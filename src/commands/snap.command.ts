import { createConnection } from '../utils/db.utils'
import { generateTag } from '../utils/general.utils'
import { type ISnap } from '../interfaces/snap.interface'
import { readFileSync } from 'fs'

const saveSnap = async (snapData: ISnap): Promise<void> => {
  try {
    const { snaps } = await createConnection()
    const snapExists = await snaps.findOne({ tag: snapData.tag })
    if (snapExists != null) {
      console.log('Snap tag already exists')
      process.exit(0)
    }
    if (snapData.fileName === 'ALL' || snapData.fileName === 'all') {
      console.log('Snap tag cannot be ALL')
      process.exit(0)
    }
    await snaps.insertOne(snapData)
    console.log('Snap saved with tag:', snapData.tag)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}

export async function snapCommand (file: string, options: any): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const fileName = file.split('/').pop()!
  const fileContent = readFileSync(file, 'utf8').toString().split('\n').filter(l => l).join('\n')
  const fileExtension = fileName.split('.').pop() ?? ''
  const tag = options.tag || generateTag()
  if (tag.length > 7) {
    console.log('Tag cannot be longer than 7 characters')
    process.exit(0)
  }
  const description = options.description || ''
  try {
    await createConnection()
    const snapToSave = { fileName, fileContent, fileExtension, tag, description }
    await saveSnap(snapToSave)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
