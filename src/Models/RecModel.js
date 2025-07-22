// This is the parse modeling for the movie recommendation feature
import Parse from "parse";

const Movie = Parse.Object.extend("Movies");
const WatchItem = Parse.Object.extend("WatchItem");

function parseEra(eraString) {
    if (!eraString) return null;
    const parts = eraString.split("-");
    const startYear = parseInt(parts[0]);
    const endYear = parseInt(parts[1]);
    if (isNaN(startYear) || isNaN(endYear)) return null;
    return { startYear, endYear };
}

export async function getRec() {
    const currentUser = Parse.User.current();
    if (!currentUser) {
        console.error("You are not logged in!");
        return null;
    }

    const favGenre = currentUser.get("FavGenre");
    const movieEra = currentUser.get("MovieEra");

    const watchlistQuery = new Parse.Query(WatchItem);
    watchlistQuery.equalTo("user", currentUser);
    watchlistQuery.include("movie");
    const watchlistItems = await watchlistQuery.find();    
    const watchedMovieIds = watchlistItems.map(item => item.get("movie").id);

    let query;
    const genreQuery = new Parse.Query(Movie);
    const eraQuery = new Parse.Query(Movie);

    if (favGenre) genreQuery.equalTo("genre", favGenre);

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

    query.notContainedIn("objectId", watchedMovieIds);

    try {
        const results = await query.find();
        if (results.length === 0) {
            console.log("We could not find a new movie to recommend to you. Please update your preferences.");
            return null;
        }

        const randomIndex = Math.floor(Math.random() * results.length);
        const randomMovie = results[randomIndex];
        console.log("Your recommended movie is:", randomMovie.get("title"));
        return randomMovie;
    } catch (error) {
        console.error("Error fetching recommended movie:", error);
        throw error;
    }
}
