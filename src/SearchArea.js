
import React, { useState, useEffect } from 'react';
import './SearchArea.css';

function SearchArea({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // You can perform the API call here using searchTerm
    // For the purpose of this example, we'll log the search term
    console.log('API call with search term:', searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // You can perform additional actions here if needed
    // For now, just pass the searchTerm to the parent component
    onSearch(searchTerm);
  };

  return (
    <div className="searching-area">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchArea;