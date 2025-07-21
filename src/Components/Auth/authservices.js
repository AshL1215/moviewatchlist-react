// File that interacts with backend user information
import Parse from 'parse';

export function checkUser() {
  return !!Parse.User.current();
}

// Registration function
export async function registerUser(username, password, favgenre, movieera) {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("FavGenre", favgenre);
  user.set("MovieEra", movieera);

  try {
    await user.signUp();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

// User log in function
export async function loginUser(username, password) {
  try {
    const user = await Parse.User.logIn(username, password);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Logout function
export async function logoutUser() {
  try {
    await Parse.User.logOut();
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

// Function to update the movie preferences of the user 
export async function updatePref(favgenre, movieera) {
  const currentUser = Parse.User.current();
  // Check if the user is logged in
  if (!currentUser) {
    throw new Error("No user is logged in.");
  }

  // Setting the new preferences
  currentUser.set("FavGenre", favgenre);  
  currentUser.set("MovieEra", movieera);  
  try {
    await currentUser.save();
    return currentUser;
  } catch (error) {
    throw error;
  }  
}
