const solve = input => {
    let instructions = input.map(line => line.split(/(se|sw|ne|nw|e|w)/g).filter(Boolean));
    return sumBlack(getInitialTilesMap(instructions));
};

const sumBlack = tilesMap => [...tilesMap.values()].filter(Boolean).length;

const getInitialTilesMap = instructions => {
    let tiles = new Map();
    instructions.forEach(instruction => {
        let xPos = 0;
        let yPos = 0;
        instruction.forEach(dir => {
            const [x, y] = posByDir[dir];
            xPos += x;
            yPos += y;

        });
        const id = toID(xPos, yPos);
        const tile = tiles.get(id) || false;
        tiles.set(id, !tile);
    });
    return tiles;
};

const posByDir = {
    e: [1, 0],
    w: [-1, 0],
    ne: [0, -1],
    sw: [0, 1],
    se: [1, 1],
    nw: [-1, -1]
};

const toID = (x, y) => `${x},${y}`;

module.exports = {
    solve,
    result: 312,
    exampleResult: 10,
    getInitialTilesMap,
    toID,
    sumBlack,
    posByDir
};
