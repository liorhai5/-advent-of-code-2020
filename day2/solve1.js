const solve = input => {
    return input
        .filter(x => {
            const [min, max, char, pass] = x.split(/(\d*)-(\d*) (.): (.*)/).filter(Boolean);
            const count = (pass.match(new RegExp(char, 'g')) || []).length;
            return count >= min && count <= max;
        })
        .length;
};

module.exports = {
    solve,
    result: 469,
    exampleResult: 2
};
