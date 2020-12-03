const solve = input => {
    const slopes = [
        {x: 1, y: 1, pos: -1, count: 0},
        {x: 3, y: 1, pos: -3, count: 0},
        {x: 5, y: 1, pos: -5, count: 0},
        {x: 7, y: 1, pos: -7, count: 0},
        {x: 1, y: 2, pos: -1, count: 0}
    ];
    input.forEach((x, i) => {
        slopes.forEach(slope => {
            if (i % slope.y === 0) {
                slope.pos += slope.x;
                slope.count += x[slope.pos % x.length] === "#" ? 1 : 0;
            }
        });
    });

    return slopes.reduce((acc, slope) => acc * slope.count, 1);


};

module.exports = {
    solve,
    result: 1744787392,
    exampleResult: 336
};
