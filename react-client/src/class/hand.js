const constants = require('./constants');

class Hand {
  constructor() {
    this.cards = [];
    this.bet = 0;       // bet amount for the hand
    this.won = 0;       // amount won
    this.cleared = false;       // hand is paid off or amount taken
    this.splitFrom = undefined;
    this.actions = [];
    this.isSplit = false;
  }

  getHardTotal() {
    var total = 0;
    for (var i = 0; i< this.cards.length; i++) {
      let card = this.cards[i];
      total += card.value;
    }
    return total;
  }

  getTotal() {
    var total = this.getHardTotal();

    // if there's an Ace card, add 11 instead of 1 if total is < 11
    if (this.hasCardOfValue(1) && total <= 11) {
        total += 10;
    }

    return total;
  }

  isBlackjack() {
    // To hit black jack, must be 2 cards and have A + 10
    if (this.cards.length != 2) {
      return false;
    }
    return this.hasAceCard() && this.hasCardOfValue(10);
  }

  hasAceCard() {
    return this.hasCardOfValue(1);
  }

  hasCardOfValue(value) {
    var found = false;
    for(var i = 0; i < this.cards.length; i++) {
      if (this.cards[i].value === value) {
        found = true;
        break;
      }
    }

    return found;
  }

  // Split any card
  isSplittable() {
    if (this.cards.length != 2) {
      return false;
    }

    return (this.cards[0].value == this.cards[1].value);
  }

  // Doubleable on any 2
  isDoubleable() {
    if (this.cards.length != 2) {
      return false;
    }

    return true;
  }

  isHittable() {
    if (this.isBusted()) {
      return false;
    }

    // If the card is A and the hand was split - you can hit once, unless you can resplit
    if (this.cards[0].value === 1) {
      if (this.isSplit && !this.isSplittable() && this.cards.length >= 2) {  
        return false;
      }
    }

    return true;
  }

  split() {
      // Split current hand into two
    if (this.isSplittable()) {
      this.isSplit = true;

      let hand = new Hand();
      hand.splitFrom = this;
      hand.isSplit = true;
      hand.cards.push(this.cards.pop());
      return hand;
    }
  }

  isBusted() {
    return this.getTotal() > 21;
  }

  isSoft() {
    return this.hasAceCard() && this.getHardTotal() <= 11;
  }

  getTotalAmount() {
    return this.bet + this.won;
  }

  getTotalAmountForPlayer() {
    if (this.status === 'lost') {
      return 0;
    }
    if (this.status === 'push') {
      return this.bet;
    }
    if (this.status === 'won_bj') {
      return this.bet * 2.5;
    }
    return this.getTotalAmount();
  }
}

module.exports = Hand;