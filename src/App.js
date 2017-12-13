import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pomodoro from './components/Pomodoro/Pomodoro'
import Button from './components/Button/Button'

const initialState = {
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

class App extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  updatePomodoro = (id, status) => {
    console.log(status);
    const updatedPomodoros = this.state.pomodoros.map((pomodoro, index) =>
      id !== index ? pomodoro : {
        ...pomodoro,
        status
      }
    )
    this.setState({ pomodoros: updatedPomodoros });
  }

  renderPomodoros = () => {
    return this.state.pomodoros.map((pomodoro, index) =>
      <Pomodoro key={index} id={index} status={pomodoro.status} onClick={this.updatePomodoro} />
    )
  }

  handleClick = (type) => {
    console.log(type + ' clicked');
  }

  resetPomodoros = () => {
    this.setState({ pomodoros: initialState.pomodoros })
  }

  startPomodoro = () => {
    const { pomodoros } = this.state
    const isAnyReady = pomodoros.some(pomodoro => pomodoro.status === 'ready')
    const isAnyRunning = pomodoros.some(pomodoro => pomodoro.status === 'running')
    if (isAnyRunning || !isAnyReady) {
      console.log('cannot start pomodoro')
      return
    }

    let found = false
    const updatedPomodoros = pomodoros.map(pomodoro => {
      if (found || pomodoro.status !== 'ready') {
        return pomodoro
      } else {
        found = true
        return {
          ...pomodoro,
          status: 'running'
        }
      }
    })
    this.setState({ pomodoros: updatedPomodoros });
  }

  stopPomodoro = () => {
    const { pomodoros } = this.state
    const isAnyRunning = pomodoros.some(pomodoro => pomodoro.status === 'running')
    if (!isAnyRunning) {
      console.log('cannot stop pomodoro')
      return
    }

    let found = false
    const updatedPomodoros = pomodoros.map(pomodoro => {
      if (found || pomodoro.status !== 'running') {
        return pomodoro
      } else {
        found = true
        return {
          ...pomodoro,
          status: 'completed' // or should it be ready?
        }
      }
    })
    this.setState({ pomodoros: updatedPomodoros });
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
          <Button label="start" type="start" onClick={this.startPomodoro} />
          <Button label="stop" type="stop" onClick={this.stopPomodoro} />
          <Button label="reset" onClick={this.resetPomodoros} />
        </div>
      </div>
    );
  }
}

export default App;
