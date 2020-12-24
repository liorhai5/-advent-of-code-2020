const solve = input => {
    let cups = input[0].split('').map(c => ({value: parseInt(c, 10), next: null}));
    for (let i = cups.length + 1; i <= 1000000; i++) {
        cups.push({value: i, next: null});
    }
    const valueToCup = new Map();
    cups.forEach((c, i) => {
        c.next = i < cups.length - 1 ? cups[i + 1] : cups[0];
        valueToCup.set(c.value, c);
    });
    let head = cups[0];
    for (let i = 0; i < 10000000; i++) {
        const picked = [head.next.value, head.next.next.value, head.next.next.next.value];
        const pickedHead = head.next;
        head.next = head.next.next.next.next;

        let destination = head.value - 1;
        while (picked.includes(destination) || destination < 1) {
            destination = destination - 1 > 0 ? destination - 1 : cups.length;
        }
        const destinationCup = valueToCup.get(destination);
        if (!destinationCup) console.log(destination, picked)
        pickedHead.next.next.next = destinationCup.next;
        destinationCup.next = pickedHead;
        head = head.next;
    }

    const cap1 = valueToCup.get(1);
    return cap1.next.value * cap1.next.next.value;
};

module.exports = {
    solve,
    result: 91408386135,
    exampleResult: 149245887792
};
