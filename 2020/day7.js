;(function () {
    const getColorRulesForThisColor = (colors, puzzleInputRules) => {
        let colorsAlreadyCount = [];
        let c = 0;
        while (colors.length) {
            // console.log(colors);
            let color = colors.shift();
            // console.log("color : "+color);
            colorsAlreadyCount.push(color);
            for (let r = 0; r < puzzleInputRules.length; ++r) {
                const containSplit = puzzleInputRules[r].split(' bags contain');
                if (containSplit[1].indexOf(color) !== -1) {
                    if(colorsAlreadyCount.indexOf(containSplit[0]) === -1 && colors.indexOf(containSplit[0]) === -1){
                        // console.log(containSplit[0],containSplit[1]);
                        colors.push(containSplit[0]);
                        ++c;
                    }
                }
            }
        }
        // console.log(colorsAlreadyCount);
        return c;
    }

    const puzzleSolving = (puzzleInput) => {
        const puzzleInputRules = puzzleInput.replace(/\n/g, "_").split("_");
        // const tuRules = [
        //     "light red bags contain 1 bright white bag, 2 muted yellow bags.",
        //     "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
        //     "bright white bags contain 1 shiny gold bag.",
        //     "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
        //     "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
        //     "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
        //     "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
        //     "faded blue bags contain no other bags.",
        //     "dotted black bags contain no other bags."
        // ];
        let p1 = getColorRulesForThisColor(['shiny gold'], puzzleInputRules);
        displayPart1(p1)
        displayPart2(null)
    }

    window.onload = function () {
        init().addEventListener('change', function selectedFileChanged() {
            const reader = new FileReader();
            reader.onload = function fileReadCompleted() {
                console.log('fileReadCompleted - ' + reader.result.length + ' characters read');
                puzzleSolving(reader.result);
            };
            reader.readAsText(this.files[0])
        });
    }
})();