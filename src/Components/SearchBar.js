import React from 'react';

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Movie Title"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
