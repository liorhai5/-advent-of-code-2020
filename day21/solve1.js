const solve = input => {
    const {allIngredients, allAllergens, foods} = parseData(input);
    const allergensMap = createAllergensMap(allIngredients, allAllergens, foods);
    const safeIngredients = [...allIngredients].filter((ing) => !Object.values(allergensMap).includes(ing));
    return foods.reduce((acc, [ingredients]) => acc + intersect(ingredients, safeIngredients).length, 0);
};

const parseData = input => input
    .reduce((acc, line) => {
        const [ingredients, allergens] = line.replace(/,/g, '').slice(0, -1).split(' (contains ').map(x => x.split(' '));
        acc.foods.push([ingredients, allergens]);
        ingredients.forEach(ingredient => acc.allIngredients.add(ingredient));
        allergens.forEach(allergen => acc.allAllergens.add(allergen));
        return acc;
    }, {allIngredients: new Set(), allAllergens: new Set(), foods: []});

const createAllergensMap = (allIngredients, allAllergens, foods) => {
    const found = {};
    while (true) {
        const before = Object.keys(found).length;
        mapAllergens(foods, [], [...allIngredients], [...allAllergens], found);
        const after = Object.keys(found).length;
        if (after === allAllergens.size) {
            break;
        }
        if (before === after) {
            return;
        }
    }
    return found;
};

const mapAllergens = (foods, usedIndexes, commonIngredients, commonAllergens, found = {}) => {
    for (const [foodIndex, [ingredients, allergens]] of foods.entries()) {
        if (usedIndexes.includes(foodIndex)) return;

        const nextIngredients = intersect(commonIngredients, ingredients).filter((i) => !Object.values(found).includes(i));
        const nextAllergens = intersect(commonAllergens, allergens).filter((i) => !Object.keys(found).includes(i));
        if (nextIngredients.length === 0 || nextAllergens.length === 0) continue;

        if (nextIngredients.length === nextAllergens.length) {
            for (const [id, ingredient] of nextIngredients.entries()) {
                const allergen = nextAllergens[id];
                found[allergen] = ingredient;
            }
        }
        mapAllergens(foods, [...usedIndexes, foodIndex], nextIngredients, nextAllergens, found);
    }
};

const intersect = (list1, list2) => list1.filter((x) => list2.includes(x));

module.exports = {
    solve,
    result: 2423,
    exampleResult: 5,
    parseData,
    createAllergensMap
};
