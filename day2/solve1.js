const solve = input => {
    return input
        .map(x => {
            const [rule, pass] = x.split(':').map(x => x.trim());
            const [range, char] = rule.split(" ").map(x => x.trim());
            const [min, max] = range.split("-").map(x => parseInt(x.trim(), 10));
            const count = (pass.match(new RegExp(char, 'g')) || []).length;
            return count >= min && count <= max;
        })
        .filter(x => x)
        .length;
};

module.exports = {
    solve,
    result: 469,
    exampleResult: 2
};
