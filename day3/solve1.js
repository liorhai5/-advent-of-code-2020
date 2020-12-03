const solve = input => {
    let p = -3;
    return input
        .filter(x => {
            p += 3;
            return x[p % x.length] === "#";
        })
        .length;
};

module.exports = {
    solve,
    result: 257,
    exampleResult: 7
};
