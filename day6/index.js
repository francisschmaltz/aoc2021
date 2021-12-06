let utils = require('./../customUtils.js');

// Return data in fixed format
let data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    return rawData.split(',').map(n => parseInt(n));
});

// Part 1

// each lanternfish creates a new lanternfish once every 7 days.
// represents the number of days until it creates a new lanternfish.
// new lanternfish would surely need slightly longer before 
//   it's capable of producing more lanternfish: two more days for its first cycle.


/**
 * Returns a BigInt of total number of fish
 *
 * @param {number} simDays is the number of days to simulate
 * @return {BigInt} BigInt for total number of fish
 */
const simulateFish = simDays => {

    // Create a new Map that stores a BigInt for each value
    let fishMap = new Map()
    fishMap.set('day0', BigInt(0))
    fishMap.set('day1', BigInt(0))
    fishMap.set('day2', BigInt(0))
    fishMap.set('day3', BigInt(0))
    fishMap.set('day4', BigInt(0))
    fishMap.set('day5', BigInt(0))
    fishMap.set('day6', BigInt(0))
    fishMap.set('day7', BigInt(0))
    fishMap.set('day8', BigInt(0))

    // Initialize Map
    data1.forEach(fishAge => {
        // Get the current map value and incriment by 1
        let curMapVal = fishMap.get(`day${fishAge}`)
        let newMapVal = (curMapVal + BigInt(1))

        // Replace with new value
        fishMap.set(`day${fishAge}`, newMapVal)

    });

    for (let d = 0; d < simDays; d++) {

        if((d % 25) === 0) {
            console.log(`Working on day: ${d}`)
            console.log(`${Math.round(d / simDays * 100)}% Done`)
            console.log('\n')
        }

        // Store the current values
        let curDay0 = fishMap.get('day0')
        let curDay1 = fishMap.get('day1')
        let curDay2 = fishMap.get('day2')
        let curDay3 = fishMap.get('day3')
        let curDay4 = fishMap.get('day4')
        let curDay5 = fishMap.get('day5')
        let curDay6 = fishMap.get('day6')
        let curDay7 = fishMap.get('day7')
        let curDay8 = fishMap.get('day8')

        fishMap.set('day0', curDay1)
        fishMap.set('day1', curDay2)
        fishMap.set('day2', curDay3)
        fishMap.set('day3', curDay4)
        fishMap.set('day4', curDay5)
        fishMap.set('day5', curDay6)
        fishMap.set('day6', (curDay0 + curDay7))
        fishMap.set('day7', curDay8)
        fishMap.set('day8', curDay0)

    }

    let totalFish = BigInt(0)
    fishMap.forEach((fishCount) => {
        totalFish+=fishCount
    })
    return totalFish
}

// Part1
console.log(`Part 2, 80 Days of fish fucking: ${simulateFish(80)}`);

console.log('\n\n\n')

// Part 2
console.log(`Part 2, 256 Days of fish fucking: ${simulateFish(256)}`);

