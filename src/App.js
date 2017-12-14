import React, { Component } from 'react';
import './App.css';
import Pomodoro from './components/Pomodoro/Pomodoro'
import Button from './components/Button/Button'
import { formatTime } from './utils'

const pomodoroSize = 25 * 60

const initialState = {
  timer: null,
  counter: pomodoroSize,
  message: '...',
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

  trace = (message = '...') => {
    this.setState({ message })
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
    this.trace()
    this.setState({ pomodoros: initialState.pomodoros })
    this.resetTimer()
  }

  startPomodoro = () => {
    const { pomodoros } = this.state
    const isAnyReady = pomodoros.some(pomodoro => pomodoro.status === 'ready')
    const isAnyRunning = pomodoros.some(pomodoro => pomodoro.status === 'running')
    if (isAnyRunning) {
      this.trace('Already started...')
      return
    } else if (!isAnyReady) {
      this.trace('Set completed!')
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
    this.trace('Started!')
    this.setState({ pomodoros: updatedPomodoros });
    this.startTimer()
  }

  stopPomodoro = (discard = true) => {
    const { pomodoros } = this.state
    const isAnyRunning = pomodoros.some(pomodoro => pomodoro.status === 'running')
    if (!isAnyRunning) {
      this.trace('Nothing to stop...')
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
          status: discard ? 'ready' : 'completed'
        }
      }
    })
    this.trace('Stopped!')
    this.setState({ pomodoros: updatedPomodoros });
    this.stopTimer()
  }

  completePomodoro = () => {
    this.stopPomodoro(false)
    this.trace('Completed!')
  }

  tick = () => {
    const { counter } = this.state
    if (counter <= 0) {
      this.completePomodoro()
      clearInterval(this.state.timer)
      return
    }

    this.setState({
      counter: counter - 1
    })
  }

  setTimer = (counter = pomodoroSize) => {
    this.setState({ counter })
  }

  playTimer = () => {
    this.pauseTimer() // just in case
    let timer = setInterval(this.tick, 1000)
    this.setState({ timer })
  }

  pauseTimer = () => {
    clearInterval(this.state.timer)
  }

  startTimer = (counter = pomodoroSize) => {
    this.setTimer(counter)
    this.playTimer()
  }

  stopTimer = () => {
    this.pauseTimer()
    this.setTimer(0)
  }

  resetTimer = (counter) => {
    this.pauseTimer()
    this.setTimer(counter)
  }

  componentWillUnmount() {
    this.pauseTimer()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">{formatTime(this.state.counter)}</span>
          <span>{this.state.message}</span>
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
