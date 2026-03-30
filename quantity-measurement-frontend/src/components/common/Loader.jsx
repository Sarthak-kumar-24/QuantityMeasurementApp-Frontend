import React from "react";
import "./loader.css";

/**
 * This is a stateless, presentational component.
 * It takes no props and simply renders the CSS-based spinner.
 */
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
