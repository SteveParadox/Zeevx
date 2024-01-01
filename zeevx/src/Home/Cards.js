import React, { useState, useEffect } from 'react';
import TinderCard from "react-tinder-card";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../Css/Cards.css";
import axios from '../Utils/axios';
import { useAuth } from '../Auth/Auth.js';

function Cards() {
  const [people, setPeople] = useState([]);
  const user = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    } else {
      async function fetchData() {
        const req = await axios.get('/cards');
        setPeople(req.data);
      }

      fetchData();
    }
  }, [user, navigate]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

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
