// Based on the Feature 5 Kickoff Solution
// import react and user info from other pages
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

// Creating the protected route element
const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("element: ", Component);
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/auth");
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
