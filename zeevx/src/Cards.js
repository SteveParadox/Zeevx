import React, { useState } from 'react';
import TinderCard from "react-tinder-card";
import "./Cards.css";

function Cards() {
  const [people, setPeople] = useState([
    {
      name: 'Cristiano Ronaldo',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cristiano_Ronaldo_WC2022_-_01_%28cropped%29.jpg/188px-Cristiano_Ronaldo_WC2022_-_01_%28cropped%29.jpg'

    },
    {
      name: 'Kelvin De Bruyne',
      url: 'https://footballwhispers.com/wp-content/uploads/2021/03/Bruyne.jpg'

    },
    {
      name: 'Lioniel Messi',
      url: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/12/9/1355055907038/e0428d50-868a-4840-af87-b94579a94da4-460.jpeg'

    }
  ]);

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }
  
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  
  return (
    <div className="Cards">
      <div className="Card__cardContainer">
      <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>

      </div>
    </div>
  );
}

export default Cards;
