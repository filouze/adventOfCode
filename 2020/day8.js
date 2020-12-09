;(function () {

    const part1 = (puzzleInput) => {
        const instructions = puzzleInput.replace(/\n/g, '_').split('_');
        let ranInstructions = [];
        let l = 0
        let acc = 0;
        while (ranInstructions.indexOf(l) === -1) {
            let instruction = instructions[l];
            let instructionSplit = instruction.split(' ');
            const operation = instructionSplit.shift();
            const argument = instructionSplit.shift().split('');
            const sign = argument.shift();
            const numb = parseInt(argument.join(''),10);
            ranInstructions.push(l);
            if (operation === 'acc') {
                acc = sign === '+' ? acc + numb: acc - numb;
            }
            if (operation === 'jmp') {
                l = sign === '+' ? l + numb: l - numb;
            }else{
                ++l;
            }
        }
        return acc;
    }

    const hasNotInfiniteLoop = (puzzleInput) => {
        let ranInstructions = [];
        let l = 0
        let acc = 0;
        while (ranInstructions.indexOf(l) === -1) {
            let instruction = puzzleInput[l];
            let instructionSplit = instruction.split(' ');
            const operation = instructionSplit.shift();
            const argument = instructionSplit.shift().split('');
            const sign = argument.shift();
            const numb = parseInt(argument.join(''),10);
            ranInstructions.push(l);
            if (operation === 'acc') {
                acc = sign === '+' ? acc + numb: acc - numb;
            }
            if (operation === 'jmp') {
                l = sign === '+' ? l + numb: l - numb;
            }else{
                ++l;
            }
            if (l === puzzleInput.length) {
                return acc;
            }
        }
        return false;
    }

    const part2 = (puzzleInput) => {
        const instructions = puzzleInput.replace(/\n/g, '_').split('_');
        for (let i=0;i<puzzleInput.length; ++i){
            let puzzleInputUpdated = instructions;
            let instruction = instructions[i];
            let instructionSplit = instruction.split(' ');
            const operation = instructionSplit.shift();
            const argument = instructionSplit.shift().split('');
            const sign = argument.shift();
            const numb = parseInt(argument.join(''),10);
            if (operation === "jmp" || (operation === "nop" && numb !== 0) ) {
                puzzleInputUpdated[i] = (operation === "nop") ? 'jmp '+sign+numb : 'nop '+sign+numb;
                if (hasNotInfiniteLoop(puzzleInputUpdated)) {
                    return hasNotInfiniteLoop(puzzleInputUpdated);
                }
                puzzleInputUpdated[i] = instruction;
            }
        }
    }

    const puzzleSolving = (puzzleInput) => {
        displayPart1(part1(puzzleInput));
        displayPart2(part2(puzzleInput));
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