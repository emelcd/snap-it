import fs from 'fs'
import { isText } from 'istextorbinary'
import { type ISnap } from '../../interfaces/snap.interface'
interface FolderContents {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: FolderContents | boolean | Object
}

export interface ISnapRecursive {
  folders: string[]
  files: ISnap[]
}

function readFolderRecursive (folderPath: string): FolderContents {
  const folderContents: FolderContents = {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const readFolder = (path: string, parentKey?: string) => {
    const folderFiles = fs.readdirSync(path, { withFileTypes: true })
    folderFiles.forEach(file => {
      const fileName = file.name
      if (fileName.startsWith('.')) {
        return
      }
      const fileKey = parentKey ? `${parentKey}/${fileName}` : fileName
      if (file.isDirectory()) {
        folderContents[fileKey] = {}
        readFolder(`${path}/${fileName}`, fileKey)
      } else {
        const isFileText = isText(`${path}/${fileName}`)
        if (isFileText) {
          folderContents[fileKey] = isFileText
        }
      }
    })
  }

  readFolder(folderPath)

  return folderContents
}
const folderPath = './src'
// const isText = (path: string) => {
//   const textExtensions = ['.txt', '.md', '.js', '.ts'];
//   const extension = path.slice(path.lastIndexOf('.'));
//   return textExtensions.includes(extension);
// };
const folderContents = readFolderRecursive(folderPath)

console.log(folderContents)
// folder Contents is an object
const entriesFolder = Object.entries(folderContents)
// get the values that are equal to an empty object
const emptyObjects = entriesFolder.filter(([key, value]) => {
  return typeof value === 'object' && Object.keys(value).length === 0
}).map(n => n[0])

console.log(emptyObjects)
// create a directory for each empty object in test_folder
emptyObjects.forEach(([key, value]) => {
  if (fs.existsSync(`test_folder/${key}`)) return
  fs.mkdirSync(`test_folder/${key}`, { recursive: true })
})

// const entriesFiles = entriesFolder.filter(([key, value]) => {
//   return typeof value === 'boolean'
// })

// read the content of the files
// entriesFiles.forEach(([key, value]) => {
//   const data = fs.readFileSync(folderPath + '/' + key, 'utf8')
//   console.log(data)
//   // fs.writeFileSync(`test_folder/${key}`, data)
// })
