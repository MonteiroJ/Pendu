import PropTypes from 'prop-types'
import React, {Component} from 'react'

import './score.css'

import ImageOne from '../images/1.png'
import ImageTwo from '../images/2.png'
import ImageThree from '../images/3.png'
import ImageFour from '../images/4.png'
import ImageFive from '../images/5.png'
import ImageSix from '../images/6.png'
import ImageSeven from '../images/7.png'
import ImageEight from '../images/8.png'
import ImageNine from '../images/9.png'
import ImageTen from '../images/10.png'
import ImageEleven from '../images/11.png'
import ImageTwelve from '../images/12.png'
import ImageThirteen from '../images/13.png'


class Score extends Component {

    getImage(wrongGuesses) {
        switch(wrongGuesses) {
            case 1:
                return ImageOne
            case 2:
                return ImageTwo
            case 3:
                return ImageThree
            case 4:
                return ImageFour
            case 5:
                return ImageFive
            case 6:
                return ImageSix
            case 7:
                return ImageSeven
            case 8:
                return ImageEight
            case 9:
                return ImageNine
            case 10:
                return ImageTen
            case 11:
                return ImageEleven
            case 12:
                return ImageTwelve
            case 13:
                return ImageThirteen
            default  :
                return
        }
    }

    render() {
        const { score, wrongGuesses, attemptsNb, addingScore } = this.props
        return (
            <div className="scores">
                
                <div>
                   <span className="left">
                        Score:
                        <span id="score">{score}</span>
                        <span id="adding-score" className={addingScore >= 0 ? 'plus' : 'minus' }>{addingScore > 0 ? '+' : '' }{addingScore}</span>
                    </span>
                    
                    <span className="right">
                        Tentantive(s): 
                        <span id="attempts">{attemptsNb}</span>        
                    </span>
                </div>

                {wrongGuesses>0 && <img alt="pendu" src={this.getImage(wrongGuesses)} /> }
            </div>
        )
    }
}

Score.propTypes = {
    score: PropTypes.number.isRequired,
    wrongGuesses: PropTypes.number.isRequired,
    attemptsNb: PropTypes.number.isRequired,
    addingScore: PropTypes.number.isRequired,
}



export default Score
