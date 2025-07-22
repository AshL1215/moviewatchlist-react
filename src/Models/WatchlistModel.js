import Parse from "parse";

const Movie = Parse.Object.extend("Movies");
const WatchItem = Parse.Object.extend("WatchItem");

// Adds a movie to the watchlist (creates or reuses movie Parse object)
export async function addMovie(movieData) {
  const currentUser=Parse.User.current();
// check if the user is logged in 
if (!currentUser) {
  throw new Error("You must be logged in!")
}

  const query = new Parse.Query(Movie);
  query.equalTo("title", movieData.title);
  const existing = await query.first();

  let movie;
  if (existing) {
    movie = existing;
  } else {
    movie = new Movie();
    movie.set("title", movieData.title);
    movie.set("year", movieData.year);
    movie.set("genre", movieData.genre);
    await movie.save(); // Save new movie if not found
  }

  const newWatchItem = new WatchItem();
  newWatchItem.set("movie", movie); // Link movie pointer


// Connect user pointer to watchlist
newWatchItem.set("user",currentUser);


  try {
    const savedItem = await newWatchItem.save();
    console.log("✅ Movie added to watchlist");
    return savedItem;
  } catch (error) {
    console.error("❌ Could not save watchlist item:", error);
    throw error;
  }
}

// Removes a movie from watchlist by WatchItem ID
export async function removeMovie(watchItemId) {
  const currentUser=Parse.User.current();
  if (!currentUser) {
    throw new Error("You must be logged in!")
  }
  const query = new Parse.Query(WatchItem);
  try {
    const item = await query.get(watchItemId);
    await item.destroy();
    console.log("🗑️ Movie removed from watchlist");
  } catch (error) {
    console.error("❌ Failed to remove movie:", error);
    throw error;
  }
}

// Gets watchlist items with their associated movie data
export async function getWatchlist() {
  const currentUser=Parse.User.current();
  if (!currentUser) {
    return [];
  }
  const query = new Parse.Query(WatchItem);

  // Show watchlist based on who the user is
  query.equalTo("user",currentUser);
  query.include("movie");
  query.descending("createdAt");

  try {
    const results = await query.find();
    return results.map(item => {
      const movie = item.get("movie");
      return {
        id: item.id,
        movie: {
          title: movie.get("title"),
          year: movie.get("year"),
          genre: movie.get("genre")
        }
      };
    });
  } catch (error) {
    console.error("❌ Could not load watchlist:", error);
    throw error;
  }
}