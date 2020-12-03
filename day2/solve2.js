const solve = input => {
    return input
        .filter(x => {
            const [pos1, pos2, char, pass] = x.split(/(\d*)-(\d*) (.): (.*)/).filter(Boolean);
            const char1 = pass[pos1 - 1];
            const char2 = pass[pos2 - 1];
            return (char1 === char || char2 === char) && char1 !== char2;
        })
        .length;
};

module.exports = {
    solve,
    result: 267,
    exampleResult: 1
};
