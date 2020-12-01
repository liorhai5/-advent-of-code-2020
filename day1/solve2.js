const solve = input => {
    let integers = input.map(x => parseInt(x.trim(), 10));
    const targetSum = 2020;
    for (let i = 0; i < integers.length; i++) {
        const hashMap = {};
        const currentSum = targetSum - integers[i];
        for (let j = i + 1; j < integers.length; j++) {
            let tmp = currentSum - integers[j];
            if (hashMap[tmp]) {
                return tmp * integers[i] * integers[j];
            }
            hashMap[integers[j]] = true;
        }
    }
    return 0;
};

module.exports = {
    solve,
    result: 289270976,
    exampleResult: 241861950
};
