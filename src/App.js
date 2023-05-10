import React, { useState, useEffect } from "react";

const words = ["apple", "banana", "orange", "pear", "grape", "pineapple", "strawberry", "blueberry", "watermelon"];

export default function App() {
  const [lettersGuessed, setLettersGuessed] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [guessesRemaining, setGuessesRemaining] = useState(9);
  const [word, setWord] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [wordArrayWithUnderscore, setWordArrayWithUnderscore] = useState([]);
  const [wordArrayWithUnderscoreString, setWordArrayWithUnderscoreString] = useState("");
  const [correctLetterIndices, setCorrectLetterIndices] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [guessedWordArray, setGuessedWordArray] = useState([]);
  const [wordLength, setWordLength] = useState(0); // new state variable to store the length of the word

  
  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    setLettersGuessed([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setGuessesRemaining(9);
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    const newWordArray = newWord.split("");
    setWordArray(newWordArray);
    const newGuessedWordArray = newWordArray.map(() => "_");
    setGuessedWordArray(newGuessedWordArray);
    setWordArrayWithUnderscoreString(newGuessedWordArray.join(" "));
    setWordLength(newWord.length); // set the word length state variable
    
    // Show one random letter in the word
    const randomIndex = Math.floor(Math.random() * newWord.length);
    newGuessedWordArray[randomIndex] = newWord[randomIndex];
    
    setGuessedWordArray(newGuessedWordArray);
    setWordArrayWithUnderscoreString(newGuessedWordArray.join(" "));
  }
  
  

  function resetGame() {
    startGame();
    setWins(0);
    setLosses(0);
  }

  function checkLetter(letter) {
  setLettersGuessed([...lettersGuessed, letter]);
  setSelectedLetter(letter); // add a state variable to keep track of the selected letter
  setShowConfirmation(true); // show the confirmation button
  update(letter)



  // update the word array and the guessed letters
  if (wordArray.includes(letter)) {
    const newGuessedWordArray = guessedWordArray.map((value, index) => {
      if (wordArray[index] === letter) {
        setCorrectLetterIndices([...correctLetterIndices, index]);
        return letter;
      } else {
        return value;
      }
    });
    setGuessedWordArray(newGuessedWordArray);
  } else {
    setIncorrectLetters([...incorrectLetters, letter]);
    setGuessesRemaining(guessesRemaining - 1);
  }
}
  

  
  function confirmLetter() {
    setShowConfirmation(false); // hide the confirmation button
    setSelectedLetter(null); // reset the selected letter
  }
  
  function renderConfirmationButton() {
    if (showConfirmation) {
      return (
        <button onClick={() => confirmLetter()}>Confirm {selectedLetter}</button>
      );
    }
    return null;
  }
  

    
    function checkWin() {
    if (wordArrayWithUnderscore.join("") === word) {
    setWins(wins + 1);
    startGame();
    alert("You win!");
    }
    }
    
    function checkLoss() {
    if (guessesRemaining === 0) {
    setLosses(losses + 1);
    startGame();
    alert("You lose!");
    }
    }
    
    function update(letter) {
      checkWin();
      checkLoss();
      if (wordArray.includes(letter)) {
        const newCorrectLetterIndices = [...correctLetterIndices, ...wordArray.map((l, i) => l === letter ? i : null).filter(index => index !== null)];
        setCorrectLetterIndices(newCorrectLetterIndices);
        
        const newWordArrayWithUnderscore = wordArray.map((l, i) =>
          newCorrectLetterIndices.includes(i) ? l : wordArrayWithUnderscore[i]
        );
        setWordArrayWithUnderscore(newWordArrayWithUnderscore);
        setWordArrayWithUnderscoreString(newWordArrayWithUnderscore.join(" "));
      }
    }
    
    

    
    
    function showRandomLetter() {
  const randomIndex = Math.floor(Math.random() * word.length);
  const newWordArrayWithUnderscore = [...wordArrayWithUnderscore];
  newWordArrayWithUnderscore[randomIndex] = word[randomIndex];
  setWordArrayWithUnderscore(newWordArrayWithUnderscore);
  setWordArrayWithUnderscoreString(newWordArrayWithUnderscore.join(" "));
}

function display() {
  return (
    <div>
      <h2>Wins: {wins}</h2>
      <h2>Losses: {losses}</h2>
      <h2>Guesses Remaining: {guessesRemaining}</h2>
      <h2>Letters Guessed: {lettersGuessed.join(", ")}</h2>
      <h2>Word: {wordArrayWithUnderscoreString}</h2>
      <h2>Word Length: {wordLength}</h2>
      <button onClick={() => showRandomLetter()}>Hint</button>
    </div>
  );
}

    
    return (
    <div className="App">
    <h1>Hangman Game</h1>
    {display()}
    <button onClick={() => resetGame()}>Reset Game</button>
    <div>
    <h2>Letters</h2>
    <div>
    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
  <button key={letter} onClick={() => checkLetter(letter)} disabled={lettersGuessed.includes(letter)}>
    {letter} {selectedLetter === letter && showConfirmation && renderConfirmationButton()}
  </button>
))}
    </div>
    </div>
    </div>
    );
    }

  