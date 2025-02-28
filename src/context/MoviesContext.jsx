import React, { createContext, useState } from 'react';

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <MoviesContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </MoviesContext.Provider>
  );
};
