
import mongoose from "mongoose"
export interface ISnap {
    fileName: string,
    fileContent: string,
    fileExtension: string,
    tag: string,
    description: string
}

const snapSchema = new mongoose.Schema<ISnap>({
    fileName: String,
    fileContent: String,
    fileExtension: String,
    tag: String,
    description: String
})

export const Snap = mongoose.model<ISnap>("Snap", snapSchema)