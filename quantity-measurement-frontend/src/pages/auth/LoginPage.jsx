import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

/**
 * This is the "Login Form" component. It handles user input,
 * validates it locally, and then talks to the authentication manager.
 * * * * LINE-BY-LINE LOGIC:
 * 1. const { login } = useAuth();
 * -> It "borrows" the login function from your custom useAuth hook (the manager).
 * * 2. const [form, setForm] = useState({ email: "", password: "" });
 * -> This is "State Management." It keeps track of what the user is typing
 * in real-time inside a single object.
 * * 3. const validate = () => { ... }
 * -> The "Checkpost." Before even talking to the server, it checks if the
 * email has an "@" and if the password is long enough. This saves time.
 * * 4. const handleChange = (e) => { ... }
 * -> The "Updater." Every time you press a key, this function runs.
 * It uses [e.target.name] to figure out which box you're typing in
 * (email or password) and updates that specific part of the state.
 * * 5. const handleSubmit = async () => { ... }
 * -> The "Submitter." When the button is clicked:
 * - It runs the 'validate' check.
 * - If valid, it clears old errors and calls the 'login' function.
 * - If the server says "No" (wrong password), the 'catch' block
 * grabs that error message and shows it on the screen.
 * * 6. {error && <p className="error">{error}</p>}
 * -> "Conditional Error Message." If there is a mistake, this line
 * makes a red message appear instantly.
 * * 7. <span onClick={switchTab}>Sign up</span>
 * -> The "Tab Switcher." When clicked, it calls the function passed
 * down from AuthWrapper to slide over to the Signup screen.
 *
 *
 * The Flow Summary
 *
 * Typing: handleChange updates the form object with every keystroke.
 *                       |
 *                       V
 * Clicking Login: handleSubmit runs -> validate checks the rules.
 *                       |
 *                       V
 * API Call: If rules pass, it calls login(form) from the hook.
 *                       |
 *                       V
 * Success: User is redirected to the Dashboard.
 *                       |
 *                       V
 * Failure: An error message is set in the error state and appears on the UI.
 *
 */
const LoginPage = ({ switchTab }) => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const validate = () => {
    if (!form.email.includes("@")) return "Enter valid email";
    if (form.password.length < 4)
      return "Password must be at least 4 characters";
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
      await login(form);
    } catch (err) {
      // err is already a string extracted by useAuth hook
      setError(typeof err === "string" ? err : "Invalid credentials");
    }
  };

  return (
    <div className="form-container">
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

      {error && <p className="error">{error}</p>}

      <button className="auth-btn" onClick={handleSubmit}>
        Login
      </button>

      <p className="switch-text">
        Don't have an account? <span onClick={switchTab}>Sign up</span>
      </p>
    </div>
  );
};

export default LoginPage;
