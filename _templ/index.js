let utils = require('./../customUtils.js');

// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    return rawData.split('\n');
});

// Part 1
console.log(`Part 1: ${data1[0]}`)

// Part 2
console.log(`Part 2: ${data1[1]}`)
