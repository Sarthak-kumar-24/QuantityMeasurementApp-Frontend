import React from "react";

/**
 * This is a "Category Navigation Component" used to switch measurement types.
 * * LOGIC:
 * 1. Data Configuration: Uses a static 'types' array containing keys (ID), icons (FontAwesome classes),
 * and labels (Display text).
 * 2. Interactive Mapping: Iterates through the types to generate "Cards."
 * 3. State Feedback: Compares 'selectedType' prop with the current item's key to apply
 * the "active" CSS class for visual highlighting.
 * 4. Event Bubbling: Passes the clicked key back to the parent via 'onSelect'.
 */
const types = [
  { key: "length", icon: "fa-ruler", label: "Length" },
  { key: "weight", icon: "fa-weight-hanging", label: "Weight" },
  { key: "temperature", icon: "fa-temperature-half", label: "Temperature" },
  { key: "volume", icon: "fa-flask", label: "Volume" },
];


const TypeSelector = ({ selectedType, onSelect }) => {
  return (
    <div className="type-container">
      {types.map((type) => (
        <div
          key={type.key}
          className={`type-card ${selectedType === type.key ? "active" : ""}`}
          onClick={() => onSelect(type.key)}
        >
          <i className={`fa-solid ${type.icon}`}></i>
          <span>{type.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TypeSelector;
