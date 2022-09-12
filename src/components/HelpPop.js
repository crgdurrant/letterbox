import React from "react";
import { Paper } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../App";

export default function HelpPop(){
  const {showHelp, setShowHelp} = useContext(AppContext)
  return(
    <div className="help-pop">
      <div id="help-pop" className="popup-inner animate__animated animate__fadeInDown">
        <Paper sx={{minHeight: 500}}>
        <div className="exit-btn-container">
          <button className="exit-btn" onClick={() => {
            setShowHelp(false)
            }}>X</button>
        </div>
          <h2 className="results-header">How to play:</h2>
          <div className="game-board">
            <div className="letterbox grey">S</div>
            <div className="letterbox"></div>
            <div className="letterbox"></div>
            <div className="letterbox"></div>
          </div>
          <p className="help-details">Keeping the grey-out letter in the same position in every word, you have 30 seconds to come up with as many words as you can.</p>
          <img src={require("../letterbox.png")} alt="letterbox logo" className="logo-help" />
        </Paper>
      </div>
    </div>
  )
}