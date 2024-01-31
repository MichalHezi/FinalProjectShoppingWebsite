
import React from "react";

function FavoriteList() {
    return(
        <div className="favorites-list">
            <ul>
                {favorites.map( (fav, index) => (
                <li key={index}>{fav.title}</li>
          ))}
            </ul>

      </div>
        
    )

}

export default FavoriteList;