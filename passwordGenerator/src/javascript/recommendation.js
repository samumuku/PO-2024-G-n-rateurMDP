// Récupérer les éléments DOM nécessaires
var passwordWritten = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var special = document.getElementById("special");
var length = document.getElementById("length");
var message = document.getElementById("message");
var timeEstimate = document.getElementById("time-estimate");

// Initialement, masquer la section de recommandations
message.style.display = "none";

// Fonction pour valider le mot de passe
function validatePassword() {
  const password = passwordWritten.value;

  // Afficher ou masquer la section de recommandations en fonction de la longueur du mot de passe
  if (password.length > 0) {
    message.style.display = "flex";
  } else {
    message.style.display = "none";
    return; // Quitter si aucun mot de passe n'est entré
  }

  // Règles de validation
  validateRule(/[a-z]/, letter, password); // Minuscules
  validateRule(/[A-Z]/, capital, password); // Majuscules
  validateRule(/[0-9]/, number, password); // Chiffres
  validateRule(/[!@#$%^&*()/,.?":{}|<>]/, special, password); // Caractères spéciaux
  validateLengthRule(password); // Validation de la longueur

  // Mise à jour de l'estimation du temps de craquage
  const charsetSize = calculateCharsetSize(password);
  const crackingTime = calculateCrackingTime(password, charsetSize);
  timeEstimate.innerHTML = `Temps estimé pour craquer ce mot de passe : <b>${crackingTime}</b>`;
}

// Fonction d'aide pour les règles de validation générales
function validateRule(regex, element, password) {
  if (regex.test(password)) {
    element.classList.remove("invalid");
    element.classList.add("valid");
  } else {
    element.classList.remove("valid");
    element.classList.add("invalid");
  }
}

// Fonction d'aide pour la validation de la longueur
function validateLengthRule(password) {
  if (password.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

// Calculer la taille de l'ensemble de caractères basé sur le mot de passe
function calculateCharsetSize(password) {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26; // Minuscules
  if (/[A-Z]/.test(password)) size += 26; // Majuscules
  if (/[0-9]/.test(password)) size += 10; // Chiffres
  if (/[^a-zA-Z0-9]/.test(password)) size += 33; // Caractères spéciaux
  return size;
}

function calculateCrackingTime(password, charsetSize) {
  const entropy = calculateEntropy(password, charsetSize);
  const guessesPerSecond = getCrackingSpeed(password, charsetSize);
  const combinations = Math.pow(2, entropy); // Combinaisons possibles totales
  const seconds = combinations / guessesPerSecond;

  return formatTime(seconds);
}

// Calculer l'entropie du mot de passe
function calculateEntropy(password, charsetSize) {
  const length = password.length;

  // Mots de passe avec répétition
  if (isRepetitive(password)) return length * 2;
  if (isCommonPassword(password)) return 20;

  // Mots de passe avec peu de sécurité
  if (charsetSize < 40 && length > 8)
    return length * Math.log2(charsetSize) * 0.8;

  return length * Math.log2(charsetSize);
}

// Vérifier si le mot de passe est répétitif
function isRepetitive(password) {
  const uniqueChars = new Set(password).size;
  const repetitionThreshold = 0.3;
  return uniqueChars / password.length < repetitionThreshold;
}

// Vérifier si le mot de passe est commun
function isCommonPassword(password) {
  const commonPasswords = [
    "password",
    "123456",
    "123456789",
    "qwerty",
    "abc123",
    "letmein",
    "12345",
  ];
  return commonPasswords.includes(password.toLowerCase());
}

// Obtenir la vitesse de crack en fonction de la taille de l'ensemble de caractères du mot de passe
function getCrackingSpeed(password, charsetSize) {
  if (charsetSize === 26) return 1e12; // minuscules
  if (charsetSize === 36) return 5e11; // minuscules + chiffres
  if (charsetSize < 70) return 1e10; // combinaison sans caractères spéciaux
  return 1e9; // ensemble de caractères plus large avec caractères spéciaux
}

// Formater le temps pour une lecture plus facile
function formatTime(seconds) {
  if (seconds > 1e12) return "plusieurs milliards d'années";
  if (seconds > 1e9) return "plusieurs millions d'années";
  if (seconds > 31536000) return `${Math.floor(seconds / 31536000)} année(s)`;
  if (seconds > 86400) return `${Math.floor(seconds / 86400)} jour(s)`;
  if (seconds > 3600) return `${Math.floor(seconds / 3600)} heure(s)`;
  if (seconds > 60) return `${Math.floor(seconds / 60)} minute(s)`;
  return `${Math.floor(seconds)} seconde(s)`;
}

// Détecter le changement dans le champ de saisie
passwordWritten.addEventListener("input", validatePassword);
