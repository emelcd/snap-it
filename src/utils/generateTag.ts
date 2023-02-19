export function generateTag() {
    // Generate a random tag in the format AAA-123
    const letters = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)]
    const randomNum = () => numbers[Math.floor(Math.random() * numbers.length)]
    return `${randomLetter()}${randomLetter()}${randomLetter()}-${randomNum()}${randomNum()}${randomNum()}`
}