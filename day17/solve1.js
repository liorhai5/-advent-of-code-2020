let dimensions = 3;
const solve = (input, isExample, dimens = 3) => {
    dimensions = dimens;
    const cycles = 6;
    const permutations = getPermutations();

    let activeCells = input.map(x => x.split('')).reduce((activesMap, row, r) => {
       for (let c = 0; c < row.length; c++) {
           if (row[c] === '#') {
               const cell = createCell(r, c);
               activesMap.set(cell2Key(cell), cell);
           }
       }
       return activesMap;
    }, new Map());

    for (let i = 0; i < cycles; i++) {
        const field = new Map();
        for (const activeCell of activeCells.values()) {
            getNeighbors(activeCell, permutations).forEach(neighbor => field.set(cell2Key(neighbor), neighbor));
        }

        const newActiveCells = new Map();
        for (const cell of field.values()) {
            const activeNeighbors = getNeighbors(cell, permutations).filter(neighbor => activeCells.has(cell2Key(neighbor)));
            const cellKey = cell2Key(cell);
            if (activeCells.has(cellKey)) {
                if (activeNeighbors.length >= 2 && activeNeighbors.length <= 3) {
                    newActiveCells.set(cellKey, cell);
                }
            } else {
                if (activeNeighbors.length === 3) {
                    newActiveCells.set(cellKey, cell);
                }
            }
        }

        activeCells = newActiveCells;
    }

    return activeCells.size;
};

const cell2Key = cell => {
    let str = '';
    for (let i = 0; i < dimensions; i++) str += cell[i] + ',';
    return str;
};

const getPermutations = (permutations = [], cur = []) => {
    const range = [0, 1, -1];
    if (cur.length === dimensions) {
        if (!cur.every(x => x === 0)) {
            permutations.push(cur);
        }
    } else {
        range.forEach(r => getPermutations(permutations, [...cur, r]));
    }
    return permutations;
};

const getNeighbors = (cell, permutations) =>
    permutations.reduce((neighbors, permutation) => [...neighbors, createCell(...permutation.map((p, i) => cell[i] + p))], []);

const createCell = (...initials) => initials.concat(Array(dimensions - initials.length).fill(0));


module.exports = {
    solve,
    result: 209,
    exampleResult: 112
};
