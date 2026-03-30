import React from "react";

/**
 * This is a "Primitive Input Wrapper" for numeric data entry.
 * * LOGIC:
 * 1. Strict Typing: The input type is set to "number", which triggers numeric keyboards
 * on mobile devices and prevents most non-numeric text entry.
 * 2. Abstraction: It hides the complexity of 'e.target.value', allowing the parent
 * component to just receive the raw updated value through 'onChange'.
 * 3. Reuse: This is used for both "Value 1" and "Value 2" in the main application form.
 */
const ValueInput = ({ label, value, onChange }) => {
  return (
    <div className="input-box">
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter value"
      />
    </div>
  );
};

export default ValueInput;
