import React from 'react';

const Watchlist = ({ list, onRemove }) => {
  return (
    <div>
      <h2>My Movie Watchlist</h2>
      {list.length === 0 ? (
        <p>No movies currently on the watchlist.</p>
      ) : (
        <ul>
          {list.map((movie) => (
            <li key={movie.id}>
              {movie.title}
              <button onClick={() => onRemove(movie.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
