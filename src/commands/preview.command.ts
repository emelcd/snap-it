/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createConnection } from '../utils/db.utils'
import { readFileSync } from 'fs'
import http from 'http'
import open from 'open'

export async function previewCommand (tag: string): Promise<void> {
  try {
    const { snaps } = await createConnection()
    const query = await snaps.findOne({ tag })
    if (query == null) {
      console.log('Snap not found')
      process.exit(0)
    }
    const template = readFileSync('/home/d/snap-it/src/data/template.html').toString()

    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      let finalConte = template.replace('{{name}}', query.fileName)
      finalConte = finalConte.replace('{{tag}}', query.tag)
      finalConte = finalConte.replace('{{description}}', query.description)
      finalConte = finalConte.replace('{{content}}', query.fileContent)
      res.write(finalConte)
      res.end()
    })
    server.listen(3000, () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      open('http://localhost:3000')
      setTimeout(() => {
        process.exit(0)
      }, 2e3)
    })
    // console.log(`FILE NAME: ${query.fileName}`)
    // console.log(`FILE EXTENSION: ${query.fileExtension}`)
    // console.log(`TAG: ${query.tag}`)
    // query.description && console.log(`DESCRIPTION: ${query.description}`)
    // // console.log(`DESCRIPTION: ${query.description}`)
    // console.log('')
    // console.log(query.fileContent.split('\n').slice(0, 10).join('\n'))
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
