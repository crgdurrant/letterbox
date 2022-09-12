import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Letter(props){
  const { liveBoard, constantLetter } = useContext(AppContext) 
  const letter = liveBoard[props.position]
  return (
    <div className={"letterbox" + (props.isConstant ? " constant-letter" : "")}>
      {(props.isConstant ? <div className="constant-letter-bg">{constantLetter}</div> : "")}
      {letter}
      </div>
  )
}