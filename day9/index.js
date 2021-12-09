let utils = require('./../customUtils.js');

// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    return rawData.split('\n').map(line => line.split(''));
});


/**
 * Returns the result of the passed function
 *
 * @param {Function} compareFunc is a function passed
 * that will compare the current position in array to 
 * all adjacent positions (up, down, left, right). Should
 * return a bool
 * @param {Array} arr is an array-like grid [[...],[...]...]
 * @param {Array} pos is an array of indexes of the position
 * to evaluage [y,x] [row, colulmn]... expects Int
 * @return {Bool} returns true if passed, false if not
 */
const comapreAdjacent = (compareFunc, arr, pos) => {

    let newPos = [pos[0]+1, pos[1]+1]

    // Create blank row to pad top and bottom
    let blankRow = []

    for (let i = 0; i < arr[0].length+2; i++) {
        blankRow.push(99)
    }

    let comapreArr = []
    comapreArr.push(blankRow)
    arr.forEach(row => {
        let newRow = [...row.map(n => parseInt(n))]
        newRow.unshift(99)
        newRow.push(99)
        comapreArr.push(newRow)
    });
    comapreArr.push(blankRow)


    let currentVal = comapreArr[newPos[0]][newPos[1]]

    let adjValUp = comapreArr[newPos[0]-1][newPos[1]]
    let adjValLf = comapreArr[newPos[0]][newPos[1]-1]
    let adjValDn = comapreArr[newPos[0]+1][newPos[1]]
    let adjValRt = comapreArr[newPos[0]][newPos[1]+1]

    let compareUp = compareFunc(currentVal, adjValUp)
    let compareLf = compareFunc(currentVal, adjValLf)
    let compareDn = compareFunc(currentVal, adjValDn)
    let compareRt = compareFunc(currentVal, adjValRt)

    if (compareUp && compareLf && compareDn && compareRt) {
        return true
    } else {
        return false
    }
}

const checkLowPoint = (currentVal, compareVal) =>{
    if(parseInt(currentVal) < parseInt(compareVal)) {
        return true
    } else {
        return false
    }
}

let lowPoints = []
let lowPointsValues = 0

data1.forEach((row, rIndex) => {
    row.forEach((value, vIndex) => {
        if (comapreAdjacent(checkLowPoint, data1, [rIndex, vIndex])) {
            lowPoints.push([rIndex, vIndex])
            lowPointsValues+= (parseInt(value) + 1)
        }
    });
});


// Part 1
console.log(`Part 1: ${lowPointsValues}`)


const findBasinsSizes = (arr, startPos = [0,0]) => {
    let basinExclude = 9
    let basinSizeArr = []
    if((startPos[0] === arr.length-1) && (startingPos[1] === arr[0].length)) {
        // Reached the end of Array recursion
        return basinSizeArr
    } else {
        
    }
}

// Part 2
console.log(`Part 2: ${data1[1]}`)
