import React, { useEffect, useState } from 'react';
import { searchMovies } from '../../Models/MoviesModel';
import { addMovie, removeMovie, getWatchlist } from '../../Models/WatchlistModel';
import SearchBar from '../SearchBar';
import MoviesDisplay from '../MoviesDisplay';
import Watchlist from '../Watchlist';
import { logoutUser } from '../Auth/authservices';
import { useNavigate } from 'react-router-dom';


const MainMovie = () => {
  // State for movie list, search input, and watchlist
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  // Load all movies and the watchlist on component mount
  useEffect(() => {
  // Fetch movies only once
  const fetchData = async () => {
    const moviesData = await searchMovies('');
    setMovies(moviesData);
  };

  fetchData();
  loadWatchlist(); // Watchlist can change, so it's okay to reload
}, []);


  //logout function to clear user session and redirect
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();       // clear user session from Parse
      navigate('/about');       // redirect to About page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Helper to load the user's watchlist from Parse
  const loadWatchlist = async () => {
    try {
      const items = await getWatchlist();

      // Flatten watchlist data structure so Watchlist component can use it
      const formatted = items.map(item => ({
        id: item.id,
        ...item.movie // spread movie fields: title, year, genre
      }));

      setWatchlist(formatted);
    } catch (error) {
      console.error('Error loading watchlist:', error);
    }
  };

  // Add a movie to the watchlist and refresh
  const handleAddToWatchlist = async (movie) => {
    if (!watchlist.some((m) => m.title === movie.title)) {
      try {
        await addMovie(movie); // Add to Parse
        await loadWatchlist(); // Refresh UI
      } catch (err) {
        console.error('Failed to add movie to watchlist:', err);
      }
    }
  };

  // Remove a movie from the watchlist and refresh
  const handleRemoveFromWatchlist = async (watchItemId) => {
    try {
      await removeMovie(watchItemId); // Remove from Parse
      await loadWatchlist(); // Refresh UI
    } catch (err) {
      console.error('Failed to remove movie from watchlist:', err);
    }
  };

  // Filter movies based on search input
  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
  <section>
    <button onClick={handleLogout}>Logout</button>
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
