// This is the parse modeling for the movie reccomendation feature
import Parse from 'parse';
const Movie = Parse.Object.extend("Movies");
const WatchItem = Parse.Object.extend("WatchItem");

/** 
* Parse through the movies based on the movie eras defined
* @param {string} eraString
* @returns {{ startYear: number, endYear, number }}
*/

function parseEra(eraString) {
    if (!eraString) return null;
    const parts = eraString.split("-");
    const startYear = parseInt(parts[0]);
    const endYear = parseInt(parts[1]);
    if (isNaN(startYear) || isNaN(endYear)) return null;
    return { startYear, endYear };
}

/** 
 * Reecomend a random movie from the movie database
* @returns {Promise<Parse.Object | null>} A random movie object or null if none found.
*/

// Function to reccomend to user a movie based on their movie preferences
export async function getRec() {
    // Check if the user is logged in
    const currentUser = Parse.User.current();
    if (!currentUser) {
        console.error("You are not logged in!");
        return null;
    }

    // Grab user movie preferences from user registration
    const favGenre = currentUser.get("FavGenre");
    const movieEra = currentUser.get("MovieEra");

    // Parse through the user's watchlist
    const watchlistQuery = new Parse.Query(WatchItem);
    watchlistQuery.equalTo("user", currentUser);
    watchlistQuery.include("movie");
    const watchlistItems = await watchlistQuery.find();    
    const watchedMovieIds = watchlistItems.map(item => item.get("movie").id);

    // Build a reccomended movie query based on the preferences
    let query;
    const genreQuery = new Parse.Query(Movie);
    const eraQuery = new Parse.Query(Movie);

    // Check if preferences are met 
    if (movieEra) {
        const era = parseEra(movieEra);
        if (era) {
            eraQuery.greaterThanOrEqualTo("year", era.startYear);
            eraQuery.lessThanOrEqualTo("year", era.endYear);
        }
    }
    if (favGenre && movieEra) {
        query = Parse.Query.or(genreQuery, eraQuery);
    } else if (favGenre) {
        query = genreQuery;
    } else if (movieEra) {
        query = eraQuery;
    } else {
        console.log("No preferences set, cannot recommend a movie.");
        return null;
    }

    // Check if the reccomended movies are not already in the user's watchlist
    query.notContainedIn("objectId", watchedMovieIds);
    try {
        const results = await query.find();

        if (results.length === 0) {
            console.log("We could not find a new movie to reccomend to you. Please update your preferences");
            return null;
        }

        // Select a random movie from the results
        const randomIndex = Math.floor(Math.random() * results.length);
        const randomMovie = results[randomIndex];
        console.log("Your reccomended movie is:", randomMovie.get("title"));
        return randomMovie;
    } catch (error) {
        console.error("Error fetching recommended movie:", error);
        throw error;
    }
}