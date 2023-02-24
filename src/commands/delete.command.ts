import { createConnection } from '../utils/db.utils'

export async function deleteCommand (file: string, _options: any): Promise<void> {
  try {
    const { snaps } = await createConnection()
    if (file === 'ALL' || file === 'all') {
      console.log('Are you sure you want to delete all snaps? (y/n)')
      const answer = await new Promise((resolve, reject) => {
        process.stdin.on('data', (data) => {
          resolve(data.toString().trim())
        })
      })
      if (answer !== 'y') {
        console.log('Snap not deleted')
        process.exit(0)
      }

      await snaps.deleteMany({})
      console.log('All snaps deleted')
      process.exit(0)
    }
    const isDeleted = await snaps.deleteOne({ tag: file })
    if (isDeleted.deletedCount === 0) {
      console.log('Snap not found')
      process.exit(0)
    }
    console.log('Snap deleted')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
