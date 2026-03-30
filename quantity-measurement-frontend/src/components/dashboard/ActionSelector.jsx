import React from "react";

/**
 * 1. Data Configuration:
 * An array of objects defining the available actions.
 * 'key' is the technical ID, 'label' is the text shown to the user.
 */
const actions = [
  { key: "compare", label: "Comparison" },
  { key: "convert", label: "Conversion" },
  { key: "arithmetic", label: "Arithmetic" },
];


/**
 * 2. Component Props:
 * - selectedAction: The key of the currently active button.
 * - onSelect: Function passed from parent to handle the click event.
 * - disableArithmetic: A boolean flag to specifically lock the 'Arithmetic' option.
 */
const ActionSelector = ({ selectedAction, onSelect, disableArithmetic }) => {
  return (
    // 3. Wrapper container for styling the layout (e.g., flexbox or grid).
    <div className="action-container">
      {/* 4. Mapping Logic: 
             Loops through the 'actions' array to create a button for each object. */}
      {actions.map((action) => (
        <button
          // 5. React Key: Uses the unique 'key' from the object for efficient rendering.
          key={action.key}
          /* 6. Dynamic Styling: 
                 If the button's key matches the 'selectedAction' prop, 
                 it adds the "active" CSS class; otherwise, it's an empty string. */
          className={`action-btn ${
            selectedAction === action.key ? "active" : ""
          }`}
          /* 7. Event Handler: 
                 When clicked, it calls the parent's function with this button's key. */
          onClick={() => onSelect(action.key)}
          disabled={disableArithmetic && action.key === "arithmetic"}
          /* 8. Conditional Disabling: 
                 The button is disabled ONLY IF:
                 The 'disableArithmetic' prop is true AND this specific button is the arithmetic one. */
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionSelector;
