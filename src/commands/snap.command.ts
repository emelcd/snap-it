import { singleSnap } from './snap.command/singleSnap'

export async function snapCommand (file: string, options: any): Promise<void> {
  // console.log({ file, options })
  if (!options.recursive) {
    await singleSnap(file, options)
  } else {
    await recursiveSnap(file, options)
  }
}

const recursiveSnap = async (file: string, options: any): Promise<void> => {
}
