const fs = require("fs");
const getManhattanDistance = (n,e) => Math.abs(n) + Math.abs(e);

const part1 = (puzzle) => {
    let facing = 90;
    let N = 0;
    let E = 0;
    for (let a = 0; a < puzzle.length; ++a) {
        const action = puzzle[a][0];
        const value =  parseInt(puzzle[a].substr(1),10);
        if (action === 'F') {
            if(facing === 0)   N = N + value;
            if(facing === 90)  E = E + value;
            if(facing === 180) N = N - value;
            if(facing === 270) E = E - value;
            if(facing === -90)  E = E - value;
            if(facing === -180) N = N - value;
            if(facing === -270) E = E + value;
        }
        if (action === 'N') N = N + value;
        if (action === 'E') E = E + value;
        if (action === 'S') N = N - value;
        if (action === 'W') E = E - value;
        if (action === 'L') facing = (facing - value)%360;
        if (action === 'R') facing = (facing + value)%360;
    }
    return getManhattanDistance(N,E);
}

const part2 = (puzzle) => {
    let N = 0;
    let E = 0;
    let wN = 1;
    let wE = 10;
    for (let a = 0; a < puzzle.length; ++a) {
        const action = puzzle[a][0];
        const value =  parseInt(puzzle[a].substr(1),10);
        if (action === 'F') {
            N = N + value * wN;
            E = E + value * wE;
        }
        if (action === 'N') wN = wN + value;
        if (action === 'E') wE = wE + value;
        if (action === 'S') wN = wN - value;
        if (action === 'W') wE = wE - value;

        let tmpWN = wN;
        let tmpWE = wE;

        if (action === 'R') {
            if(value === 90 || value === -270)  {
                wE = tmpWN;
                wN = -1*tmpWE;
            }
            if(value === 180 || value === -180)  {
                wE = -1*tmpWE;
                wN = -1*tmpWN;
            }
            if(value === 270 || value === -90)  {
                wE = -1*tmpWN;
                wN = tmpWE;
            }
        }
        if (action === 'L') {
            if(value === 90 || value === -270)  {
                wE = -1*tmpWN;
                wN = tmpWE;
            }
            if(value === 180 || value === -180)  {
                wE = -1*tmpWE;
                wN = -1*tmpWN;
            }
            if(value === 270 || value === -90)  {
                wE = tmpWN;
                wN = -1*tmpWE;
            }
        }
    }
    return getManhattanDistance(N,E);
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let puzzle = contents.split("\n");

    console.log('#part1 = '+part1(puzzle));
    console.log('#part2 = '+part2(puzzle));
});