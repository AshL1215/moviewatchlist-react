// This is the parse model service for the Watchlist
import Parse from "parse";

const Movie = Parse.Object.extend("Movies");
const WatchItem = Parse.Object.extend("WatchItem");

// Adds a movie to the watchlist 
export async function addMovie(movieData) {
    const currentUser = Parse.User.current();
    if (!currentUser) {
        throw new Error("You must be logged in!");
    }

    let movie;
    // Try to find the movie in Parse by its objectId
    if (movieData.objectId) {
        const queryById = new Parse.Query(Movie);
        try {
            movie = await queryById.get(movieData.objectId);
            console.log("addMovie: Found existing movie by ID:", movie.id);
        } catch (error) {
            console.warn(`addMovie: Movie with ID ${movieData.objectId} not found directly, checking by title.`);
        }
    }

    // If not found by ID, try to find by title
    if (!movie) {
        const queryByTitle = new Parse.Query(Movie);
        queryByTitle.equalTo("title", movieData.title);
        const existingByTitle = await queryByTitle.first();

        if (existingByTitle) {
            movie = existingByTitle;
            console.log("addMovie: Found existing movie by title:", movie.get("title"));
        } else {
            // If still not found, create a new movie Parse object
            movie = new Movie();
            movie.set("title", movieData.title);
            movie.set("year", movieData.year);
            movie.set("genre", movieData.genre);
            await movie.save(); // Save the new movie
            console.log("addMovie: Created new movie object:", movie.id);
        }
    }

    // Check if a WatchItem for this movie and user already exists to prevent duplicate watchlist entries
    const existingWatchItemQuery = new Parse.Query(WatchItem);
    existingWatchItemQuery.equalTo("user", currentUser);
    existingWatchItemQuery.equalTo("movie", movie); 
    const existingWatchItem = await existingWatchItemQuery.first();

    if (existingWatchItem) {
        console.warn("addMovie: Movie is already in the user's watchlist. Not adding again.");
        return existingWatchItem;
    }

    // Create and save the new WatchItem
    const newWatchItem = new WatchItem();
    newWatchItem.set("movie", movie); 
    newWatchItem.set("user", currentUser); 

    try {
        const savedItem = await newWatchItem.save();
        console.log("✅ Movie added to watchlist:", savedItem.id);
        return savedItem;
    } catch (error) {
        console.error("❌ Could not save watchlist item:", error);
        throw error;
    }
}

// Removes a movie from watchlist by WatchItem ID
export async function removeMovie(watchItemId) {
    const currentUser = Parse.User.current();
    if (!currentUser) {
        throw new Error("You must be logged in!")
    }
    const query = new Parse.Query(WatchItem);
    try {
        const item = await query.get(watchItemId);
        // Security check: Ensure the item belongs to the current user before destroying
        if (item.get("user").id !== currentUser.id) {
            throw new Error("You are unauthorized to remove this watchlist item.");
        }
        await item.destroy();
        console.log("Movie removed from watchlist");
    } catch (error) {
        console.error("❌ Failed to remove movie:", error);
        throw error;
    }
}

// Gets watchlist items with their associated movie data
export async function getWatchlist() {
    const currentUser = Parse.User.current();
    if (!currentUser) {
        return [];
    }
    const query = new Parse.Query(WatchItem);

    // Show watchlist based on who the user is
    query.equalTo("user", currentUser);
    query.include("movie"); 
    query.descending("createdAt");

    try {
        const results = await query.find();
        return results.map(item => {
            const movie = item.get("movie"); 

          
            if (movie) { 
                return {
                    id: item.id, 
                    movie: { 
                        objectId: movie.id, 
                        title: movie.get("title"),
                        year: movie.get("year"),
                        genre: movie.get("genre")
                    }
                };
            } else {
          
                console.warn(`WatchItem ${item.id} has no associated movie object!`);
                return {
                    id: item.id,
                    movie: {
                        objectId: null, 
                        title: "MISSING MOVIE", 
                        year: "N/A",
                        genre: "N/A"
                    }
                };
            }
            
        });
    } catch (error) {
        console.error("❌ Could not load watchlist in WatchlistModel:", error);
        throw error;
    }
}