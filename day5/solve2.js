const {getSeatId} = require('./solve1');

const solve = input => {
    const ids = input.map(seat => getSeatId(seat)).sort();
    let match = -1;
    let index = 0;
    while (match === -1) {
        const nextId = ids[index + 1];
        const nextExpectedId = ids[index] + 1;
        if (nextId !== nextExpectedId && Math.abs(nextExpectedId - nextId) < 2) {
            match = ids[index] + 1;
        }
        index++;
    }
    return match;
};

module.exports = {
    solve,
    result: 671,
    exampleResult: 0 //non
};
