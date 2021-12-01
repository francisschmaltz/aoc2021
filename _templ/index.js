const fs = require('fs');
const path = require('path')

/**
 * Returns raw data in parsed and transformed format
 * based off a custom function passed in.
 *
 * @param {string} fileName The name of the file with data.
 * @param {function} dataFunc The function used to transform
 * the data.
 * @return {any} rawFileData transformed by dataFunc.
 */
const parseData = (fileName, dataFunc) => {
    let rawFileData = fs.readFileSync(path.join(__dirname,`${fileName}`)).toString();
    return dataFunc(rawFileData)
}

// create functions to fix data
const fixData1 = (rawData) => {
    return rawData.split(',');
}

// Return data in fixed format
const data1 = parseData("data1", fixData1);


console.log(`data1: ${data1}`)