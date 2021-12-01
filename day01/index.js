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
    return rawData.split('\n');
}

// Return data in fixed format
const data1 = parseData("data1", fixData1);


// Part 1
// data1 is an array of depths. 
// First we need to solve how many times the depth increases
const checkIfDepthDecreases = (val, valPrev) => {
    if (parseInt(val) > parseInt(valPrev)) {
        return true
    } else {
        return false
    }
}
console.log(data1)
let numberOfTimesIncreased = 0;

data1.forEach((currentVal, index) => {
    if(index < 1) {
        // do nothing because value cant increase from starting point
    } else {
        let prevVal = data1[index - 1]
        if(checkIfDepthDecreases(currentVal, prevVal)) {
            numberOfTimesIncreased+=1
        } else {
            // do nothing because it decreased
        }
    }

});
console.log('part 1')
console.log(`numberOfTimesIncreased: ${numberOfTimesIncreased}`)

// Part2
let numberOfTimesSumIncreased = 0;

data1.forEach((currentVal, index) => {
    if(index < 1) {
        // do nothing because value cant increase from starting point
    } else {
        let val0 = parseInt(data1[index - 1])
        let val1 = parseInt(currentVal)
        let val2 = parseInt(data1[index + 1])
        let val3 = parseInt(data1[index + 2])

        let currentSum = val1 + val2 + val3
        
        let prevSum = val0 + val1 + val2


        if(checkIfDepthDecreases(currentSum, prevSum)) {
            numberOfTimesSumIncreased+=1
        } else {
            // do nothing because it decreased
        }
    }

});

console.log('part 2')
console.log(`numberOfTimesSumIncreased: ${numberOfTimesSumIncreased}`)
