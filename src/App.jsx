import { useContext, useState } from 'react';
import { useDebounce } from 'react-use';
import { MoviesProvider, MoviesContext } from './context/MoviesContext';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { BASE_URL } from './utils';
import { useMovies } from './hooks/useMovies';
import { useTvShows } from './hooks/useTvShows';

const AppContent = () => {
  const { searchTerm, setSearchTerm } = useContext(MoviesContext);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce the search term (wait 1000ms after last change)
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const { movieList, errorMessage, isLoading } = useMovies(debouncedSearchTerm);
  const { tvShowList, errorMessage: tvShowErrorMessage, isLoading: tvShowIsLoading } = useTvShows(debouncedSearchTerm);

  const randomMovies = [...movieList].sort(() => Math.random() - 0.5).slice(0, 5);
  const randomTvShows = [...tvShowList].sort(() => Math.random() - 0.5).slice(0, 5);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src={`${BASE_URL}/text-logo.png`} alt="Logo Text" />
          <img src={`${BASE_URL}/hero.png`} alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies & TV Shows</span> You'll Enjoy without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {!debouncedSearchTerm && (
          <>
            {randomMovies && randomMovies.length > 0 && (
              <section className="trending">
                <h2>Trending Movies</h2>
                <ul>
                  {randomMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              </section>
            )}

            {randomTvShows && randomTvShows.length > 0 && (
              <section className="trending mt-20">
                <h2>Trending TV Shows</h2>
                <ul>
                  {randomTvShows.map((tvShow) => (
                    <MovieCard key={tvShow.id} movie={tvShow} />
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        <section className={`all-movies ${!debouncedSearchTerm ? 'mt-20' : 'mt-10'}`}>
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

        <section className="all-movies mt-20">
          <h2>All TV Shows</h2>
          {tvShowIsLoading ? (
            <Spinner />
          ) : tvShowErrorMessage ? (
            <p className="text-red-500">{tvShowErrorMessage}</p>
          ) : (
            <ul>
              {tvShowList.map((tvShow) => (
                <MovieCard key={tvShow.id} movie={tvShow} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

const App = () => {
  return (
    <MoviesProvider>
      <AppContent />
    </MoviesProvider>
  );
};

export default App;
