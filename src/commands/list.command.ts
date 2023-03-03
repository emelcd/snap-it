/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { createConnection } from '../utils/db.utils'
import { cleanStringLength, table } from '../utils/general.utils'

export const listCommand = async (): Promise<void> => {
  const { snaps } = await createConnection()
  const snapsList = await snaps.find().toArray()
  if (snapsList.length === 0) {
    console.log('No snaps found')
    process.exit(0)
  }
  let mapped = snapsList.map((x) => ({ tag: x.tag, name: x.name, size: x.size, description: x.description, isFolder: x.isFolder }))
  mapped = mapped.map((x) => ({ ...x, 'size(KB)': (x.size / 1024).toFixed(2) }))
  mapped = mapped.map((x) => ({ ...x, type: x.isFolder ? 'FOLDER' : 'FILE' }))
  const removedUnn = mapped.map(({ isFolder, size, ...rest }) => rest)
  const cleaned = removedUnn.map((x) => ({ ...x, tag: x.tag, name: cleanStringLength(x.name, 25), description: cleanStringLength(x.description, 20) }))
  table(cleaned)
  // cleaned.forEach((d)=>{
  //   console.log(d)
  // })
  process.exit(0)
}
