import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './word.css'

class Word extends Component {

    computeDisplay(phrase, usedLetters) {
        return phrase.replace(/\w/g,
            (letter) => (usedLetters.includes(letter) ? letter : '_')
        )
    }

    render() {
        const {computeWord} = this.props
        
        return (
        <div id="word">
            {computeWord.split('').map( (letter, index) => <span key={index} className="letter">{letter}</span>)}
        </div>
        );
    }
  
}
Word.propTypes = {
    computeWord: PropTypes.string.isRequired,
}

export default Word;
