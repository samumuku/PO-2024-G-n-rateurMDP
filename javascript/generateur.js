var passwordInput = document.getElementById("password");

function genPassword() {
  var chars = "abcdefghijklmnopqrstuvwxyz"; // mettre des minuscules par défaut
  var containsNumbers = document.getElementById("chiffres").checked;
  var containsSpecialChar = document.getElementById("chr-speciaux").checked;
  var containsUppercase = document.getElementById("majuscule").checked;

  var numbers = "0123456789";
  var specialChars = "*%&?/[%])#*@";
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  var requiredChars = "";

  if (containsNumbers) {
    chars += numbers;
    requiredChars += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  if (containsSpecialChar) {
    chars += specialChars;
    requiredChars += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length)
    );
  }
  if (containsUppercase) {
    chars += uppercase;
    requiredChars += uppercase.charAt(
      Math.floor(Math.random() * uppercase.length)
    );
  }

  var passwordLength = document.getElementById("slider").value;
  var password = requiredChars;

  for (var i = requiredChars.length; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomNumber);
  }

  document.getElementById("password").value = shuffleString(password);
}

function shuffleString(string) {
  var array = string.split("");
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array.join("");
}

function copyPassword() {
  passwordInput.select();
  document.execCommand("copy");
}

function clearInput() {
  document.getElementById("password").value = "";
}
