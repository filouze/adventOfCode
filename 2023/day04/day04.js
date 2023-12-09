const fs = require("fs");

const getCardId = (l) => l.split(':')[0].split(' ')[1]

const getWinningNums = (l) => l.split(':')[1].split('|')[0].trim().split(' ').filter((z) => z.length > 0)

const getCardNums = (l) => l.split(':')[1].split('|')[1].trim().split(' ').filter((z) => z.length > 0)

const getCardValue = (nums, wins) => {
    let winnings = []
    nums.forEach((n) => {
        if (wins.indexOf(n) !== -1) winnings.push('0')
    })
    if (winnings.length) {
        winnings.shift()
        winnings.unshift('1')
        return Number.parseInt(winnings.join(''), 2)
    }
    return 0
}

const getWonCopy = (nums, wins) => {
    let winnings = []
    nums.forEach((n) => {
        if (wins.indexOf(n) !== -1) winnings.push('0')
    })
    return winnings.length
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    pi.pop()
    let sum1 = 0
    let sum2 = 0
    let instances = []
    let wonCopies = []
    pi.forEach((l) => {
        const cardId = getCardId(l)
        const winningNums = getWinningNums(l)
        const cardNums = getCardNums(l)
        const cardValue = getCardValue(cardNums, winningNums)
        sum1 += cardValue
        const wonCopy = getWonCopy(cardNums, winningNums)
        wonCopies.push(wonCopy)
        instances.push(1)
    })
    wonCopies.forEach((wc,i) => {
        if (wc) {
            for (let j = i + 1; j< i + 1 + wc; j++) {
                instances[j] = instances[j] + instances[i]
            }
        }
    })
    console.log("Answer #1 : " + sum1)
    console.log("Answer #2 : " + instances.reduce((a,c) => c + a, 0))
});
