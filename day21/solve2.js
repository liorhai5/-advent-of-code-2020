const {parseData, createAllergensMap} = require('./solve1');
const solve = input => {
    const {allIngredients, allAllergens, foods} = parseData(input);
    const allergensMap = createAllergensMap(allIngredients, allAllergens, foods);
    return Object.keys(allergensMap)
        .sort()
        .map((a) => allergensMap[a])
        .join(",");
};

module.exports = {
    solve,
    result: 'jzzjz,bxkrd,pllzxb,gjddl,xfqnss,dzkb,vspv,dxvsp',
    exampleResult: 'mxmxvkd,sqjhc,fvjkl'
};
