const solve = input => [...input, '']
    .reduce((acc, x) => {
        if(x === '') {
            acc.count += new Set(acc.group.split('')).size;
            acc.group = '';
        } else {
            acc.group += x;
        }
        return acc;
    }, {group: '', count: 0})
    .count;


module.exports = {
    solve,
    result: 6416,
    exampleResult: 11
};
