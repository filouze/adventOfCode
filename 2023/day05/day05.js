const fs = require("fs");

const maps = ["seed","soil","fertilizer","water","light","temperature","humidity","location"]

const getSeeds = (l) => l.split(':')[1].split(' ').filter((z) => z.length > 0)

const getMapWording = (i) => maps[i] + "-to-" + maps[i+1] + " map:"

const getTextMap = (label, pi) => {
    let textMap = []
    let isTheOne = false
    pi.forEach((line, i) => {
        if (line === "") isTheOne = false
        if (isTheOne) textMap.push(line)
        if (line === label) isTheOne = true
    })
    return textMap
}

const getMap = (txt) => {
    const map = new Map()
    txt.forEach((line) => {
        const lineSplit = line.split(' ')
        const rangeDes = Number.parseInt(lineSplit[0], 10)
        const rangeSrc = Number.parseInt(lineSplit[1], 10)
        const rangeLength = Number.parseInt(lineSplit[2], 10)
        for (let i = 0; i < rangeLength; i++) {
            map.set((rangeSrc + i).toString(), (rangeDes + i).toString())
        }
    })
    return map
}

const getNewPath = (inputs, maps) => {
    const newPath = []
    inputs.forEach((input) => {
        const i = Number.parseInt(input, 10)
        let path = input
        maps.forEach((map) => {
            const lineSplit = map.split(' ')
            const rangeDes = Number.parseInt(lineSplit[0], 10)
            const rangeSrc = Number.parseInt(lineSplit[1], 10)
            const rangeLength = Number.parseInt(lineSplit[2], 10)
            if (i === rangeSrc) path = rangeDes.toString()
            if (i > rangeSrc && i < rangeSrc + rangeLength) {
                path = (i - rangeSrc + rangeDes).toString()
            }
        })
        newPath.push(path)
    })
    return newPath
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    let sum1 = 0
    let sum2 = 0
    const seeds = getSeeds(pi.shift());
    pi.shift()
    pi.forEach((l) => {
        //console.log(l)
    })
    let path = []
    path.push(seeds)
    //console.log(seeds)
    for (let i = 0; i < maps.length - 1; i++) {
        const mapWording = getMapWording(i)
        const textMap = getTextMap(mapWording, pi)
        // const map = getMap(textMap)
        const newPath = getNewPath(path[i], textMap)
        path.push(newPath)
        //console.log(mapWording, textMap, newPath)
    }
    //console.log(seeds, path)
    console.log("Answer #1 : " + Math.min(...path.pop()))
    console.log("Answer #2 : " + sum2)
});
