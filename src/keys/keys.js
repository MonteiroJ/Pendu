import React from 'react';
import PropTypes from 'prop-types'

import './keys.css'

const Keys = ({ letter, index, feedback, onClick, clicked }) => {
    return (
        <span 
        className={`letter ${feedback}`} 
        onClick={() => onClick(letter) }
        disabled={clicked}
        >{letter}</span>
      );
}

Keys.propTypes = {
  letter: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    'justMatched',
    'justMismatched',
    'visible',
    'hidden',
]).isRequired,
  onClick: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired
}

export default Keys;
