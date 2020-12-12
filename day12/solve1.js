const solve = input => {
    const instructions = input.map(x => ({opt: x[0], val: parseInt(x.slice(1), 10)}));
    const ship = {e: 0, n: 0, r: 0};

    const execute = ({opt, val}) => {
        switch (opt) {
            case 'N':
                ship.n += val;
                break;
            case 'S':
                ship.n -= val;
                break;
            case 'E':
                ship.e += val;
                break;
            case 'W':
                ship.e -= val;
                break;
            case 'L':
                ship.r -= val;
                break;
            case 'R':
                ship.r += val;
                break;
            case 'F':
                execute({opt: rotationToOpt(ship.r), val});
                break;
        }
    };

    instructions.forEach(instruction => {
        execute(instruction);
    });

    return Math.abs(ship.e) + Math.abs(ship.n);
};

const dirsMap = {
    0: 'E',
    90: 'S',
    180: 'W',
    270: 'N'
};

const rotationToOpt = rotation => {
    rotation = rotation % 360;
    rotation = rotation < 0 ? 360 + rotation : rotation;
    return dirsMap[Math.abs(rotation)];
};

module.exports = {
    solve,
    result: 2879,
    exampleResult: 25
};
