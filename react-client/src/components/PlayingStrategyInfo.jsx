import React from 'react';

const PlayingStrategyInfo = ({strategy}) => {
  let info = '';
  if (strategy === 'No Strategy') {
    info = 'No strategy select, player will try to reach 17 by default.'
  }
  if (strategy === 'Basic Strategy') {
    info = 'Player will follow the basic backjack strategy.'
  }
  if (strategy === 'Beginner Card Counter') {
    info = 'Player is a beginner card counter, his card count have an error rate of +/- 0-2 cards.'
  }
  if (strategy === 'Perfect Card Counter') {
    info = 'Player is a perfect card counter, he always gets the exact card count.'
  }
  return (
  <div>
    Playing Strategy: <br/>
    {info}
  </div>
  )
}

export default PlayingStrategyInfo;