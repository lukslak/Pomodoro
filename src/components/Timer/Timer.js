import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../utils'

const Timer = ({counter}) => {
    return (
        <span className="App-title">
            {formatTime(counter)}
        </span>
    );
};

Timer.propTypes = {
    counter: PropTypes.number.isRequired,
};

export default Timer;