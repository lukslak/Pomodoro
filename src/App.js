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

  togglePomodoro = (id) => {
    const updatedPomodoros = this.state.pomodoros.map((pomodoro, index) =>
      id === index ? !pomodoro : pomodoro
    )
    this.setState({pomodoros: updatedPomodoros});
  }

  renderPomodoros = () => {
    return this.state.pomodoros.map((pomodoro, index) => 
      <Pomodoro key={index} id={index} completed={pomodoro} handleClick={this.togglePomodoro} />
    )
  }

  renderButton = (label, type = 'default') => {
    const colors = {
      default: {
        backgroundColor: 'dodgerblue',
        color: 'white'
      },
      start: {
        backgroundColor: '#79A620',
        color: 'white'
      },
      stop: {
        backgroundColor: 'firebrick',
        color: 'white'
      },
    }
    return (
      <div style={{ padding: 15, fontSize: '1.5em', ...colors[type] }}>
        {label.toUpperCase()}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello World</h1>
        </header>
        <div className="pomodoros">
          {this.renderPomodoros()}
        </div>
        <div className="buttons">
          {this.renderButton('start', 'start')}
          {this.renderButton('stop', 'stop')}
          {this.renderButton('reset')}
        </div>
      </div>
    );
  }
}

export default App;
