import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import React from 'react';
import Header from './Home/Header';
import Cards from './Home/Cards';
import SwipeButtons from './Home/SwipeButtons';
import Login from './Auth/Login';
import Upload from './User/Upload';
import Profile from './User/Profile.js'

const App = () => {
  const isLoginPage = window.location.pathname === '/login';

  return (
    <Router>
      <div className="App">
        {!isLoginPage && <Header />} {/* Conditionally render Header */}
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<>
            <Cards />
            <SwipeButtons />
            {/* Add more components or content as needed */}
          </>} />
          <Route path="/profile" element={<Profile />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
