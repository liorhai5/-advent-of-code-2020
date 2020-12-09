const solve = (input, isExample) => {
    let integers = input.map(x => parseInt(x.trim(), 10));
    const length = isExample ? 5 : 25;
    for (let start = 0, end = length; end < integers.length; start++, end++) {
        if (isNotSumOfTwo(integers.slice(start, end), integers[end])) {
            return integers[end];
        }
    }
};

const isNotSumOfTwo = (integers, targetSum) => {
    const hashMap = {};
    for (let i = 0; i < integers.length; i++) {
        let tmp = targetSum - integers[i];
        if (hashMap[tmp]) {
            return false;
        }
        hashMap[integers[i]] = true;
    }
    return true;
};

module.exports = {
    solve,
    result: 18272118,
    exampleResult: 127
};
