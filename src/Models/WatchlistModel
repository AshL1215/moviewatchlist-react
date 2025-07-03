// This is the Parse Model for the watchlist
import Parse from "parse";

const Movie = Parse.Object.extend("Movies");
const WatchItem = Parse.Object.extend("WatchItem");

// function to add movies to the watchlist
export async function addMovie(movieParseObject){
   const newWatchItem=new WatchItem();
   newWatchItem.set("movie", movieParseObject);
   
    try {
    const savedItem=await newWatchItem.save();
    console.log("Movie added");
    return savedItem;
   } catch (error){
    console.error("Could not save!", error);
    throw error;
   }
   } 

   // function to remove movies from the watchlist
   export async function removeMovie(WatchItemId){
    const query = new Parse.Query(WatchItem);
        try {
            const WatchItem=await query.get(WatchItemId);
            await WatchItem.destroy();
            console.log("Movie removed");
            }
            catch (error) {
                console.error("Movie could not be removed", error);
                throw error;
            }
        }

// Displaying the Watchlist to the user descending by year
export async function getWatchlist() {
    const query = new Parse.Query(WatchItem);
    query.include("movie");
    query.descending("year");

    try {
        const results =await query.find();
        return results.map(item => {
            const movie = item.get("movie");
            return {
                movie: {
                    title: movie.get("title"),
                    year: movie.get("year"),
                    genre: movie.get("genre"),
                }
            }
        });
    } catch (error) {
        console.error("Could not load watchlist:", error);
        throw error;
    }
}