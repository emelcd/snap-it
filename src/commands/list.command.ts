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
  // round with 2 decimals
  mapped = mapped.map((x) => ({ ...x, 'size(KB)': (x.size / 1024).toFixed(2) }))
  // if is a folder, add an asterisk to the tag
  // mapped = mapped.map((x) => ({ ...x, tag: x.isFolder ? x.tag + '*' : x.tag }))
  mapped = mapped.map((x) => ({ ...x, description: x.isFolder ? '[TREE]' + x.description : x.description }))
  // remove isFolder property and size
  const removedUnn = mapped.map(({ isFolder, size, ...rest }) => rest)
  // clean string length
  const cleaned = removedUnn.map((x) => ({ ...x, tag: x.tag, name: cleanStringLength(x.name, 25), description: cleanStringLength(x.description, 20) }))
  // reaorder in this tag, name, size, description
  table(cleaned)
  // Add a legend that * means is a folder
  // console.log('* for folder')
  process.exit(0)
}
