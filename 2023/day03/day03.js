const fs = require("fs");

const getNumbers = (l) => {
    let n = []
    l.replace(/[^\d]/g, '.').split('.').forEach((ls) => {
        const int = Number.parseInt(ls.replace(/[^\d]/g, ''), 10)
        if (int) n.push(int)
    })
    return n
}

const getProximityChars = (lines) => {
    const numbers = getNumbers(lines[1])
    pc = []
    let line = lines[1]
    numbers.forEach((n) => {
       let numIndex = line.indexOf(n.toString()) - 1
       let numLength = n.toString().length
       if (numIndex < 0) {
           numIndex = 0
           pc.push([
             n,
             lines[0].substr(numIndex, numLength + 1) +
             line.substr(numIndex + numLength, 1) +
             lines[2].substr(numIndex, numLength + 1)
           ])
       } else {
         pc.push([
           n,
           lines[0].substr(numIndex, numLength + 2) +
           line.substr(numIndex, 1) +
           line.substr(numIndex + numLength + 1, 1) +
           lines[2].substr(numIndex, numLength + 2)
         ])
       }
       for (let i=0; i<n.toString().length; i++) {
           line = line.replace(n.toString()[i], '.')
       }
    })
    return pc
}

const isPartNumber = (t) => t.replace(/\./g, '').length

const getGearsInTheLine = (l) => {
    let inlineGears = []
    l.replace(/[^\d\*]/g, '.').split('.').forEach((ls) => {
        if (/^(\d+\*\d+)$/.test(ls)) inlineGears.push(ls)
    })
    return inlineGears
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    let sum1 = 0
    let sum2 = 0
    let lines = []
    pi.forEach((line) => {
        lines.push(line)
    })
    for (let i=0; i<lines.length - 1; i++) {
        const proximityChars = getProximityChars([lines[i], lines[i+1], lines[i+2]])
        proximityChars.forEach((pc) => {
            if (isPartNumber(pc[1]) > 0) {
                sum1 += pc[0]
            }
        })
        const lineGears = getGearsInTheLine(lines[i])
        lineGears.forEach((gear) => sum2 += eval(gear))
        if (lineGears.length) console.log(lineGears)
    }
    console.log("Answer #1 : " + sum1)
    console.log("Answer #2 : " + sum2)
});
