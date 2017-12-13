import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import './button.css'

const Button = ({label, type = 'default'}) => {
    const className = classNames('button', `button__${type}`)
    return (
        <div className={className}>
            {label}
        </div>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'start', 'stop']),
};

export default Button;