
// ================= TAB SWITCHING =================
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");

  loginForm.classList.add("active");
  signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");

  signupForm.classList.add("active");
  loginForm.classList.remove("active");
});

// ================= PASSWORD TOGGLE =================
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = password.type === "password" ? "text" : "password";
  password.type = type;

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

// ================= VALIDATION =================

// Regex patterns
const nameRegex = /^[A-Za-z ]{4,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
const mobileRegex = /^[0-9]{10}$/;

// Get inputs
const signupInputs = signupForm.querySelectorAll("input");

// ================= ERROR HANDLING =================
function showError(input, message) {
  const formGroup = input.closest(".form-group");

  removeError(input);

  const error = document.createElement("small");
  error.className = "error-msg";
  error.innerText = message;

  formGroup.appendChild(error);
  input.style.border = "1px solid red";
}

function removeError(input) {
  const formGroup = input.closest(".form-group");
  const existing = formGroup.querySelector(".error-msg");

  if (existing) existing.remove();
  input.style.border = "1px solid #ccc";
}

// ================= SIGNUP VALIDATION =================
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const name = signupInputs[0];
  const email = signupInputs[1];
  const pass = signupInputs[2];
  const mobile = signupInputs[3];

  if (!nameRegex.test(name.value)) {
    showError(name, "Name must be at least 4 characters");
    isValid = false;
  } else removeError(name);

  if (!email.value.includes("@")) {
    showError(email, "Enter valid email");
    isValid = false;
  } else removeError(email);

  if (!passwordRegex.test(pass.value)) {
    showError(pass, "Min 8 chars, include letter, number & special symbol");
    isValid = false;
  } else removeError(pass);

  if (!mobileRegex.test(mobile.value)) {
    showError(mobile, "Enter valid 10-digit mobile number");
    isValid = false;
  } else removeError(mobile);

  if (isValid) {
    alert("Signup Successful 🚀");
    signupForm.reset();

    // Switch to login after signup
    loginTab.click();
  }
});

// ================= LOGIN VALIDATION + REDIRECT =================
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = loginForm.querySelectorAll("input");
  const email = inputs[0];
  const pass = inputs[1];

  let isValid = true;

  if (!email.value.includes("@")) {
    showError(email, "Enter valid email");
    isValid = false;
  } else removeError(email);

  if (pass.value.length < 6) {
    showError(pass, "Password too short");
    isValid = false;
  } else removeError(pass);

  if (isValid) {
    // 🔥 TEMP LOGIN (replace with backend later)

    // store login state
    localStorage.setItem("isLoggedIn", "true");

    // redirect to dashboard
    window.location.href = "dashboard.html";
  }
});

// ================= SWITCH LINKS =================
const goToLogin = document.getElementById("goToLogin");
const goToSignup = document.getElementById("goToSignup");

goToLogin.addEventListener("click", () => {
  loginTab.click();
});

goToSignup.addEventListener("click", () => {
  signupTab.click();
});
