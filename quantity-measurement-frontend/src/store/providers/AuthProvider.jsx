import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

/*
 * =========================================================
 * AUTH CONTEXT & PROVIDER
 * =========================================================
 *
 * Provides auth state (token, isAuthenticated) to the component tree.
 * Uses Redux store so no navigate is needed here — AuthProvider
 * can safely live outside <BrowserRouter>.
 *
 * Navigation happens inside useAuth() hook which is called
 * from within components that ARE inside the Router.
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Pull auth state from Redux store
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

export default AuthProvider;
