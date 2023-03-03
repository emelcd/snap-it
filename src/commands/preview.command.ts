/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createConnection } from '../utils/db.utils'
import { readFileSync, rmdirSync, writeFileSync } from 'fs'
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

    let content = template.replace('{{name}}', query.fileName || '')
    content = content.replace('{{tag}}', query.tag || '')
    content = content.replace('{{description}}', query.description || '')
    content = content.replace('{{content}}', query.fileContent)
    writeFileSync('./cache.html', content)
    open('cache.html')
      .catch(err => { console.log(err) })
    setTimeout(() => {
      rmdirSync('cache.html')
    }, 3e3)
    // .finally(process.exit(0))
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
