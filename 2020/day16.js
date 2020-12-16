const fs = require("fs");

const getValidValues = (ranges) => {
    let validValues = []
    for (let l=0;l<ranges.length; ++l) {
        const rangesValues = ranges[l].split(':')[1].split('or')
        for (let v=0;v<rangesValues.length; ++v) {
            const start = parseInt(rangesValues[v].trim().split('-')[0],10)
            const stop = parseInt(rangesValues[v].trim().split('-')[1],10)
            for (let x=start;x<=stop; ++x) {
                validValues.push(x);
            }
        }
    }
    return validValues;
}

const getInvalidValues = (validValues, nearbyTickets) => {
    let invalidValues = []
    for (let l=0;l<nearbyTickets.length; ++l) {
        const ticketValues = nearbyTickets[l].split(',')
        for (let v=0;v<ticketValues.length; ++v) {
            const tv = parseInt(ticketValues[v],10)
            if (validValues.indexOf(tv) === -1) {
                invalidValues.push(tv);
            }
        }
    }
    return invalidValues;
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n\n')
    let ranges = pi.shift().split('\n');
    let myTicket = pi.shift();
    let nearbyTickets = pi.shift().split('\n');
    nearbyTickets.shift()


    const validValues = getValidValues(ranges);
    console.log(validValues);
    const invalidValues = getInvalidValues(validValues, nearbyTickets);
    console.log(invalidValues);


    console.log('#part1 = ',invalidValues.reduce((a,c)=>a+c));
    console.log('#part2 = ');
});