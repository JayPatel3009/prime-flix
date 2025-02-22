import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { BASE_URL } from './utils';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';

// Base URL for The Movie Database API
const API_BASE_URL = 'https://api.themoviedb.org/3';

// API Key for The Movie Database API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// API Options for The Movie Database API
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    // State variables to manage search term, error message, movie list, trending movies, and loading state
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Debounce the search term to prevent API call on every key press
    // This will wait for 500ms after the user stops typing
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

    // Fetch movies from the API
    const fetchMovies = async (query = '') => {
        // Set initial loading state to true
        setIsLoading(true);
        // Clear any previous error messages
        setErrorMessage('');

        try {
            // Construct the API endpoint based on the search query
            const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            // Fetch the data from the API
            const response = await fetch(endpoint, API_OPTIONS);
            
            // Throw an error if the response is not OK
            if(!response.ok) throw new Error ('Failed to fetch movies');

            // Parse the response into JSON
            const data = await response.json();
            
            // Throw an error if the response is False
            if (data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }

            // Set the movie list to the results from the API
            setMovieList(data.results || []);

            // Update the search count if a query is provided and there are results
            if (query && data.results.length > 0) await updateSearchCount(query, data.results[0]);
        } catch (error) { // Catch any errors and set the error message
            console.error(`Error fetching movies: ${ error }`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally { // Set loading state to false after the API call is complete
            setIsLoading(false);
        }
    }

    // Load trending movies from Appwrite
    const loadTrendingMovies = async () => {
        try {
            // Fetch trending movies from Appwrite
            const movies = await getTrendingMovies();

            // Set the trending movies state
            setTrendingMovies(movies);
        } catch (error) { // Catch any errors and log them to the console
            console.error(`Error fetching trending movies: ${ error }`);
        }
    }

    // Fetch movies when the debounced search term changes
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    // Load trending movies when the component mounts
    useEffect(() => {
        loadTrendingMovies();
    }, []);

    // Render the main application
    return (
    <main>
        <div className="pattern" />

        <div className="wrapper">
            <header>
                <img src={`${BASE_URL}/text-logo.png`} alt="Logo Text"></img>
                <img src={`${BASE_URL}/hero.png`} alt="Hero Banner"></img>
                <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy without the Hassle</h1>
                <Search searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } />
            </header>

            { trendingMovies.length > 0 && (
                <section className="trending">
                    <h2>Trending Movies</h2>

                    <ul>
                        { trendingMovies.map((movie, index) => (
                            <li key={ movie.$id }>
                                <p>{ index + 1 }</p>
                                <img src={ movie.poster_url } alt={ movie.title } />
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
                    <p className="text-red-500">{ errorMessage }</p>
                ) : (
                    <ul>
                        { movieList.map((movie) => (
                            <MovieCard key={ movie.id } movie={ movie } />
                        )) }
                    </ul>
                )}
            </section>
        </div>
    </main>
    )
}

// Export the App component
export default App
