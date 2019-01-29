const BasePlayer = require('./basePlayer');

class Dealer extends BasePlayer {
  constructor() {
      super(100000000);
      this.hand = null;
      this.name = 'Dealer';
  }

  // Dealer can't have multi hand
  addNewHand(hand) {
    this.clearHands();
    super.addNewHand(hand);
    this.hand = hand;
  }

  clearHands() {
    super.clearHands();
    this.hand = undefined;
  }

  getShownCard() {
    return this.hand.cards[1];
  }

  shouldHit() {
    if (this.hand.getTotal() > 17) {
      return false;
    }
    return (this.hand.getHardTotal() < 17);
  }

  shouldStand() {
    return !this.shouldHit();
  }
}

module.exports = Dealer;