import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthWrapper from "../pages/auth/AuthWrapper";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NotFound from "../pages/error/NotFound";
import Unauthorized from "../pages/error/Unauthorized";

import ProtectedRoute from "../components/layout/ProtectedRoute";

/**
 *
 * * 1. PURPOSE:
 * This file sets up the "Routing System." It maps specific URLs (like /login)
 * to specific React components (like AuthWrapper) so the user can navigate the app.
 * * * 2. THE ROUTER WRAPPER (<Router>):
 * - This is the parent container. It enables the ability to change the URL
 * without refreshing the whole page.
 * * * 3. PUBLIC ROUTES (/, /login, /signup):
 * - These are open to everyone.
 * - Notice that "/", "/login", and "/signup" all point to <AuthWrapper />.
 * This means no matter which one you visit, you land on the same login/signup
 * box we discussed earlier.
 * * * 4. PROTECTED ROUTES (/dashboard):
 * - This is the "Locked Room."
 * - Logic: The <DashboardPage /> is wrapped inside <ProtectedRoute>.
 * - Before showing the Dashboard, the app runs the code inside ProtectedRoute
 * to check if a "token" exists. If not, it kicks the user back to /login.
 * * * 5. ERROR ROUTES (/unauthorized):
 * - If a user tries to access something they aren't allowed to, the app
 * shows the <Unauthorized /> page.
 * * * 6. THE FALLBACK (path="*"):
 * - This is the "Catch-All." The asterisk (*) means "any other URL."
 * - If a user types a random URL like /apple, the app shows the <NotFound /> (404) page.
 *
 * The Flow Summary
 *
 * User types myapp.com/dashboard in the browser.
 *                       |
 *                       V
 * The Router looks at the map and finds the path /dashboard.
 *                       |
 *                       V
 * The Security Check triggers the ProtectedRoute.
 *                       |
 *                       V
 * Decision: * Token found? It renders the DashboardPage.
 *                       |
 *                       V
 * No token? It changes the URL to /login and shows the AuthWrapper.
 *
 */
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/*  PUBLIC ROUTES */}
        <Route path="/" element={<AuthWrapper />} />
        <Route path="/login" element={<AuthWrapper />} />
        <Route path="/signup" element={<AuthWrapper />} />

        {/*  PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/*  ERROR ROUTES */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/*  FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
