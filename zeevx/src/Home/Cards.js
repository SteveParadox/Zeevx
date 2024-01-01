import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TinderCard from "react-tinder-card";
import "../Css/Cards.css";
import axios from '../Utils/axios';
import { useAuth } from '../Auth/Auth.js';

function Cards() {
  const [people, setPeople] = useState([]);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const user = useAuth();

  useEffect(() => {
    if (!user) {
      // Set the state to trigger redirection
      setRedirectLogin(true);
    } else {
      async function fetchData() {
        const req = await axios.get('/cards');
        setPeople(req.data);
      }

      fetchData();
    }
  }, [user]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

  // Render the Redirect component if redirectLogin is true
  if (redirectLogin) {
    return <Redirect to='/login' />;
  }

  return (
    <div className="Cards">
      <div className="Card__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default Cards;
