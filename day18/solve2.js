const solve = input => input
    .reduce((sum, line) => sum + calc(line.replace(/\s/g, '')), 0);

const calc = (str) => {
    let val = null;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '*') {
            return val * calc(str.substr(i + 1));
        }
        else if (char !== '+') {
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
                val += charVal;
            }
        }
    }
    return val;
};

module.exports = {
    solve,
    result: 314455761823725,
    exampleResult: 693891
};
