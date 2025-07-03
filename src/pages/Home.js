import React, { useState, useEffect } from 'react';
import { searchMovies } from '../Models/MoviesModel.js';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies('')  // Empty string returns all movies
      .then(setMovies);
  }, []);

  return (
    <div>
      <h1>Movie Watchlist</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.year}) - {movie.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
