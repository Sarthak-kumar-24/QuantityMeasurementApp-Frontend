import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

/**
 * This is the "Signup Page" component. It collects new user details and sends
 * them to the registration system.
 * * * * PURPOSE:
 * To handle the creation of a new user account by capturing Name, Email, Password,
 * and Mobile number, while ensuring all data follows specific rules before sending.
 * * * * LINE-BY-LINE LOGIC:
 * 1. const { signup } = useAuth();
 * -> It imports the 'signup' function from your custom hook. Note: This hook is
 * where the actual BACKEND API call is triggered (via authService).
 * * 2. const [form, setForm] = useState({ ... });
 * -> This creates a "State Object" to hold all four input values. It keeps the UI
 * in sync with what the user is typing.
 * * 3. const validate = () => { ... }
 * -> The "Guard Logic." It uses conditions to check:
 * - Name length (3+ chars)
 * - Email format (must have "@")
 * - Password strength (4+ chars)
 * - Mobile format (Regex check: must start with 6-9 and be 10 digits total).
 * * 4. const handleChange = (e) => { ... }
 * -> The "Dynamic Updater." It uses the 'name' attribute of the input to know
 * exactly which part of the state to update (e.g., updating 'mobile' without
 * erasing 'fullName').
 * * 5. const handleSubmit = async () => { ... }
 * -> The "Action Trigger." It runs the validation first. If everything is correct,
 * it calls the 'signup' function and waits for the server.
 * * 6. {error && <p className="error">{error}</p>}
 * -> Shows the error message only if the 'error' state is not empty.
 * * 7. <span onClick={switchTab}>Login</span>
 * -> Tells the parent (AuthWrapper) to swap this screen for the Login screen.
 *
 *
 *
 *
 * The Flow Summary
 *
 * User Types: handleChange saves the data to the form state.
 *                       |
 *                       V
 * User Clicks Signup: handleSubmit runs.
 *                       |
 *                       V
 * Validation: If the mobile number doesn't start with 6-9, an error appears immediately (no server needed).
 *                       |
 *                       V
 * Backend Call: If valid, the data travels through the Hook -> Service -> Database.
 *                       |
 *                       V
 * Result: On success, the useAuth hook automatically "teleports" the user to the Login page so they can sign in.
 *
 *
 *
 */
const SignupPage = ({ switchTab }) => {
  const { signup } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [error, setError] = useState("");

  const validate = () => {
    if (form.fullName.length < 3) return "Name too short";
    if (!form.email.includes("@")) return "Invalid email";
    if (form.password.length < 4) return "Password must be 4+ chars";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) return "Invalid mobile number";
    return "";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return setError(err);

    try {
      setError("");
      await signup(form);
      // On success, navigates to /login (handled in useAuth)
    } catch (err) {
      // err is already a string extracted by useAuth hook
      setError(
        typeof err === "string" ? err : "Signup failed. Please try again.",
      );
    }
  };

  return (
    <div className="form-container">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Id"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        onChange={handleChange}
      />

      {error && <p className="error">{error}</p>}

      <button className="auth-btn signup" onClick={handleSubmit}>
        Signup
      </button>

      <p className="switch-text">
        Already have an account? <span onClick={switchTab}>Login</span>
      </p>
    </div>
  );
};

export default SignupPage;
