const solve = input => {
    const tiles = parseTiles(input);
    const edges = tiles2Edges(tiles);
    const groupedBySurrounding = groupEdgesBySurrounding(edges);
    return getCorners(groupedBySurrounding)
        .reduce((sum, corner) => sum * parseInt(corner, 10), 1);
};

const reverse = str => str.split('').reverse().join('');

const parseTiles = input => input
    .reduce((groups, line) => {
        if (line === '') {}
        else if (line.includes('Tile')) {
            const [id] = /(\d+)/.exec(line);
            groups.id = id;
            groups.tiles[id] = [];
        } else {
            groups.tiles[groups.id].push(line.split(''));
        }
        return groups;
    }, {tiles: {}, id: ''}).tiles;

const tiles2Edges = tiles => Object.keys(tiles)
    .reduce((edges, id) => {
        const t = tiles[id][0].join('');
        edges.push({id, str: t, pos: 't', reversed: false}, {id, str: reverse(t), pos: 't', reversed: true});
        const b = tiles[id][tiles[id].length - 1].join('');
        edges.push({id, str: b, pos: 'b', reversed: false}, {id, str: reverse(b), pos: 'b', reversed: true});
        let l = '';
        let r = '';
        for (let i = 0; i < tiles[id].length; i++) {
            l += tiles[id][i][0];
            r += tiles[id][i][tiles[id][i].length - 1];
        }
        edges.push({id, str: l, pos: 'l', reversed: false}, {id, str: reverse(l), pos: 'l', reversed: true});
        edges.push({id, str: r, pos: 'r', reversed: false}, {id, str: reverse(r), pos: 'r', reversed: true});
        return edges;
    }, []);

const groupEdgesBySurrounding = edges => edges
    .reduce((acc, {id, str, pos, reversed}) => {
        const match = edges.find(edge => edge.id !== id && edge.str ===  str);
        if (match) {
            acc[id] = acc[id] || [];
            acc[id].push({
                ...match,
                matchesPos: pos,
                matchesReversed: reversed
            });
        }
        return acc;
    }, {});

const getCorners = groupedBySurrounding => Object.entries(groupedBySurrounding)
    .filter(([id, surrounding]) => surrounding.length <= 4)
    .map(x => x[0]);

module.exports = {
    solve,
    result: 2699020245973,
    exampleResult: 20899048083289,
    parseTiles,
    tiles2Edges,
    groupEdgesBySurrounding,
    getCorners,
    reverse
};
