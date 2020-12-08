const solve = input => {
    let solution = null;
    const checked = {};
    while (solution === null) {
        const tmpInput = [...input];
        const indexToReplace = tmpInput.findIndex((cmd, i) => {
            if (checked[i]) {
                return false;
            }
            checked[i] = true;
            return cmd.includes('acc') ? false : true;
        });
        let cmd = tmpInput[indexToReplace];
        tmpInput[indexToReplace] = cmd.includes('nop') ?
            cmd.replace('nop', 'jmp') :
            cmd.replace('jmp', 'nop');
        solution = isProgramValid(tmpInput);
    }
    return solution;
};

const isProgramValid = input => {
    let acc = 0;
    let visited = {};
    let index = 0;
    let terminated = false;
    while (!terminated && index < input.length) {
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
        if (visited[index]) {
            terminated = true;
        }
    }
    return terminated ? null : acc;
};

module.exports = {
    solve,
    result: 1245,
    exampleResult: 8
};
