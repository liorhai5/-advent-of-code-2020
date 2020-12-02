const solve = input => {
    return input
        .map(x => {
            const [rule, pass] = x.split(':').map(x => x.trim());
            const [range, char] = rule.split(" ").map(x => x.trim());
            const [pos1, pos2] = range.split("-").map(x => parseInt(x.trim(), 10));
            const char1 = pass[pos1 - 1];
            const char2 = pass[pos2 - 1];
            return (char1 === char || char2 === char) && char1 !== char2;
        })
        .filter(x => x)
        .length;
};

module.exports = {
    solve,
    result: 267,
    exampleResult: 1
};
