// Validate password requirements
function validatePassword(password) {
  const hasCapital = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  document.getElementById("req-capital").classList.toggle("valid", hasCapital);
  document.getElementById("req-special").classList.toggle("valid", hasSpecial);
  document.getElementById("req-number").classList.toggle("valid", hasNumber);

  return password.length >= 8 && hasCapital && hasSpecial && hasNumber;
}

// Validate phone number
function validatePhone(phone) {
  return /^0[0-9]{9,}/.test(phone);
}

// Validate password match
function validatePasswordMatch() {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const errorMessage = document.getElementById("confirm-password-error");

  // Only show error if confirm password field has been touched
  if (
    confirmPassword.value.length > 0 &&
    password.value !== confirmPassword.value
  ) {
    errorMessage.style.display = "block";
    confirmPassword.classList.add("error");
    return false;
  } else {
    errorMessage.style.display = "none";
    confirmPassword.classList.remove("error");
    return true;
  }
}

// Password input validation
document.getElementById("password").addEventListener("input", function (e) {
  validatePassword(e.target.value);
  if (document.getElementById("confirm-password").value.length > 0) {
    validatePasswordMatch();
  }
});

// Confirm password validation
document
  .getElementById("confirm-password")
  .addEventListener("input", validatePasswordMatch);

// Phone number validation
document.getElementById("phone-number").addEventListener("input", function (e) {
  const isValid = validatePhone(e.target.value);
  e.target.classList.toggle("error", !isValid);
});

// Form submission
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone-number").value;

    if (
      !validatePasswordMatch() ||
      !validatePassword(password) ||
      !validatePhone(phone)
    ) {
      event.preventDefault();
    }
  });

// Toggle password visibility
function setupPasswordToggle(inputId) {
  const input = document.getElementById(inputId);
  const wrapper = input.parentElement;
  const toggleBtn = wrapper.querySelector(".password-toggle");

  toggleBtn.addEventListener("click", function () {
    const type = input.type === "password" ? "text" : "password";
    input.type = type;
    toggleBtn.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
    input.focus(); // Keep focus on input
  });
}

// Setup password toggles
setupPasswordToggle("password");
setupPasswordToggle("confirm-password");
