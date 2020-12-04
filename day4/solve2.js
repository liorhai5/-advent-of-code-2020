const solve = input => [...input, '']
    .reduce((acc, x) => {
        if(x === '') {
            acc.count += isBatchValid(acc.batch) ? 1 : 0;
            acc.batch = '';
        } else {
            acc.batch += ' ' + x;
        }
        return acc;
    }, {batch: '', count: 0})
    .count;

const rules = {
    byr: x => range(x, 1920, 2002),
    iyr: x => range(x, 2010, 2020),
    eyr: x => range(x, 2020, 2030),
    hgt: x => {
        const [, num, unit] = x.split(/(\d+)/);
        return unit === 'cm' ? range(num, 150, 193) : range(num, 59, 76);
    },
    hcl: x => /^#[0-9A-F]{6}$/i.test(x),
    ecl: x => 'amb blu brn gry grn hzl oth'.includes(x),
    pid: x => /^\d{9}$/.test(x)
};

const range = (num, min, max) => num >= min && num <= max;

const isBatchValid = batch => Object
    .keys(rules)
    .every(key => rules[key]((new RegExp(`${key}:(.*?) `).exec(`${batch} `) || [,''])[1]));

module.exports = {
    solve,
    result: 153,
    exampleResult: 2
};
