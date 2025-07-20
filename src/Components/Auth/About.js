// This is the first page users will see when they enter website
// This is a simple About component for the Movie Watchlist application.
// It displays information about the application when the user visits the about page.
// import react features and other necessary files
import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "./authservices";

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h1>About This App</h1>
      <p>
        Our movie watchlist app allows you to explore our catalogue of movies and add them to your watchlist!
      </p>

      {/* ✅ Use absolute paths and add spacing */}
      <Link to="/register"><button>Register</button></Link>
      <br /><br />
      <Link to="/login"><button>Login</button></Link>
    </div>
  );
}

export default About;