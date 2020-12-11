const fs = require("fs");
const isE = s => s === 'L';
const isO = s => s === '#';
const getAdjacentSeats = (x,y,puzzle) => {
    let a = [];
    const yL = puzzle.length - 1;
    const xL = puzzle[0].length - 1;
    a.push(x>0 ? puzzle[y][x-1]:'.');
    a.push(x>0 && y>0 ? puzzle[y-1][x-1]:'.');
    a.push(y>0 ? puzzle[y-1][x]:'.');
    a.push(x<xL && y>0 ? puzzle[y-1][x+1]:'.');
    a.push(x<xL ? puzzle[y][x+1]:'.');
    a.push(x<xL && y<yL ?puzzle[y+1][x+1]:'.');
    a.push(y<yL ? puzzle[y+1][x]:'.');
    a.push(x>0 && y<yL ? puzzle[y+1][x-1]:'.');
    return a;
}

const countOccupiedByLine = (a, c) => isO(c) ? a + 1 : a;

const countOccupiedSeats = (p) => {
    const yL = p.length;
    let count = 0;
    for (let y = 0; y < yL; ++y) {
        console.log(p[y], p[y].split('').reduce(countOccupiedByLine, 0))
        count = count + p[y].split('').reduce(countOccupiedByLine, 0)
    }
    return count;
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let puzzle = contents.split("\n");
    const yL = puzzle.length;
    const xL = puzzle[0].length;
    let updates = 1;
    let newPuzzle=[];

    while(updates > 0) {
        updates = 0;
        newPuzzle = [];
        for (let y = 0; y < yL; ++y) {
            let newLine = puzzle[y].split('');
            for (let x = 0; x < xL; ++x) {
                let adj = getAdjacentSeats(x, y, puzzle);
                const seat = puzzle[y][x];
                if (isE(seat) && adj.join('').indexOf('#') === -1) {
                    newLine[x] = '#';
                    ++updates;
                } else if (isO(seat) && adj.reduce(countOccupiedByLine, 0) > 3) {
                    newLine[x] = 'L';
                    ++updates;
                }
            }
            newPuzzle.push(newLine.join(''));
        }
        for (let y = 0; y < yL; ++y) {
            puzzle[y] = newPuzzle[y];
        }
    }
    console.log('#part1 = '+countOccupiedSeats(puzzle));
    // console.log('#part2 = '+part2);
});
