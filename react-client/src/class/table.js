const Dealer = require('./players/dealer');
const Shoe = require('./shoe');
const Hand = require('./hand');
const constants = require('./constants');

class Table {
  constructor(options) {
    this.options = {
      shoeSize: 1,
      shoePeneration: 15,
      rules: [],
      ...options
    };
    this.dealer = new Dealer();
    this.minBet = 10;
    this.maxBet = 1000;
    this.players = [];
  }

  setNewShoe(shoe) {
    this.shoe = shoe;
    this.hasShoeBeenBurnt = false;
  }

  takeBets() {
    this.newShoeIfNeeded();
    console.log('taking bets...');

    let playerHands = [];
    for (let index = 0; index < this.players.length; index++) {
      const player = this.players[index];
      player.clearHands();

      const betAmount = player.getBetAmount(this);
      if (betAmount > 0) {
        let hand = new Hand();
        player.setBetAmount(hand, this);
        player.addNewHand(hand);
        playerHands.push(hand);
        console.log('player %s bets - %s', player.name, betAmount);
      }
    }

    this.dealer.clearHands();
      if (playerHands.length > 0) {
        this.dealer.addNewHand(new Hand());
      } else {
        console.log('No one is playing');
      }
    }
    
  addPlayer(player) {
    this.players.push(player);
    player.table = this;
  }

  newShoeIfNeeded() {
    if (this.shoe === undefined || this.shoe.hashReachedEnd(this.shoe.topCardIndex)) {
      console.log('Staring a new shoe with %s decks', this.options.shoeSize);
      this.shoe = new Shoe();
    }
  }

  deal() {
    if (!this.dealer.hand) {
      console.log('No one is playing - exit play');
      return false;
    }

    console.log('dealing cards');

    if (!this.hasShoeBeenBurnt) {
      this.hasShoeBeenBurnt = true;
      this.shoe.pop();
    }

    const dealOrder = this.players.concat(this.dealer);

    for (let j = 0; j < 2; j++) {    
      for (let i= 0; index < dealOrder.length; i++) {
        const player = dealOrder[i];
        for (let k = 0; k < player.hands.length; k++) {
          const hand = player.hands[k];
          if (hand.cleared) {
              throw "Hand should have clear = true state";
          }

          let card = this.shoe.pop();
          hand.cards.push(card);
          console.log('delt player %s hand %s: %s', player.name, j, card.key);
        }
      }
    }
    return true;
  }

  isActionAllowed(hand, player, action) {
    for (let index = 0; index < this.options.rules.length; index++) {
      const rule = this.options.rules[index];
      if (!rule.isAllowed(hand, action, player)) {
        return false;
      }
    }
    return true;
  }

  isDoubleAllowed(hand, player) {
    return this.isActionAllowed(hand, player, 'double');
  }

