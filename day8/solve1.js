const solve = input => {
    let acc = 0;
    let visited = {};
    let index = 0;
    while (!visited[index]) {
        let [opt, val] = input[index].split(' ');
        val = parseInt(val, 10);
        visited[index] = true;
        switch (opt) {
            case 'acc':
                acc += val;
                index += 1;
                break;
            case 'nop':
                index += 1;
                break;
            case 'jmp':
                index += val;
        }
    }
    return acc;
};

module.exports = {
    solve,
    result: 1420,
    exampleResult: 5
};
