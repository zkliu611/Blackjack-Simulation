import React from 'react';

const PlayerInput = () => {
  return (
    <div className="player-input">
      <label>Model Name: </label>
      <input type="text" id="modelName" ></input>
      <br/>

      <label>Starting Pot $: </label>
      <input type="text" id="pot" ></input>
      <br/>

      <label># of Games To Play </label>
      <input type="email" id="games" ></input>
      <br/>

      <label>Playing Strategy</label>
      <select id="playingStrategy" >
        <option value="basic1">Basic Strategy 1</option>
        <option value="basic2">Basic Strategy 2</option>
        <option value="basic3">Basic Strategy 2</option>
      </select>
      <br/>

      <label>Betting Strategy</label>
      <select id="betstrategy" >
        <option value="martingale">Martingale</option>
        <option value="parlay">Parlay</option>
        <option value="Paroli">Paroli</option>
        <option value="DAlembert">D'Alembert</option>
        <option value="Fibonacci">Fibonacci</option>
      </select>
      <br/><br/>

      <button >Run Simulation</button>
    </div>
  )
}

export default PlayerInput;