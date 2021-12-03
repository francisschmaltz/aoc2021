let utils = require('./../customUtils.js');

// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    return rawData.split('\n');
});

// Part 1

// Create an object with the count of 1 or 0 for each position
// create object to hold values
let posVals = {}

data1.forEach((element, index) => {
    // split element into an array
    elmArr = element.split('')

    // loop through each bit in value
    elmArr.forEach((elmArrBit, elmArrIndex) => {
        // instantiate object on first index
        if(index === 0) {
            // create a value on object for each position
            // then create keys for 0 and 1
            posVals[`${elmArrIndex}`] = {'0': 0, '1': 0}
        }

        // Add value to corosponding pos vale
        if(elmArrBit === '0') {
            posVals[`${elmArrIndex}`][`0`]+= 1
        } else if(elmArrBit === '1') {
            posVals[`${elmArrIndex}`][`1`]+= 1
        } else {
            throw "elmArrBit should be 1 or 0 (type: string)"
        }
    });
    
});

// GammaRate is most common rate in specific position
let gammaRate = []

// epsilonRate is the least common
let epsilonRate = []

for (let pos in posVals) {
    // get object for each position
    let posResults = posVals[pos]
    
    // if more zeros, add `0` to gamam
    // if more ones, add `1` to gamma
    // do oposite for epsilon
    // if they are equal throw
    if(posResults[0] > posResults[1]) {
        gammaRate.push(0)
        epsilonRate.push(1)
    } else if(posResults[0] < posResults[1]) {
        gammaRate.push(1)
        epsilonRate.push(0)
    } else {
        throw "posResults has something wrong"
    }
}
// convert gammaRate array from array to base10 int
let gmRateNormalized = parseInt(gammaRate.join(''), 2)
let epRateNormalized = parseInt(epsilonRate.join(''),2)
console.log('Part1:')
console.log(`gmRate * epRate: ${gmRateNormalized * epRateNormalized}`);

// Part 2

/**
 * Returns array of strings filtered from the input array
 * where the value of the targetPos matches the input targetVale
 *
 * @param {array} arr Input array to filter
 * @param {string} targetVal the vale to match and filter
 * non-matches
 * @param {number} targetPos the position index to check values
 * @return {array} filtered array that matches criteria
 */
 const filterListOfItemsByPos = (arr, targetVal, targetPos) => {

    let returnArray = []

    arr.forEach(element => {

        // split element into array of strings to filter
        elmArr = element.split('')

        // check if the value matches the target value based on
        // poisiton from targetPos. Convert to string to prevent
        // strange JS type issues

        if(elmArr[targetPos].toString() === targetVal.toString()) {
            returnArray.push(element)
        }

    });
    return returnArray
}

/**
 * Returns the common value in specific positon of array of 
 * numbers either most or least
 *
 * @param {array} arr Input array to filter
 * @param {number} targetPos the position index to check values
 * @param {number} tieValue the value to return in case of tie
 * @param {string} type either 'most' or 'least'
 * @return {number} most common value at pos
 */
 const commonValueAtPos = (arr, targetPos, tieValue = 0, type = 'most') => {

    if((type !== 'most') && (type !== 'least')) {
        console.error `type: ${type}`
        throw 'commonValueAtPos.type must be either `most` or `least`'
    }
    // Create an object with the count of 1 or 0 for each position
    // create object to hold values
    let posVals = {}


    arr.forEach((element, index) => {
        // split element into an array
        elmArr = element.split('')

        if(index === 0) {
            // create a value on object for each position
            // then create keys for 0 and 1
            posVals = {'0': 0, '1': 0}
        }

        // Add value to corosponding pos vale
        if(elmArr[targetPos].toString() === '0') {
            posVals[`0`]+= 1
        } else if(elmArr[targetPos].toString() === '1') {
            posVals[`1`]+= 1
        } else {
            console.error()
            throw "elmArrBit should be 1 or 0 (type: string)"
        }
    });

    if(type === 'most') {
        if (posVals[0] > posVals[1]) {
            return 0
        } else if (posVals[0] < posVals[1]) {
            return 1
        } else {
            return tieValue
        }
    } else if (type === 'least') {
        if (posVals[0] > posVals[1]) {
            return 1
        } else if (posVals[0] < posVals[1]) {
            return 0
        } else {
            return tieValue
        }
    } else {
        throw 'how did we get here.'
    }



 }



// verify life support rating = oxygen generator rating * CO2 scrubber rating

// oxygen generator rating
// start with first bit
// filter numbers that dont have the most-common value in this bit
// move to next bit, repeat
// tieValue is 

// to find the oxygenrate we can itterate throguh gammaRate
let oxygenRateObj = {}
gammaRate.forEach((value, index) => {

    let previousIndex = index - 1
    // if the index is zero we can use the input data
    if(index === 0) {
        oxygenRateObj[0] = filterListOfItemsByPos(data1, value, index)
    } else {

        if((!oxygenRateObj[previousIndex]) || (oxygenRateObj[previousIndex].length === 1)) {
            // if previous index position had 1 result
            // we are done filtering and can skip
            return false;
        } else {
            let targetValue = commonValueAtPos(oxygenRateObj[previousIndex], index, 1, 'most')

            oxygenRateObj[`${index}`] = filterListOfItemsByPos(oxygenRateObj[previousIndex], targetValue, index)
        }

        
        
    }
})

// CO2 generator rating
// start with first bit
// filter numbers that dont have the least-common value in this bit
// move to next bit, repeat

// to find the CO2rate we can itterate throguh epsilonRate
let co2RateObj = {}
epsilonRate.forEach((value, index) => {

    let previousIndex = index - 1

    // if the index is zero we can use the input data
    if(index === 0) {
        co2RateObj[0] = filterListOfItemsByPos(data1, value, index)
    } else {

        if((!co2RateObj[previousIndex]) || (co2RateObj[previousIndex].length === 1)) {
            // if previous index position had 1 result
            // we are done filtering and can skip
            return false;
        }

        let targetValue = commonValueAtPos(co2RateObj[previousIndex], index, 0, 'least')

        co2RateObj[`${index}`] = filterListOfItemsByPos(co2RateObj[previousIndex], targetValue, index)
        
    }
})

// Get the last value in the object and normalize to base 10
let oxyRate = parseInt(oxygenRateObj[`${Object.keys(oxygenRateObj).length - 1}`],2)
let co2Rate = parseInt(co2RateObj[`${Object.keys(co2RateObj).length - 1}`],2)

console.log('Part 2:')

console.log(`oxyRate: ${oxyRate}, CO2Rate: ${co2Rate}`)
console.log(`oxyRate * CO2Rate: ${oxyRate * co2Rate}`);
