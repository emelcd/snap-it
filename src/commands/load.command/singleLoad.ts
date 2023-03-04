import { writeFileSync } from 'fs'
import { catchError } from '../../errors/catch.error'

export const singleLoad = async (fileName: string, fileContent: string): Promise<void> => {
  try {
    writeFileSync(fileName, fileContent, 'utf8')
    console.log('Snap loaded')
    process.exit(0)
  } catch (error) { catchError(error) }
}
