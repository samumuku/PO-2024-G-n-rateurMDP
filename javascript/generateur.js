var password = document.getElementById("password");

function copyPassword() {
  var copyText = document.getElementById("password");
  copyText.select();
  document.execCommand("copy");
}

function genPassword() {
  var chars = "";
  if (document.getElementById("chiffres").checked) {
    chars += "0123456789";
  }
  if (document.getElementById("chr-speciaux").checked) {
    chars += "*%&/)(=?!@#";
  }
  if (document.getElementById("majuscule").checked) {
    chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  chars += "abcdefghijklmnopqrstuvwxyz";

  var passwordLength = document.getElementById("slider").value;

  var password = "";

  for (var i = 0; i <= passwordLength - 1; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomNumber);
  }

  // Set the generated password in the input field
  document.getElementById("password").value = password;

  // Validate the generated password
  validatePassword();
}

// Function to copy password to clipboard
function copyPassword() {
  var copyText = document.getElementById("password");
  copyText.select();
  document.execCommand("copy");
}
