import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import './button.css'

const Button = ({label, type = 'default', onClick = () => {}}) => {
    const className = classNames(
        'buttons__button',
        `buttons__button--${type}`
    )
    return (
        <div className={className} onClick={() => onClick(type)}>
            {label}
        </div>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'start', 'stop']),
    onClick: PropTypes.func,
};

export default Button;