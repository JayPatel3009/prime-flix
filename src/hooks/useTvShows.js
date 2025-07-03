import { useState, useEffect } from 'react';
import { fetchTvShows } from '../api';

export const useTvShows = (query) => {
  const [tvShowList, setTvShowList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTvShows = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTvShows(query);
        setTvShowList(data.results);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getTvShows();
  }, [query]);

  return { tvShowList, errorMessage, isLoading };
};