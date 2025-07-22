import React from 'react';

// Watchlist component displays all movies currently in the user's watchlist
// and provides the option to remove them
const Watchlist = ({ list, onRemove }) => {
  return (
    <div>
      <h2>My Movie Watchlist</h2>
      <div className="watchlist-container">
      {list.length === 0 ? (
        <p>No movies currently on the watchlist.</p>
      ) : (
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              {item.title} ({item.year}) - {item.genre}
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
 );
};

export default Watchlist;
