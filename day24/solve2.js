const {getInitialTilesMap, toID, sumBlack, posByDir} = require('./solve1');

const solve = input => {
    let instructions = input.map(line => line.split(/(se|sw|ne|nw|e|w)/g).filter(Boolean));
    let tilesMap = getInitialTilesMap(instructions);
    for (let i = 0; i < 100; i++) {
        tilesMap = day(tilesMap);
    }
    return sumBlack(tilesMap);
};

const toPos = id => id.split(',').map(x => parseInt(x, 10));

const dirs = Object.values(posByDir);

const day = tileMap => {
    const newTileMap = new Map();
    const visited = new Map();
    for (const id of tileMap.keys()) {
        const neighbors = getNeighbors(...toPos(id));
        flipIfNeeded(id, neighbors, tileMap, newTileMap, visited);
        neighbors.filter(nid => !visited.get(nid)).forEach(nid => flipIfNeeded(nid, getNeighbors(...toPos(nid)), tileMap, newTileMap, visited));
    }
    return newTileMap;
};

const getNeighbors = (xPos, yPos) => dirs.map(([x, y]) => toID(xPos + x, yPos + y));

const flipIfNeeded = (id, neighbors, originalTileMap, newTileMap, visited) => {
    const blackNeighbors = neighbors.map(nid => originalTileMap.get(nid) || false).filter(Boolean).length;
    if (originalTileMap.get(id) || false) {
        newTileMap.set(id, !(blackNeighbors === 0 || blackNeighbors > 2));
    } else {
        newTileMap.set(id, blackNeighbors === 2)
    }
    visited.set(id, true);
};

module.exports = {
    solve,
    result: 3733,
    exampleResult: 2208
};
