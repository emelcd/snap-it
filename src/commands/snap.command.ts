import { recursiveSnap } from './snap.command/recursiveSnap'
import { singleSnap } from './snap.command/singleSnap'

export async function snapCommand (file: string, options: any): Promise<void> {
  if (!options.recursive) {
    await singleSnap(file, options)
  } else {
    await recursiveSnap(file, options)
  }
}
