const {parse, resolve} = require('./solve1');

const solve = input => {
    const {rules, messages} = parse(input);
    rules['8'] = '42 | 42 8';
    rules['11'] = '42 31 | 42 11 31';
    const rule42 = resolve(rules[42], rules);
    const rule31 = resolve(rules[31], rules);
    const rule = new RegExp(`^(?<g42>(${rule42})+)(?<g31>(${rule31})+)$`);
    return messages.reduce((sum, message) => {
        const matches = rule.exec(message);
        if (matches) {
            const {groups} = matches;
            const {g42, g31} = groups;
            const matches42 = g42.match(new RegExp(rule42, 'g')).length;
            const matches31 = g31.match(new RegExp(rule31, 'g')).length;
            sum += matches42 > matches31 ? 1 : 0;
        }
        return sum;
    }, 0);
};


module.exports = {
    solve,
    result: 309,
    exampleResult: 12
};
