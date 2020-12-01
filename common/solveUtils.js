const fs = require('fs');

const solveUtils = (day, task, isExample) => {
    const solver = require(`./../day${day}/solve${task}`);
    const textFile = isExample ? 'example.txt' : 'input.txt';
    const text = fs.readFileSync(`${__dirname}/../day${day}/${textFile}`)
        .toString()
        .split('\n')
        .map(s => s.replace(/\r$/, ''))
        .filter(s => s.length > 0);

    const result = solver.solve(text);
    const expected = isExample ? solver.exampleResult : solver.result;
    const check = expected === result;
    console.log(`DAY: ${day} | TASK: ${task}`);
    console.log('Result:');
    console.log(result);
    console.log('Check:', check);
    console.log('----------------');
    return {result, check};
};

module.exports = {
    solve: solveUtils
};
