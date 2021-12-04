let utils = require('./../customUtils.js');


// Define class for bingoBoard

class BingoBoard {
    constructor(boardArray){
        this.board = {}
        this.boardValuesArr = []
        this.boardMatchesCount = 0
        this.hasBingo = false

        boardArray.split('\n').forEach((bingoBoardRow, index) => {
            // Construct array matrix of points and values
            // A1 A2 A3 A4 A5
            // B1 B2 B3 B4 B5
            // C1 C2 C3 C4 C5
            // D1 D2 D3 D4 D5
            // E1 E2 E3 E4 E5
            // points have a value and a selection

            let bingoBoardRowArr = bingoBoardRow.trim().split(/[ ,]+/)

            switch (index) {
                case  0: 
                    this.boardValuesArr.push(bingoBoardRowArr)
                    this.board.a1 = {value: parseInt(bingoBoardRowArr[0]), called: false}
                    this.board.a2 = {value: parseInt(bingoBoardRowArr[1]), called: false}
                    this.board.a3 = {value: parseInt(bingoBoardRowArr[2]), called: false}
                    this.board.a4 = {value: parseInt(bingoBoardRowArr[3]), called: false}
                    this.board.a5 = {value: parseInt(bingoBoardRowArr[4]), called: false}
                    break;

                case  1: 
                    this.boardValuesArr.push(bingoBoardRowArr)
                    this.board.b1 = {value: parseInt(bingoBoardRowArr[0]), called: false}
                    this.board.b2 = {value: parseInt(bingoBoardRowArr[1]), called: false}
                    this.board.b3 = {value: parseInt(bingoBoardRowArr[2]), called: false}
                    this.board.b4 = {value: parseInt(bingoBoardRowArr[3]), called: false}
                    this.board.b5 = {value: parseInt(bingoBoardRowArr[4]), called: false}
                    break;

                case  2: 
                    this.boardValuesArr.push(bingoBoardRowArr)
                    this.board.c1 = {value: parseInt(bingoBoardRowArr[0]), called: false}
                    this.board.c2 = {value: parseInt(bingoBoardRowArr[1]), called: false}
                    this.board.c3 = {value: parseInt(bingoBoardRowArr[2]), called: false}
                    this.board.c4 = {value: parseInt(bingoBoardRowArr[3]), called: false}
                    this.board.c5 = {value: parseInt(bingoBoardRowArr[4]), called: false}
                    break;

                case  3: 
                    this.boardValuesArr.push(bingoBoardRowArr)
                    this.board.d1 = {value: parseInt(bingoBoardRowArr[0]), called: false}
                    this.board.d2 = {value: parseInt(bingoBoardRowArr[1]), called: false}
                    this.board.d3 = {value: parseInt(bingoBoardRowArr[2]), called: false}
                    this.board.d4 = {value: parseInt(bingoBoardRowArr[3]), called: false}
                    this.board.d5 = {value: parseInt(bingoBoardRowArr[4]), called: false}
                    break;

                case  4: 
                    this.boardValuesArr.push(bingoBoardRowArr)
                    this.board.e1 = {value: parseInt(bingoBoardRowArr[0]), called: false}
                    this.board.e2 = {value: parseInt(bingoBoardRowArr[1]), called: false}
                    this.board.e3 = {value: parseInt(bingoBoardRowArr[2]), called: false}
                    this.board.e4 = {value: parseInt(bingoBoardRowArr[3]), called: false}
                    this.board.e5 = {value: parseInt(bingoBoardRowArr[4]), called: false}
                    break;
                
                
                default: throw 'new boardArray cannot have over 5 rows'
             }   
        });

        this.calledPlaces = []

        // create a list of possible bingo orders
        this.bingoPossibilities = [
            // Horizontal
            ['a1', 'a2', 'a3', 'a4', 'a5'],
            ['b1', 'b2', 'b3', 'b4', 'b5'],
            ['c1', 'c2', 'c3', 'c4', 'c5'],
            ['d1', 'd2', 'd3', 'd4', 'd5'],
            ['e1', 'e2', 'e3', 'e4', 'e5'],

            // Vertical
            ['a1', 'b1', 'c1', 'd1', 'e1'],
            ['a2', 'b2', 'c2', 'd2', 'e2'],
            ['a3', 'b3', 'c3', 'd3', 'e3'],
            ['a4', 'b4', 'c4', 'd4', 'e4'],
            ['a5', 'b5', 'c5', 'd5', 'e5'],

            // // Diagonal
            // ['a1', 'b2', 'c3', 'd4', 'e5'],
            // ['a5', 'b4', 'c3', 'd2', 'e1'],
        ]
    }

