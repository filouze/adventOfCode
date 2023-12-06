const fs = require("fs");
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const regsExp = [/one/g, /two/g, /three/g, /four/g, /five/g, /six/g, /seven/g, /eight/g, /nine/g]

const getKey = (line) => {
        let firstDigit, firstNumber = line.length
        let lastDigit, lastNumber = 0
        let f = line.length
        let l = 0
        numbers.forEach((n, i) => {
            const first = line.indexOf(n)
            if (first != -1 && first < f) {
                f = first
                firstDigit = i
            }
            const last = line.lastIndexOf(n)
            if (last != -1 && last > l) {
                l = last
                lastDigit = i
            }
        })
        fn = line.length
        ln = 0
        const num = ['1','2','3','4','5','6','7','8','9']
        num.forEach((n, i) => {
            const first = line.indexOf(n)
            if (first != -1 && first < fn) {
                fn = first
                firstNumber = i
            }
            const last = line.lastIndexOf(n)
            if (last != -1 && last > ln) {
                ln = last
                lastNumber = i
            }
        })
        if (fn > f) line = line.replace(numbers[firstDigit],firstDigit+1)
        if (ln < l) line = line.replace(regsExp[lastDigit],lastDigit+1)
        const splitedLine = line.split('')
        const integers = splitedLine.filter((c) =>  Number.isInteger(parseInt(c,10)) === true)
        if (integers.length === 1) return parseInt(integers + integers, 10)
        return  parseInt(integers.shift() + integers.pop(), 10)
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    pi.pop()
    let sum = 0
    pi.forEach((line, i) => {
        const key = getKey(line)
        sum += key
    })
    console.log("Answer : " + sum);
});
