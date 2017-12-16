const initialState = [
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

const pomodoroReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'updatePomodoros':
            return action.pomodoros === undefined ? initialState : action.pomodoros

        default:
            return state
    }
}

export default pomodoroReducer
