import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  logout as logoutAction,
} from "../store/slices/authSlice";
import authService from "../services/authService";


/**
 * useAuth
 * * 1. PURPOSE:
 * This hook creates a bridge between your UI (the screens the user sees),
 * your Global State (Redux), and your Backend API (authService).
 * * 2. THE SETUP (Hooks):
 * - useNavigate(): Used to "teleport" the user to different pages (like /dashboard).
 * - useDispatch(): Used to send "news" to Redux (e.g., "The user is now logged in!").
 * * 3. TOKEN RETRIEVAL:
 * - It looks in 'localStorage' (the browser's memory) for a "token".
 * - If it finds one, it converts the string back into a JavaScript object using JSON.parse().
 * * 4. THE LOGIN FLOW (async login):
 * - It takes the user's email/password ('data') and sends it to the server.
 * - On Success: It dispatches 'loginSuccess' to save the token in the global state
 * and then redirects the user to the Dashboard.
 * - On Failure: It uses a "chain of checks" (error?.response...) to find the most
 * useful error message from the backend to show the user.
 * * 5. THE SIGNUP FLOW (async signup):
 * - Sends registration data to the server.
 * - On Success: It simply moves the user to the Login page so they can sign in.
 * * 6. THE GOOGLE LOGIN FLOW (async googleLogin):
 * - Receives a special security token from Google's popup.
 * - It verifies this with your backend, saves the session, and redirects to the Dashboard.
 * * 7. THE LOGOUT FLOW (logout):
 * - It tells Redux to clear the user's data (logoutAction).
 * - It then kicks the user back to the Login page.
 * * 8. THE EXPORT:
 * - It returns 'token', 'login', 'signup', etc., so any component can use them
 * by simply calling 'const { login, logout } = useAuth();'.
 *
 *
 *
 * Action: User clicks "Login."
 *
 * The login function is called $\rightarrow$ calls the authService API $\rightarrow$ waits for a response.
 *
 * If the API says "Success," the token is stored in the browser and the Redux State is updated.
 *
 * The hook automatically moves the user from the /login page to the /dashboard.
 */
const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read token from localStorage (synced by Redux slice)
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  //  LOGIN
  const login = async (data) => {
    try {
      const res = await authService.login(data);
      // res = { token: "eyJ..." }
      dispatch(loginSuccess(res.token));
      navigate("/dashboard");
    } catch (error) {
      // Extract meaningful message from backend error response
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Login failed. Please check your credentials.";
      throw msg;
    }
  };

  //  SIGNUP
  const signup = async (data) => {
    try {
      await authService.signup(data);
      // On success, backend returns "User registered successfully!" (plain string)
      navigate("/login");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Signup failed. Please try again.";
      throw msg;
    }
  };

  //  GOOGLE LOGIN
  const googleLogin = async (idToken) => {
    try {
      const res = await authService.googleAuth(idToken);
      dispatch(loginSuccess(res.token));
      navigate("/dashboard");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw "Google login failed. Please try again.";
    }
  };

  //  LOGOUT
  const logout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return {
    token,
    login,
    signup,
    googleLogin,
    logout,
  };
};

export default useAuth;
