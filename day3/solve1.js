const solve = input =>
    input.filter((x, i) => x[i * 3 % x.length] === "#").length;

module.exports = {
    solve,
    result: 257,
    exampleResult: 7
};
