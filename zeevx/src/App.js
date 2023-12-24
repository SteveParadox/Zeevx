import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./Home/Header.js";
import Cards from "./Home/Cards.js";
import SwipeButtons from "./Home/swipeButtons.js";
import Login from './Auth/Login';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<>
            <Header />
            <Cards />
            <SwipeButtons />
            {/* Add more components or content as needed */}
          </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

