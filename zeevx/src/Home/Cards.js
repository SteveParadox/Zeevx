import React, { useState, useEffect } from 'react';
import TinderCard from "react-tinder-card";
import "../Css/Cards.css";
import axios from '../Utils/axios';
import { useAuth } from '../Auth/Auth.js'; 


function Cards() {

  const [people, setPeople] = useState([]);
  const user = useAuth();

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/cards');

      setPeople(req.data);
    }

    fetchData();
    }, [])

    console.log(people);



  const swiped = (direction, nameToDelete) => {
    console.log("removing " + nameToDelete);
    //setLastDirection(direction);

  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen")
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="Cards">
      <div className="Card__cardContainer">
       {people.map((person) =>  (
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
    
      )) }
      </div>
    </div>
  );
}

export default Cards;
