// This is the first page users will see when they enter website
// import react features and other necessary files
import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";

function About() {
  return <h1>About This App</h1>;
}

// Redirect user if they are already logged in
 useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

export default About
// This is a simple About component for the Movie Watchlist application.
// It displays information about the application when the user visits the about page.

// Need to add login and register button