
// Create func to parse all data
const parseData = (dataFromFile, dataFunc) => {
    return dataFunc(dataFromFile)
}

// Load in data as string
const rawData1 = require("./data1")

// create functions to fix data
const fixData1 = (rawData) => {
    return rawData.split(',');
}

// Return data in fixed format
const data1 = parseData(rawData1, fixData1);

console.log(data1)