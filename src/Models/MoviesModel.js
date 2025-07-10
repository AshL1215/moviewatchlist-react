// This Parse model interacts with the Movies database
import Parse from 'parse';

// Correct class name from Back4App is "Movies" (plural)
const Movie = Parse.Object.extend('Movies');

/**
 * Search for movies in the Parse database based on a search term.
 * Returns a formatted list of movie objects.
 * 
 * @param {string} searchTerm - The title (or partial title) to search for
 * @returns {Promise<Array>} - A list of movies with id, title, year, and genre
 */
export async function searchMovies(searchTerm) {
  const query = new Parse.Query(Movie);
  query.matches('title', searchTerm, 'i'); // Case-insensitive match
  query.ascending('title'); // Sort alphabetically

  try {
    const results = await query.find();
    console.log("Fetched movies from Parse:", results); // Debugging output

    // Format the returned Parse objects into plain JS objects
    return results.map(movie => ({
      id: movie.id,
      title: movie.get('title'),
      year: movie.get('year'),
      genre: movie.get('genre'),
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; // Return empty list on error
  }
}
