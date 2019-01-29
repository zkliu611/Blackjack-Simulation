import React from 'react';

const PlayerInput = ({handleChange, handleClick}) => {
  return (
    <div className="player-input">
      <label>Simulation Model Name: </label>
      <input type="text" id="modelName" onChange={handleChange}></input>
      <br/>

      <label>Starting Bankroll $: </label>
      <input type="text" id="bankroll" onChange={handleChange}></input>
      <br/>

      <label># of Games </label>
      <input type="text" id="games" onChange={handleChange}></input>
      <br/>

      <label>Playing Strategy</label>
      <select id="playingStrategy" onChange={handleChange} >
        <option>No Strategy</option>
        <option>Basic Strategy</option>
        <option>Beginner Card Counter</option>
        <option>Perfect Card Counter</option>
      </select>
      <br/>

      <label>Betting Strategy</label>
      <select id="bettingStrategy" onChange={handleChange}>
        <option>No Strategy</option>
        <option>Martingale</option>
        <option>Parlay</option>
        <option>Paroli</option>
        <option>D'Alembert</option>
        <option>Fibonacci</option>
        <option>Kelly Criterion</option>
      </select>
      <br/><br/>

      <button onClick={handleClick}>Run Simulation</button>
    </div>
  )
}

export default PlayerInput;