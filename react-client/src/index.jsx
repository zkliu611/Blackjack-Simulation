import React from 'react';
import ReactDOM from 'react-dom';
import PlayerInput from './components/PlayerInput.jsx';
import ResultsTable from './components/ResultsTable.jsx';
import BettingStrategyInfo from './components/BettingStrategyInfo.jsx';
import PlayingStrategyInfo from './components/PlayingStrategyInfo.jsx';
import axios from 'axios';
import $ from 'jquery';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [{}],
      modelName: '',
      bankroll: 0,
      games: 0,
      bettingStrategy: 'No Strategy',
      playingStrategy: 'No Strategy'
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get('/models')
    .then(results => {
      this.setState({
        data: results.data
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleClick() {
    var data = {};
    data.name = this.state.modelName;
    data.games = Number(this.state.games);
    data.startBankroll = Number(this.state.bankroll);
    data.bettingStrategy = this.state.bettingStrategy;
    data.playingStrategy = this.state.playingStrategy;
    //actual simulator not working yet, ending bankroll generated at random for now. 
    //FIX ME!!!!!
    if (data.playingStrategy === 'No Strategy') {
      console.log('t')
      data.endBankroll = this.state.bankroll * Math.floor((Math.random()*70+40))/100;
    } else {
      console.log('f')
      data.endBankroll = this.state.bankroll * Math.floor((Math.random()*50+70))/100;
    } 
    fetch('/models', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(() => {
      console.log('data uploaded');
    })
    .catch(err => {
      console.log(err);
    })
    alert(`You played ${data.games} games with betting strategy ${data.bettingStrategy} and playing strategy ${data.playingStrategy}, your net gain is $${data.endBankroll - data.startBankroll}`);
    this.getData();
  }

  handleChange(event) {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  handleDelete() {
    console.log('deleting')
    fetch('/models', {
      method: 'DELETE',
    })
    .then(() => {
      console.log('data deleted');
    })
    .catch(err => {
      console.log(err);
    })
  }

  render () {
    return (
    <div>
      <h1>Blackjack Simulator</h1>
      <PlayerInput handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)}/>
      <br/><br/>
      <PlayingStrategyInfo strategy={this.state.playingStrategy}/>
      <br/><br/>
      <BettingStrategyInfo strategy={this.state.bettingStrategy}/>
      <br/><br/>
      <ResultsTable data={this.state.data}/>
      <br/><br/>
      {/* <button onClick={this.handleDelete}>Delete All Data</button> */}
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));