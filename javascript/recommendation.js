// Grabbing required DOM elements
var passwordWritten = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var special = document.getElementById("special");
var length = document.getElementById("length");
var message = document.getElementById("message");
var timeEstimate = document.getElementById("time-estimate");

// Initially hide the recommendation section
message.style.display = "none";

// Function to validate password
function validatePassword() {
  const password = passwordWritten.value;

  // Show or hide recommendation section based on password length
  if (password.length > 0) {
    message.style.display = "flex";
  } else {
    message.style.display = "none";
    return; // Exit if no password is entered
  }

  // Validation rules
  validateRule(/[a-z]/, letter, password); // Lowercase
  validateRule(/[A-Z]/, capital, password); // Uppercase
  validateRule(/[0-9]/, number, password); // Numbers
  validateRule(/[!@#$%^&*()/,.?":{}|<>]/, special, password); // Special characters
  validateLengthRule(password); // Length validation

  // Update cracking time estimate
  const charsetSize = calculateCharsetSize(password);
  const crackingTime = calculateCrackingTime(password, charsetSize);
  timeEstimate.innerHTML = `Temps estimé pour craquer ce mot de passe : <b>${crackingTime}</b>`;
}

// Helper function for general validation rules
function validateRule(regex, element, password) {
  if (regex.test(password)) {
    element.classList.remove("invalid");
    element.classList.add("valid");
  } else {
    element.classList.remove("valid");
    element.classList.add("invalid");
  }
}

// Helper function for length validation
function validateLengthRule(password) {
  if (password.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

// Calculate the size of the character set based on the password
function calculateCharsetSize(password) {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26; // Lowercase
  if (/[A-Z]/.test(password)) size += 26; // Uppercase
  if (/[0-9]/.test(password)) size += 10; // Numbers
  if (/[!@#$%^&*()/,.?":{}|<>]/.test(password)) size += 33; // Special characters
  return size;
}

// Calculate cracking time estimate
function calculateCrackingTime(password, charsetSize) {
  const guessesPerSecond = 1e10; // Typical cracking speed
  const combinations = Math.pow(charsetSize, password.length);
  const seconds = combinations / guessesPerSecond;

  if (seconds < 60) return `${Math.floor(seconds)} secondes`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} heures`;
  if (seconds < 31536000) return `${Math.floor(seconds / 86400)} jours`;
  return `${Math.floor(seconds / 31536000)} années`;
}

// Trigger validation on every input in the password field
passwordWritten.addEventListener("input", validatePassword);
