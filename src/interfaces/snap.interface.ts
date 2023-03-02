export interface ISnap {
  fileName: string
  fileContent: string
  fileExtension: string
  tag: string
  description: string
  size: number
  isFolder: boolean
}

export interface IFileRecursive {
  filePath: string
  fileContent: string
}

export interface ISnapRecursive {
  isFolder: boolean
  folders: string[]
  size: number
  tag: string
  description: string
  files: IFileRecursive[]
}
