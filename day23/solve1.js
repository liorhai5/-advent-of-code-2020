const solve = input => {
    let cups = input[0].split('').map(c => parseInt(c, 10));
    for (let i = 0; i < 100; i++) {
        const picked = cups.splice(1, 3);
        let destination = cups[0] - 1;
        let destinationIndex = cups.indexOf(destination);
        while (destinationIndex < 0) {
            destination = destination - 1 > 0 ? destination - 1 : cups.length + picked.length;
            destinationIndex = cups.indexOf(destination)
        }
        cups.splice(destinationIndex + 1, 0, ...picked);
        cups.push(cups.shift());
    }

    return cups
        .slice(cups.indexOf(1) + 1)
        .concat(cups.slice(0, cups.indexOf(1)))
        .join('');
};

module.exports = {
    solve,
    result: '69852437',
    exampleResult: '67384529'
};
