import React, { useContext } from "react";
import Letter from "./Letter";
import 'animate.css';
import { AppContext } from "../App";

export default function WordRow(){ 

  const { headShake, setHeadShake } = useContext(AppContext)

  return (
    <div className={"game-board" + (headShake ? " animate__animated animate__headShake" : "")}>
          <Letter position={0} isConstant={true} />
          <Letter position={1} isConstant={false} />
          <Letter position={2} isConstant={false} />
          <Letter position={3} isConstant={false} />
      </div>
  )
}