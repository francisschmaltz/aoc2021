// Custom utilities for snippets that i will reuse ofter.
const fs = require('fs');
const path = require('path')

var exports = module.exports = {}

/**
 * Returns raw data in parsed and transformed format
 * based off a custom function passed in.
 *
 * @param {string} fileName The name of the file with data.
 * @param {function} dataFunc The function used to transform
 * the data.
 * @return {any} rawFileData transformed by dataFunc.
 */
exports.parseData = (fileName, dataFunc) => {
    let rawFileData = fs.readFileSync(path.join(`${fileName}`)).toString();
    return dataFunc(rawFileData)
}
