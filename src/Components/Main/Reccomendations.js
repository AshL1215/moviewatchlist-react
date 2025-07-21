// This is the code for the reccomendations tab for the website based on the user's preferences
import React, { useEffect, useState } from 'react';
import { logoutUser, updatePref  } from '../Auth/authservices';
import { useNavigate } from 'react-router-dom';
import { getRec } from '../../Models/RecModel';
import Parse from 'parse';

// Define the options for genres
const Genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Adventure",
  "Thriller",
  "Horror",
  "Romance",
  "Sci-Fi"
];

// Define the options for the movie eras 
const Eras = [
  "1920s-1950s (Golden Age)", 
  "1960s-1970s (New Hollywood)", 
  "1980s-1990s (Blockbuster Era)", 
  "2000s-2010s", 
  "2020s-Present"
];

// Creating the intial reccomendtion to user 
const Recommendations = () => {
    const navigate = useNavigate();

    // Create states for the movie reccomedations
    const [recommendedMovie, setRecommendedMovie] = useState(null);
    const [loadingRecommendation, setLoadingRecommendation] = useState(false);
    const [recError, setRecError] = useState(null);

    // Create states for the user preferences
    const [favGenre, setFavGenre] = useState('');
    const [movieEra, setMovieEra] = useState('');
    const [updateMessage, setUpdateMessage] = useState(''); 
    const [loadingUpdate, setLoadingUpdate] = useState(false); 

    // Load current user preferences
    useEffect(() => {
        const currentUser = Parse.User.current();
        if (currentUser) {
            // Initialize form with current preferences
            setFavGenre(currentUser.get("FavGenre") || '');
            setMovieEra(currentUser.get("MovieEra") || '');
        } else {
            console.log("You are not logged in!");
        }
    }, []); 
}
