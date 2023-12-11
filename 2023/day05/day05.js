const fs = require("fs");

const maps = ["seed","soil","fertilizer","water","light","temperature","humidity","location"]

//const getSeeds = (l) => l.split(':')[1].split(' ').filter((z) => z.length > 0)

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

const getSeedLocation = (input, maps) => {
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
    return Number.parseInt(path,10)
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    let sum1 = 0
    let sum2 = 0
    const seedsTxt = pi.shift();
    const seeds = seedsTxt.split(':')[1].split(' ').filter((z) => z.length > 0)
    pi.shift()
    minLocation = ""
    let seedLocation = 0
    //seeds.forEach((seed) => {
    for (let i = 0; i < seeds.length; i = i + 2) {
        const seedStart = Number.parseInt(seeds[i])
        const seedRange = Number.parseInt(seeds[i+1])
        for (let j = seedStart; j < seedStart + seedRange; j++) {
            console.log(seedStart, seedRange, j)
            let src = j
            for (let m = 0; m < maps.length - 1; m++) {
                const mapWording = getMapWording(m)
                const textMap = getTextMap(mapWording, pi)
                seedLocation = getSeedLocation(src, textMap)
                src = seedLocation
            }
            if (minLocation === "")                 minLocation = Number.parseInt(seedLocation)
            else if (seedLocation < minLocation)    minLocation = Number.parseInt(seedLocation)
            //console.log(seedStart, src, minLocation)
        }
    }
    console.log("Answer : " + minLocation)
});
