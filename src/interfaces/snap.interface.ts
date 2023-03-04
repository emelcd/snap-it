export interface ISnap {
  name: string
  fileContent: string
  fileExtension: string
  tag: string
  description: string
  size: number
  isFolder: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IFileRecursive {
  filePath: string
  fileContent: string
}

export interface ISnapRecursive {
  name: string
  isFolder: boolean
  folders: string[]
  size: number
  tag: string
  description: string
  files: IFileRecursive[]
}
