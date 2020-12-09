;(function () {

    const preambleLength = 25;

    const getPreamble = (n) => {
        return n.slice(0,preambleLength);
    };

    const getOthers = (n) => {
        return n.slice(preambleLength);
    };

    const isXmasEncrypted = (preamble,testedNumber) => {
        const T = parseInt(testedNumber,10);
        for (let a=0; a < preamble.length; ++a){
            const A = parseInt(preamble[a],10);
            for (let b=0; b < preamble.length; ++b){
                const B = parseInt(preamble[b],10);
                if (A !== B && A + B === T) {
                    return true;
                }
            }
        }
        return false;
    };

    const getNotXmasNumbers = (numbers) => {
        let preamble = getPreamble(numbers);
        const others = getOthers(numbers);
        let notXmasEncrypted = [];
        for (let o=0; o<others.length; ++o) {
            const testedNumber = others[o];
            if (!isXmasEncrypted(preamble,testedNumber)){
                notXmasEncrypted.push(testedNumber);
            }
            preamble.shift();
            preamble.push(testedNumber);
        }
        return notXmasEncrypted;
    };

    const sumFunc = (a,c) => a+c;
    const asc = (a,c) => a-c;

    const xmas = (numbers, invalidNumber) => {
        for (let add=1; add<20; ++add) {
            for (let i = 0; i < (numbers.length - add); ++i) {
                let list = [];
                for (let j = 0; j <= add; ++j) {
                    list.push(parseInt(numbers[i + j]))
                }
                if (list.reduce(sumFunc, 0) === parseInt(invalidNumber)) {
                    let sortedList = list.sort(asc);
                    return sortedList.shift() + sortedList.pop();
                }
            }
        }
    };

    const puzzleSolving = (puzzleInput) => {
        const numbers = puzzleInput.replace(/\n/g, '_').split('_');
        const part1 = getNotXmasNumbers(numbers).shift();
        displayPart1(part1);
        const part2 = xmas(numbers,part1);
        displayPart2(part2);
    };

    window.onload = function () {
        init().addEventListener('change', function selectedFileChanged() {
            const reader = new FileReader();
            reader.onload = function fileReadCompleted() {
                console.log('fileReadCompleted - ' + reader.result.length + ' characters read');
                puzzleSolving(reader.result);
            };
            reader.readAsText(this.files[0]);
        });
    };
})();