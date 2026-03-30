import React from "react";

/**
 * This is a "Validated Dropdown Component" for unit selection (e.g., Meters, Feet).
 * * LOGIC:
 * 1. Validation Logic (safeValue): It checks if the current 'value' actually exists within the
 * 'options' array. If it doesn't (which can happen when switching from 'Length' to 'Weight'),
 * it automatically defaults to the first available unit in the list to prevent empty selections.
 * 2. Mapping: Converts the 'options' string array into JSX <option> elements.
 * 3. Simplified Event Handling: Instead of passing the whole event object to the parent,
 * it extracts 'e.target.value' immediately for a cleaner API.
 */
const UnitSelector = ({ label, options, value, onChange }) => {
  // If no value provided or value not in options, default to first option
  const safeValue = options.includes(value) ? value : options[0];

  return (
    <div className="input-box">
      <label>{label}</label>
      <select value={safeValue} onChange={(e) => onChange(e.target.value)}>
        {options.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
};


export default UnitSelector;
