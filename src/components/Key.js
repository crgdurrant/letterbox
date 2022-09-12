import React, { useContext, useState } from "react";
import { AppContext } from "../App";

export default function Key({letter, conLetter}){

  const { liveBoard, setLiveBoard, entry, setEntry, wordList, setWordList, 
    emptyBoard, wordsFound, setWordsFound,letterTyped, deleteLetter, enterWord, time } = useContext(AppContext) 

  const letterPressed = () => {
    if(time === 0) return;
    if (letter === 'Enter'){
      enterWord()
    } 
      else if (letter === 'Delete'){
        deleteLetter()
    } 
      else{
        letterTyped(letter)
    }
  }

  return (
    <div className={"key"+ (conLetter ? " color-key": "")} onClick={letterPressed}>{letter}</div>
  )
}