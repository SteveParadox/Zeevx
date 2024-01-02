import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Header from './Home/Header';
import Cards from './Home/Cards';
import LandingPage from './Home/LandingPage.js';
import SwipeButtons from './Home/swipeButtons.js';
import Login from './Auth/Login';
import Upload from './User/Upload';
import Profile from './User/Profile.js';
import Test from './Home/test.js';
import { useAuth } from './Auth/Auth';



const PrivateRoute = () => {
  const user = useAuth();
  return user ? <Route /> : <Navigate to="/login" replace />;
};

const App = () => {
  const isLoginPage = window.location.pathname === '/login';
  const isLandingPage = window.location.pathname === '/';

  return (
    <Router>
      <div className="App">
        {!isLoginPage && !isLandingPage && <Header />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              user ? (
                <>
                  <Cards />
                  <SwipeButtons />
                  {/* Add more components or content as needed */}
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/test"
            element={user ? <Test /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/upload"
            element={user ? <Upload /> : <Navigate to="/login" replace />}
          />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
