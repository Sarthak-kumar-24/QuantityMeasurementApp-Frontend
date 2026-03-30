import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import TypeSelector from "../../components/dashboard/TypeSelector";
import ActionSelector from "../../components/dashboard/ActionSelector";
import ValueInput from "../../components/dashboard/ValueInput";
import UnitSelector from "../../components/dashboard/UnitSelector";
import OperatorBox from "../../components/dashboard/OperatorBox";
import ResultBox from "../../components/dashboard/ResultBox";
import useConversion from "../../hooks/useConversion";
import { UNITS, toApiUnit } from "../../utils/constants";
import "../../styles/components/dashboard.css";
import Footer from "../../components/layout/Footer";

/**
 *
 * * 1. PURPOSE:
 * This is the primary page where users perform Length, Weight, Volume, or Temperature
 * calculations. it manages the "Form State" and coordinates with the conversion hook.
 * * * 2. STATE MANAGEMENT (useState):
 * - type: Tracks the category (Length, Weight, etc.).
 * - action: Tracks what to do (Convert, Compare, or Arithmetic).
 * - value1 / value2: The actual numbers entered by the user.
 * - unit1 / unit2: The selected units (e.g., Feet to Inches).
 * * * 3. SYNCING DATA (useEffect):
 * - When you change the 'Type' (e.g., switching from Length to Weight), this logic
 * automatically clears the old numbers and resets the units to the new category's
 * defaults so the app doesn't crash or show "Feet" under "Weight."
 * - Special Rule: If 'Temperature' is picked, 'Arithmetic' is disabled because
 * adding temperatures (like 10°C + 10°C) is physically complex.
 * * * 4. THE VALIDATION (validate):
 * - It acts as a "Pre-Flight Check." It ensures you don't leave boxes empty and
 * specifically prevents "Division by Zero" errors before sending data to the server.
 * * * 5. THE PAYLOAD BUILDER (buildPayload):
 * - This is a "Translator." It takes the human-friendly state (like "feet") and
 * converts it into a "Payload" (a data object) that the Backend API expects to see.
 * * * 6. THE CALCULATION (handleCalculate):
 * - When you click the big button, it validates the form, builds the payload,
 * and then triggers 'executeOperation' from your hook.
 * * * 7. CONDITIONAL RENDERING (The JSX):
 * - It uses {action === "arithmetic" && ...} to hide or show extra inputs.
 * For example, if you are just "Converting," you only see one value box. If you
 * are "Comparing," it shows two value boxes and a "VS" symbol.
 *
 *
 * The Flow Summary
 *
 * User Choice: You pick "Length" and "Arithmetic (Add)."
 *                       |
 *                       V
 * App Response: The UI automatically shows two input boxes with a "+" symbol between them.
 *                       |
 *                       V
 * Calculation: You enter "5 Feet" + "10 Inches" and click CALCULATE.
 *                       |
 *                       V
 * The Trip: The data travels to the Hook -> Service -> API.
 *                       |
 *                       V
 * The Result: The ResultBox at the bottom catches the answer from the server and displays: "70 Inches".
 *
 *
 *
 *
 */

