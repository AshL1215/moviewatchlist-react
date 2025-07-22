// src/Models/RatingModel.js
import Parse from 'parse';

// Save a user's rating and optional comment for a movie
export async function saveRating(movieId, rating, comment = '') {
  const currentUser = Parse.User.current();
  if (!currentUser) throw new Error('User not logged in');

  const Movie = Parse.Object.extend('Movies');
  const query = new Parse.Query(Movie);
  const movie = await query.get(movieId);

  const Rating = Parse.Object.extend('Rating');
  const newRating = new Rating();
  newRating.set('movie', movie);
  newRating.set('user', currentUser);
  newRating.set('rating', rating);
  newRating.set('comment', comment);

  await newRating.save();
}

// Fetch all ratings for a specific movie
export async function getRatingsForMovie(movieId) {
  const Rating = Parse.Object.extend('Rating');
  const Movie = Parse.Object.extend('Movies');

  const movieRef = new Movie();
  movieRef.id = movieId;

  const query = new Parse.Query(Rating);
  query.equalTo('movie', movieRef);
  query.include('user');
  query.descending('createdAt');

  const results = await query.find();
  return results.map((r) => ({
    rating: r.get('rating'),
    comment: r.get('comment'),
    user: r.get('user')?.get('username') || 'Anonymous',
  }));
}
