const solve = input => {
    let jolts = input.map(x => parseInt(x.trim(), 10)).sort((a, b) => a - b);
    const res = jolts.reduce((acc, jolt) => {
        acc.diffs[jolt - acc.last] += 1;
        acc.last = jolt;
        return acc;
    }, {diffs: [0,0,0,1], last: 0});
    return res.diffs[1] * res.diffs[3];
};


module.exports = {
    solve,
    result: 2240,
    exampleResult: 220
};
