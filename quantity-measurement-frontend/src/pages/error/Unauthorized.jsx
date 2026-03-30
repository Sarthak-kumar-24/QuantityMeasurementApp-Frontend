import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/error.css";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1>401</h1>
      <h2>Unauthorized</h2>
      <p>You are not allowed to access this page.</p>

      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
};

export default Unauthorized;
