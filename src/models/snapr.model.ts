import { type ISnapRecursive } from '../interfaces/snap.interface'
import { model, Schema } from 'mongoose'

const SnapSchema: Schema = new Schema<ISnapRecursive>({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  tag: { type: String, required: true },
  folders: [{
    type: String,
    required: false
  }],
  files: [{
    filePath: { type: String, required: true },
    fileContent: { type: String, required: true }
  }],
  description: { type: String, required: false }
}, { timestamps: true })

export default model<ISnapRecursive>('SnapR', SnapSchema)
