// Setting up the protected route service for the app
// import react and user info from other pages
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/authservices";

// Defining the protected route element
const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("element: ", Component);
  const navigate = useNavigate();
  const goBackHandler = () => {
    // Redirect to about us page if not logged in
    navigate("../Auth/about");
  };
  // Check if the user is authorized and if not display an error
  if (checkUser()) {
    return <Component />;
  } else {
    return (
      <div>
        <p>Unauthorized!</p> <button onClick={goBackHandler}>Go Back.</button> 
      </div>
    );
  }
};

export default ProtectedRoute;
