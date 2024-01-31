import React, { useState } from "react";
import classes from './ItemCard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

library.add(fasHeart, farHeart);

function ItemCard({ title, photoUrl, price, stock, onAddToFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = (item) => {
    setIsFavorite(!isFavorite);
    // Call the callback to add/remove the item from the favorites list in the parent component
    onAddToFavorites({ title, photoUrl, price, stock });
  };

  return(
    <div className="item-card"> 
      <img src={photoUrl} alt={title} width={150} height={180} />      
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <p>Available Stock: {stock}</p>
      <FontAwesomeIcon
      icon= {isFavorite ? ['fas', 'heart'] : ['far', 'heart']} 
      className="favorite-icon"
      onClick={handleAddToFavorites}
      />     

    </div>
  );
}

export default ItemCard;