import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { logoutUser, updatePref } from '../Auth/authservices.js';
import { useNavigate } from 'react-router-dom';
import { getRec } from '../../Models/RecModel.js';
import RecMovieDisplay from '../RecMovieDisplay.js';
import UpdatePrefForm from '../UpdatePrefForm.js';

const Recommendations = () => {
  const navigate = useNavigate();

  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [recError, setRecError] = useState(null);

  const [favGenre, setFavGenre] = useState('');
  const [movieEra, setMovieEra] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setFavGenre(currentUser.get("FavGenre") || '');
      setMovieEra(currentUser.get("MovieEra") || '');
    } else {
      console.warn("You are not logged in!");
    }
  }, []);

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
    <div className="RecHeader1">
      <h1>Recommendations</h1>
      <div className='RecButton'>
        <button onClick={handleGetRecommendation} disabled={loadingRecommendation}>
          {loadingRecommendation ? 'Finding a movie...' : 'Get New Recommendation'}
        </button>
        {recError && <p>Error getting recommendation: {recError}</p>}
        <RecMovieDisplay movie={recommendedMovie} />
        {!loadingRecommendation && !recError && !recommendedMovie && (
          <p>Click the button to get your first recommendation!</p>
        )}
      </div>

      <div className="UpdateHead">
        <h2>Update Your Movie Preferences</h2>
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
