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


const PrivateRoute = ({ element, ...props }) => {
  const user = useAuth();

  return user ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
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

          {/* Use array to wrap the PrivateRoute instances */}
          {[
            <PrivateRoute key="/home" path="/home" element={<>
              <Cards />
              <SwipeButtons />
              {/* Add more components or content as needed */}
            </>} />,
            <PrivateRoute key="/profile" path="/profile" element={<Profile />} />,
            <PrivateRoute key="/test" path="/test" element={<Test />} />,
            <PrivateRoute key="/upload" path="/upload" element={<Upload />} />,
          ]}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
