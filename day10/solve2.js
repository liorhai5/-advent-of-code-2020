const solve = input => {
    let jolts = input.map(x => parseInt(x.trim(), 10)).sort((a, b) => a - b);
    const lastJolt = jolts[jolts.length - 1];
    const joltsSet = new Set(jolts);
    const steps = [];
    steps[1] = joltsSet.has(1) ? 1 : 0;
    steps[2] = joltsSet.has(2) ? steps[1] + 1 : 0;
    steps[3] = joltsSet.has(3) ? steps[1] + steps[2] + 1 : 0;
    for(let i = 4; i <= lastJolt; i++){
        steps[i] = joltsSet.has(i) ? steps[i - 1] + steps[i - 2] + steps[i - 3] : 0;
    }
    return steps[steps.length - 1];
};

module.exports = {
    solve,
    result: 99214346656768,
    exampleResult: 19208
};
