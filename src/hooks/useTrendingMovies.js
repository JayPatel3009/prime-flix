import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../appwrite';

export const useTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorTrending, setErrorTrending] = useState('');

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setErrorTrending('Error fetching trending movies.');
      }
    };

    loadTrending();
  }, []);

  return { trendingMovies, errorTrending };
};
