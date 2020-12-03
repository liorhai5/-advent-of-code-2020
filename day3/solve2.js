const solve = input => {
    const slopes = [
        {x: 1, y: 1, c: 0},
        {x: 3, y: 1, c: 0},
        {x: 5, y: 1, c: 0},
        {x: 7, y: 1, c: 0},
        {x: 1, y: 2, c: 0}
    ];
    input.forEach((x, i) => {
        slopes.forEach(s => {
            s.c += x[i / s.y * s.x % x.length] === "#" ? 1 : 0;
        });
    });

    return slopes.reduce((acc, s) => acc * s.c, 1);


};

module.exports = {
    solve,
    result: 1744787392,
    exampleResult: 336
};
