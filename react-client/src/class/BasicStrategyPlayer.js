const BasePlayer = require('./basePlayer')
const BasicStrategy = require('./strategy/basicStrategy')

class BasicStrategyPlayer extends BasePlayer {
    constructor(bankroll) {
      super(bankroll);
      this.name = 'Basic Strategy Player';
    }

    shouldHit(dealerCard, hand, table) {
      let options = {
        isHardOnly: this.bank < hand.bet,
        decks: table.options.shoeSize
      };
      let action = this.getAction(dealerCard, hand, options);
      return (action.indexOf("H") > -1) || (action.indexOf("Q") > -1);
    }

    shouldDouble(dealerCard, hand, table) {
      if (!hand.isDoubleable())
        return false;

      if (!table.isDoubleAllowed(hand, this)) {
        return false;
      }
      
      return this.bank >= hand.bet && (this.getAction(dealerCard, hand, {decks: table.options.shoeSize}).indexOf("D") > -1);
    }

    shouldSplit(dealerCard, hand, table) {
      if (!hand.isSplittable())
        return false;

      let action = this.getAction(dealerCard, hand, {decks: table.options.shoeSize});
      return this.bank >= hand.bet && (action.indexOf("P") > -1) || (action.indexOf("Q") > -1);
    }

    shouldStand(dealerCard, hand, table) {
      return !(this.shouldHit(dealerCard, hand, table) || 
        this.shouldDouble(dealerCard, hand, table) || 
        this.shouldSplit(dealerCard, hand, table));
    }

    getAction(dealerCard, hand, options) {
      return BasicStrategy.getAction(dealerCard, hand, options);
    }
}

module.exports = BasicStrategyPlayer;