let utils = require('./../customUtils.js');

// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    
    let parsedData = []
    
    // Convert
    // 0,9 -> 5,9
    // to
    // [[0,9],[5,9]]
    let eachLine = rawData.split('\n');
    eachLine.forEach(line => {
        let parsedLine = []
        let splitLine  = line.split(' -> ')

        splitLine.forEach(pointXY => {
            // split and convert to number
            let parsedPoint = pointXY.split(',').map(n => parseInt(n))

            parsedLine.push(parsedPoint)
        });

        parsedData.push(parsedLine)
        
    });

    return parsedData
});

// Part 1
// get pair of coordinates
// only consider horizontal and vertical lines

// filter lines so you only get horizontal or vertical lines
const filteredLines = data1.filter(line => {
    if((line[0][0] === line[1][0]) || (line[0][1] === line[1][1])) {
        return true
    }
});

// fill in the lines from starting and ending points
const filledLines = []
filteredLines.forEach(line => {

    // Create Points for easier code
    let begX = line[0][0]
    let endX = line[1][0]

    let begY = line[0][1]
    let endY = line[1][1]

    // create return line to replace line
    let returnLine = []

    if(begX === endX) {
        // Vertical Line
        let yDiff = Math.abs(begY - endY);

        if(begY < endY) {
            returnLine.push([begX, begY])
            for (let y = 1; y < yDiff; y++) {
                returnLine.push([begX, (begY + y)])
            }
            returnLine.push([begX, endY])
        } else {
            returnLine.push([begX, endY])
            for (let y = 1; y < yDiff; y++) {
                returnLine.push([begX, (endY + y)])
            }
            returnLine.push([begX, begY])
        }

    } else if (begY === endY) {
        // Horizontal Line
        let xDiff = Math.abs(begX - endX);

        if(begX < endX) {
            returnLine.push([begX, begY])
            for (let x = 1; x < xDiff; x++) {
                returnLine.push([(begX + x), begY])
            }
            returnLine.push([endX, begY])
        } else {
            returnLine.push([endX, begY])
            for (let x = 1; x < xDiff; x++) {
                returnLine.push([(endX + x), begY])
            }
            returnLine.push([begX, begY])
        }

    } else {
        console.error(line)
        throw 'this line should have been filtered'
    }

    filledLines.push(returnLine)
})

// use lines to create a map
let pointCount = new Map();
filledLines.forEach(line => {

    line.forEach(point => {
        if(!pointCount.has(`p${point}`)) {
            pointCount.set(`p${point}`, 1) 
        } else {
            let curPointVal = pointCount.get(`p${point}`) 
            let newPointVal = curPointVal + 1

            pointCount.set(`p${point}`, newPointVal)
        }
    })
    
})

let overlapPointCount = 0
pointCount.forEach((value, key) => {
    if(value > 1) {
        overlapPointCount++
    }
  })
// Get the number of lines that overlap (point vale over 1)
console.log(`Part 1: ${overlapPointCount}`)

// Part 2

// fill in the lines from starting and ending points
const filledLinesWithDiagonals = []
data1.forEach(line => {

    // Create Points for easier code
    let begX = line[0][0]
    let endX = line[1][0]

    let begY = line[0][1]
    let endY = line[1][1]

    // create return line to replace line
    let returnLine = []

    if(begX === endX) {
        // Vertical Line
        let yDiff = Math.abs(begY - endY);

        if(begY < endY) {
            returnLine.push([begX, begY])
            for (let y = 1; y < yDiff; y++) {
                returnLine.push([begX, (begY + y)])
            }
            returnLine.push([begX, endY])
        } else {
            returnLine.push([begX, endY])
            for (let y = 1; y < yDiff; y++) {
                returnLine.push([begX, (endY + y)])
            }
            returnLine.push([begX, begY])
        }

    } else if (begY === endY) {
        // Horizontal Line
        let xDiff = Math.abs(begX - endX);

        if(begX < endX) {
            returnLine.push([begX, begY])
            for (let x = 1; x < xDiff; x++) {
                returnLine.push([(begX + x), begY])
            }
            returnLine.push([endX, begY])
        } else {
            returnLine.push([endX, begY])
            for (let x = 1; x < xDiff; x++) {
                returnLine.push([(endX + x), begY])
            }
            returnLine.push([begX, begY])
        }

    } else {
        // Diagonal lines
        // Since the lines are perfectly 45 degress
        //   we know that the lines will increase the
        //   the same steps. 
        let xDiff = begX - endX
        let yDiff = begY - endY

        let xArr = []
        let yArr = []


        if(xDiff < 0) {
            xArr.push(begX)
            for (let x = 1; x < Math.abs(xDiff); x++) {
                xArr.push(begX + x)
            }
            xArr.push(endX)
        } else if (xDiff > 0) {
            xArr.push(begX)
            for (let x = 1; x < xDiff; x++) {
                xArr.push(begX - x)
            }
            xArr.push(endX)
        } else {
            throw 'x does not change but it is a diagonal. Strange'
        }

        if(yDiff < 0) {
            yArr.push(begY)
            for (let y = 1; y < Math.abs(yDiff); y++) {
                yArr.push(begY + y)
            }
            yArr.push(endY)
        } else if (yDiff > 0) {
            yArr.push(begY)
            for (let y = 1; y < yDiff; y++) {
                yArr.push(begY - y)
            }
            yArr.push(endY)
        } else {
            throw 'y does not change but it is a diagonal. Strange'
        }

        for (let i = 0; i < xArr.length; i++) {
            returnLine.push([xArr[i], yArr[i]])
            
        }

    }
    filledLinesWithDiagonals.push(returnLine)
})

// use lines to create a map
let pointCountWithDiagonals = new Map();
filledLinesWithDiagonals.forEach(line => {

    line.forEach(point => {
        if(!pointCountWithDiagonals.has(`p${point}`)) {
            pointCountWithDiagonals.set(`p${point}`, 1) 
        } else {
            let curPointVal = pointCountWithDiagonals.get(`p${point}`) 
            let newPointVal = curPointVal + 1

            pointCountWithDiagonals.set(`p${point}`, newPointVal)
        }
    })
    
})

let overlapPointCountWithDiagonals = 0
pointCountWithDiagonals.forEach((value, key) => {
    if(value > 1) {
        overlapPointCountWithDiagonals++
    }
  })
// Get the number of lines that overlap (point vale over 1) include diagonals
console.log(`Part 2: ${overlapPointCountWithDiagonals}`)