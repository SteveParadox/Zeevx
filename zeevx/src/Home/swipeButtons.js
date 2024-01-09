import React from 'react';
import '../Css/SwipeButtons.css';
import RepeatIcon from '@mui/icons-material/Repeat';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from "@mui/material/IconButton";


function swipeButtons() {
  return (
    <div className="swipeButtons">
       
        <IconButton className="swipeButtons__left">
                        <CloseIcon fontSize="medium" />

        </IconButton>
        <IconButton className="swipeButtons__star">
                        <StarRateIcon fontSize="medium"  />

        </IconButton>
        <IconButton className="swipeButtons__right">
                        <FavoriteIcon fontSize="medium"  />

        </IconButton>
      <IconButton className="swipeButtons__repeat">
                        <RepeatIcon fontSize="medium" />

        </IconButton>
            </div>
  );
}

export default swipeButtons;
