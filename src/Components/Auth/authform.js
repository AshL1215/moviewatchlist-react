
import React from "react";

// Define the options for genres
const Genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Adventure",
  "Thriller",
  "Horror",
  "Romance",
  "Sci-Fi"
];

// Define the options for the movie eras 
const Eras = [
  "1920s-1950s (Golden Age)", 
  "1960s-1970s (New Hollywood)", 
  "1980s-1990s (Blockbuster Era)", 
  "2000s-2010s", 
  "2020s-Present"
];

// Reusable form component used by both login and registration
const AuthForm = ({ type, username, password, favgenre, setFavgenre, movieera, setMovieera,setUsername, setPassword, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>{type === "login" ? "Login" : "Register"}</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />


      {type === "register" && (
        <>
          <label>
            Favorite Genre: 
            <select
              value={favgenre}
              onChange={(e) => setFavgenre(e.target.value)}
              required
            >
              <option value="">-- Choose a Genre --</option>
              {Genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Favorite Movie Era: 
            <select
              value={movieera}
              onChange={(e) => setMovieera(e.target.value)}
              required
            >
              <option value="">-- Choose a Movie Era --</option>
              {Eras.map((era) => (
                <option key={era} value={era}>
                  {era}
                </option>
              ))}
            </select>
          </label>
          <br />
        </>
      )}

      <button type="submit">{type === "login" ? "Login" : "Register"}</button>
    </form>
  );
};


export default AuthForm;