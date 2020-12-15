const fs = require("fs");

const part = (n, p) => {
    let last = 0;
    let next = p.pop();
    let t = p.length;
    const end = n - 1;
    let lastIndexes = [];
    for (let l = 0;l<t;++l) {
        lastIndexes[p[l]] = l;
    }
    while(t < end) {
        last = next;
        if (typeof lastIndexes[last] === 'undefined') {
            next = 0;
        }else{
            next = t - lastIndexes[last];
        }
        p.push(last);
        if (t%100000 === 0){
            console.log(t);
        }
        lastIndexes[last] = t;
        ++t
    }
    return next
}

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let p = contents.split(',').map(x=>parseInt(x,10));
    console.log('#part1 = ',part(2020,p));
    console.log('#part2 = ',part(30000000,p));
});