    checkForBingo(number) {

        // If there was already a bingo, skip
        // you do not play after
        if(this.hasBingo === true) {
            return false
        }

        // Take input number and check for space
        this.boardValuesArr.forEach((boardRow, index) => {

            // Check if row contains value
            let indexOfNumber = boardRow.indexOf(number)
            

            if (indexOfNumber > -1) {
                // Row has value so set as matched
                let indexToColumn = 'a'

                if( index === 0) {
                    indexToColumn = 'a'
                } else if (index === 1) {
                    indexToColumn = 'b'
                } else if (index === 2) {
                    indexToColumn = 'c'
                } else if (index === 3) {
                    indexToColumn = 'd'
                } else if (index === 4) {
                    indexToColumn = 'e'
                } else {
                    console.error(`index: ${index}`)
                    throw 'checkForBingo needs the index of rows to be 0-4'
                }

                // Mark the specific place as matched
                this.board[`${indexToColumn}${indexOfNumber+1}`].called = true

                // Increase count of total matches
                this.boardMatchesCount++
            } else {
                // no match
            }
        })


        // Only check if there are at least 5 matched numbers
        if(this.boardMatchesCount > 4) {

        } else {
            return false
        }

        // Check for matches
        // todo: @francis make this not suck
        if (
            // check horizontal
            (this.board.a1.called === true) &&
            (this.board.a2.called === true) &&
            (this.board.a3.called === true) &&
            (this.board.a4.called === true) &&
            (this.board.a5.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo A1-A5')
            return true
        } else if (
            // check horizontal
            (this.board.b1.called === true) &&
            (this.board.b2.called === true) &&
            (this.board.b3.called === true) &&
            (this.board.b4.called === true) &&
            (this.board.b5.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo B1-B5')
            return true
        } else if (
            // check horizontal
            (this.board.c1.called === true) &&
            (this.board.c2.called === true) &&
            (this.board.c3.called === true) &&
            (this.board.c4.called === true) &&
            (this.board.c5.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo C1-C5')
            return true
        } else if (
            // check horizontal
            (this.board.d1.called === true) &&
            (this.board.d2.called === true) &&
            (this.board.d3.called === true) &&
            (this.board.d4.called === true) &&
            (this.board.d5.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo D1-D5')
            return true
        } else if (
            // check horizontal
            (this.board.e1.called === true) &&
            (this.board.e2.called === true) &&
            (this.board.e3.called === true) &&
            (this.board.e4.called === true) &&
            (this.board.e5.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo E1-E5')
            return true
        } else if (
            // check vertical
            (this.board.a1.called === true) &&
            (this.board.b1.called === true) &&
            (this.board.c1.called === true) &&
            (this.board.d1.called === true) &&
            (this.board.e1.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo A1-E1')
            return true
        } else if (
            // check vertical
            (this.board.a2.called === true) &&
            (this.board.b2.called === true) &&
            (this.board.c2.called === true) &&
            (this.board.d2.called === true) &&
            (this.board.e2.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo A2-E2')
            return true
        } else if (
            // check vertical
            (this.board.a3.called === true) &&
            (this.board.b3.called === true) &&
            (this.board.c3.called === true) &&
            (this.board.d3.called === true) &&
            (this.board.e3.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo A3-E3')
            return true
        } else if (
            // check vertical
            (this.board.a4.called === true) &&
            (this.board.b4.called === true) &&
            (this.board.c4.called === true) &&
            (this.board.d4.called === true) &&
            (this.board.e4.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo A4-E4')
            return true
        } else if (
            // check vertical
            (this.board.a5.called === true) &&
            (this.board.b5.called === true) &&
            (this.board.c5.called === true) &&
            (this.board.d5.called === true) &&
            (this.board.e5.called === true)
        ) {
            this.hasBingo = true
            console.warn('Bingo A5-E5')
            return true
        } else {
            return false
        }
    }

    sumAllUncalled() {
        let sum = 0
        Object.values(this.board).forEach(boardSpace => {
            if(boardSpace.called === false) {
                sum+= parseInt(boardSpace.value)
            }
        });

        return sum;
    }

    getBoardStatus() {
        console.log(this.board)
        return this.board
    }

}



// Return data in fixed format
const data1 = utils.parseData(`${__dirname}/data1`, (rawData) => {
    
    // Create an object to return of numberds and boards
    let returnObj = {numbers: [], boards: []}

    // Split text by double line break
    let dataArray = rawData.split('\n\n');

    // set bingo number draws
    returnObj.numbers = dataArray[0].split(',')

    // Remove numbers to focus on boards
    dataArray.shift()


    // Parse every board into useable format
    dataArray.forEach(bingoBoardRaw => {

        newBoard = new BingoBoard(bingoBoardRaw)
        returnObj.boards.push(newBoard)

    });

    return returnObj

});



// Part 1

// Play pingo function
/**
 * Returns a board (array of arrays) that "won" the bingo game
 *
 * @param {array} drawNumbers is an array of numbers to "draw"
 * @param {array} boards array of boards. Boards are an array of 
 * rows containing numbers
 * @return {Object} {board: Board, number: int}
 */
 const playBingo = (drawNumbers, boards) => {
    let winDetails = {}

    // Run through the numbers to check boards
    let noMatchedBingo = true
    drawNumbers.forEach(num => {
        // Check each boards
        if (noMatchedBingo) {
            boards.forEach(board => {
                let boardCheck = board.checkForBingo(num)
                // console.log(boardCheck)
                // console.log(board)
                if(boardCheck){
                    console.log(`BINGO! On Number: ${num}`)
                    noMatchedBingo = false
                
                    winDetails.board = board
                    winDetails.number = num
                }
            });
        } else {
            // skip we got a bingo
        }

        
    });

    return winDetails

}
let drawNumbers = data1.numbers
let bingoBoards = data1.boards
let winningBingoBoard = playBingo(drawNumbers, bingoBoards)

console.log(`Part1:`)
console.log(winningBingoBoard.board.sumAllUncalled() * winningBingoBoard.number)


// Part 2

// Play pingo badly
/**
 * Returns a board (array of arrays) that "won" the bingo game
 * last. It's the last winable board
 *
 * @param {array} drawNumbers is an array of numbers to "draw"
 * @param {array} boards array of boards. Boards are an array of 
 * rows containing numbers
 * @return {Object} {board: Board, number: int}
 */
 const playBingoBadly = (drawNumbers, boards) => {
    let winDetails = {}

    drawNumbers.forEach(num => {
        // Check ALL boards
        boards.forEach(board => {
            let boardCheck = board.checkForBingo(num)
            // console.log(boardCheck)
            // console.log(board)
            if(boardCheck){
                console.log(`BINGO! On Number: ${num}`)
            
                winDetails.board = board
                winDetails.number = num
            }
        });

        
    });

    return winDetails

}

let lastWinningBingoBoard = playBingoBadly(drawNumbers, bingoBoards)

console.log(`Part2:`)
console.log(lastWinningBingoBoard.board.sumAllUncalled() * lastWinningBingoBoard.number)
