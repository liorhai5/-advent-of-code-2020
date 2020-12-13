const solve = ([, linesInput]) => {
    const [firstLine, ...otherLines] = linesInput
        .split(',')
        .map((x, i) => ({id: parseInt(x, 10), index: i}))
        .filter(x => !Number.isNaN(x.id));

    let t = 0;
    let m = firstLine.id;
    otherLines.forEach(({id, index}) => {
       while (true) {
           if ((t + index) % id === 0) {
               m *= id;
               break;
           }
           t += m;
       }
    });
    return t;
}

module.exports = {
    solve,
    result: 894954360381385,
    exampleResult: 1068781
};
