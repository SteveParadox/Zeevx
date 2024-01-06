import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../Css/Header.css";
import Person4Icon from '@mui/icons-material/Person4';
import IconButton from "@mui/material/IconButton";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ForumIcon from '@mui/icons-material/Send';

function Header() {
  return (
    <div className="header">
        <>
          <Link to="/profile">
            <IconButton>
              <Person4Icon fontSize="large" className="header__icon" />
            </IconButton>
          </Link>
          <Link to="/upload">
            <IconButton>
              <AcUnitIcon fontSize="large" className="header__icon" />
            </IconButton>
          </Link>
          <IconButton onClick={handleLogout}>
            <ForumIcon fontSize="large" className="header__icon" />
          </IconButton>
        </>
    </div>
  );
}

export default Header;
