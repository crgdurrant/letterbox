import React, { useCallback, useEffect, useContext } from "react";
import { AppContext } from "../App";
import Key from "./Key";

export default function Keyboard(){
  
  const { letterTyped, deleteLetter, enterWord, time, constantLetter } = useContext(AppContext)

  const row1 = ["Q", "W", "E", "R", "T" , "Y", "U", "I", "O", "P"]
  const row2 = ["A", "S", "D", "F", "G" , "H", "J", "K", "L"]
  const row3 = ["Z", "X", "C", "V", "B" , "N", "M"]

  const handleKeyboard =
    useCallback((event) => {
      if(time === 0)return;
      if(event.key === "Enter"){
        enterWord()
      } else if(event.key === "Backspace"){
        deleteLetter()
      } else {
        row1.forEach((key) => {
          if (event.key.toUpperCase() === key.toUpperCase()){
            letterTyped(key)
          }
        })
        row2.forEach((key) => {
          if (event.key.toUpperCase() === key.toUpperCase()){
            letterTyped(key)
          }
        })
        row3.forEach((key) => {
          if (event.key.toUpperCase() === key.toUpperCase()){
            letterTyped(key)
          }
        })
      }
    })
  

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }

  }, [handleKeyboard])

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="row-one row">
        {row1.map((letter) => {
        if(constantLetter === letter){
          return <Key letter={letter} conLetter={true}/>
        } else
        return <Key letter={letter} conLetter={false}/>
      })}</div>
      <div className="row-two row">
        <div className="spacer"></div>
        {row2.map((letter) => {
        if(constantLetter === letter){
          return <Key letter={letter} conLetter={true}/>
        } else
        return <Key letter={letter} conLetter={false}/>
      })}
        <div className="spacer"></div>
      </div>
      <div className="row-three row">
        <Key letter={"Enter"} />
        {row3.map((letter) => {
        if(constantLetter === letter){
          return <Key letter={letter} conLetter={true}/>
        } else
        return <Key letter={letter} conLetter={false}/>
      })}
      <Key letter={"Delete"} />
      </div>
    </div>
  )
}