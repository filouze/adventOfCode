const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    let sum1 = 0
    let sum2 = 0
    const times = pi.shift().split(':')[1].split(' ').filter((z) => z.length > 0)
    const records = pi.shift().split(':')[1].split(' ').filter((z) => z.length > 0)

    console.log(times, records)

    let bestRaceTime = []
    times.forEach((time, t) => {
        const race = Number.parseInt(time, 10)
        const record = Number.parseInt(records[t], 10)
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
    console.log("Answer : " + bestRaceTime.reduce((a,c) => a * c, 1))
});
