const {result, exampleResult} = require('./solve1');

const solve = (input, isExample) => {
    let integers = input.map(x => parseInt(x.trim(), 10));
    const targetResult = isExample ? exampleResult : result;
    let start = 0;
    let end = 0;
    let sum = 0;
    while (sum !== targetResult) {
        sum += integers[end];
        if (sum > targetResult) {
            sum = 0;
            start++;
            end = start;
        }
        end++;
    }
    const subArr = integers.slice(start, end);
    return Math.min(...subArr) + Math.max(...subArr);
};

module.exports = {
    solve,
    result: 2186361,
    exampleResult: 62
};
