const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let p = contents.split(',').map(x=>parseInt(x,10));
    while(p.length < 2020) {
        const t = p.length - 1
        const last = p.pop();
        const lastIndex = p.lastIndexOf(last);
        if (p.lastIndexOf(last) === -1) {
            p.push(last,0);
        }else{
            p.push(last,t - lastIndex);
        }
    }
    console.log('#part1 = ',p.pop());
    console.log('#part2 = ');
});