const {parseTiles, tiles2Edges, groupEdgesBySurrounding, getCorners} = require('./solve1');

const solve = input => {
    const tiles = parseTiles(input);
    const edges = tiles2Edges(tiles);
    const groupedBySurrounding = groupEdgesBySurrounding(edges);
    const corners = getCorners(groupedBySurrounding)
    const tileIds = Object.keys(tiles);
    const parsedTiles = tileIds.map(id => {
        const tile = tiles[id];
        return {
            id,
            tile,
            rotations: getPermutations(tile),
            borders: [
                borders.top(tile),
                borders.bottom(tile),
                borders.left(tile),
                borders.right(tile)
            ]
        }
    });

    const filled = fill(parsedTiles, corners[0]);
    const withoutBorders = filled.map(row => row.map(tile => tile.slice(1, -1).map(line => line.slice(1, -1))));
    const composed = withoutBorders.flatMap(row => row.reduce((combine, tile) => combine.map((line, i) => line + tile[i])));
    const count = getPermutations(composed)
        .map(p => countMonsters(p))
        .find(c => c !== 0);

    return composed;
};

function fill(tiles, root) {
    let nextTile = popTileByPredicate(tiles, t => t.id === root);
    let nextGrid = getRotationByPredicate(
        nextTile,
        tile => tiles.filter(t => t.borders.includes(borders.top(tile)) || t.borders.includes(borders.left(tile)).length === 0)
    );

    const map = [[]];
    while (nextGrid) {
        const right = borders.right(nextGrid);
        map[map.length - 1].push(nextGrid);
        nextTile = popTileByPredicate(tiles, t => t.borders.includes(right));
        nextGrid = getRotationByPredicate(nextTile, t => borders.left(t) === right);

        if (!nextGrid) {
            const bottom = borders.bottom(map[map.length - 1][0]);
            map.push([]);
            nextTile = popTileByPredicate(tiles, t => t.borders.includes(bottom));
            nextGrid = getRotationByPredicate(nextTile, t => borders.top(t) === bottom);
        }
    }
    map.pop();

    return map;
}

const print = grid => {
    let str = '';
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            str += `${grid[i][j]} `;
        }
        str += '\n';
    }
    console.log(str);
};

const copy = grid => JSON.parse(JSON.stringify(grid));

const flipH = grid => {
    for (let i = 0; i < grid.length; i++) {
        grid[i] = grid[i].reverse();
    }
    return grid;
};

const rotate = (grid, times) => {
    for (let t = 0; t < times; t++) {
        grid = grid[0].map((val, index) => grid.map(row => row[index]).reverse());
    }
    return grid;
};

const popTileByPredicate = (tiles, fn) => {
    const found = tiles.find(fn);
    if (found) {
        tiles.splice(tiles.indexOf(found), 1);
        return found;
    }
};

const getRotationByPredicate = (tile, fn) => tile && tile.rotations.find(fn);

const borders = {
    top: tile => tile[0].join(''),
    bottom: tile => tile[tile.length - 1].join(''),
    left: tile => tile.map(x => x[0]).join(''),
    right: tile => tile.map(x => x[x.length - 1]).join('')
};

const getPermutations = tile => [
    tile,
    flipH(copy(tile)),
    rotate(copy(tile), 1),
    flipH(rotate(copy(tile), 1)),
    rotate(copy(tile), 2),
    flipH(rotate(copy(tile), 2)),
    rotate(copy(tile), 3),
    flipH(rotate(copy(tile), 3))
];

function countMonsters(image) {
    const monster = [
        '                  # ',
        '#    ##    ##    ###',
        ' #  #  #  #  #  #   ',
    ];
    const pattern = monster.map(x => new RegExp(`^${x.replace(/ /g, '.')}`));
    const size = monster.join('').match(/#/g).length;
    let count = 0;
    for (let i = 0; i < image.length - (pattern.length - 1); i++) {
        for (let j = 0; j < image.length; j++) {
            if (pattern.every((line, k) => image[i + k].slice(j).match(line))) {
                count++;
            }
        }
    }
    return count * size;
}

module.exports = {
    solve,
    result: -1,
    exampleResult: 273
};
