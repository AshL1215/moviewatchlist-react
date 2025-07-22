// This is the component that allows the user to update their movie preferences
import React, { useEffect, useState } from 'react';
import Parse from 'parse';

// Define the options for genres
const Genres = [
  "Action", "Comedy", "Drama", "Fantasy", "Adventure",
  "Thriller", "Horror", "Romance", "Sci-Fi"
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
  const [currentFavGenre, setCurrentFavGenre] = useState(favGenre);
  const [currentMovieEra, setCurrentMovieEra] = useState(movieEra);

  useEffect(() => {
    setCurrentFavGenre(favGenre);
    setCurrentMovieEra(movieEra);
  }, [favGenre, movieEra]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(currentFavGenre, currentMovieEra);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Favorite Genre:
        <select value={currentFavGenre} onChange={(e) => setCurrentFavGenre(e.target.value)}>
          <option value="">Select Genre</option>
          {Genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </label>

      <label>
        Preferred Movie Era:
        <select value={currentMovieEra} onChange={(e) => setCurrentMovieEra(e.target.value)}>
          <option value="">Select Era</option>
          {Eras.map((era) => (
            <option key={era} value={era}>{era}</option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Preferences"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdatePrefForm;
