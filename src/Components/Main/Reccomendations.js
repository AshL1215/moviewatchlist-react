// This is the page for the movie recommendations feature
import React, { useEffect, useState } from 'react';
import Parse from 'parse'; 
import { logoutUser } from '../Auth/authservices'; 
import { useNavigate } from 'react-router-dom';
import { getRec } from '../../Models/RecModel';
import { updatePref } from '../Auth/authservices'; 
import { addMovie, getWatchlist } from '../../Models/WatchlistModel';
import RecMovieDisplay from '../Components/RecommendedMovieDisplay';
import UpdatePrefForm from '../Components/UserPreferencesForm';


const Recommendations = () => {
    const navigate = useNavigate();

    // Create stats for recommendations
    const [recommendedMovie, setRecommendedMovie] = useState(null);
    const [loadingRecommendation, setLoadingRecommendation] = useState(false);
    const [recError, setRecError] = useState(null);

    // Create states for user preferences
    const [favGenre, setFavGenre] = useState('');
    const [movieEra, setMovieEra] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    // Load current user preferences 
    useEffect(() => {
        const currentUser = Parse.User.current();
        if (currentUser) {
            setFavGenre(currentUser.get("FavGenre") || '');
            setMovieEra(currentUser.get("MovieEra") || '');
        } else {
            console.warn("You are not logged in!");
        }
    }, []);

    // Handlers 
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

        // Updating the user's preferences
    const handleUpdatePreferences = async (newFavGenre, newMovieEra) => {
        setLoadingUpdate(true);
        setUpdateMessage('Updating preferences...');
        try {
            await updatePref(newFavGenre, newMovieEra);
            setUpdateMessage('Your preferences updated successfully!');
            // Update local state to reflect changes 
            setFavGenre(newFavGenre);
            setMovieEra(newMovieEra);
        } catch (err) {
            setUpdateMessage('Failed to update preferences: ' + err.message);
        } finally {
            setLoadingUpdate(false);
        }
    };

    // Redirect to the login page
    const handleLogout = async () => {
      try {
        await logoutUser();
        navigate('/login'); 
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed: " + error.message);
      }
    };

    // Creating the display of the Recomendations tab
    return (
        <div className="RecHeader1">
            <h1>Recommendations</h1>
            <div className='RecButton'>
                <button onClick={handleGetRecommendation} disabled={loadingRecommendation}>
                    {loadingRecommendation ? 'Finding a movie...' : 'Get New Recommendation'}
                </button>
                {recError && <p>Error getting recommendation: {recError}</p>}
                <RecommendedMovieDisplay movie={recommendedMovie} />
                
                {!loadingRecommendation && !recError && !recommendedMovie && 
                    <p>Click the button to get your first recommendation!</p>}
            </div>
            
            <div className="UpdateHead">
                <h2>Update Your Movie Preferences</h2>
                <UserPreferencesForm
                    favGenre={favGenre}
                    movieEra={movieEra}
                    onUpdate={handleUpdatePreferences} 
                    loading={loadingUpdate}
                    message={updateMessage}
                />
            </div>

            <button onClick={handleLogout} >
                Logout
            </button>
        </div>
    );
};

export default Recommendations;