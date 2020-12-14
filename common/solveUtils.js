const fs = require('fs');

const solveUtils = (day, task, example) => {
    const exampleSuffix = example == '1' ? '' : example;
    const solver = require(`./../day${day}/solve${task}`);
    const textFile = example ? `example${exampleSuffix}.txt` : 'input.txt';
    const text = fs.readFileSync(`${__dirname}/../day${day}/${textFile}`)
        .toString()
        .replace(/\n+$/, '')
        .split('\n');

    const result = solver.solve(text, example);
    const expected = example ? solver.exampleResult : solver.result;
    const check = expected === result;
    console.log(`${check ? '\u2705' : '\u274C'}  DAY ${day}, TASK ${task}`);
    console.log(result);
    console.log('-----------------');
    return {result, check};
};

module.exports = {
    solve: solveUtils
};
