import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Header from './Home/Header';
import Cards from './Home/Cards';
import LandingPage from './Home/LandingPage.js';
import SwipeButtons from './Home/swipeButtons.js';
import Login from './Auth/Login';
import Upload from './User/Upload';
import Profile from './User/Profile.js'
import Error from './Home/Error.js'

const App = () => {
  const isLoginPage = window.location.pathname === '/login';

  return (
      <div className="App">
        {!isLoginPage && <Header />} {/* Conditionally render Header */}
        
        <Routes>      
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/home" element={<>
            <Cards />
            <SwipeButtons />
            {/* Add more components or content as needed */}
          </>} />
          <Route path="/profile" element={<Profile />} />

          {/* Add more routes as needed */}
          <Route path="*" element={<Error />} />

        </Routes>
      </div>
  );
};

export default App;
