import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import './pomodoro.css'

const statuses = ['ready', 'running', 'completed']

class Pomodoro extends Component {
    getNextStatus = () => {
        const { status } = this.props
        switch (status) {
            case 'ready':
                return 'running'
            case 'running':
                return 'completed'
            case 'completed':
            default:
                return 'ready'
        }
    }

    render() {
        const { status, id, onClick } = this.props
        const className = classNames(
            'pomodoros__pomodoro',
            `pomodoros__pomodoro--${status}`
        )
        return (
            <div className={className} onClick={() => {onClick(id, this.getNextStatus())}}>
                
            </div>
        );
    }
}

Pomodoro.propTypes = {
    status: PropTypes.oneOf(statuses).isRequired,
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Pomodoro;