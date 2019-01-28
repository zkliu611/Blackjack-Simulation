const Card = require('./card');

class Deck {
  constructor() {
    this.names = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    this.suits = ['Spades', 'Hearts', 'Diamonds','Clubs'];
    var cards = [];
    for( var s = 0; s < this.suits.length; s++ ) {
      for( var n = 0; n < this.names.length; n++ ) {
        var value = parseInt(this.names[n]);
        if (!value) {
          if (this.names[n] === 'A') {
              value = 1;
          }
          else {
              value = 10;
          }
        }
        cards.push( new Card(value, this.names[n], this.suits[s]);
      }
    }

    this.cards = cards;
  }

  getCards() {
    return this.cards;
  }

  getHashedHards() {
    var hash = {};
    for (let index = 0; index < this.cards.length; index++) {
        const card = this.cards[index];
        hash[card.key] = card;
    }

    return hash;
  }
}

module.exports = Deck;
