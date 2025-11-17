//Select all DOM elements from html
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("cnf-password");
const phone = document.getElementById("phoneno");
const age = document.getElementById("age");
const submitButton = document.getElementById("submit-button");

//Helper functions to show error and success messages

let showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "input-group error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

let showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "input-group success";
};

//Main Event Listener for form submission
form.addEventListener("input", (e) => {
  e.preventDefault();
  checkInputs();
});

//Check Inputs
let checkInputs = () => {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const phoneValue = phone.value.trim();
  const ageValue = age.value.trim();

  // Check every variable for validation
  let isUsernameValid = false;
  let isPasswordValid = false;
  let isConfirmPasswordValid = false;
  let isPhoneValid = false;
  let isAgeValid = false;

  //Username validation
  const usernameRegex = /^[A-Za-z0-9_]+$/;
  if (usernameValue === "") {
    showError(username, "Username cannot be blank");
  } else if (usernameValue.length < 3 || usernameValue.length > 15) {
    showError(username, "Username must be between 3 and 15 characters");
  } else if (!usernameRegex.test(usernameValue)) {
    showError(
      username,
      "Username can only contain letters, numbers, and underscores"
    );
  } else {
    showSuccess(username);
    isUsernameValid = true;
  }

  //Password validation
  if (passwordValue === "") {
    showError(password, "Password cannot be blank");
  } else if (passwordValue.length < 8) {
    showError(password, "Password must be at least 8 characters");
  } else {
    showSuccess(password);
    isPasswordValid = true;
  }

  //Confirm Password validation
  if (confirmPasswordValue === "") {
    showError(confirmPassword, "Confirm Password cannot be blank");
  } else if (confirmPasswordValue !== passwordValue) {
    showError(confirmPassword, "Passwords do not match");
  } else {
    if (isPasswordValid) {
      showSuccess(confirmPassword);
      isConfirmPasswordValid = true;
    } else {
      showError(confirmPassword, "Passwords do not match");
    }
  }

  //Phone Number validation (optional)
  const phoneRegex = /^[0-9]{11}$/;
  if (phoneValue === "") {
    showSuccess(phone);
  } else if (!phoneRegex.test(phoneValue)) {
    showError(phone, "Phone number must be 11 digits");
  } else {
    showSuccess(phone);
    isPhoneValid = true;
  }

  //Age validation
  const ageNumber = parseInt(ageValue);
  if (ageValue === "") {
    showError(age, "Age cannot be blank");
  } else if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 100) {
    showError(age, "Age must be a number between 18 and 100");
  } else {
    showSuccess(age);
    isAgeValid = true;
  }

  if (
    isUsernameValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isPhoneValid &&
    isAgeValid
  ) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};
