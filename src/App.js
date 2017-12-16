import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Pomodoro from './components/Pomodoro/Pomodoro'
import Button from './components/Button/Button'
import { formatTime } from './utils'

const initialState = {
  timer: null,
  message: '...',
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
    const updatedPomodoros = this.props.pomodoros.map((pomodoro, index) =>
      id !== index ? pomodoro : {
        ...pomodoro,
        status
      }
    )
    this.props.updatePomodoros(updatedPomodoros)
  }

  renderPomodoros = () => {
    return this.props.pomodoros.map((pomodoro, index) =>
      <Pomodoro key={index} id={index} status={pomodoro.status} onClick={this.updatePomodoro} />
    )
  }

  resetPomodoros = () => {
    this.trace()
    this.props.updatePomodoros()
    this.resetTimer()
  }

  startPomodoro = () => {
    const { pomodoros } = this.props
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
    this.props.updatePomodoros(updatedPomodoros)
    this.startTimer()
  }

  stopPomodoro = (discard = true) => {
    const { pomodoros } = this.props
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
    this.props.updatePomodoros(updatedPomodoros)
    this.resetTimer()
  }

  completePomodoro = () => {
    this.stopPomodoro(false)
    this.trace('Completed!')
  }

  tick = () => {
    const { timer } = this.props
    if (timer.status === 'stopped') {
      this.completePomodoro()
      clearInterval(this.state.timer)
      return
    }

    this.props.decreaseCount()
  }

  startTimer = () => {
    clearInterval(this.state.timer) // just in case
    let timer = setInterval(this.tick, 1000)
    this.setState({ timer })
    this.props.startCount()
  }

  resetTimer = () => {
    clearInterval(this.state.timer)
    this.props.resetCount()
  }

  componentWillUnmount() {
    this.resetTimer()
  }

  render() {
    const { timer } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">{formatTime(timer.counter)}</span>
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

const mapStateToProps = (state) => ({
  pomodoros: state.pomodoros,
  timer: state.timer
})

const startAction = {
  type: 'start'
}

const decreaseAction = {
  type: 'decrease'
}

const resetAction = {
  type: 'reset'
}

const updatedPomodorosActionCreator = (pomodoros) => ({
  type: 'updatePomodoros',
  pomodoros
})

const mapDispatchToProps = (dispatch) => ({
  startCount: () => dispatch(startAction),
  decreaseCount: () => dispatch(decreaseAction),
  resetCount: () => dispatch(resetAction),
  updatePomodoros: (data) => dispatch(updatedPomodorosActionCreator(data))
})

const connectedApp = connect (
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp;
