import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pomodoro from './components/Pomodoro/Pomodoro'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pomodoros: [
        false,
        false,
        false,
        false
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello World</h1>
        </header>
        <div className="pomodoros">
          {this.state.pomodoros.map((pomodoro, index) => <Pomodoro key={index} completed={pomodoro} />)}
        </div>
      </div>
    );
  }
}

export default App;
