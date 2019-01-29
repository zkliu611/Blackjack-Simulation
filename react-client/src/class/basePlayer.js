class BasePlayer {

  constructor(bankroll) {
      this.bank = bankroll;
      this.bankroll = this.bank;
      this.history = [];
      this.betSize = 10;     
      this.hands = [];
      this.name = 'Dummy';
      this.totalGames = 0;        // true game count, do not include splits
      this.totalHands = 0;        // total hands played - includes splits
      this.stats = {};
      this.bettingPattern = undefined;
    }

  // maintains history to test correctness
  addNewHand(hand) {
    this.history.push(hand);
    this.totalHands++;
    
    if (hand.cards.length === 0) {
        this.totalGames++;
    }

    console.log('Player %s adds a new hand: %o', this.name, {id: hand.id, bet: hand.bet});
    this.hands.push(hand);
  }

  clearHands() {
    for (let index = 0; index < this.hands.length; index++) { // record hand(s) status
      const hand = this.hands[index];
      this.stats[hand.status]++;
    }
    this.hands = [];
  }

  //Allow player to figure out how much to bet
  setBetAmount(hand, table) {
    var bet = this.getBetAmount(table);

    if (hand.cards.length === 0) {
      // new hand
    }
    else if (!hand.bet && hand.splitFrom) {
      // was newly split from another hand - must copy the main bet
      bet = hand.splitFrom.bet;
    }
    else {
      // must be double - the only other bet allowed
      bet = hand.bet;
    }

    console.log('betting %s on hand, new bet: %s', bet, hand.bet + bet)

    this.bank -= bet;
    hand.bet += bet;
  }

  shouldHit(dealerCard, hand) {
    if (this.hand.getHardTotal < 17) {
      return true;
    }
    return false;
  }

  shouldSplit(dealerCard, hand) {
    return false;
  }

  shouldDouble(dealerCard, hand) {
    return false;
  }

  shouldSurrender(dealerCard, hand) {
    return false;
  }

  shouldStand(dealerCard, hand) {
    if (this.hand.getHardTotal >= 17) {
      return true;
    }
    return false;
  }

  getBetAmount(table) {
    let betSize = this.betSize;
    if (this.bettingPattern) {
      betSize = this.bettingPattern.getBetSize(this, table);
    }

    return Math.min(betSize, this.bank);
  }

  getActionCode(dealerCard, hand, table) {
    if (this.shouldDouble(dealerCard, hand, table)) {
      return 'double';
    } else if (this.shouldSplit(dealerCard, hand, table)) {
      return 'split';
    } else if (this.shouldSurrender(dealerCard, hand, table)) {
      return 'surrender';
    } else if (this.shouldHit(dealerCard, hand, table)) {
      return 'hit';
    } else if (this.shouldStand(dealerCard, hand, table)) {
      return 'stand';
    } 
  }

  getWinStreak() {
    let winStreak = 0;
    for (let index = this.history.length -1; index >= 0; index--) {
      const hand = this.history[index];
      if (hand.status === 'lost' || hand.status === 'push') {
        break;
      }
      else if (hand.status !== 'push') {
        winStreak++;
      }
    }

    return winStreak;
  }
}

module.exports = BasePlayer;
