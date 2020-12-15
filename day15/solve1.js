const solve = ([input], isExample, turns = 2020) => {
    const initialCalls = input.split(',').map(x => parseInt(x, 10));
    const callsMap = new Map();
    let turn = 1;
    let called = 0;
    let last = 0;
    while (turn <= turns) {
        if (initialCalls.length) {
            called = initialCalls.shift();
        } else {
            const valFromMap = callsMap.get(called);
            called = !!valFromMap ? turn - valFromMap : 0;
        }
        callsMap.set(last, turn);
        last = called;
        turn++;
    }
    return called;
};


module.exports = {
    solve,
    result: 203,
    exampleResult: 436
};
