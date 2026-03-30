import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/error.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
};

export default NotFound;
