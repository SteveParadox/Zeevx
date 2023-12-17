import React from 'react';
import "./Header.css";
import Person4Icon from '@mui/icons-material/Person4';
import IconButton from "@mui/material/IconButton";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ForumIcon  from '@mui/icons-material/Send';

function YourComponent() {
  return (
    <div className="header">
        <IconButton>
                        <Person4Icon fontSize="large" className="header__icon" />

        </IconButton>
    <img className="header__logo" src=""/> 
        <IconButton>
                    <AcUnitIcon fontSize="large" className="header__icon" />

            </IconButton>    
    <IconButton>
            <ForumIcon  fontSize="large" className="header__icon" />

    </IconButton>
    </div>
  );
}

export default YourComponent;
