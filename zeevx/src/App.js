import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./Header.js";
import Cards from "./Cards.js";
import SwipeButtons from "./swipeButtons.js";
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Cards />
            <SwipeButtons />
            {/* Add more components or content as needed */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
