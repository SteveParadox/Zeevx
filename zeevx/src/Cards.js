import React, { useState } from 'react';
import "./Cards.css";
import TinderCard from "react-tinder-card";

function Cards() {
  const [people, setPeople] = useState([
    {
      name: 'Cristiano Ronaldo',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cristiano_Ronaldo_WC2022_-_01_%28cropped%29.jpg/188px-Cristiano_Ronaldo_WC2022_-_01_%28cropped%29.jpg',

    },
    {
      name: 'Kelvin De Bruyne',
      url: 'https://footballwhispers.com/wp-content/uploads/2021/03/Bruyne.jpg',

    },
    {
      name: 'Lioniel Messi',
      url: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/12/9/1355055907038/e0428d50-868a-4840-af87-b94579a94da4-460.jpeg',

    }
  ]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing " + nameToDelete);
    //setLastDirection(direction);

  }

  const outOfFrame = (name) => {
    console.log(name + " left the screen")
  }

  return (
    <div className="Cards">
      <div className="Card__cardContainer">
       {people.map((person) =>  (
      <TinderCard className="swipe"
                  key={person.name}
                  preventSwipe={["up","down"]}
                  onSwipe={(dir) => swiped[dir, person.name]}
                  onCardLeftScreen = {() => outOfFrame(person.name)}
                  >
              <div
              style={{ backgroundImage: `url(${person.url})` }}
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
