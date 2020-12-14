const fs = require("fs");

const dec2bin = (dec) => (dec >>> 0).toString(2)
const get36bit = (dec) => {
    let bin = dec2bin(dec).split('');
    while(bin.length !== 36) {
        bin.unshift('0');
    }
    return bin.join('');
}

const applyMask = (m,b) => {
    let mask = m.split('');
    let bina = b.split('');
    let resu = [];
    for (let a=0;a<mask.length;++a){
        resu.push(mask[a] !== 'X'?mask[a]:bina[a]);
    }
    return resu.join('')
}

const sumMem = (m) => {
    // for (let a=0;a<m.length;++a){
    //     console.log(m[a])
    // }
    return m.reduce((a,c) => typeof c !== undefined ? a + c : a,0)
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let puzzle = contents.split("\n");
    let mask = '';
    let decimalValue = 0;
    let memAddress = 0;
    let mem = [];
    for (let i = 0; i<puzzle.length; ++i) {
        let splitLine = puzzle[i].split('=')
        if (splitLine[0].indexOf('mask') !== -1) {
            mask = splitLine[1].trim();
        }else{
            decimalValue = splitLine[1].trim();
            memAddress = splitLine[0].split(']')[0].split('mem[')[1];
            console.log(mask,memAddress,decimalValue,get36bit(decimalValue))
            mem[memAddress] = parseInt(applyMask(mask, get36bit(decimalValue)),2)
            console.log(mem[memAddress]);
        }

    }
    console.log('#part1 = '+sumMem(mem));
    console.log('#part2 = ');
});