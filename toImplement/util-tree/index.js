const fs = require('fs')
function readFolderRecursive(folderPath) {
    const folderContents = {};

    const readFolder = (path, parentKey) => {
        const folderFiles = fs.readdirSync(path, { withFileTypes: true });
        folderFiles.forEach(file => {
            const fileName = file.name;
            const fileKey = parentKey ? `${parentKey}/${fileName}` : fileName;
            if (file.isDirectory()) {
                folderContents[fileKey] = {};
                readFolder(`${path}/${fileName}`, fileKey);
            } else {
                folderContents[fileKey] = fs.readFileSync(`${path}/${fileName}`, 'utf8');
            }
        });
    }

    readFolder(folderPath);

    return folderContents;
}

console.log(
    readFolderRecursive('./node-express-realworld-example-app')

)
