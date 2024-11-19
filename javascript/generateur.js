var passwordInput = document.getElementById("password");

function genPassword() {
  var chars = "";
  var containsNumbers = document.getElementById("chiffres").checked;
  var containsSpecialChar = document.getElementById("chr-speciaux").checked;
  var containsUppercase = document.getElementById("majuscule").checked;

  if (containsNumbers) {
    chars += "01234567890123456789";
  }
  if (containsSpecialChar) {
    chars += "*%&?/[%])#*@[!*](@=?!@#";
  }
  if (containsUppercase) {
    chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  chars += "abcdefghijklmnopqrstuvwxyz"; //mettre des minuscules par defaut

  var passwordLength = document.getElementById("slider").value;
  var password = "";

  for (var i = 0; i <= passwordLength - 1; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomNumber);
  }
  document.getElementById("password").value = password;

  validatePassword();
}

function validatePassword(
  password,
  containsNumbers,
  containsSpecialChar,
  containsUppercase
) {
  for (var value; value != true; ) {
    clearInput();
    genPassword();
    if (containsNumbers && !/[0-9]/.test(password)) return false;
    if (containsSpecialChar && !/[*%&/)(=?!@#]/.test(password)) return false;
    if (containsUppercase && !/[A-Z]/.test(password)) return false;
    return true;
  }
}

function copyPassword() {
  passwordInput.select();
  document.execCommand("copy");
}

function clearInput() {
  document.getElementById("password").value = "";
}
