const fs = require("fs");

const getKey = (line) => {
        const splitedLine = line.split('')
        const integers = splitedLine.filter((c) => Number.isInteger(parseInt(c,10)) === true)
        if (integers.length === 1) return parseInt(integers + integers, 10)
        return parseInt(integers.shift() + integers.pop(), 10)
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    pi.pop()
    let sum = 0
    pi.forEach((line) => {
        //console.log(sum)
        sum += getKey(line)
    })
    console.log("Answer : " + sum);
});
