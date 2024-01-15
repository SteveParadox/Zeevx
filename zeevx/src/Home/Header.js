import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from "../Hooks/useAuth";

import "../Css/Header.css";
import Person4Icon from '@mui/icons-material/Person4';
import IconButton from "@mui/material/IconButton";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ForumIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';

import { Link, Navigate, useLocation } from 'react-router-dom';


function Header() {
  // const { user, handleLogout } = AuthProvider();
// onClick={handleLogout}
  const { auth } = useAuth();
  const location = useLocation();


  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="header">
      {auth ? (
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
      ) : (

        <Link to="/login">
          <button className="header__loginButton">Login</button>
        </Link>
      )}
    </div>
  );
}

export default Header;
