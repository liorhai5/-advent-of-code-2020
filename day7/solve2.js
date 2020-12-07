const {createMap} = require('./solve1');

const solve = input => getBagsCount('shiny gold', createMap(input));

const getBagsCount = (currentColor, map) => Object
    .entries(map[currentColor])
    .reduce((count, [color, amount]) => {
        const colorCount = getBagsCount(color, map);
        return count + Math.max(colorCount, 1) * amount + Math.min(colorCount, 1) * amount;
    }, 0);

module.exports = {
    solve,
    result: 9569,
    exampleResult: 32,
    createMap
};
