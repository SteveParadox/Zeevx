import React from 'react';
import { Link } from 'react-router-dom';
// import { AuthProvider } from '../Auth/Auth'; 

import "../Css/Header.css";
import Person4Icon from '@mui/icons-material/Person4';
import IconButton from "@mui/material/IconButton";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ForumIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';

function Header() {
  // const { user, handleLogout } = AuthProvider();
// onClick={handleLogout}

  return (
    <div className="header">
        <>
        <Link to="/home">
            <IconButton>
              <HomeIcon fontSize="medium" className="header__icon" />
            </IconButton>
          </Link> 
           <Link to="/upload">
            <IconButton>
              <AcUnitIcon fontSize="medium" className="header__icon" />
            </IconButton>
          </Link>
          <Link to="/profile">
            <IconButton>
              <Person4Icon fontSize="medium" className="header__icon" />
            </IconButton>
          </Link>
        
          <IconButton >
            <ForumIcon fontSize="medium" className="header__icon" />
          </IconButton>
        </>
    </div>
  );
}

export default Header;
