import React from "react";
import "./input.css";

/**
 * props:
 * - label: Text for the <label> tag.
 * - value: Current value of the input (controlled state).
 * - onChange: Function to update the state in the parent component.
 */
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
}) => {
  return (
    <div className="input-group">
      {/* Logic: Conditional Rendering - The label only renders if the prop exists */}
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
