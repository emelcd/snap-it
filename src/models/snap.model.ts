import { type ISnap } from '../interfaces/snap.interface'
import { model, Schema } from 'mongoose'

const SnapSchema: Schema = new Schema<ISnap>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fileContent: { type: String, required: true },
  tag: { type: String, required: true }
}, {
  timestamps: true
})

export default model<ISnap>('Snap', SnapSchema)
