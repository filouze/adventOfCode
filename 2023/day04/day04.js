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

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    pi.pop()
    let sum1 = 0
    let sum2 = 0
    pi.forEach((l) => {
        const cardId = getCardId(l)
        const winningNums = getWinningNums(l)
        const cardNums = getCardNums(l)
        const cardValue = getCardValue(cardNums, winningNums)
        sum1 += cardValue
        //console.log(l)
        //console.log("#" + cardId, winningNums, cardNums, cardValue)
    })
    console.log("Answer #1 : " + sum1)
    console.log("Answer #2 : " + sum2)
});
