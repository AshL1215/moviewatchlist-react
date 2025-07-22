// src/Components/Main/RateMovies.js
import React, { useEffect, useState } from 'react';
import { fetchAvailableMovies } from '../../Models/MoviesModel';
import { getRatingsForMovie, saveRating } from '../../Models/RatingModel';
import Parse from 'parse';

const RateMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [prevRatings, setPrevRatings] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const results = await fetchAvailableMovies();
      setMovies(results);
    };
    loadMovies();
  }, []);

  const handleMovieSelect = async (movieId) => {
    setSelectedMovieId(movieId);
    const ratings = await getRatingsForMovie(movieId);
    setPrevRatings(ratings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMovieId || !rating) {
      alert('Please select a movie and rating');
      return;
    }

    try {
      await saveRating(selectedMovieId, parseInt(rating), comment);
      alert('Rating submitted!');
      const updated = await getRatingsForMovie(selectedMovieId);
      setPrevRatings(updated);
      setRating('');
      setComment('');
    } catch (err) {
      alert('Failed to submit rating: ' + err.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#0C2340', color: '#C99700', minHeight: '100vh', padding: '2rem' }}>
      <h1>🌟 Rate Movies</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <label>Select Movie:</label>
        <select
          value={selectedMovieId}
          onChange={(e) => handleMovieSelect(e.target.value)}
          style={{ marginLeft: '1rem', padding: '0.5rem' }}
        >
          <option value="">-- Choose a Movie --</option>
          {movies.map((movie) => (
            <option key={movie.objectId} value={movie.objectId}>
              {movie.title} ({movie.year})
            </option>
          ))}
        </select>

        <br /><br />

        <label>Rating (1-5):</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ marginLeft: '1rem', padding: '0.5rem' }}
        >
          <option value="">-- Select Stars --</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{'⭐'.repeat(num)}</option>
          ))}
        </select>

        <br /><br />

        <label>Comment:</label><br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          cols={40}
          placeholder="Leave a comment..."
          style={{ padding: '0.5rem', marginTop: '0.5rem' }}
        />

        <br /><br />
        <button type="submit" style={{
          backgroundColor: '#C99700',
          color: '#0C2340',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Submit Rating
        </button>
      </form>

      <div>
        <h2>📝 See What Other Think</h2>
        {prevRatings.length === 0 ? (
          <p>No ratings for this movie yet.</p>
        ) : (
          <ul>
            {prevRatings.map((r, idx) => (
              <li key={idx}>
                {r.user}: {'⭐'.repeat(r.rating)} — {r.comment || 'No comment'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RateMovies;
