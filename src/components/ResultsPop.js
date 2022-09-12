import React, { useContext, useState } from "react";
import { Paper } from "@mui/material";
import { AppContext } from "../App";
import ShareIcon from '@mui/icons-material/Share';
import Typography from "@mui/material/Typography";

export default function ResultsPopup(props){
  const { setGameOver, wordsFound, commonWordsMissed, highScore } = useContext(AppContext)

  const [copied, setCopied] = useState(false)

  function copyToClipboard(){
    const resultText = `Oh snap, I found ${wordsFound.length} words on LetterBox today!`
    navigator.clipboard.writeText(resultText)
    setCopied(true)
  }

  return (props.gameOver) ? (
    <div className="results-popup">
      <div id="exit-btn-single" className="popup-inner animate__animated animate__fadeInDown">
      
      <Paper elevation={2} style={{borderRadius: 8}}>
        <div className="exit-btn-container">
          <button className="exit-btn" onClick={() => {
            setGameOver(false)
            }}>X</button>
        </div>
        <h2 className="results-header">Nice!</h2>
        <p className="result-details">You found {wordsFound.length} words.</p>
        <p className="result-hs-sentence"></p>
        <h4 className="common-missed">Common words missed:</h4>
        <ul className="missed-list">
          {commonWordsMissed.map((word) => {
            return (
              <li className="missed-word">{word}</li>
            )
          })}
        </ul>
        
        
        <button className="share-btn" onClick={()=> copyToClipboard()}>Share<ShareIcon style={{marginLeft: 10, verticalAlign: "middle"}}/></button>
        <Typography hidden={!copied} className="text-copied animate__animated animate__fadeOut animate__slower">
          result copied to clipboard!
        </Typography>

        {/* <p className="email-sentence">Did we miss something? Let us know here</p> */}

      </Paper>
      </div>
      
    </div>
  ) : ""
}