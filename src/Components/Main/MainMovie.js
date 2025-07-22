// src/Components/Main/MainMovie.js
import React, { useEffect, useState } from 'react';
import { fetchAvailableMovies, searchMovies } from '../../Models/MoviesModel';
import { addMovie, removeMovie, getWatchlist } from '../../Models/WatchlistModel';
import Watchlist from '../Watchlist';
import SearchBar from '../SearchBar'; 
import { getRatingsForMovie, saveRating } from '../../Models/RatingModel';

const MainMovie = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [searchError, setSearchError] = useState('');

  const loadAllMovies = async () => {
    const movies = await fetchAvailableMovies();
    setAllMovies(movies);
  };

  const loadWatchlist = async () => {
    const items = await getWatchlist();
    const formatted = items.map(item => ({
      id: item.id,
      objectId: item.movie.objectId,
      title: item.movie.title,
      year: item.movie.year,
      genre: item.movie.genre
    }));
    setWatchlist(formatted);
  };

  useEffect(() => {
    loadAllMovies();
    loadWatchlist();
  }, []);

  const handleSearch = async () => {
    setSearchError('');
    const results = await searchMovies(searchTerm);
    if (results.length === 0) {
      setSearchError('🚫 Movie title not available.');
    }
    setSearchResults(results);
  };

  const handleAddToWatchlist = async (movie) => {
    try {
      await addMovie(movie);
      await loadWatchlist();
      alert(`🎉 "${movie.title}" added to watchlist!`);
    } catch (err) {
      alert('Failed to add movie: ' + err.message);
    }
  };

  const handleRemove = async (watchItemId) => {
    try {
      await removeMovie(watchItemId);
      await loadWatchlist();
    } catch (error) {
      alert('Failed to remove movie: ' + error.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#0C2340', color: '#C99700', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem' }}>🎬 Explore Movies</h1>

      {/* Dropdown Selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="movieDropdown">🎞️ Select Movie:</label><br />
        <select
          id="movieDropdown"
          onChange={(e) => {
            const movie = allMovies.find(m => m.objectId === e.target.value);
            setSelectedMovie(movie);
          }}
          style={{
            width: '60%',
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '5px',
            marginTop: '0.5rem'
          }}
        >
          <option value="">-- Choose a movie --</option>
          {allMovies.map(movie => (
            <option key={movie.objectId} value={movie.objectId}>
              {movie.title} ({movie.year})
            </option>
          ))}
        </select>
        {selectedMovie && (
          <button
            onClick={() => handleAddToWatchlist(selectedMovie)}
            style={{
              marginLeft: '1rem',
              backgroundColor: '#C99700',
              color: '#0C2340',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ➕ Add to Watchlist
          </button>
        )}
      </div>

      {/* Search Feature */}
      <div style={{ marginBottom: '2rem' }}>
        <label htmlFor="searchInput">🔍 Search by Title:</label><br />
        <input
          id="searchInput"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '60%',
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '5px',
            marginTop: '0.5rem'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: '1rem',
            backgroundColor: '#C99700',
            color: '#0C2340',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔍 Search
        </button>
        {searchError && <p style={{ color: 'red', marginTop: '0.5rem' }}>{searchError}</p>}
        {searchResults.map(movie => (
          <div key={movie.objectId} style={{ marginTop: '1rem' }}>
            <strong>{movie.title}</strong> ({movie.year}) - {movie.genre}
            <button
              onClick={() => handleAddToWatchlist(movie)}
              style={{
                marginLeft: '1rem',
                backgroundColor: '#C99700',
                color: '#0C2340',
                border: 'none',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ➕ Add to Watchlist
            </button>
          </div>
        ))}
      </div>

      {/* Watchlist Toggle */}
      <details style={{ marginTop: '2rem' }}>
        <summary style={{
          backgroundColor: '#C99700',
          color: '#0C2340',
          padding: '0.75rem',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          🎥 My Movie Watchlist
        </summary>
        <Watchlist watchlist={watchlist} removeMovie={handleRemove} />
      </details>
    </div>
  );
};

export default MainMovie;
