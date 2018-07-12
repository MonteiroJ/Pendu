import React, { Component } from 'react';
import './App.css';
import RandomWord from'random-words'

import Score from './score/score'
import Word from './word/word'
import Keys from './keys/keys'

const ALPHABET= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const MAX_ATTEMPTS = 13

class App extends Component {

  // score.js : score, wrongGuesses, attemptsNb
  // word.js : word, usedLetters
  // keys.js : letter, index, feedback, onClick
  state = {
    score: 0,
    wrongGuesses: 0,
    attemptsNb: 0,
    word: '',
    usedLetters: [],
    addingScore: 0,
    won: false,
  }

  constructor(props) {
    super(props);
    this.state.word = this.getWord()
  }
  
  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
        (letter) => (usedLetters.includes(letter) ? letter : '_')
    )
}

  handleKeysClick = (letter) => {
    const {score, wrongGuesses, attemptsNb, usedLetters, word, addingScore} = this.state

    if(usedLetters.includes(letter))
      return
    var newScore = score
    var newWrongGuesses = wrongGuesses
    var newAddingScore = addingScore
    var newAttemptsNb = attemptsNb + 1
    var newUsedLetters = usedLetters

    // On ajoute la lettre pressé
    newUsedLetters.push(letter)

    // Création d'un bool pour savoir la lettre est présente dans le mot
    var inWord = word.includes(letter) ? true : false
    // Selon inWord, vrai ou faux, on incrémente ou décrémente le score
    newScore = newScore +( inWord ? 2 : -1)
    
    // Affiche à l'écran le score ajouter ou enlever
    newAddingScore = inWord ? 2 : (-1)

    // Si inWord est faux, alors on incréménte le compteur de mauvaises réponses
    if( !inWord ) {
      newWrongGuesses = newWrongGuesses +1
    }

    // On vérifie si la partie est terminé
    var newWon
    if(wrongGuesses > MAX_ATTEMPTS) {
      newWon = false
    }
    if ( !this.computeDisplay(word, usedLetters).includes('_')) {
      newWon = true
    }


    this.setState({
      score: newScore,
      wrongGuesses: newWrongGuesses,
      attemptsNb: newAttemptsNb,
      usedLetters: newUsedLetters,
      addingScore: newAddingScore,
      won: newWon,
    })
  }

  getFeedbackForKeys(letter) {
    const { usedLetters, word } = this.state

    if (usedLetters === null || usedLetters === undefined || usedLetters.length === 0 ) 
      return 'visible'

    if(!usedLetters.includes(letter)) {
      return 'visible'
    } else {
      return usedLetters.includes(letter) && word.includes(letter) ? 'justMatched' : 'justMismatched'
    }

  }

  getWord() {
    var word = RandomWord({min: 1, max: 1}).join(" ").toUpperCase()
    console.log(word)
    return word
  }

  isKeyUsed(letter) {
    const { usedLetters } = this.state
    return usedLetters.includes(letter) ? true : false

  }

  // COMPONENT @Autowired
  reset = () => {
    this.setState({
      score: 0,
      wrongGuesses: 0,
      attemptsNb: 0,
      word: this.getWord(),
      usedLetters: [],
      addingScore: 0,
      won: false,
    })

  }

  Rejouer = () => {
    return (
      <div className='replay'>
        <input type='button' value="Rejouer" onClick={this.reset} />
      </div>
    )
  }

  BoardGame = () => {
    const {word, usedLetters} = this.state
  
    return (
      <div className="App">
      <Word 
        computeWord={this.computeDisplay(word, usedLetters)}
      />
      
      <div id="alphabet">
      {
        ALPHABET.map( (letter, index) => 
          <Keys 
            letter={letter}
            key={index}
            feedback={this.getFeedbackForKeys(letter)}
            onClick={this.handleKeysClick}
            clicked={this.isKeyUsed(letter)}
          />
        )
      }
    </div>
    </div>
    )
  }

  GameOver = () => {
    const {won, attemptsNb, wrongGuesses} = this.state
    var message, nbAttempts, error = ''

    if (won) {
      message = 'Vous avez gagné !'
      nbAttempts = 'en ' + attemptsNb + ' tentative(s)'
      error = 'avec ' + wrongGuesses + ' erreur(s)'
    } else {
      message = 'Vous avez perdu !'
    }

    return( 
    
      <div className="App">
        <div className="gameover">
          <h2>{message}</h2>
          {
            won ? (
              <p>{nbAttempts} <br />{error} </p>
            ) : (
              <p></p>
            ) 
          }


      </div>

        <this.Rejouer />

      </div>
    )

  }

  render() {
    
    const {score, wrongGuesses, attemptsNb, addingScore, word, usedLetters } = this.state
    var foundEntireWord =  this.computeDisplay(word, usedLetters).includes('_')
    var exceededAttemps = wrongGuesses < MAX_ATTEMPTS
    
    return (
      <div className="App">

        <div className="left widthHalf">
        
          { foundEntireWord && exceededAttemps  ? <this.BoardGame /> : <this.GameOver /> }
        
        </div>


        <div className="right widthHalf">
            <Score 
              score={score}
              wrongGuesses={wrongGuesses}
              attemptsNb={attemptsNb}
              addingScore={addingScore}
            />
          </div>

      </div>
    );
  }
}

export default App;
