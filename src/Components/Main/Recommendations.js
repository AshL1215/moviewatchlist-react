import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { logoutUser, updatePref } from '../Auth/authservices.js';
import { useNavigate } from 'react-router-dom';
import { getRec } from '../../Models/RecModel.js';
import { addMovie, getWatchlist } from '../../Models/WatchlistModel.js';
import RecMovieDisplay from '../RecMovieDisplay.js';
import UpdatePrefForm from '../UpdatePrefForm.js';

const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [recError, setRecError] = useState(null);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [favGenre, setFavGenre] = useState('');
  const [movieEra, setMovieEra] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const loadWatchlist = async () => {
    try {
      const items = await getWatchlist();
      const formatted = items.map(item => ({
        id: item.id,
        objectId: item.movie.objectId,
        title: item.movie.title,
        year: item.movie.year,
        genre: item.movie.genre
      }));
      setUserWatchlist(formatted);
    } catch (error) {
      console.error('Error loading watchlist in Recommendations:', error);
    }
  };

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setFavGenre(currentUser.get("FavGenre") || '');
      setMovieEra(currentUser.get("MovieEra") || '');
      loadWatchlist();
    } else {
      console.warn("You are not logged in!");
    }
  }, []);

  const handleAddtoWatchlist = async (movieParseObject) => {
    const movieData = {
      title: movieParseObject.get("title"),
      year: movieParseObject.get("year"),
      genre: movieParseObject.get("genre"),
      objectId: movieParseObject.id
    };

    if (userWatchlist.some((m) => m.objectId === movieData.objectId)) {
      alert(`${movieData.title} is already in your watchlist!`);
      return;
    }

    try {
      await addMovie(movieData);
      await loadWatchlist();
      alert(`${movieData.title} added to watchlist!`);
    } catch (err) {
      console.error('Failed to add movie to watchlist:', err);
      alert('Failed to add movie to watchlist: ' + err.message);
    }
  };

  const handleGetRecommendation = async () => {
    setLoadingRecommendation(true);
    setRecError(null);
    setRecommendedMovie(null);
    try {
      const movie = await getRec();
      setRecommendedMovie(movie);
    } catch (err) {
      setRecError(err.message);
    } finally {
      setLoadingRecommendation(false);
    }
  };

  const handleUpdatePreferences = async (newFavGenre, newMovieEra) => {
    setLoadingUpdate(true);
    setUpdateMessage('Updating preferences...');
    try {
      await updatePref(newFavGenre, newMovieEra);
      setUpdateMessage('Your preferences updated successfully!');
      setFavGenre(newFavGenre);
      setMovieEra(newMovieEra);
    } catch (err) {
      setUpdateMessage('Failed to update preferences: ' + err.message);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#0C2340', color: '#C99700', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🎬 Personalized Movie Recommendations</h1>
        <button onClick={handleLogout} style={{
          backgroundColor: '#C99700',
          color: '#0C2340',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>Logout</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={handleGetRecommendation} disabled={loadingRecommendation} style={{
          backgroundColor: '#C99700',
          color: '#0C2340',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}>
          {loadingRecommendation ? 'Finding a movie...' : '🎥 Get New Recommendation'}
        </button>

        {recError && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {recError}</p>}

        <div style={{ marginTop: '2rem' }}>
          <RecMovieDisplay movie={recommendedMovie} onAddMovie={handleAddtoWatchlist} />
          {!loadingRecommendation && !recError && !recommendedMovie && (
            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>Click the button above to receive a movie recommendation based on your preferences!</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>🎯 Update Your Movie Preferences</h2>
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Help us recommend better movies by setting your favorite genre and preferred era.</p>
        <UpdatePrefForm
          favGenre={favGenre}
          movieEra={movieEra}
          onUpdate={handleUpdatePreferences}
          loading={loadingUpdate}
          message={updateMessage}
        />
      </div>
    </div>
  );
};

export default Recommendations;
