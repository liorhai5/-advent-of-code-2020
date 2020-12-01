const solve = input => {
    let integers = input.map(x => parseInt(x.trim(), 10));
    const targetSum = 2020;
    const hashMap = {};
    for (let i = 0; i < integers.length; i++) {
        let tmp = targetSum - integers[i];
        if (hashMap[tmp]) {
            return tmp * integers[i];
        }
        hashMap[integers[i]] = true;
    }
    return 0;
};

module.exports = {
    solve,
    result: 692916,
    exampleResult: 514579
};
