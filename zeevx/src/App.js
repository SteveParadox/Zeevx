import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import React from 'react';
import Header from './Home/Header';
import Cards from './Home/Cards';
import LandingPage from './Home/LandingPage.js';
import SwipeButtons from './Home/swipeButtons.js';
import Login from './Auth/Login';
import Upload from './User/Upload';
import Profile from './User/Profile.js'
import Profile from './Home/test.js';


const App = () => {
  const isLoginPage = window.location.pathname === '/login';
  const isLandingPage  = window.location.pathname === '/';

  return (
    <Router>
      <div className="App">
        {!isLoginPage && !isLandingPage && <Header />} 
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<Upload />} />

          <Route path="/home" element={<>
            <Cards />
            <SwipeButtons />
            {/* Add more components or content as needed */}
          </>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<Profile />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
