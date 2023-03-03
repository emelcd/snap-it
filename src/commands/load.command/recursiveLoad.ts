import { type ISnapRecursive } from '../../interfaces/snap.interface'

export const recursiveLoad = async (data: any): Promise<void> => {
  const d = data as ISnapRecursive
  const { files } = d
  console.log(files.map(n => n.filePath))
  process.exit(0)
}
