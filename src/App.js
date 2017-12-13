import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pomodoro from './components/Pomodoro/Pomodoro'
import Button from './components/Button/Button'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pomodoros: [
        {
          status: 'ready'
        },
        {
          status: 'ready'
        },
        {
          status: 'ready'
        },
        {
          status: 'ready'
        }
      ]
    }
  }
  
  updatePomodoro = (id, status) => {
    console.log(status);
    const updatedPomodoros = this.state.pomodoros.map((pomodoro, index) =>
      id !== index ? pomodoro : {
        ...pomodoro,
        status
      }
    )
    this.setState({pomodoros: updatedPomodoros});
  }

  renderPomodoros = () => {
    return this.state.pomodoros.map((pomodoro, index) => 
      <Pomodoro key={index} id={index} status={pomodoro.status} onClick={this.updatePomodoro} />
    )
  }

  handleClick = (type) => {
    console.log(type + ' clicked');
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
          <Button label="start" type="start" onClick={this.handleClick} />
          <Button label="stop" type="stop" onClick={this.handleClick} />
          <Button label="reset" />
        </div>
      </div>
    );
  }
}

export default App;
