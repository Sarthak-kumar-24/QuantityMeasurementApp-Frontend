import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  startLoading,
  success,
  failure,
  clearResult,
} from "../store/slices/measurementSlice";
import conversionService from "../services/conversionService";

/**
 *
 * * 1. PURPOSE:
 * This hook manages the state of measurement operations (like Length Conversion or
 * Weight Comparison). It communicates with the backend and updates the UI.
 * * * 2. THE LOCAL STATES (useState):
 * - result: Stores the answer from the server (e.g., "12 Inches").
 * - loading: A true/false switch to show a "Loading Spinner" while waiting for the server.
 * - error: Stores any error messages if the operation fails.
 * * * 3. THE EXECUTE FUNCTION (executeOperation):
 * - This function is 'async' because it has to wait for the internet/server.
 * - It starts by clearing old results and setting 'loading' to true.
 * * * 4. THE DECISION LOGIC (switch - action):
 * - It looks at the "action" you requested (compare, convert, or arithmetic).
 * - If it's 'arithmetic', it further checks if you want to ADD, SUBTRACT, or DIVIDE.
 * - It then calls the specific function in 'conversionService' to talk to the backend.
 * * * 5. ERROR HANDLING (catch - err):
 * - Backends sometimes send errors as a plain sentence ("Invalid Units") or a JSON object.
 * - This section "digs" through the error object to find the most readable message
 * so the user knows exactly what went wrong.
 * * * 6. FINISHING UP (finally):
 * - No matter if the operation succeeded or failed, it sets 'loading' back to false
 * to stop the spinner.
 * * * 7. THE RESET FUNCTION:
 * - A simple helper to wipe everything clean (clear the result and error)
 * so the user can start a fresh calculation.
 * * * 8. THE RETURN:
 * - It gives the UI access to the result, the loading status, and the functions
 * needed to run the math.
 *
 *
 * The Flow Summary
 *
 * Input: You give the hook a payload (the numbers/units) and an action (what to do).
 *
 * Process: It picks the right API call $\rightarrow$ sends it $\rightarrow$ waits.
 *
 * Storage: It saves the answer in two places: the local component state and the global Redux store.
 *
 * UI Update: Your screen sees the result change and displays the answer automatically.
 *
 */
const useConversion = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeOperation = async (payload, action) => {
    setLoading(true);
    setError(null);
    setResult(null);
    dispatch(startLoading());

    try {
      let res;

      switch (action) {
        case "compare":
          res = await conversionService.compare(payload);
          break;

        case "convert":
          res = await conversionService.convert(payload);
          break;

        case "arithmetic":
          if (payload.operation === "ADD") {
            res = await conversionService.add(payload);
          } else if (payload.operation === "SUBTRACT") {
            res = await conversionService.subtract(payload);
          } else if (payload.operation === "DIVIDE") {
            res = await conversionService.divide(payload);
          } else {
            throw new Error(
              "Unknown arithmetic operation: " + payload.operation,
            );
          }
          break;

        default:
          throw new Error("Invalid action: " + action);
      }

      setResult(res);
      dispatch(success(res));
    } catch (err) {
      /*
       * Backend GlobalExceptionHandler returns plain strings as body (not JSON):
       *   400 BAD_REQUEST  -> QuantityMeasurementException message  (plain text)
       *   400              -> UnsupportedOperationException message  (plain text)
       *   500              -> "Unexpected Error Occurred: ..." (plain text)
       *   401              -> handled by apiClient interceptor (redirect to login)
       *
       * Axios puts this in err.response.data (string).
       */
      let msg;

      if (err?.response?.data) {
        const data = err.response.data;
        // Could be plain string or JSON object with message field
        if (typeof data === "string") {
          msg = data;
        } else if (data?.message) {
          msg = data.message;
        } else {
          msg = JSON.stringify(data);
        }
      } else if (err?.message) {
        msg = err.message;
      } else {
        msg = "Operation failed. Please check your inputs and try again.";
      }

      setError(msg);
      dispatch(failure(msg));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    dispatch(clearResult());
  };

  return {
    result,
    loading,
    error,
    executeOperation,
    reset,
  };
};

export default useConversion;
