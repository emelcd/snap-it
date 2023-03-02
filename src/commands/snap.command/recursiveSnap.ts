import fs from 'fs'
import { generateTag, readFolderRecursive } from '../../utils/general.utils'
import sizeof from 'object-sizeof'
import { type IFileRecursive, type ISnapRecursive } from '../../interfaces/snap.interface'
import { createConnection } from '../../utils/db.utils'

export const recursiveSnap = async (file: string, options: any): Promise<void> => {
  const isDirectory = fs.statSync(file).isDirectory()
  const folderPath = file
  if (!isDirectory) {
    console.log('File is not a directory')
    process.exit(0)
  }
  const rawContent = readFolderRecursive(folderPath)
  const entriesFolder = Object.entries(rawContent)
  // get the values that are equal to an empty object
  const folders = entriesFolder.filter(([key, value]) => {
    return typeof value === 'object' && Object.keys(value).length === 0
  }).map(n => n[0])

  const entriesFiles = [...entriesFolder.filter(([key, value]) => {
    return typeof value === 'boolean'
  }).values()].map(n => n[0])

  const toFileRecursive = (filePaths: string[]): IFileRecursive[] => {
    return filePaths.map((filePath) => {
      return {
        filePath,
        fileContent: fs.readFileSync(folderPath + '/' + filePath).toString()
      }
    })
  }

  const files = toFileRecursive(entriesFiles)
  const size = sizeof(files)
  const tag = options.tag || generateTag()
  const description = options.description || ''
  const snap: ISnapRecursive = {
    name: folderPath,
    isFolder: true,
    folders,
    size,
    tag,
    description,
    files
  }
  try {
    await createConnection()
    await saveRecursiveSnap(snap)
  } catch (error) {
    console.log(error)
  }
}

const saveRecursiveSnap = async (snap: ISnapRecursive): Promise<void> => {
  try {
    const { snaps } = await createConnection()
    await snaps.insertOne(snap)
    console.log('Snap saved with tag: ' + snap.tag)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
