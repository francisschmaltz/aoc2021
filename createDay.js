const fs = require('fs');
const path = require('path');
const readline = require("readline");

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 * 
 * https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js#answer-22185855
 * 
 */
const copyRecursiveSync = function(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

// Create an instance of readline interface.
const readlineInterface = readline.createInterface({
    // Assign process.stdin as input.
    input: process.stdin,
    // Assign process.stdout as output. 
    output: process.stdout
});

// Ask for day number
readlineInterface.question("What day number is it? ", function(dayNumber) {

    if((typeof parseInt(dayNumber) !== typeof 1) || (isNaN(parseInt(dayNumber)))){
        throw 'Parameter is not a number!';
    }

    // Try to copy tempalte
    console.log(`Setting up day${dayNumber}`);
    copyRecursiveSync('_templ', `day${dayNumber}`)

    // Close readline interface.
    readlineInterface.close();
});
// When the readline prompt is closed, it will trigger this function.
readlineInterface.on("close", function() {
    console.log("\nDay created");
    // Exit the process.
    process.exit(0);
});
