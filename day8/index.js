let utils = require('./../customUtils.js');

// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    return rawData.split('\n').map(line => line.split(' | ').map(n => n.split(' ')));
    // return rawData.split(',')
});

// Part 1

let numberOfTime1478AppearInOutput = 0
data1.forEach(line => {

    line[1].forEach(lineItem => {
        if (
            (lineItem.length === 2) ||
            (lineItem.length === 4) ||
            (lineItem.length === 3) ||
            (lineItem.length === 7)
        ) {
            numberOfTime1478AppearInOutput++
        }
    });

});

console.log(`Part 1: ${numberOfTime1478AppearInOutput}`)

// Part 2

// Make intersection 
String.prototype.intersect = function (compareStr) {
    let strArr = this.split('');
    let comapreArr = compareStr.split('')

    let interestedArr = strArr.filter(value => comapreArr.includes(value));

    return interestedArr.join('')
}

String.prototype.equals = function (compareStr) {
    let str = this
    if(str === compareStr) {
        return compareStr
    } else {
        return false
    }
}

let largeOutputTotal = 0
data1.forEach(line => {

    const patterns = line[0]


    // Cheated for paternbs :(
    let pattern1 = patterns.find((p) => p.length === 2);
    let pattern7 = patterns.find((p) => p.length === 3);
    let pattern8 = patterns.find((p) => p.length === 7);
    let pattern4 = patterns.find((p) => p.length === 4);
    let pattern9 = patterns.find((p) => p.length === 6 && p.intersect(pattern4).length === 4);
    let pattern0 = patterns.find((p) => p.length === 6 && p.intersect(pattern7).length === 3 && p != pattern9);
    let pattern6 = patterns.find((p) => p.length === 6 && p !== pattern9 && p != pattern0);
    let pattern5 = patterns.find((p) => p.length === 5 && p.intersect(pattern6).length === 5);
    let pattern3 = patterns.find((p) => p.length === 5 && p.intersect(pattern4).length === 3 && p != pattern5);
    let pattern2 = patterns.find((p) => p.length === 5 && p !== pattern5 && p !== pattern3);

    let display = [
        pattern0,
        pattern1,
        pattern2,
        pattern3,
        pattern4,
        pattern5,
        pattern6,
        pattern7,
        pattern8,
        pattern9
    ]

    // Sortdisplay characters


    let lineOutputValue = 0

    line[1].forEach(displayDig => {
        display.forEach((pattern, index) => {

            // Check if string sorted by alpha is equal to patern sorted by alpha
            if(displayDig.split('').sort().join('') === pattern.split('').sort().join('')) {
                lineOutputValue = (lineOutputValue * 10) + index
            }
        });
    });
    largeOutputTotal+= lineOutputValue

});
console.log(`Part 2: ${largeOutputTotal}`)