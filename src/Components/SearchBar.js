// src/components/SearchBar.js

import React from 'react';

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          padding: '0.5rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
          flexGrow: 1
        }}
      />
      <button
        onClick={() => onSearch(query)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#C99700',
          color: '#0C2340',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
