const solve = input => {
    const slopes = [
        {x: 1, y: 1, p: -1, c: 0},
        {x: 3, y: 1, p: -3, c: 0},
        {x: 5, y: 1, p: -5, c: 0},
        {x: 7, y: 1, p: -7, c: 0},
        {x: 1, y: 2, p: -1, c: 0}
    ];
    input.forEach((x, i) => {
        slopes.forEach(slope => {
            if (i % slope.y === 0) {
                slope.p += slope.x;
                slope.c += x[slope.p % x.length] === "#" ? 1 : 0;
            }
        });
    });

    return slopes.reduce((acc, slope) => acc * slope.c, 1);


};

module.exports = {
    solve,
    result: 1744787392,
    exampleResult: 336
};
