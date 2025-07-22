// This is the component that allows the user to update their movie prefences in the movie reccomendations tabs
import React, { useEffect, useState } from 'react';
import { getRec } from '../Models/RecModel';
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

const UpdatePrefForm = ({ favGenre, movieEra, onUpdate, loading, message }) => {
    // Intiializing preference states
    const [currentFavGenre, setCurrentFavGenre] = useState(favGenre);
    const [currentMovieEra, setCurrentMovieEra] = useState(movieEra);

    // Updating preference states
    useEffect(() => {
        setCurrentFavGenre(favGenre);
        setCurrentMovieEra(movieEra);
    }, [favGenre, movieEra]);

    // Make the change in the movie preference
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(currentFavGenre, currentMovieEra); 
    };

    return (
        <div className='UpdatePrefForm'>
        <form onSubmit={handleSubmit}>
            <label>
                Favorite Genre:
                <select
                    value={currentFavGenre}
                    onChange={(e) => setCurrentFavGenre(e.target.value)}
                    required
                >
                    <option value="">-- Choose a Genre --</option>
                    {Genres.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </label>
            <br /><br />
            <label>
                Favorite Movie Era:
                <select
                    value={currentMovieEra}
                    onChange={(e) => setCurrentMovieEra(e.target.value)}
                    required
                >
                    <option value="">-- Choose a Movie Era --</option>
                    {Eras.map((era) => (
                        <option key={era} value={era}>{era}</option>
                    ))}
                </select>
            </label>
            <br /><br />
            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Preferences'}
            </button>
        </form>
        </div>
    );
};

export default UpdatePrefForm;
