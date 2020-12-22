const {parseDecks, calcScore} = require('./solve1');

const solve = input => calcScore(playGame(...parseDecks(input)).deck);

const playGame = (deck1, deck2) => {
    const mem1 = new Map();
    const mem2 = new Map();
    while (deck1.length && deck2.length) {
        const deck1Str = deck1.join(',');
        const deck2Str = deck2.join(',');
        if (mem1.has(deck1Str) || mem2.has(deck2Str)) {
            return {deck: deck1, player: '1'};
        } else {
            mem1.set(deck1Str, true);
            mem2.set(deck2Str, true);
        }

        const card1 = deck1.shift();
        const card2 = deck2.shift();

        if (deck1.length >= card1 && deck2.length >= card2) {
            const {player} = playGame(deck1.slice(0, card1), deck2.slice(0, card2));
            if (player === '1') {
                deck1.push(card1, card2);
            } else {
                deck2.push(card2, card1);
            }
        } else {
            if (card1 > card2) {
                deck1.push(card1, card2);
            } else {
                deck2.push(card2, card1);
            }
        }
    }

    return deck1.length ? {deck: deck1, player: '1'} : {deck: deck2, player: '2'};
};

module.exports = {
    solve,
    result: 33304,
    exampleResult: 291
};
