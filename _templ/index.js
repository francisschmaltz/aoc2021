let utils = require('./../customUtils.js');

// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    return rawData.split(',');
});


console.log(`data1: ${data1}`)