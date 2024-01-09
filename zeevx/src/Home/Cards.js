import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import '../Css/Cards.css';
import axios from '../Utils/axios';
import InfoIcon from '@mui/icons-material/Info';

function Cards() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/cards');

      setPeople(req.data);
    }

    fetchData();
    }, [])


  const swiped = (direction, nameToDelete) => {
    console.log('removing ' + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen');
  };

  return (
    <div className="Cards">
      <div className="Card__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div style={{ backgroundImage: `url(${person.imgUrl})` }} className="card">
              <h3>{person.name}</h3> 
              <IconButton>
              <InfoIcon fontSize="medium" className="header__icon" />
            </IconButton>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default Cards;
