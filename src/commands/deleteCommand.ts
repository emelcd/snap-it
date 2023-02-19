import { createConnection } from "../utils/dbutils";


export async function deleteCommand(file: string, options: any) {
    try {
        const { snaps } = await createConnection()
        const isDeleted = await snaps.deleteOne({ tag: file })
        if (isDeleted.deletedCount === 0) {
            console.log("Snap not found")
            process.exit(0)
        }
        console.log("Snap deleted")
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}