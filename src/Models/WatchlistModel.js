// src/Models/WatchlistModel.js
import Parse from 'parse';

const Movie = Parse.Object.extend("Movies");
const WatchItem = Parse.Object.extend("WatchItem");

// Add movie to watchlist
export async function addMovie(movieData) {
    const currentUser = Parse.User.current();
    if (!currentUser) throw new Error("You must be logged in!");

    let movie;
    try {
        const movieQuery = new Parse.Query(Movie);
        movie = await movieQuery.get(movieData.objectId);
    } catch {
        const queryByTitle = new Parse.Query(Movie);
        queryByTitle.equalTo("title", movieData.title);
        movie = await queryByTitle.first();
        if (!movie) {
            movie = new Movie();
            movie.set("title", movieData.title);
            movie.set("year", movieData.year);
            movie.set("genre", movieData.genre);
            await movie.save();
        }
    }

    const existing = new Parse.Query(WatchItem);
    existing.equalTo("user", currentUser);
    existing.equalTo("movie", movie);
    const found = await existing.first();
    if (found) return found;

    const newWatchItem = new WatchItem();
    newWatchItem.set("user", currentUser);
    newWatchItem.set("movie", movie);
    return await newWatchItem.save();
}

// Remove movie by WatchItem ID (ensure correct ID is passed)
export async function removeMovie(watchItemId) {
    const currentUser = Parse.User.current();
    if (!currentUser) throw new Error("You must be logged in!");
    const query = new Parse.Query(WatchItem);
    const item = await query.get(watchItemId);

    if (item.get("user").id !== currentUser.id) {
        throw new Error("Unauthorized");
    }

    await item.destroy();
}

// Get all movies in user's watchlist
export async function getWatchlist() {
    const currentUser = Parse.User.current();
    if (!currentUser) return [];

    const query = new Parse.Query(WatchItem);
    query.equalTo("user", currentUser);
    query.include("movie");
    query.descending("createdAt");

    const results = await query.find();
    return results.map(item => {
        const movie = item.get("movie");
        return {
            id: item.id,
            movie: {
                objectId: movie?.id || null,
                title: movie?.get("title") || "Unknown",
                year: movie?.get("year") || "N/A",
                genre: movie?.get("genre") || "N/A",
            }
        };
    });
}
