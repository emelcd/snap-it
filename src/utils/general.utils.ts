import { Console } from 'console'
import { Transform } from 'stream'
import fs from 'fs'
import { isText } from 'istextorbinary'

export function table (input: any): void {
  const ts = new Transform({ transform (chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })
  logger.table(input)
  const table = (ts.read() || '').toString()
  let result = ''
  for (const row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌')
    r = r.replace(/^├─*┼/, '├')
    r = r.replace(/│[^│]*/, '')
    r = r.replace(/^└─*┴/, '└')
    r = r.replace(/'/g, ' ')
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    result += `${r}\n`
  }
  // replace all the strings using chalk
  console.log(
    result.trimEnd()
  )
}

export function generateTag (): string {
  // Generate a random tag in the format AAA-123
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const randomLetter = (): string => letters[Math.floor(Math.random() * letters.length)]
  const randomNum = (): string => numbers[Math.floor(Math.random() * numbers.length)]
  return `${randomLetter()}${randomLetter()}${randomLetter()}-${randomNum()}${randomNum()}${randomNum()}`
}

export function cleanStringLength (str: string, length: number = Infinity): string {
  if (str.length > length) {
    return `${str.substring(0, length)}...`
  }
  return str
}

interface FolderContents {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: FolderContents | boolean | Object
}

export function readFolderRecursive (folderPath: string): FolderContents {
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
