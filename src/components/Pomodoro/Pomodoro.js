import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import './pomodoro.css'

class Pomodoro extends Component {
    render() {
        const { completed, id, handleClick } = this.props
        const className = classNames('pomodoro', {'pomodoro__completed': completed})
        return (
            <div className={className} onClick={() => {handleClick(id)}}>
                
            </div>
        );
    }
}

Pomodoro.propTypes = {
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default Pomodoro;