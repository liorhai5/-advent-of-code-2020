const solve = input => [...input, '']
    .reduce((acc, x, i) => {
       if(x === '') {
           acc.count += isBatchValid(acc.batch) ? 1 : 0;
           acc.batch = '';
       } else {
           acc.batch += x;
       }
       return acc;
    }, {batch: '', count: 0})
    .count;

const keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const isBatchValid = batch => keys.every(k => batch.includes(k));

module.exports = {
    solve,
    result: 260,
    exampleResult: 2
};
