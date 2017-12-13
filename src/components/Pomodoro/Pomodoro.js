import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './pomodoro.css'

class Pomodoro extends Component {
    render() {
        const className = this.props.completed ? 'pomodoro pomodoro__completed' : 'pomodoro'
        return (
            <div className={className}>
                
            </div>
        );
    }
}

Pomodoro.propTypes = {
    completed: PropTypes.bool.isRequired,
};

export default Pomodoro;