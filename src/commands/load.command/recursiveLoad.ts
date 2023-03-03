import { mkdirSync, writeFileSync } from 'fs'
import { type ISnapRecursive } from '../../interfaces/snap.interface'

export const recursiveLoad = async (data: any): Promise<void> => {
  try {
    const d = data as ISnapRecursive
    const parentName = 'src'
    const { files, folders } = d
    folders.forEach((folderName) => {
      mkdirSync(parentName + '/' + folderName, { recursive: true })
    })
    files.forEach((file) => {
      writeFileSync(parentName + '/' + file.filePath, file.fileContent)
    })
    console.log(parentName + ' has been loaded')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}
