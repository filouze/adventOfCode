const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const numbers = contents
    .split("\n")
    .map(x => parseInt(x, 10));

  const asc = (a,b) => a-b;
  const desc = (a,b) => b-a;

  const fact = (nbr) => {
    if (nbr === 0) {
      return 1;
    }
    return nbr * fact(nbr-1);
  }

  let sorted = numbers.sort(desc);
  sorted.push(sorted[0] + 3);
  sorted.unshift(0);
  sorted = sorted.sort(asc);
  console.log(sorted);

  let s=0;
  let one=0;
  let three=0;
  let countContigousOne = 0;
  let part2 = 1;
  for (let i=0; i<numbers.length; ++i){
    if (sorted[i] === s + 1) {
      ++one;
      ++countContigousOne;
      s = sorted[i];
      console.log('one',s);
    }
    if (sorted[i] === s + 3) {
      ++three;
      s = sorted[i];
      if (countContigousOne === 2) part2 = part2 * 2;
      if (countContigousOne === 3) part2 = part2 * 4;
      if (countContigousOne === 4) part2 = part2 * 7;

      console.log('three',s, countContigousOne, part2);
      countContigousOne = 0;
    }
  }

  console.log('#part1 = '+one*three);
  console.log('#part2 = '+part2);
});
