import { writeFileSync } from 'fs'

export const singleLoad = async (fileName: string, fileContent: string): Promise<void> => {
  try {
    writeFileSync(fileName, fileContent, 'utf8')
    console.log('Snap loaded')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
