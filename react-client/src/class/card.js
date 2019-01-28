class Card {
  constructor(value, name, suit) {
      this.value = value;
      this.name = name;
      this.suit = suit;
      this.key = this.name + this.suit.toLowerCase().charAt(0);
  }

  getSortValue() {
      return this.value === 1 ? 11 : this.value;
  }
}

module.exports = Card;