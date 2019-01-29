const Strategy = require('./basic-strategy.json');

class BasicStrategy {
  
  static getAction(dealerCard, hand, options) {
      // No way to handle a hand with 1 card, it should always hit thou
    if (hand.cards.length === 1) {
      return 'H';
    }
    
    options = {
      hitSoft17: 1,   // 0 - stand, 1 - hit
      decks: 2,
      das: 1,         // 0 - allowed, 1 - not allowed
      isHardOnly: false,
      ...options
    };

    let decks = 0;
    if (options.decks === 1) {
      decks = 0;
    }
    else if (options.decks === 2) {
      decks = 1;
    }
    else {
      decks = 2;
    }

    let key = `${(options.hitSoft17 ? 'S17' : 'H17')}_${decks}`;
    let strategy = Strategy[key];

    let row, col;
    if (dealerCard.value === 1) {
      col = 9;
    } else {
      col = dealerCard.value - 2;
    }

    if (!options.isHardOnly && hand.isSplittable()) {
      row = hand.getHardTotal() + 'p';
    }
    else if (!options.isHardOnly && hand.isSoft()) {
      row = hand.getTotal() + 's';
    }
    else {
      row = (hand.getHardTotal() > 5 ? hand.getHardTotal() : 5) + 'h';
    }

    console.log('KEY', 'row, col', key, row, col, strategy[row][col])
    return strategy[row][col];
  }
}

module.exports = BasicStrategy;