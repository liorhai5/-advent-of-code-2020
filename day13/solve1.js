const solve = ([initialStamp, lines]) => lines
    .split(',')
    .filter(x => x !== 'x')
    .reduce((acc, x) => {
        const line = parseInt(x, 10);
        const diff = (Math.floor(initialStamp / line) * line + line) - initialStamp;
        return diff < acc.diff ? {line, diff, res: line * diff} : acc;
    }, {line: 0, diff: Infinity, res: 0}).res;

module.exports = {
    solve,
    result: 370,
    exampleResult: 295
};
