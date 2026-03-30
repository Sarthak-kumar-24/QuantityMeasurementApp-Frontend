import React from "react";
import "./button.css";

/**
 * props:
 * *- text: The label displayed on the button.
 * *- onClick: Function to trigger when clicked.
 * *- type: HTML button type (submit, reset, or button).
 * *- disabled: Boolean to prevent interaction.
 * *- variant: String to determine styling (e.g., 'primary', 'secondary').
 */
const Button = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      // Logic: Uses template literals to combine static 'btn' class
      // with dynamic variant and conditional 'disabled' classes
      className={`btn ${variant} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
