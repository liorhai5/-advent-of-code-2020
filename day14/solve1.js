const solve = input => sumArr(
    input.reduce((acc, line) => {
        if (line.includes('mask')) {
            acc.mask = line.split(' = ')[1].split('');
        } else {
            const location = line.match(/\[(.*?)\]/)[1];
            const value = line.split(' = ')[1];
            const bitValue = int2Bit(parseInt(value, 10));
            const maskedValue = applyMask(acc.mask, bitValue);
            acc.mem[location] = bit2Int(maskedValue);
        }
        return acc;
    }, {mask: [], mem: []}).mem
);

const sumArr = arr => arr.reduce((acc, v) => acc + v, 0);

const int2Bit = int => int.toString(2).padStart(36, '0');

const bit2Int = bit => parseInt(bit, 2);

const applyMask = (mask, bit) => mask.map((char, i) => char !== 'X' ? char : bit.charAt(i)).join('');

module.exports = {
    solve,
    result: 13496669152158,
    exampleResult: 165,
    sumArr,
    int2Bit,
    bit2Int
};
