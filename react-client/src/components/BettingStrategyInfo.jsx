import React from 'react';

const BettingStrategyInfo = ({strategy}) => {
  let info = '';
  if (strategy === 'No Strategy') {
    info = 'No strategy select, player will always bet only the table minimum by default.'
  }
  if (strategy === 'Martingale') {
    info = 'The Martingale Betting Strategy will double your bet each time you lose, and restart once you win a hand.'
  }
  if (strategy === 'Parlay') {
    info = 'The Parlay Betting Strategy will gradually increase your bet when you win, and restart once you lose a hand. Parlay sequance = 1,2,3,4,6,9,13,19...'
  }
  if (strategy === 'Paroli') {
    info = 'The Paroli Betting Strategy will double your bet each time you win, and restart once you win 3 hand consecutively or when you lose a hand, which ever comes first.'
  }
  if (strategy === "D'Alembert") {
    info = "D'Alembert Betting strategy will double your bet when lose, and halve your bet when win.";
  }
  if (strategy === 'Fibonacci') {
    info = 'The Fibonacci Betting Stratey will gradually increase your bet following the Fibonacci sequence, and restart once your lose. Fibonacci sequence = 1,1,2,3,5,8,13,21,34... '
  }
  if (strategy === 'Kelly Criterion') {
    info = 'The Kelly Criterion Betting Stratey requires knowledage of card count and varies bet base on card count.'
  }
  return (
  <div>
    Betting Strategy: <br/>
    {info}
  </div>
  )
}

export default BettingStrategyInfo;