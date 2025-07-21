// File that interacts with backend user information
import Parse from 'parse';

export function checkUser() {
  return !!Parse.User.current();
}

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

export async function loginUser(username, password) {
  try {
    const user = await Parse.User.logIn(username, password);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logoutUser() {
  try {
    await Parse.User.logOut();
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
