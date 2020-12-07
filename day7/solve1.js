const solve = input => {
    const map = createMap(input);
    return Object.keys(map)
        .reduce((count, currentColor) => count + (canContain('shiny gold', currentColor, map) ? 1 : 0), 0);
};

const canContain = (matchColor, currentColor, map) => {
    if (map[currentColor][matchColor]) {
        return true;
    } else if (!Object.values(map[currentColor]).length) {
        return false;
    }
    return Object
        .keys(map[currentColor])
        .some(newCurrentColor => canContain(matchColor, newCurrentColor, map));
};

const createMap = input => input
    .reduce((map, rule) => {
        let [bag, contains] = rule
            .replace(/\.|bags|bag/gi, '')
            .split(' contain ');
        bag = bag.trim();
        map[bag] = {};
        contains
            .split(',')
            .map(x => x
                .trim()
                .split(/(\d+)\s/)
                .filter(Boolean)
            ).forEach(x => {
                if (x[0] !== 'no other') {
                    map[bag][x[1]] = x[0];
                }
            });
        return map;
    }, {});


module.exports = {
    solve,
    result: 226,
    exampleResult: 4,
    createMap
};
