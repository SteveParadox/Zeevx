import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Header from './Home/Header';
import Cards from './Home/Cards';
import Explore from './Home/Explore';

import LandingPage from './Home/LandingPage.js';
import SwipeButtons from './Home/swipeButtons.js';
import Login from './Auth/Login';
import Upload from './User/Upload';

import Test from './Home/test.js';
import Profile from './User/Profile.js'
import Error from './Home/Error.js'

import RequiredAuth from './Auth/RequireAuth';

const App = () => {
  const isLoginPage = window.location.pathname === '/login';
  const isLandingPage = window.location.pathname === '/';

  return (
      <div className="App">
          {!isLoginPage && !isLandingPage && <Header />}
        
        <Routes>      
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

            <Route element = {<RequiredAuth />}>
                <Route path="/upload" element={<Upload />} />
                <Route path="/explore" element={<Explore />} />

                <Route path="/test" element={<Test />} />

                <Route path="/home" element={<>
                  <Cards />
                  <SwipeButtons />
                  {/* Add more components or content as needed */}
                </>} />
                <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Add more routes as needed */}
          <Route path="*" element={<Error />} />

        </Routes>
      </div>
  );
};

export default App;
