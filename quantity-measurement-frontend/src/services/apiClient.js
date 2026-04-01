import axios from "axios";

/**
 *
 * * 1. THE BASE SETUP (axios.create):
 * - It sets the 'API_BASE_URL' to your Spring Boot server (running on port 8080).
 * - It creates an 'apiClient' which is a pre-configured "Postman" for your app.
 * Every request sent through this will automatically target your backend.
 * * * 2. REQUEST INTERCEPTOR (The "Automatic Passport Stamper"):
 * - Before any request leaves your computer, this function "intercepts" it.
 * - Logic: It checks your browser's 'localStorage' for a "token".
 * - Action: If it finds a token, it adds it to the Header as 'Bearer [Token]'.
 * This is how your Spring Boot backend knows you are a logged-in user.
 * * * 3. RESPONSE INTERCEPTOR (The "Security Guard"):
 * - When the server sends an answer back, this function checks it first.
 * - The 401 Check: If the server says "401 Unauthorized" (meaning your login
 * session expired), this code automatically wipes your token and "kicks"
 * you back to the Login page.
 * - This prevents users from staying on a page when they are no longer logged in.
 * * * 4. ERROR PROPAGATION:
 * - If the error isn't a 401 (e.g., a 400 Bad Request or 500 Server Error), it
 * simply passes the error along so your 'useAuth' or 'useConversion' hooks
 * can show a specific message to the user.
 *
 *
 *
 * The Flow Summary
 *
 * Request: You try to calculate a measurement -> Axios grabs the request -> Attaches your JWT Token -> Sends it to Spring Boot.
 *                         |
 *                         V
 * Response: Spring Boot checks the token -> Does the math -> Sends a result back.
 *                         |
 *                         V
 * Check: Axios receives the result -> Checks if it's a "Success" or "Unauthorized" -> Hands the data to your component.
 *
 *
 *
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Spring Boot backend

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 *  REQUEST INTERCEPTOR
 * Automatically attach JWT token to every outgoing request.
 * Token is stored as JSON string in localStorage by authSlice.
 */
apiClient.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem("token");
    if (raw) {
      try {
        // token was saved via JSON.stringify(token) -> parse it back
        const token = JSON.parse(raw);
        config.headers.Authorization = `Bearer ${token}`;
      } catch {
        // Fallback: token stored as plain string
        config.headers.Authorization = `Bearer ${raw}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/*
 *  RESPONSE INTERCEPTOR
 * Handle global errors:
 * - 401 Unauthorized -> clear token and redirect to login
 * - Other errors -> propagate to caller
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
