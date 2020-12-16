const {isValid, parseRule} = require('./solve1');

const solve = input => {
    const {rules, nearby, your} = input.reduce((acc, line) => {
        if (line === '') {}
        else if (line.includes('ticket')) {
            acc.key = line.replace(/ tickets:| ticket:/g, '');
        } else {
            if (acc.key === 'rules') {
                const [name, min1, max1, min2, max2] = parseRule(line);
                acc[acc.key].push({name, ranges: [{min: min1, max: max1}, {min: min2, max: max2}]});
            } else if(acc.key === 'nearby') {
                const validRules = line.split(',').map(val => getValidRules(val, acc.rules));
                const isValid = validRules.every(rulesArr => rulesArr.length > 0);
                if (isValid) {
                    acc[acc.key].push(validRules);
                }
            } else {
                acc[acc.key].push(line.split(','));
            }
        }
        return acc;
    }, {key: 'rules', rules: [], nearby: [], your: []});

    const availableRules = rules.map(({name}) => name);
    const fields = getFields(availableRules, nearby);
    return fields.reduce((sum, name, index) => name[0].includes('departure') ? sum * your[0][index] : sum, 1);
};

const getFields = (availableRules, tickets, map = {}) => {
    for (let valIndex = 0; valIndex < tickets[0].length; valIndex++) {
        if (map[valIndex] === undefined || map[valIndex] > 1) {
            let currentRules = [...availableRules];
            for (let ticketIndex = 0; ticketIndex < tickets.length; ticketIndex++) {
                for (let ruleIndex = 0; ruleIndex < currentRules.length; ruleIndex++) {
                    if (!tickets[ticketIndex][valIndex].includes(currentRules[ruleIndex])) {
                        currentRules.splice(ruleIndex, 1);
                        ruleIndex--;
                    }
                }
            }
            if (currentRules.length === 1) {
                map = cleanMap(map, availableRules, currentRules[0]);
            }
            map[valIndex] = currentRules;
        }
    }
    return Object.values(map);
};

const cleanMap = (map, availableRules, rule) => {
    availableRules.splice(availableRules.indexOf(rule), 1);
    for (const [val, rules] of Object.entries(map)) {
        const ind = rules.indexOf(rule);
        if (ind > -1 && rules.length > 1) {
            rules.splice(ind, 1);
            map[val] = rules;
            if (rules.length === 1) {
                map = cleanMap(map, availableRules, rules[0]);
            }
        }
    }
    return map;
};

const getValidRules = (val, rules) => rules.reduce((acc, {ranges, name}) => isValid(val, ranges) ? [...acc, name] : acc, []);

module.exports = {
    solve,
    result: 3029180675981,
    exampleResult: 1
};
