import React from 'react';

const BettingStrategyInfo = ({strategy}) => {
  let info = '';
  if (strategy === 'Martingale') {
    info = 'martingale info'
  }
  if (strategy === 'Parlay') {
    info = 'parlay info'
  }
  if (strategy === 'Paroli') {
    info = 'Paroli info'
  }
  if (strategy === "D'Alembert") {
    info = "D'Alembert info";
  }
  if (strategy === 'Fibonacci') {
    info = 'Fibonacci info'
  }
  return (
  <div>{info}</div>
  )
}

export default BettingStrategyInfo;