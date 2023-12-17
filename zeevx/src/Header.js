import React from 'react';
import "./Header.css";
import Person4Icon from '@mui/icons-material/Person4';
import IconButton from "@mui/material/IconButton";


function YourComponent() {
  return (
    <div className="header">
        <h2>
        <IconButton>
                        <Person4Icon fontSize="large" className="header__icon" />
        </IconButton>
        </h2>

    </div>
  );
}

export default YourComponent;
