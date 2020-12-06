;(function () {
    const puzzleSolving = (puzzleInput) => {
        displayPart1(null)
        displayPart2(null)
    }

    window.onload = function () {
        init().addEventListener('change', function selectedFileChanged() {
            const reader = new FileReader();
            reader.onload = function fileReadCompleted() {
                console.log('fileReadCompleted - ' + reader.result.length + ' lines read');
                puzzleSolving(reader.result);
            };
            reader.readAsText(this.files[0])
        });
    }
})();