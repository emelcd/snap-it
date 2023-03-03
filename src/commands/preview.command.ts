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
      let content = template.replace('{{name}}', query.fileName || '')
      content = content.replace('{{tag}}', query.tag || '')
      content = content.replace('{{description}}', query.description || '')
      content = content.replace('{{content}}', query.fileContent)
      res.write(content)
      // writeFileSync('./cache.html', content)
      res.end()
    })
    server.listen(3000, () => {
      open(
        'http://localhost:3000'
      ).catch(err => { console.error(err) })
      setTimeout(() => {
        process.exit(0)
      }, 5e3)
      console.log('Press q to quit')
      const answer = new Promise((resolve, reject) => {
        process.stdin.on('data', (data) => {
          resolve(data.toString().trim())
        })
      })
      answer.then((data) => {
        if (data === 'q') {
          process.exit(0)
        }
      })
        .catch(err => { console.error(err) })
    })
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
