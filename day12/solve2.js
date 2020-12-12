const solve = input => {
    const instructions = input.map(x => ({opt: x[0], val: parseInt(x.slice(1), 10)}));
    const ship = {e: 0, n: 0};
    const wp = {e: 10, n: 1};

    const execute = ({opt, val}) => {
        switch (opt) {
            case 'N':
                wp.n += val;
                break;
            case 'S':
                wp.n -= val;
                break;
            case 'E':
                wp.e += val;
                break;
            case 'W':
                wp.e -= val;
                break;
            case 'L':
            case 'R':
                for (let i = 0; i < val; i += 90) {
                    let tmp = wp.e;
                    wp.e = opt === 'L' ? -wp.n : wp.n;
                    wp.n = opt === 'L' ? tmp : -tmp;
                }
                break;
            case 'F':
                ship.n += wp.n * val;
                ship.e += wp.e * val;
                break;
        }
    };

    instructions.forEach(instruction => {
        execute(instruction);
    });

    return Math.abs(ship.e) + Math.abs(ship.n);
};

module.exports = {
    solve,
    result: 178986,
    exampleResult: 286
};
