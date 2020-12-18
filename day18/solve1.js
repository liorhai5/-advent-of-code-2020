const solve = input => input
    .reduce((sum, line) => sum + calc(line.replace(/\s/g, '')), 0);

const calc = str => {
    let val = null;
    let op = null;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '+' || char === '*') {
            op = char;
        }
        else {
            let charVal;
            if (char === '(') {
                let j = i;
                let end = -1;
                let opens = 0;
                while (end < 0) {
                    const tmpChar = str[j];
                    opens += tmpChar === '(' ? 1 : 0;
                    opens -= tmpChar === ')' ? 1 : 0;
                    if (opens === 0) {
                        end = j - 1;
                    }
                    j++;
                }
                charVal = calc(str.substr(i + 1, end - i));
                i = end + 1;
            }
            else {
                charVal = parseInt(char, 10);
            }

            if (val === null) {
                val = charVal;
            } else {
                if (op === '+') {
                    val += charVal;
                } else {
                    val *= charVal;
                }
            }
        }
    }
    return val;
};

module.exports = {
    solve,
    result: 1408133923393,
    exampleResult: 26335
};
