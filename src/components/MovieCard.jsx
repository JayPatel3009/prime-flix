import React from 'react';
import { BASE_URL } from '../utils';

const MovieCard = ({ movie }) => {
  const { title, name, vote_average, poster_path, release_date, first_air_date, original_language } = movie;
  const movieTitle = title || name;
  const releaseYear = release_date ? release_date.split('-')[0] : (first_air_date ? first_air_date.split('-')[0] : 'N/A');
  return (
    <div className="movie-card">
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `${BASE_URL}/no-movie.png`}
        alt={movieTitle}
      />
      <div className="mt-4">
        <h3>{movieTitle}</h3>
        <div className="content">
          <div className="rating">
            <img src={`${BASE_URL}/star.svg`} alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">{releaseYear}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
