//MainMovie is the homepage component that handles movie search, selection, and watchlist logic
import React, { useEffect, useState } from 'react';
import { searchMovies } from '../Models/MoviesModel';
import SearchBar from './SearchBar';
import MoviesDisplay from './MoviesDisplay';
import Watchlist from './Watchlist';

const MainMovie = () => {
      // State hooks for movie list, search query, and watchlist
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);

    // Load all movies from the Parse backend when component mounts
  useEffect(() => {
    searchMovies('').then(setMovies); // Empty string = fetch all movies
  }, []);
  
  // Adds a movie to the user's watchlist
  const handleAddToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };
  // Removes a movie from the user's watchlist

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((m) => m.id !== id));
  };

  // Filter movies based on search query
  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <h1>🎬 Movie Watchlist</h1>
      <SearchBar search={query} onSearchChange={setQuery} />
      <div className="grid">
        <ul className="movie-list">
          {filtered.map((m) => (
            <li key={m.id} onClick={() => handleAddToWatchlist(m)}>
              {m.title} ({m.year})
            </li>
          ))}
        </ul>
        <MoviesDisplay movies={filtered} onAddMovie={handleAddToWatchlist} />
        <Watchlist list={watchlist} onRemove={handleRemoveFromWatchlist} />
      </div>
    </section>
  );
};

export default MainMovie;
