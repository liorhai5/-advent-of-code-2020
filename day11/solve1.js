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
            const neighbours = getNeighbours(r, c, seats);
            if (seats[r][c] === 'L' && neighbours.every(s => s === 'L' || s === '.')) {
                newSeats[r][c] = '#';
            } else if (seats[r][c] === '#' && neighbours.filter(s => s === '#').length >= 4) {
                newSeats[r][c] = 'L';
            } else {
                newSeats[r][c] = seats[r][c];
            }
        }
    }
    return newSeats;
};

const dirList = [[1, 1], [-1, -1], [-1, 1], [1, -1], [0, 1], [0, -1], [1, 0], [-1, 0]];

const getOccupiedCount = seats => seats.join('').match(/#/g).length;

const isEqual = (seats1, seats2) => seats1.toString() === seats2.toString();

const getNeighbours = (r, c, seats) => dirList.reduce((n, [dr, dc]) => seatInGrid(r + dr, c + dc, seats) ? [...n, seats[r + dr][c + dc]] : n, []);

const seatInGrid = (r, c, seats) => r >= 0 && r < seats.length && c >= 0 && c < seats[r].length;

module.exports = {
    solve,
    result: 2204,
    exampleResult: 37,
    getOccupiedCount,
    isEqual,
    dirList,
    seatInGrid
};
