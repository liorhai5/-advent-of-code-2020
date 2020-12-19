const solve = input => {
    const {rules, messages} = parse(input);
    const rule = new RegExp(`^${resolve(rules[0], rules)}$`);
    return messages.reduce((sum, message) => rule.test(message) ? sum + 1 : sum, 0);
};

const parse = input => input
    .reduce((acc, line) => {
        if (line.includes(':')) {
            const [, key, value] = /^(\d+): (.*)$/.exec(line);
            acc.rules[key] = value;
        } else if (line !== '') {
            acc.messages.push(line);
        }
        return acc;
    }, {rules: {}, messages: []});

const resolve = (value, rules, mem = {}) => {
    if(!!mem[value]) {
        return mem[value];
    }
    let result = '';
    if(value.includes('"')) {
        result = value.replace(/"/g, '');
    } else if(value.includes('|')) {
        result = `(${value.split(' | ').map(option => resolve(option, rules, mem)).join('|')})`;
    } else {
        result = value.split(' ').map(key => resolve(rules[key], rules, mem)).join('');
    }
    mem[value] = result;
    return result;
};

module.exports = {
    solve,
    result: 195,
    exampleResult: 2,
    parse,
    resolve
};
