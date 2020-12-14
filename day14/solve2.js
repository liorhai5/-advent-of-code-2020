const {sumArr, int2Bit, bit2Int} = require('./solve1');

const solve = input => sumArr(Object.values(
    input.reduce((acc, line) => {
        if (line.includes('mask')) {
            acc.mask = line.split(' = ')[1].split('');
        } else {
            const location = line.match(/\[(.*?)\]/)[1];
            const value = parseInt(line.split(' = ')[1], 10);
            const bitLocation = int2Bit(parseInt(location, 10));
            const maskedLocations = applyMask(acc.mask, bitLocation);
            maskedLocations.forEach(maskedLocation => acc.mem[maskedLocation] = value);
        }
        return acc;
    }, {mask: [], mem: []}).mem
));

const getPermutations = (xMap, permutations = [], cur = []) => {
    const cur0 = [...cur, {...xMap[0], c: 0}];
    const cur1 = [...cur, {...xMap[0], c: 1}];
    if (xMap.length === 1) {
        permutations.push(cur0, cur1);
    } else {
        getPermutations(xMap.slice(1), permutations, cur0);
        getPermutations(xMap.slice(1), permutations, cur1);
    }
    return permutations;
};

const applyMask = (mask, floatBit) => {
    const permutations = getPermutations(mask.map((c, i) => ({i, c})).filter(({c}) => c === 'X'));
    const maskedFloatBit = mask.map((c, i) => c === '1' ? c : floatBit.charAt(i)).join('');
    return permutations.map((permutation) => bit2Int(permutation.reduce((bit, {c, i}) => replaceChar(bit, c, i), maskedFloatBit)));
};

const replaceChar = (str, char, index) => str.substring(0, index) + char + str.substring(index + 1);

module.exports = {
    solve,
    result: 3278997609887,
    exampleResult: 208
};