const DashboardPage = () => {
  const { result, loading, error, executeOperation, reset } = useConversion();

  const [type, setType] = useState("length");
  const [action, setAction] = useState("convert");

  // Arithmetic sub-operation (ADD / SUBTRACT / DIVIDE)
  const [arithmeticOp, setArithmeticOp] = useState("ADD");

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  // Units default to first option of the current type
  const [unit1, setUnit1] = useState(UNITS["length"][0]);
  const [unit2, setUnit2] = useState(UNITS["length"][1]);

  const [validationError, setValidationError] = useState("");

  // When type changes: reset all inputs and defaults
  useEffect(() => {
    const options = UNITS[type];
    setUnit1(options[0]);
    setUnit2(options.length > 1 ? options[1] : options[0]);
    setValue1("");
    setValue2("");
    setValidationError("");
    reset();
    // If temperature is selected and current action is arithmetic → switch to convert
    if (type === "temperature" && action === "arithmetic") {
      setAction("convert");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // When action changes: reset result
  useEffect(() => {
    reset();
    setValidationError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  // --- Validation ---
  const validate = () => {
    if (value1 === "" || isNaN(Number(value1))) return "Value 1 is required";

    if (action === "compare") {
      if (value2 === "" || isNaN(Number(value2)))
        return "Value 2 is required for comparison";
      if (unit1 === unit2 && Number(value1) === Number(value2)) {
        // allowed — comparing same unit same value (should be equal)
      }
    }

    if (action === "arithmetic") {
      if (value2 === "" || isNaN(Number(value2)))
        return "Value 2 is required for arithmetic";
      if (arithmeticOp === "DIVIDE" && Number(value2) === 0)
        return "Cannot divide by zero";
    }

    return "";
  };

  // --- Payload builder ---
  const buildPayload = () => {
    const v1 = Number(value1);
    const v2 = Number(value2 || 0);
    const u1 = toApiUnit(unit1); // e.g. "feet"
    const u2 = toApiUnit(unit2); // e.g. "inches"

    if (action === "compare") {
      return {
        value1: v1,
        unit1: u1,
        value2: v2,
        unit2: u2,
        targetUnit: u2,
        operation: "COMPARE",
      };
    }

    if (action === "convert") {
      // targetUnit and unit2 both = destination unit
      return {
        value1: v1,
        unit1: u1,
        value2: 0,
        unit2: u2, // @NotBlank — must be filled
        targetUnit: u2, // used by convert() service method
        operation: "CONVERT",
      };
    }

    // arithmetic
    return {
      value1: v1,
      unit1: u1,
      value2: v2,
      unit2: u2,
      targetUnit: u1, // result returned in unit1's unit
      operation: arithmeticOp, // "ADD" | "SUBTRACT" | "DIVIDE"
    };
  };

  const handleCalculate = () => {
    const err = validate();
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError("");
    const payload = buildPayload();
    executeOperation(payload, action);
  };

  const unitOptions = UNITS[type];

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        {/* HEADER */}
        <div className="header">
          <h1>Welcome To Quantity Measurement</h1>
        </div>

        <div className="content">
          {/* TYPE */}
          <h4>CHOOSE TYPE</h4>
          <TypeSelector selectedType={type} onSelect={setType} />

          {/* ACTION */}
          <h4>CHOOSE ACTION</h4>
          <ActionSelector
            selectedAction={action}
            onSelect={setAction}
            disableArithmetic={type === "temperature"}
          />

          {/* ARITHMETIC SUB-OPERATION SELECTOR */}
          {action === "arithmetic" && (
            <div className="action-container" style={{ marginTop: "8px" }}>
              {["ADD", "SUBTRACT", "DIVIDE"].map((op) => (
                <button
                  key={op}
                  className={`action-btn ${arithmeticOp === op ? "active" : ""}`}
                  onClick={() => setArithmeticOp(op)}
                >
                  {op === "ADD" ? (
                    <>
                      <i className="fa fa-plus"></i> Add
                    </>
                  ) : op === "SUBTRACT" ? (
                    <>
                      <i className="fa fa-minus"></i> Subtract
                    </>
                  ) : (
                    <>
                      <i className="fa fa-divide"></i> Divide
                    </>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* INPUTS */}
          <div className="input-grid">
            {/* LEFT — always shown */}
            <div>
              <ValueInput label="Value 1" value={value1} onChange={setValue1} />
              <UnitSelector
                label="From Unit"
                options={unitOptions}
                value={unit1}
                onChange={setUnit1}
              />
            </div>

            {/* OPERATOR — compare and arithmetic */}
            {(action === "compare" || action === "arithmetic") && (
              <OperatorBox
                visible={true}
                symbol={
                  action === "compare" ? (
                    "VS"
                  ) : arithmeticOp === "ADD" ? (
                    <i className="fa fa-plus"></i>
                  ) : arithmeticOp === "SUBTRACT" ? (
                    <i className="fa fa-minus"></i>
                  ) : (
                    <i className="fa fa-divide"></i>
                  )
                }
              />
            )}

            {/* RIGHT — compare and arithmetic need value2 + unit2 */}
            {(action === "compare" || action === "arithmetic") && (
              <div>
                <ValueInput
                  label="Value 2"
                  value={value2}
                  onChange={setValue2}
                />
                <UnitSelector
                  label="Unit"
                  options={unitOptions}
                  value={unit2}
                  onChange={setUnit2}
                />
              </div>
            )}

            {/* RIGHT — convert only needs target unit */}
            {action === "convert" && (
              <div>
                <UnitSelector
                  label="To Unit"
                  options={unitOptions}
                  value={unit2}
                  onChange={setUnit2}
                />
              </div>
            )}
          </div>

          {/* BUTTON */}
          <div className="center">
            <button className="calculate-btn" onClick={handleCalculate}>
              {loading ? "Calculating..." : "CALCULATE"}
            </button>
          </div>

          {/* ERRORS */}
          {validationError && <p className="error">{validationError}</p>}
          {error && (
            <p className="error">
              {typeof error === "string" ? error : "Operation failed"}
            </p>
          )}

          {/* RESULT */}
          <ResultBox
            result={result}
            action={action}
            arithmeticOp={arithmeticOp}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
