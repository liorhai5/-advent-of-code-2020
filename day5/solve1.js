const solve = input => input.reduce((acc, seat) => Math.max(acc, getSeatId(seat)), 0);

const getSeatId = seat => getId(
    seat.split('').reduce((acc, char, i) => {
        if(char === 'F') { // lower r
            acc.rMax -= middle(acc.rMax, acc.rMin);
        }
        else if (char === 'B') { // upper r
            acc.rMin += middle(acc.rMax, acc.rMin);
        }
        else if (char === 'L') { // lower c
            acc.cMax -= middle(acc.cMax, acc.cMin);
        }
        else if (char === 'R') { // upper c
            acc.cMin += middle(acc.cMax, acc.cMin);
        }
        return acc;
    }, {rMin: 0, rMax: 127, cMin: 0, cMax: 7})
);

const middle = (a, b) => Math.ceil((a - b) / 2);

const getId = pos => pos.rMin * 8 + pos.cMin;

module.exports = {
    solve,
    result: 996,
    exampleResult: 820,
    getSeatId
};
