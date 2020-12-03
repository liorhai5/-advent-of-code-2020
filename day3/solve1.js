const solve = input => {
    let right = -3;
    return input
        .filter(x => {
            right += 3;
            return x[right % x.length] === "#";
        })
        .length;
};

module.exports = {
    solve,
    result: 257,
    exampleResult: 7
};
