import React from 'react';
import { BASE_URL } from '../utils';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src={`${BASE_URL}/search.svg`} alt="search" />
        <input
          type="text"
          placeholder="Search through millions of movies..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
