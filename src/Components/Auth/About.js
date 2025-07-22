import React from 'react';

function About() {
  return (
    <div
      style={{
        backgroundColor: '#002654', // Notre Dame blue
        color: '#fcbf49', // Notre Dame gold
        padding: '2rem',
        minHeight: '100vh',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        About Movie Watchlist 🎬
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
        Welcome to the Notre Dame Movie Watchlist App! This platform helps you search,
        save, and manage your favorite movies. Whether you're looking for classics or
        new releases, build a watchlist that’s as elite as the Fighting Irish! 🍿✨
      </p>
    </div>
  );
}

export default About;
// About.js - Displays information about the app