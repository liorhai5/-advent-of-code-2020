const solve = input => {
    let [card, door] = input.map(x => parseInt(x, 10));
    let key = 1;
    let value = 1;
    while (value !== door) {
        value = (value * 7) % 20201227;
        key = (key * card) % 20201227;
    }
    return key;
};

module.exports = {
    solve,
    result: 5025281,
    exampleResult: 14897079
};
