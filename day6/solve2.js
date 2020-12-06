const solve = input => [...input, '']
    .reduce((acc, x) => {
        if(x === '') {
            acc.count += acc.group[0].split('').filter(c => acc.group.every(x => x.includes(c))).length;
            acc.group = [];
        } else {
            acc.group.push(x);
        }
        return acc;
    }, {group: [], count: 0})
    .count;


module.exports = {
    solve,
    result: 3050,
    exampleResult: 6
};
