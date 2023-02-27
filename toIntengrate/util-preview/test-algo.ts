const t = ["eco", "", "", "paco","test", "", "eso", "" ,"" ,"" ,"" , "upser" ,"" ,""]

// If there is only a white space keep it, if the next is a white space remove it
// @ts-ignore
const result = t.reduce((acc, curr) => {
    if (curr === "" && acc[acc.length - 1] === "") {
        return acc
    }
    return [...acc, curr]
})

// const cleanWhiteSpaces = (arr: string[]) : string []=> {
//     return arr.reduce((acc: string, curr: string) => {
//         if (curr === "" && acc[acc.length - 1] === "") {
//             return acc
//         }
//         return [...acc, curr]
//     })
// }