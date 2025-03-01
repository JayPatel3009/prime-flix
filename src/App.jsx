import { useContext, useState } from 'react';
import { useDebounce } from 'react-use';
import { MoviesProvider, MoviesContext } from './context/MoviesContext';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { BASE_URL } from './utils';
import { useMovies } from './hooks/useMovies';
import { useTrendingMovies } from './hooks/useTrendingMovies';

const AppContent = () => {
  const { searchTerm, setSearchTerm } = useContext(MoviesContext);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce the search term (wait 1000ms after last change)
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const { movieList, errorMessage, isLoading } = useMovies(debouncedSearchTerm);
  const { trendingMovies } = useTrendingMovies();

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src={`${BASE_URL}/text-logo.png`} alt="Logo Text" />
          <img src={`${BASE_URL}/hero.png`} alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies && trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
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