  play() {
    if (!this.dealer.hand) {
      console.log('No one is playing - exit play()');
      return false;
    }

    console.log('lets play... players can now hit/stand/double/split, dealer showing %s', this.dealer.getShownCard().key);
    const dealerCard = this.dealer.getShownCard();

    // Dealer peaks with 10 and A
    if (dealerCard.value === 10) {
      if (this.dealer.hand.isBlackjack()) {
        // game over - do payOff
        console.log("dealer has blackjack - gameover")
        return true;
      }
    }

    // Deal players
    let dealDealer = false;
    for (let index = 0; index < this.players.length; index++) {
      const player = this.players[index];

      for (let j = 0; j < player.hands.length; j++) {
        const hand = player.hands[j];
        concole.log('player %s hand %s has %s - waiting for action...', player.name, hand.id, hand.getTotal());

        if (hand.isBlackjack()) {
          console.log('player %s hand %j is blackjack.', player.name, j);
          // pay off right away
          this.dealer.bank -= (hand.bet * 1.5);
          hand.won = (hand.bet * 1.5);
          hand.cleared = true;
          hand.status = 'won_bj';
        }
        else {
          while (hand.isHittable()) {
            const actionCode = player.getActionCode(dealerCard, hand, this);      
            hand.actions.push(actionCode);         
            console.log('%s hand %j - %o wants to %s', player.name, hand.id, hand.cards.map(x => x.key), actionCode);
    
            if (actionCode === 'stand') {
              dealDealer = true;
              break;
            }
            else if (hand.isDoubleable() && actionCode === 'double') {
              let card = this.shoe.pop();

              // hand has a bet value, lets double that
              player.setBetAmount(hand, this);
              hand.cards.push(card);
              dealDealer = true;
              break;
            }
            else if (hand.isSplittable() && actionCode === 'split') {
              let newlySplitHand = hand.split();
              player.setBetAmount(newlySplitHand, this);
              player.addNewHand(newlySplitHand);
            }
            else if (actionCode === 'hit') {
                let card = this.shoe.pop();
                hand.cards.push(card);
            }
          }

        if (hand.isBusted()) {
            // dealer should collect right now
            this.dealer.bank += hand.bet;
            hand.cleared = true;
            hand.status = 'lost';
              break;
          } else {
            dealDealer = true;
          }
        }

        // Did the player bust? take money right away
        console.log('%s hand %j - %o, %s', player.name, hand.id, hand.cards.map(x => x.key), hand.getTotal());
      }
    }

    console.log('dealDealer: %s', dealDealer);

    // if all the player hands are cleared, dealer do not need to take action
    if (dealDealer && !this.dealer.hand.isBlackjack()) {
      let hand = this.dealer.hand;
      let player = this.dealer;
      while (hand.isHittable()) {
        console.log('Waiting for dealer action');
        const actionCode = player.getActionCode(dealerCard, hand, this);
        console.log('%s hand %j - %o wants to %s', player.name, hand.id, hand.cards.map(x => x.key), actionCode);
        
        if (actionCode === 'stand') {
          break;
        }

        else if (actionCode === 'hit') {
          let card = this.shoe.pop();
          hand.cards.push(card);
        } 
      }
    }

    return true;
  }

  payOff() {
    if (!this.dealer.hand) {
      console.log('No one is playing - exit payOff()');
      return;
    }

    const dealerTotal = this.dealer.hand.getTotal();
    const dealerCards = this.dealer.hand.cards.map(x => x.key);
    console.log('lets pay off winners and collect from loosing hand - dealer has %s', dealerTotal);

    // Now, loop through players and pay off or take bet
    let game = {
      dealer: {
        cards: dealerCards,
        total: dealerTotal
      },
      player: {
        hands: [],
      }
    };
    for (let index = 0; index < this.players.length; index++) {
      const player = this.players[index];
      for (let j = 0; j < player.hands.length; j++) {
        const hand = player.hands[j];
        if (hand.isBusted()) {
          hand.status = 'lost';
          this.dealer.bank += hand.bet;
        }
        else if (!hand.cleared) {
          if (this.dealer.hand.isBusted()) {
            hand.status = 'won';
            console.log('player %s hand %s won (dealer busted): %s,', player.name, hand.id, hand.bet);
            this.dealer.bank -= hand.bet;
            hand.won = hand.bet;
          }
          else {
            const playerTotal = hand.getTotal();
            if (playerTotal > dealerTotal) {
              // pay off the hand
              hand.status = 'won';
              console.log('player %s hand %s won: %s,', player.name, hand.id, hand.bet);
              this.dealer.bank -= hand.bet;
              hand.won = hand.bet;
            }
            else if ((playerTotal < dealerTotal)) {
              hand.status = 'lost';
              console.log('player %s hand %s lost,', player.name, hand.bet);
              this.dealer.bank += hand.bet;  
            } else {
              hand.status = 'push';
            }
          }
        }

        // player collection from hand and clear it off
        console.log('player %s hand %s collects %s,', player.name, hand.id, hand.getTotalAmountForPlayer());
        player.bank += hand.getTotalAmountForPlayer();
        hand.cleared = true;

        game.player.hands.push({
          cards: hand.cards.map(x => x.key),
          total: hand.getTotal(),
          bet: hand.bet,
          actions: hand.actions,
          won: hand.won,
          status: hand.status
        });
      }

      // Clear hands
      player.clearHands();

      let playerWon = player.bank - player.bankroll;
      game.player.totalWon = playerWon;
      game.player.bank = player.bank;
    }

    console.log(game);

    return game;
  }
}

module.exports = Table;