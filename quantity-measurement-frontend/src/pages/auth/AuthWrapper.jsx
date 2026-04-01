import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import "../../styles/components/auth.css";
import logoImage from "../../assets/images/image1.png";

/**
 * This component is a "Tabbed Layout Manager" for authentication.
 * * * PURPOSE:
 * Instead of having separate pages for Login and Signup, this component hosts
 * both in one place and lets the user "toggle" between them.
 * * * LINE-BY-LINE LOGIC:
 * 1. const [activeTab, setActiveTab] = useState("login");
 * -> This is the "Memory." It keeps track of which form is currently visible.
 * It starts with "login" as the default.
 * * * 2. <div className="auth-left"> ... </div>
 * -> This is the static Branding area. It shows the logo and app name
 * consistently, regardless of which tab is selected.
 * * * 3. <div className="auth-tabs"> ... </div>
 * -> These are the "Buttons." When you click "LOGIN" or "SIGNUP", the
 * setActiveTab function updates the memory.
 * -> Logic: It checks `activeTab === "login" ? "active" : ""` to add a CSS
 * highlight to the currently selected tab.
 * * * 4. {activeTab === "login" ? <LoginPage /> : <SignupPage />}
 * -> This is "Conditional Rendering."
 * -> If the memory says "login", it shows the LoginPage component.
 * -> If it says "signup", it swaps it out for the SignupPage component.
 * * * 5. switchTab={() => setActiveTab(...)}
 * -> This is a "Callback Prop." It allows the child components (LoginPage/SignupPage)
 * to tell this parent component to switch tabs (e.g., clicking "Don't have an
 * account? Sign up" inside the login form).
 *
 *
 * The Flow Summary
 *
 * User lands on the page -> activeTab is "login" -> User sees the Login form.
 *                       |
 *                       V
 * User clicks "SIGNUP" -> setActiveTab changes the state to "signup".
 *                       |
 *                       V
 * React reacts -> It sees the state changed and automatically replaces the LoginPage with the SignupPage inside the same box.
 *
 *
 */
const AuthWrapper = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* LEFT */}
        <div className="auth-left">
          <img src={logoImage} alt="logo" />
          <h2>QuantityMeasurementApp</h2>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-tabs">
            <span
              className={activeTab === "login" ? "active" : ""}
              onClick={() => setActiveTab("login")}
            >
              LOGIN
            </span>
            <span
              className={activeTab === "signup" ? "active" : ""}
              onClick={() => setActiveTab("signup")}
            >
              SIGNUP
            </span>
          </div>

          {/*  FIX: KEEP FORM INSIDE RIGHT */}
          {activeTab === "login" ? (
            <LoginPage switchTab={() => setActiveTab("signup")} />
          ) : (
            <SignupPage switchTab={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
