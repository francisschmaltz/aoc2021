let utils = require('./../customUtils.js');

// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    return rawData.split(',').map(n => parseInt(n));
});



// Part 1
let sortedArr = data1.sort((a, b) => a - b);

/**
 * Returns a total cost of the lowest cost distance
 *
 * @param {array} arr sorted arr of numbers
 * @param {function} distanceCalcFunc function to 
 * calculate the distance for each item
 * @return {BigInt} BigInt for total number of fish
 */
const calculateMinCost = (arr, distanceCalcFunc) => {
    let maxDistance = (arr[arr.length - 1] - arr[0])

    let allDistances = {}

    for (let d = 0; d < maxDistance; d++) {

        allDistances[`${d}`] = 0

        arr.forEach(pos => {
        
            let distanceToTravel = distanceCalcFunc(Math.abs(pos - d))

            allDistances[`${d}`]+= distanceToTravel

        });
    }

    let lowestCostPlace = ''
    // Create super large number to compare
    let lowestCostTotal = allDistances[Object.keys(allDistances)[0]];


    for (const key in allDistances) {
        if (allDistances[key] < lowestCostTotal) {
            lowestCostPlace = `${key}`
            lowestCostTotal = allDistances[key];
        }
    }

    return lowestCostTotal
}

// Part 1

// Return self
const part1Func = n => n

console.log(`Part 1: ${calculateMinCost(sortedArr, part1Func)}`)



// Part 2
// Return self + every step
const part2Func = (n) => {
    let returnVal = 0
    for (let t = 1; t <= n; t++) {
        returnVal += t
    }
    return returnVal
}
console.log(`Part 2: ${calculateMinCost(sortedArr, part2Func)}`)
