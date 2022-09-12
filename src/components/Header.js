import React from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'; 
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { IconButton } from "@mui/material";

export default function Header(props){

  return (
    <div className="header-container">
      <div className="title-container">
        <img src={require("../letterbox.png")} alt="letterbox logo" className="logo" />
        <h2 className="title" >Letterbox</h2>
      </div>
      <div className="menu-container">
        {/* <SettingsOutlinedIcon style={{fontSize:36}} />
        <BarChartOutlinedIcon style={{fontSize:36}} /> */}
        <IconButton onClick={()=> props.setShowHelp(true)}><HelpOutlineOutlinedIcon style={{fontSize:36}} /></IconButton>
      </div>
    </div>
  )
}