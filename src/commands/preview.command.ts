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
    const template = readFileSync('src/data/template.html').toString()

    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      let content = template.replace('{{name}}', query.fileName)
      content = content.replace('{{tag}}', query.tag)
      content = content.replace('{{description}}', query.description)
      content = content.replace('{{content}}', query.fileContent)
      // writeFileSync('./cache.html', content)
      res.write(content)
      res.end()
    })
    server.listen(3000, () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      open('http://localhost:3000')
      setTimeout(() => {
        // process.exit(0)
      }, 2e3)
    })
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
