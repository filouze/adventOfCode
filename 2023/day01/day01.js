const fs = require("fs");
const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

const getKey = (line) => {
        let firstDigit = "one"
        let lastDigit = "one"
        let f = line.length
        let l = 0
        numbers.forEach((n, i) => {
            const first = line.indexOf(n)
            const last = line.lastIndexOf(n)
            if (first != -1 && first < f) {
                f = first
                firstDigit = i
            }
            if (last != -1 && last > l) {
                l = last
                lastDigit = i
            }
        })
        if (f<l) line = line.replace(numbers[firstDigit],firstDigit)
        if (l>f) line = line.replace(numbers[lastDigit],lastDigit)
        console.log(" |-> ",numbers[firstDigit], numbers[lastDigit], line)
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
        const key = getKey(line)
        console.log(line, key)
        sum += key
    })
    console.log("Answer : " + sum);
});
