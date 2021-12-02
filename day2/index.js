let utils = require('./../customUtils.js');

// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    return rawData.split('\n');
});

// Part 1
let movements = {forward: 0, down: 0, up: 0}
data1.forEach(inst => {
    // parse each line into an instruction\
    let instArr = inst.split(' ');
    let instDir = instArr[0]
    let instVal = parseInt(instArr[1])

    if(instDir === 'forward') {
        movements.forward+= instVal
    } else if(instDir === 'down') {
        movements.down+= instVal
    } else if(instDir === 'up') {
        movements.up+= instVal
    } else {
        console.error(`${instDir}`)
        throw 'movement not recognized'
    }
});
// What do you get if you multiply your final horizontal position by your final depth?
console.log(movements)
console.log(`Part 1: ${movements.forward * (0 - movements.up + movements.down)}`)

// Part 1
let movementsWithAim = {forward: 0, aim:0, depth:0}
data1.forEach(inst => {
    // parse each line into an instruction\
    let instArr = inst.split(' ');
    let instDir = instArr[0]
    let instVal = parseInt(instArr[1])

    if(instDir === 'forward') {
        movementsWithAim.forward+= instVal
        movementsWithAim.depth+= (movementsWithAim.aim * instVal)
    } else if(instDir === 'down') {
        movementsWithAim.aim+= instVal
    } else if(instDir === 'up') {
        movementsWithAim.aim-= instVal
    } else {
        console.error(`${instDir}`)
        throw 'aim not recognized'
    }
});
console.log(movementsWithAim)
console.log(`Part 2: ${movementsWithAim.forward * movementsWithAim.depth}`)
