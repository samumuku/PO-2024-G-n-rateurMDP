document.addEventListener("DOMContentLoaded", function () {
  // Remplacement des icônes avec Feather
  feather.replace();

  const eye = document.querySelector(".eye");
  const eyeOff = document.querySelector(".eye-off");
  const passwordField = document.querySelector("#password");

  // Fonction pour afficher/cacher le mot de passe
  function togglePasswordVisibility() {
    const isPasswordVisible = passwordField.type === "text";

    // Bascule le type du champ de mot de passe
    passwordField.type = isPasswordVisible ? "password" : "text";

    // Bascule les icônes
    eye.style.display = isPasswordVisible ? "none" : "block";
    eyeOff.style.display = isPasswordVisible ? "block" : "none";
  }

  // Ajouter un écouteur d'événement au container qui contient les icônes
  document
    .querySelector(".password-icon")
    .addEventListener("click", togglePasswordVisibility);
});
