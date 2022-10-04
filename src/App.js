import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import WordRow from './components/WordRow';
import Keyboard from './components/Keyboard';
import ResultsPopup from './components/ResultsPop';
import HelpPop from './components/HelpPop';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton } from '@mui/material';

export const AppContext = createContext()

function App() {

  const [wordList, setWordList] = useState([])

  const emptyBoard = ["","","",""]
  const constantLetter = "F"
  const [liveBoard, setLiveBoard] = useState(emptyBoard)

  const [entry, setEntry] = useState(0)

  const [wordsFound, setWordsFound] = useState([])
  const [commonWordsMissed, setCommonWordsMissed] = useState([])

  const [headShake, setHeadShake] = useState.apply(false)

  const [time, setTime] = useState(30)
  const [timeOn, setTimeOn] = useState(false)

  const [gameOver, setGameOver] = useState(false)

  const [highScore, setHighScore] = useState(localStorage.getItem("highscore4"))

  const [showHelp, setShowHelp] = useState(false)

  const letterTyped = (letter) => {
    if(entry > 3) return;
    const newBoard = [...liveBoard]
    newBoard[entry] = letter
    setLiveBoard(newBoard)
    setEntry(prev => prev+1)
    console.log(entry)
    setTimeOn(true)
  }

  const deleteLetter = () => {
    setHeadShake(false)
    if(entry === 0) return;
        const newBoard = [...liveBoard]
        newBoard[entry - 1] = ""  
        setLiveBoard(newBoard)
        setEntry(prev => prev-1)
        return;
  }

  const enterWord = () => {
    if(entry !== 4) return
      else{
        if(time === 0) return;
        const enteredWord = `${liveBoard.join("").toLowerCase()}`
        if(wordsFound.includes(enteredWord)) {
          setHeadShake(true)
        }
        else if (!wordList.includes(enteredWord)){
          setHeadShake(true)
        }
        else if(wordList.includes(enteredWord)){
          if(time === 0) return;
          setWordsFound([enteredWord, ...wordsFound])
          setLiveBoard(emptyBoard)
          setEntry(0)
        }
        return }
  }

  async function getWordList(){
    const response = await fetch('https://api.datamuse.com/words?sp=f???')
    if(!response.ok) {
      throw new Error("Data could not be fetched")
    } else {
      return response.json()
    }
  }

  useEffect(() => {
    if(time === 0){
      setTimeOn(false)
      setLiveBoard(emptyBoard)
      let currentGameScore = wordsFound.length
      if(highScore === null || highScore < currentGameScore){
        setHighScore(currentGameScore)
        localStorage.setItem("highscore4", currentGameScore)
      }
      setGameOver(true)
      setCommonWordsMissed(wordList.filter((obj) => {
        return wordsFound.indexOf(obj) == -1; }).slice(0,8))
    }
  },[time])


  useEffect(() => {
    let interval = null
    if(timeOn){
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    } else {
        clearInterval(interval)
    }
    return () => clearInterval(interval)

  }, [timeOn])

  useEffect(() => {
    getWordList()
      .then(response => {
        setWordList(response.map(entry => {
          return entry.word
        }))
      })
  },[])

  return (
    <div className="App">

      <Header setShowHelp={setShowHelp}/>

      <AppContext.Provider value={{liveBoard, setLiveBoard, entry, setEntry, 
        wordList, setWordList, emptyBoard, wordsFound, setWordsFound, 
        headShake, setHeadShake, letterTyped, deleteLetter, enterWord, time, constantLetter, 
        setGameOver, commonWordsMissed, showHelp, setShowHelp}}>

        <div className="main-section">
          <div className="score-timer-section">
            <IconButton disabled={false} onClick={()=>window.location.reload(false)} className="retry"><ReplayIcon /></IconButton>
            
            <div className='high-score'>🏆 {highScore === null? 0: highScore}</div>
            <div className="current-score-title">SCORE:</div>
            <div className="current-score-number">{wordsFound.length}</div>
            <div className="time-title">TIME:</div>
            <div className="time-number">{time}</div>
          </div>

          <WordRow />

          <div className="words-found">
            {wordsFound.map((word) => {
              return ( <div className='list-word'>
              {word}</div> )
            })}
          </div>
          <Keyboard />
          
          <ResultsPopup gameOver={gameOver} />
          {showHelp ? <HelpPop /> : null}

        </div>

        
      </AppContext.Provider>

    </div>
  );
}

export default App;
