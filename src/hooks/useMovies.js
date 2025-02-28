import { useState, useEffect } from 'react';
import { fetchMovies } from '../api';
import { updateSearchCount } from '../appwrite';

export const useMovies = (query) => {
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const data = await fetchMovies(query);
        if (data.Response === 'False') {
          setErrorMessage(data.Error || 'Failed to fetch movies');
          setMovieList([]);
        } else {
          setMovieList(data.results || []);
          // Update search count if a query is provided and results exist
          if (query && data.results && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setErrorMessage('Error fetching movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [query]);

  return { movieList, errorMessage, isLoading };
};
