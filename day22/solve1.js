const solve = input => {
    const [deck1, deck2] = parseDecks(input);

    while (deck1.length && deck2.length) {
        const card1 = deck1.shift();
        const card2 = deck2.shift();
        if (card1 > card2) {
            deck1.push(card1, card2);
        } else {
            deck2.push(card2, card1);
        }
    }

    return calcScore(deck1.length ? deck1 : deck2);
};

const parseDecks = input => input.join('\n').split('\n\n').map(deck => deck.split('\n').slice(1).map(x => parseInt(x, 10)));

const calcScore = deck => deck.reduce((sum, card, index) => sum + card * (deck.length - index), 0);

module.exports = {
    solve,
    result: 36257,
    exampleResult: 306,
    parseDecks,
    calcScore
};
