import React from "react";

/**
 * This is a "Data Processing Component" that translates backend DTOs into human-readable text.
 * * LOGIC:
 * 1. Initial Guard: If no 'result' object exists, it returns a placeholder state ("--").
 * 2. Destructuring: It extracts 'value', 'unit', 'operation', and 'message' from the backend response.
 * 3. Switch-Like Logic:
 * - COMPARE: Converts numeric 1/0 into "Equal" or "Not Equal" and sets a success flag for styling.
 * - CONVERT: Displays the numeric value rounded to 6 places alongside the target unit.
 * - DIVIDE: Handles dimensionless ratios (where units cancel out).
 * - ARITHMETIC: Handles addition and subtraction.
 * 4. Helper Function (roundDisplay): Ensures numbers don't overflow the UI by fixing them to
 * 6 decimal places and stripping unnecessary trailing zeros using parseFloat().
 */

const ResultBox = ({ result, action, arithmeticOp }) => {
  if (!result) {
    return (
      <div className="result-box">
        <h4>RESULT</h4>
        <p>--</p>
      </div>
    );
  }

  let displayValue = "--";
  let displayLabel = "";
  let isSuccess = true;

  const { result: value, unit, operation, message } = result;

  if (operation === "COMPARE" || action === "compare") {
    // result = 1 → equal, result = 0 → not equal
    const isEqual = value === 1;
    displayValue = isEqual ? " Equal" : " Not Equal";
    displayLabel = `${message || ""}`;
    isSuccess = isEqual;
  } else if (operation === "CONVERT" || action === "convert") {
    // result = converted numeric value, unit = target unit name
    displayValue = `${roundDisplay(value)} ${unit}`;
    displayLabel = message || "Conversion successful";
  } else if (
    operation === "DIVIDE" ||
    (action === "arithmetic" && arithmeticOp === "DIVIDE")
  ) {
    // result = dimensionless ratio
    displayValue = `${roundDisplay(value)}`;
    displayLabel = `Ratio (dimensionless) • ${message || ""}`;
  } else {
    // ADD / SUBTRACT
    displayValue = `${roundDisplay(value)} ${unit}`;
    displayLabel = message || "Operation successful";
  }

  return (
    <div className={`result-box ${isSuccess ? "" : "result-not-equal"}`}>
      <h4>RESULT</h4>
      <p className="result-value">{displayValue}</p>
      {displayLabel ? (
        <span className="result-label">{displayLabel}</span>
      ) : null}
    </div>
  );
};

// Round to max 6 significant decimal places for display
function roundDisplay(value) {
  if (value === null || value === undefined) return "--";
  const n = Number(value);
  if (!isFinite(n)) return "--";
  // Show up to 6 decimal places, strip trailing zeros
  return parseFloat(n.toFixed(6)).toString();
}

export default ResultBox;
