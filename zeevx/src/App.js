import React ,{ Fragment, useEffect } from 'react';
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



const PrivateRoute = ({ element }) => {
  const user = useAuth();

  useEffect(() => {
    if (!user) {
      // Navigate to the login page if the user is not authenticated
      navigate('/login', { replace: true });
    }
  }, [user]);

  return user ? element : null;
};


const App = () => {
  const isLoginPage = window.location.pathname === '/login';
  const isLandingPage = window.location.pathname === '/';

  return (
    <Router>
      <Fragment>
        <div className="App">
          {!isLoginPage && !isLandingPage && <Header />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Route index element={<LandingPage />} />
                  <Route path="/home" element={<>
                    <Cards />
                    <SwipeButtons />
                    {/* Add more components or content as needed */}
                  </>} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/upload" element={<Upload />} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};
export default App;