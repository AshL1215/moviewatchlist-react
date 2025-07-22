// src/Models/MoviesModel.js
import Parse from 'parse';

// Fetch all available movies (no limit)
export async function fetchAvailableMovies() {
  const query = new Parse.Query('Movies');
  query.limit(1000); // Ensures we fetch up to 1000 movies
  try {
    const results = await query.find();
    return results.map(movie => ({
      objectId: movie.id,
      title: movie.get("title"),
      year: movie.get("year"),
      genre: movie.get("genre"),
    }));
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}

// Search for movies by title (case-insensitive)
export async function searchMovies(searchTerm) {
  const query = new Parse.Query('Movies');
  query.matches("title", searchTerm, "i");
  try {
    const results = await query.find();
    return results.map(movie => ({
      objectId: movie.id,
      title: movie.get("title"),
      year: movie.get("year"),
      genre: movie.get("genre"),
    }));
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
