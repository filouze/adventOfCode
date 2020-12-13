const fs = require("fs");

const part1 = (t,b) => {
    let reste = t;
    let bus = 0;
    for (let i=0;i<b.length;++i) {
        if (b[i] !== 'x' && b[i] - t%b[i] < reste) {
            reste = b[i] - t%b[i];
            bus = b[i];
        }
    }
    return bus*reste;
}

const part2 = (b) => {
    let t = parseInt(b.shift(), 10);
    let delta = t;
    t = 100000000000000 - 100000000000000%23
    console.log(delta)
    while(true) {
        if (b.reduce((a, c, i) => c !== 'x' ? a + ((t + i + 1) % c) : a, 0) === 0) return t;
        t = t + delta;
    }
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let puzzle = contents.split("\n");
    const t = puzzle.shift();
    let b = puzzle.shift().split(',');
g    console.log('#part1 = '+part1(t,b));
    console.log('#part2 = '+part2(b));
});