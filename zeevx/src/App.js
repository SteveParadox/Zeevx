import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./Header.js";
import Cards from "./Cards.js";
import SwipeButtons from "./swipeButtons.js";
import Login from './Login';

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

