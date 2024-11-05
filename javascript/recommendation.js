var passwordWritten = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var message = document.getElementById("message");
var special = document.getElementById("special");

message.style.display = "none";

// Function to validate password
function validatePassword() {
  // Show the message only if the password field has content
  if (passwordWritten.value.length > 0) {
    message.style.display = "flex";
  } else {
    message.style.display = "none";
    // Exit the function if the password field is empty to prevent unnecessary checks
    return;
  }

  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (passwordWritten.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (passwordWritten.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (passwordWritten.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate special characters
  var specialChars = /[!@#$%^&*()/,.?":{}|<>]/g;
  if (passwordWritten.value.match(specialChars)) {
    special.classList.remove("invalid");
    special.classList.add("valid");
  } else {
    special.classList.remove("valid");
    special.classList.add("invalid");
  }

  // Validate length
  if (passwordWritten.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

// Trigger validation on keyup (when user types)
passwordWritten.onkeyup = validatePassword;

// Trigger validation when value is set programmatically
passwordWritten.oninput = validatePassword;
