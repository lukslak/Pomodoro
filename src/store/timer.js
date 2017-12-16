const initialState = {
    status: 'idle',
    counter: 25 * 60
}

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'decrease':
            if (state.counter <= 0) {
                return {
                    ...state,
                    status: 'stopped'
                }
            } else {
                return {
                    ...state,
                    counter: state.counter - 1
                }
            }
        default:
            return state
    }
}

export default timerReducer
