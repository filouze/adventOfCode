const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
    let pi = contents.split('\n')
    console.log(pi);
});