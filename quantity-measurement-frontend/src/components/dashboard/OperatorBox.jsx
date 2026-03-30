import React from "react";

/**
 * This component is a "Conditional UI Fragment."
 * * LOGIC:
 * 1. Visibility Check: It uses an early 'return null' pattern. If the 'visible' prop is false,
 * the component renders nothing at all, preventing unnecessary DOM elements.
 * 2. Defaulting: It uses a default parameter for 'symbol' ("+"), ensuring that if a
 * symbol isn't provided, it doesn't leave an empty box.
 * 3. Purpose: It is typically placed between two input fields to show the mathematical
 * operation currently being performed (like +, -, or /).
 */

const OperatorBox = ({ visible, symbol = "+" }) => {
  if (!visible) return null;

  return (
    <div className="operator-box">
      <span>{symbol}</span>
    </div>
  );
};

export default OperatorBox;
