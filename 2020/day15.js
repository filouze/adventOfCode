const fs = require("fs");
fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let p = contents.split(',');
    console.log('#part1 = ',p);
    console.log('#part2 = ');
});