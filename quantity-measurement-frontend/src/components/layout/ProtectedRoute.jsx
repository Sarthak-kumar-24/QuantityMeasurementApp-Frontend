import React from "react";
import { Navigate } from "react-router-dom";

/**
 * This component acts as a "Security Guard" for your application's private pages.
 * * * PURPOSE:
 * To prevent unauthenticated users from accessing specific pages (like a Dashboard or Profile)
 * by checking if they have a valid login session (a "token").
 * * * LINE-BY-LINE LOGIC:
 * 1. const token = localStorage.getItem("token");
 * -> The "Guard" checks the browser's "locker" (localStorage) to see if a key named "token" exists.
 * * 2. if (!token) { ... }
 * -> If the key is missing (null), it means the user is NOT logged in.
 * * 3. return <Navigate to="/login" />;
 * -> Since they aren't logged in, the Guard immediately "kicks them out" and sends them
 * to the Login page. The user never sees the private content.
 * * 4. return children;
 * -> If the token DOES exist, the Guard "opens the door" and lets the user see the actual
 * page content (the 'children' components) they were trying to visit.
 * * * THE FLOW:
 * User clicks "Profile" -> ProtectedRoute runs -> Checks Storage -> Token Found? ->
 * YES: Show Profile | NO: Force redirect to Login.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  
  return children;
};

export default ProtectedRoute;
