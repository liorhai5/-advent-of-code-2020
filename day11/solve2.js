const {getOccupiedCount, isEqual, seatInGrid, dirList} = require('./solve1');
const solve = input => {
    let seats1 = input.map(x => x.split(''));
    let seats2 = applyRound(seats1);
    while (!isEqual(seats1, seats2)) {
        seats1 = seats2;
        seats2 = applyRound(seats1);
    }
    return getOccupiedCount(seats1);
};

const applyRound = seats => {
    const newSeats = [];
    for (let r = 0; r < seats.length; r++) {
        newSeats[r] = [];
        for (let c = 0; c < seats[r].length; c++) {
            const neighbours = getVisibleNeighbours(r, c, seats);
            if (seats[r][c] === 'L' && neighbours.every(s => s === 'L' || s === '.')) {
                newSeats[r][c] = '#';
            } else if (seats[r][c] === '#' && neighbours.filter(s => s === '#').length >= 5) {
                newSeats[r][c] = 'L';
            } else {
                newSeats[r][c] = seats[r][c];
            }
        }
    }
    return newSeats;
};

const getVisibleNeighbours = (r, c, seats) => {
    const n = [];
    for (let i = 0; i < dirList.length; i++) {
        const [dr, dc] = dirList[i];
        let _r = r + dr;
        let _c = c + dc;
        let _s = '.';
        while (seatInGrid(_r, _c, seats) && _s === '.') {
            _s = seats[_r][_c];
            _r += dr;
            _c += dc;
        }
        n.push(_s);
    }
    return n;
};


module.exports = {
    solve,
    result: 1986,
    exampleResult: 26
};
