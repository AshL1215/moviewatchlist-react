// This Parse model interacts with the movies database and returns some information relating to it that can be used by the components
import Parse from 'parse';

// Creating the Movie class based on the Movie class in Back4App
const Movie = Parse.Object.extend('Movie');

// Adds ability to search for movies based on user search input
export async function searchMovies(searchTerm) {
  const query = new Parse.Query(Movie);
  query.matches('title', searchTerm, 'i'); // case-insensitive match
  query.ascending('title');

  try {
    const results = await query.find();
    return results.map(movie => ({
      id: movie.id,
      title: movie.get('title'),
      year: movie.get('year'),
      genre: movie.get('genre'),
    }));
  } catch (error) {
    console.error('Error! Movie not available:', error);
    return [];
  }
}
