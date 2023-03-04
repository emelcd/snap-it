import { type ISnap } from '../interfaces/snap.interface'
import { model, Schema } from 'mongoose'

const SnapSchema: Schema = new Schema<ISnap>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fileContent: { type: String, required: true },
  tag: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default model<ISnap>('Snap', SnapSchema)
