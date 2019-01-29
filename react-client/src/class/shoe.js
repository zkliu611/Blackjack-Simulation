const Deck = require('./deck');
var shuffle = require('shuffle-array');

class Shoe {
  constructor(totalDecks, penetrationPercentage) {
    var cards = [];
    for (var i = 0; i < totalDecks; i++) {
      let deck = new Deck();
      cards = cards.concat(deck.getCards());
    }

    this.cards = shuffle(cards);
    this.penetrationPercentage = penetrationPercentage;
    this.topCardIndex = 0;      // Current index
  }

  getCards() {
    return this.cards;
  }

  pop() {
    return this.cards[this.topCardIndex++];
  }

  hashReachedEnd(currentCardIndex) {
    let nonPlayableCards = Math.floor(this.penetrationPercentage / 100 * this.cards.length);
    let stopPoint = this.cards.length - nonPlayableCards;

    return (currentCardIndex > stopPoint);
  }

}

module.exports = Shoe;
