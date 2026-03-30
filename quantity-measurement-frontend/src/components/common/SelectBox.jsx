import React from "react";
import "./select.css";

/**
 * props:
 * - options: An array of strings to be turned into dropdown choices.
 * - onChange: Captures the user selection.
 */
const SelectBox = ({ label, options = [], value, onChange, name }) => {
  return (
    <div className="select-group">
      {/*  Conditional Rendering: If 'label' prop exists, render the <label> tag. 
             If 'label' is null/undefined, this line is ignored. */}
      {label && <label>{label}</label>}

      {/* The standard HTML select element. 
             'value' makes it a "controlled component" (tied to React state).
             'onChange' is the callback function that runs when a user picks an option.
             'name' helps identify this specific field in a form. */}
      <select value={value} onChange={onChange} name={name}>
        {/* Logic: Data Mapping - Transforms the 'options' array into 
            JSX <option> elements using .map(). 
            'index' is used as a key, though using unique IDs is usually better. */}
        {options.map((opt, index) => (
          /* For every item in the array, we return an <option> tag.
                 'key' is a unique identifier React uses to optimize list rendering.
                 'value' is the data sent to the state when selected.
                 {opt} inside the tag is the text visible to the user. */
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
