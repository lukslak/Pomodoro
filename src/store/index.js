import { combineReducers } from 'redux'
import pomodoros from './pomodoro'
import timer from './timer'

const rootReducer = combineReducers({
    pomodoros,
    timer
})

export default rootReducer
