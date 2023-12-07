const fs = require("fs");
const rgb = [12, 13, 14];

const getGameId = (l) => Number.parseInt(l.split(':')[0].split(' ')[1], 10)
const getMax = (l) => {
    const sets = l.split(':')[1].split(';')
    let r = 0
    let g = 0
    let b = 0
    sets.forEach((set) => {
        const colors = set.split(',')
        colors.forEach((color) => {
            const cs = color.split(' ')
            const c = Number.parseInt(cs[1], 10)
            const cLib = cs[2]
            if (cLib === 'red' && c > r) r = c
            if (cLib === 'green' && c > g) g = c
            if (cLib === 'blue' && c > b) b = c
        })
    })
    return [r, g, b]
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    pi.pop()
    let sum1 = 0
    let sum2 = 0
    pi.forEach((line) => {
        const gameId = getGameId(line)
        const max = getMax(line)
        //console.log(line, '#'+gameId, max)
        if (max[0] <= rgb[0] && max[1] <= rgb[1] && max[2] <= rgb[2]) {
            sum1 += gameId
        }
        sum2 += max.reduce((a,c) => c * a, 1)
    })
    console.log("Answer #1 : " + sum1)
    console.log("Answer #2 : " + sum2)
});
