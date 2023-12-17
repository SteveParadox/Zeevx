import React from 'react';
import "./Header.css";
import Person4Icon from '@mui/icons-material/Person4';
import IconButton from "@mui/material/IconButton";
import AcUnitIcon from '@mui/icons-material/AcUnit';

function YourComponent() {
  return (
    <div className="header">
        <IconButton>
                        <Person4Icon fontSize="large" className="header__icon" />
                        <AcUnitIcon fontSize="large" className="header__icon" />

        </IconButton>
<img className="header__logo" src=""
/>
    </div>
  );
}

export default YourComponent;
