import { createServer } from "http";
import open from 'open'
import { readFileSync, write, writeFileSync } from "fs";




const test = async () => {
    const server = createServer((req, res) => {
        const template = readFileSync('./index.html').toString().trim()
        const content = readFileSync('./package.json')
        let finalContent = template.replace('{{content}}', content.toString())
        finalContent = finalContent.replace('{{name}}', 'Hello World')
        finalContent = finalContent.replace('{{tag}}', 'bla-123')
        finalContent = finalContent.replace('{{description}}', "hellow his descript")
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(finalContent)
    })
    server.listen(3000, () => {
        open('http://localhost:3000')
    })
}

const cleanTemplate = () => {
    const data = readFileSync('./index.html').toString().split("\n").filter(l=>l).join("")
    writeFileSync('./template.html', data)

}

cleanTemplate()