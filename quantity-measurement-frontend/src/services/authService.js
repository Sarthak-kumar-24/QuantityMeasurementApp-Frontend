import apiClient from "./apiClient";

/**
 * =========================================================
 * AUTH SERVICE
 * =========================================================
 *
 * NOTE: Backend AuthRequestDTO expects { username, password }
 *       Frontend forms use { email, password } or { fullName, email, password, mobile }
 *       This service maps frontend fields -> backend fields
 *
 *
 * * 1. THE MAPPING LOGIC (Mapping frontend -> backend):
 * - Frontend users type an "Email," but the Backend (Spring Boot) is programmed
 * to look for a field called "username."
 * - This service acts as a translator so you don't have to change your entire
 * database just to match your UI.
 * * * 2. THE LOGIN FUNCTION (login):
 * - It takes the 'data' (email/password) from your login form.
 * - It builds a 'payload' where 'username' gets the value of 'email'.
 * - It uses 'apiClient.post' to send this package to the "/auth/login" endpoint.
 * - It returns 'res.data', which usually contains the secret JWT token.
 * * * 3. THE SIGNUP FUNCTION (signup):
 * - Similar to login, it translates the email to "username."
 * - Note: Even though your Signup form has "Full Name" and "Mobile," this
 * specific backend only needs the Username and Password to create the account.
 * - It sends the data to "/auth/register" and returns a success message.
 * * * 4. THE GOOGLE AUTH FUNCTION (googleAuth):
 * - This is a specialized shortcut. It sends the "idToken" (the digital
 * passport from Google) to your backend at "/auth/google" to verify the user.
 * * * 5. DATA RETURN:
 * - Every function returns 'res.data'. This is the actual "meat" of the
 * response from the server, stripped of the extra headers and status codes.
 *
 */

const authService = {
  /**
   *  LOGIN
   * POST /auth/login
   * Maps: email -> username (backend field name)
   **/

  login: async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const res = await apiClient.post("/auth/login", payload);
    return res.data;
  },

  /**
   *  REGISTER
   * POST /auth/register
   * Maps: email -> username (backend field name)
   * Backend only needs username + password; fullName & mobile are UI-only
   */
  signup: async (data) => {
    // Send the entire object received from SignupPage.js
    const res = await apiClient.post("/auth/register", data);
    return res.data;
  },

  /**
   *  GOOGLE AUTH
   * POST /auth/google
   */
  googleAuth: async (idToken) => {
    const res = await apiClient.post("/auth/google", { idToken });
    return res.data;
  },
};

export default authService;
