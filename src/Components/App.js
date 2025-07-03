// Main routing component for the application
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importing page-level components
import MainMovie from './MainMovie';
import About from './About';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<MainMovie />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
