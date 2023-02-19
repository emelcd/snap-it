import { Console } from 'console';
import { Transform } from 'stream';

export function table(input: any) {
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })
    logger.table(input)
    const table = (ts.read() || '').toString()
    let result = '';
    for (let row of table.split(/[\r\n]+/)) {
        let r = row.replace(/[^┬]*┬/, '┌')
        r = r.replace(/^├─*┼/, '├');
        r = r.replace(/│[^│]*/, '');
        r = r.replace(/^└─*┴/, '└');
        r = r.replace(/'/g, ' ');
        result += `${r}\n`;
    }
    // replace all the strings using chalk
    console.log(
        result
    );
}

export function generateTag() {
    // Generate a random tag in the format AAA-123
    const letters = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)]
    const randomNum = () => numbers[Math.floor(Math.random() * numbers.length)]
    return `${randomLetter()}${randomLetter()}${randomLetter()}-${randomNum()}${randomNum()}${randomNum()}`
}