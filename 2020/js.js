const init = () => {
    const dS = document.scripts;
    const dayId = dS[dS.length - 1].src.split('/').pop().replace('day', '').replace('.js', '');
    const dayFile = document.getElementById('dayFile');
    const dayLink = document.getElementById('dayLink');
    dayFile.append(dayId);
    dayLink.append(dayId);
    dayLink.href = dayLink.href + dayId;
};
const displayPart = (part, result) => document.getElementById('part' + part).innerText = '#part' + part + ' : ' + result;
const displayPart1 = result => result ? displayPart(1, result) : undefined;
const displayPart2 = result => result ? displayPart(2, result) : undefined;