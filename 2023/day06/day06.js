const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    let sum1 = 0
    let sum2 = 0
    const part1Times = pi[0].split(':')[1].split(' ').filter((z) => z.length > 0)
    const part2Times = part1Times.join('')
    const part1Records = pi[1].split(':')[1].split(' ').filter((z) => z.length > 0)
    const part2Records = part1Records.join('')

    console.log(part1Times, part1Records)
    console.log(part2Times, part2Records)

    let bestRaceTime = []
    part1Times.forEach((time, t) => {
        const race = Number.parseInt(time, 10)
        const record = Number.parseInt(part1Records[t], 10)
        let numberOfBestRaceTime = 0
        for (let i=1; i < time; i++) {
            const holdTime = i
            const travelTime = race - i
            const speed = i
            const distance = speed * travelTime
            if (distance > record) numberOfBestRaceTime++
        }
        console.log(race, record, numberOfBestRaceTime)
        bestRaceTime.push(numberOfBestRaceTime)
    })
    console.log("Answer #1: " + bestRaceTime.reduce((a,c) => a * c, 1))

    const race = Number.parseInt(part2Times, 10)
    const record = Number.parseInt(part2Records, 10)
    let numberOfBestRaceTime = 0
    for (let i=1; i < race; i++) {
        const holdTime = i
        const travelTime = race - i
        const speed = i
        const distance = speed * travelTime
        if (distance > record) numberOfBestRaceTime++
    }
    console.log(race, record, numberOfBestRaceTime)
    console.log("Answer #2: " + numberOfBestRaceTime)
});
