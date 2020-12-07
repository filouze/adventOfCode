;(function () {
    const part1 = (colors, puzzleInputRules) => {
        let colorsAlreadyCount = [];
        let c = 0;
        while (colors.length) {
            let color = colors.shift();
            colorsAlreadyCount.push(color);
            for (let r = 0; r < puzzleInputRules.length; ++r) {
                const containSplit = puzzleInputRules[r].split(' bags contain');
                if (containSplit[1].indexOf(color) !== -1) {
                    if (colorsAlreadyCount.indexOf(containSplit[0]) === -1 && colors.indexOf(containSplit[0]) === -1) {
                        colors.push(containSplit[0]);
                        ++c;
                    }
                }
            }
        }
        return c;
    };

    const part2 = (colors, puzzleInputRules) => {
        let c = 0;
        while (colors.length) {
            let color = colors.shift();
            for (let r = 0; r < puzzleInputRules.length; ++r) {
                const containSplit = puzzleInputRules[r].split(' bags contain ');
                if (containSplit[0].indexOf(color) !== -1) {
                    let right = containSplit[1].replace(/(bag)/g, '').split(',');
                    for (let s = 0; s < right.length; ++s) {
                        let rSplit = right[s].split(' ');
                        if (rSplit.length === 5) {
                            rSplit.shift();
                        }
                        const n = parseInt(rSplit.shift(), 10);
                        const ab = rSplit.shift() + ' ' + rSplit.shift();
                        for (let i = 0; i < n; ++i) {
                            ++c
                            colors.push(ab);
                        }
                    }
                }
            }
        }
        return c;
    };

    const puzzleSolving = (puzzleInput) => {
        const puzzleInputRules = puzzleInput.replace(/\n/g, '_').split('_');
        let p1 = part1(['shiny gold'], puzzleInputRules);
        let p2 = part2(['shiny gold'], puzzleInputRules);
        displayPart1(p1);
        displayPart2(p2);
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