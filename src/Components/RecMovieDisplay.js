// This is the component that displays the recommended movie to the user
import React from 'react';

// Check if there has been a movie reccomended
const RecommendedMovieDisplay = ({ movie, onAddMovie }) => {
    if (!movie) {
        return null;
    }

    return (
        <div className='RecMovie'>
            <p><strong>Title:</strong> {movie.get("title")}</p>
            <p><strong>Year:</strong> {movie.get("year")}</p>
            <p><strong>Genre:</strong> {movie.get("genre")}</p>
            <button onClick={() => onAddMovie(movie)}>
                Add to Watchlist
            </button>
        </div>
    );
};

export default RecMovieDisplay;
