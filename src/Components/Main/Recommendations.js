// src/Components/Main/Recommendations.js

import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { logoutUser, updatePref } from '../Auth/authservices.js';
import { useNavigate } from 'react-router-dom';
import { getRec } from '../../Models/RecModel.js';
import { addMovie, getWatchlist } from '../../Models/WatchlistModel.js'; // Ensure these are correctly imported
import RecMovieDisplay from '../RecMovieDisplay.js'; // This component
import UpdatePrefForm from '../UpdatePrefForm.js';


const Recommendations = () => {
    const navigate = useNavigate();
    const [recommendedMovie, setRecommendedMovie] = useState(null);
    const [loadingRecommendation, setLoadingRecommendation] = useState(false);
    const [recError, setRecError] = useState(null);
    const [userWatchlist, setUserWatchlist] = useState([]); // This is correct
    const [favGenre, setFavGenre] = useState('');
    const [movieEra, setMovieEra] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    // Helper to load the user's watchlist from Parse
    // This needs to be defined BEFORE useEffect calls it.
    const loadWatchlist = async () => {
        try {
            const items = await getWatchlist(); // Now getWatchlist includes objectId for movie (from WatchlistModel.js update)

            // CRITICAL FIX FOR MAPPING: Make sure objectId and id are correctly mapped
            const formatted = items.map(item => ({
                id: item.id, // This is the WatchItem's ID
                objectId: item.movie.objectId, // This is the Movie Parse.Object's ID, now correctly returned
                title: item.movie.title,
                year: item.movie.year,
                genre: item.movie.genre
            }));

            setUserWatchlist(formatted); // Correct setter
        } catch (error) {
            console.error('Error loading watchlist in Recommendations:', error);
        }
    };

    // useEffect for loading preferences and initial watchlist
    useEffect(() => {
        const currentUser = Parse.User.current();
        if (currentUser) {
            setFavGenre(currentUser.get("FavGenre") || '');
            setMovieEra(currentUser.get("MovieEra") || '');
            loadWatchlist(); // <--- Load watchlist when component mounts
        } else {
            console.warn("You are not logged in!");
        }
    }, []); // Empty dependency array means this runs once on mount


    const handleAddtoWatchlist = async (movieParseObject) => {
        // Prepare movieData to be consistent for addMovie
        const movieData = {
            title: movieParseObject.get("title"),
            year: movieParseObject.get("year"),
            genre: movieParseObject.get("genre"),
            objectId: movieParseObject.id // <--- IMPORTANT: Pass the Parse Object ID
        };

        // This duplicate check now works because userWatchlist will have 'objectId'
        if (userWatchlist.some((m) => m.objectId === movieData.objectId)) {
            alert(`${movieData.title} is already in your watchlist!`);
            return;
        }

        try {
            await addMovie(movieData);
            await loadWatchlist(); // Refresh watchlist after adding
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
            const movie = await getRec(); // This should return a Parse.Object
            setRecommendedMovie(movie);
        } catch (err) {
            setRecError(err.message);
        } finally {
            setLoadingRecommendation(false);
        }
    }

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
                {/* CRITICAL FIX: Add the onAddMovie prop to RecMovieDisplay */}
                <RecMovieDisplay movie={recommendedMovie} onAddMovie={handleAddtoWatchlist} />
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