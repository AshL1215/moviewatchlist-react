// MainMovie is the homepage component that handles movie search, selection, and watchlist logic using Parse
import React, { useEffect, useState } from 'react';
import { searchMovies } from '../Models/MoviesModel';
import { addMovie, removeMovie, getWatchlist } from '../Models/WatchlistModel';
import SearchBar from './SearchBar';
import MoviesDisplay from './MoviesDisplay';
import Watchlist from './Watchlist';

const MainMovie = () => {
  // State hooks for movie list, search query, and watchlist
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  // Load movies and watchlist from Parse backend on mount
  useEffect(() => {
    searchMovies('').then(setMovies); // fetch all movies
    loadWatchlist(); // fetch watchlist from backend
  }, []);

  // Helper function to load the watchlist from Parse
  const loadWatchlist = async () => {
    try {
      const items = await getWatchlist();
      // Update state with movie info and its corresponding watchlist item id
      const formatted = items.map(item => ({
        id: item.id, // watchlist item ID (used to remove)
        ...item.movie
      }));
      setWatchlist(formatted);
    } catch (error) {
      console.error('Error loading watchlist:', error);
    }
  };

  // Adds a movie to the user's watchlist via Parse
  const handleAddToWatchlist = async (movie) => {
    if (!watchlist.some((m) => m.title === movie.title)) {
      try {
        await addMovie(movie); // save to Parse
        await loadWatchlist(); // refresh watchlist from backend
      } catch (err) {
        console.error('Failed to add movie to watchlist:', err);
      }
    }
  };

  // Removes a movie from the user's watchlist via Parse
  const handleRemoveFromWatchlist = async (watchItemId) => {
    try {
      await removeMovie(watchItemId); // delete from Parse
      await loadWatchlist(); // refresh watchlist from backend
    } catch (err) {
      console.error('Failed to remove movie from watchlist:', err);
    }
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
