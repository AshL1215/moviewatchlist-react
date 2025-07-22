import React from 'react';

// Watchlist component for collapsible display of user's watchlist
const Watchlist = ({ watchlist, removeMovie }) => {
  if (!watchlist || watchlist.length === 0) {
    return <p style={{ marginTop: '1rem' }}>No movies currently on the watchlist.</p>;
  }

  return (
    <ul style={{ marginTop: '1rem' }}>
      {watchlist.map((item) => (
        <li key={item.id}>
          {item.title || 'Untitled'} ({item.year || 'Unknown'}) - {item.genre}
          <button
            onClick={() => removeMovie(item.id)}
            style={{
              marginLeft: '1rem',
              backgroundColor: '#C99700',
              color: '#0C2340',
              border: 'none',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Watchlist;
