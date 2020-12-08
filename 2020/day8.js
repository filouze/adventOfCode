;(function () {

    const puzzleSolving = (puzzleInput) => {
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
        displayPart1(acc);
        displayPart2(0);
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