import React from 'react';

const MoviesDisplay = ({ movies, onAddMovie }) => {
  return (
    <div>
      <h2>Available Movies</h2>
      <div className="movie-container">
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.year}) - {movie.genre}
            <button onClick={() => onAddMovie(movie)}>Add to Movie Watchlist</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default MoviesDisplay;
