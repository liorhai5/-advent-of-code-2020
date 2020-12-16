const solve = input => input
    .reduce((acc, line) => {
        if (line === '') {}
        else if (line.includes('ticket')) {
            acc.key = line.replace(' tickets:', '');
        } else {
            if (acc.key === 'rules') {
                let [, min1, max1, min2, max2] = parseRule(line);
                acc.rules.push({min: min1, max: max1}, {min: min2, max: max2});
            } else if(acc.key === 'nearby') {
                line.split(',').forEach(val => {
                    acc.sum += isValid(val, acc.rules) ? 0 : parseInt(val, 10);
                });
            }
        }
        return acc;
    }, {key: 'rules', rules: [], sum: 0}).sum;

const parseRule = line => {
    const [, ...matched] = line.match(/^(.*): (\d+)-(\d+) or (\d+)-(\d+)/);
    return matched.map(x => isNaN(x) ? x : parseInt(x, 10));
};

const isValid = (val, rules) => rules.some(rule => val >= rule.min && val <= rule.max);

module.exports = {
    solve,
    result: 29851,
    exampleResult: 71,
    isValid,
    parseRule
};
