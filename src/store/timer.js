const initialState = {
    status: 'idle',
    counter: 25 * 60
}

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'decrease':
            if (state.status !== 'active') {
                alert('something is wrong')
                return state
            }

            const status = state.counter <= 1 ? 'stopped' : state.status
            const counter = state.counter < 1 ? state.counter : state.counter - 1
            return {
                ...state,
                status,
                counter
            }

        case 'start':
            return {
                ...state,
                status: 'active'
            }

        case 'stop':
            return {
                ...state,
                status: 'stopped'
            }

        case 'reset':
            return initialState

        default:
            return state
    }
}

export default timerReducer
