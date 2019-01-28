import React from 'react';
import ReactDOM from 'react-dom';
import PlayerInput from './components/PlayerInput.jsx';
import ResultsTable from './components/ResultsTable.jsx';
import BettingStrategyInfo from './components/BettingStrategyInfo.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      bettingStrategy: 'Martingale',
      playingStrategy: '',
    };
  }

  componentDidMount() {
  }

  handleClick() {
    var $p = $('span');
    var newP = $('<span>').text('')
    newP.text(' Hello World ')
    newP.css('font-size', '40px')
    $p.append(newP)
    setInterval(function() {
      $('span').each(function() {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        $(this).css('color', 'rgb(' + red + ',' + green + ',' + blue + ')');
      });
    }, 1000);
  }

  handleChange() {

  }

  render () {
    return (
    <div>
       {/* <h1>Hello World Generator</h1>
       <button onClick={this.handleClick}>hello</button>
       <br/><br/>
       <span id='hello'></span> */}
      <h1>Blackjack Simulator</h1>
      <PlayerInput />
      <br/><br/>
      <BettingStrategyInfo strategy={this.state.bettingStrategy}/>
      <br/><br/>
      <ResultsTable />
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));