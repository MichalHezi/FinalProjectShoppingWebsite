import React, { useContext, useState } from 'react';
import './MainPage.css';
import ItemCard from './ItemCard';
import SearchArea from './SearchArea';


function MainPage() {
      
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Handler for handling the search
  const handleSearch = (term) => {
    // Update the search term state
    setSearchTerm(term);
  };

  const handleAddToFavorites = (item) => {
    
    const isAlreadyInFavorites = favorites.some(fav => fav.title === item.title);
    if (isAlreadyInFavorites) {
      
      const updatedFavorites = favorites.filter(fav => fav.title !== item.title);
      setFavorites(updatedFavorites);
    }else{
      setFavorites([...favorites, item]);
    }
  };

    const items = [
        {
          title: 'Angie Diesel side bag',
          photoUrl: 'https://nappa.co.il/wp-content/uploads/2021/07/%D7%AA%D7%99%D7%A7-%D7%A6%D7%93-%D7%9C%D7%A0%D7%A9%D7%99%D7%9D-%D7%90%D7%A0%D7%92%D7%99-%D7%93%D7%99%D7%96%D7%9C-%D7%90%D7%A4%D7%A8%D7%99%D7%A7%D7%94-%D7%AA%D7%99%D7%A7%D7%99%D7%9D-%D7%9C%D7%A0%D7%A9%D7%99%D7%9D-%D7%9E%D7%A2%D7%95%D7%A8-NAPPA-ANGI-BAGS.jpg',
          price: 100,
          stock: 15,
        },
        {
          title: 'Guess side bag',
          photoUrl: 'https://wwwarnakeiolga.co.il/wp-content/uploads/2023/01/b2b0f96b1c5ca48565e9e182bf142a42.jpeg',
          price: 95,
          stock: 10,
        },        
        {
          title: 'Diana leather side bag',
          photoUrl: 'https://www.tesbags.co.il/wp-content/uploads/2021_10_27_TESBAGS28579.jpg',
          price: 110,
          stock: 13,
        },
        {
          title: 'Matra Italian side bag',
          photoUrl: 'https://trokeli.com/cdn/shop/products/Hfdb531e8c6f64e4187fe601e2c47e5bbZ_800x.jpg?v=1660039565',
          price: 250,
          stock: 14,
        },
        {
          title: 'Jenny leather side bag',
          photoUrl: 'https://tahelsadot.com/wp-content/uploads/2018/07/20220914_114200-01-1.jpg',
          price: 210,
          stock: 12,
        },
        {
          title: 'Steve Madden leather bag',
          photoUrl: 'https://stevemadden.co.il/cdn/shop/files/STEVEMADDEN_INTL_HANDBAGS_BWAND_LUGGAG_large.jpg?v=1700993530',
          price: 190,
          stock: 14,
        },
        {
          title: 'Nina leather side bag',
          photoUrl: 'https://www.tuscany-bags.co.il/images/stories/virtuemart/product/NINA%20127.jpg',
          price: 125,
          stock: 10,
        },
        {
          title: 'Kim fabric side bag',
          photoUrl: 'https://tikhatikim.co.il/cdn/shop/files/GRANADA-HANDBAG2022black_1__1080_1800x1800.jpg?v=1694680299',
          price: 115,
          stock: 9,
        },
        {
          title: 'Lyla leather side bag',
          photoUrl: 'https://tuscany-bags.co.il/images/stories/virtuemart/product/140900_FRONTE_NERO.jpg',
          price: 138,
          stock: 11,
        },
        {
          title: 'Shiny black leather Lennon bag',
          photoUrl: 'https://market.marmelada.co.il/images/detailed/6114/P_SY3002.jpg',
          price: 112,
          stock: 10,
        },
        {
          title: 'Small side bag and black Guss GUESS wallet',
          photoUrl: 'https://premiumkids.co.il/dyncontent/Product/2022/4/17/dK7FCcUg2gg1.jpg',
          price: 220,
          stock: 8,
        },
        {
          title: 'Tommy Hilfiger Julia model side bag',
          photoUrl: 'https://ali-buy.com/wp-content/uploads/2018/11/tommy-hilfiger-1.jpg',
          price: 240,
          stock: 11,
        },                                                                                         
        // Add more items as needed
      ];
    
  return (
    <div>

      <SearchArea onSearch={handleSearch} />
        
      <header>
        <h1>Shopping.TLV</h1>
        <img src="https://img.freepik.com/free-vector/shopping-bag-realistic-colored-composition_1284-65042.jpg" width={350} alt="Logo" />
      </header>

      <div className="available-items-grid">
        {/* Display items based on the search term */}
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item, index) => (
            <ItemCard key={index}
             {...item}
             onAddToFavorites={handleAddToFavorites}
            />
          ))}
      </div>
      <div className="favorites-list">
        <h2>Favorites List</h2>
        <ul>
          {favorites.map( (fav, index) => (
            <li key={index}>{fav.title}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default MainPage;