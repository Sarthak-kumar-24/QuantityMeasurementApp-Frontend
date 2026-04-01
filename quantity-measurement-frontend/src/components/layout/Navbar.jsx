import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/layout.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  return (
    <div className="navbar">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
