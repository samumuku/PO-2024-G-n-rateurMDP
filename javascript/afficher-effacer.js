document.addEventListener("DOMContentLoaded", function () {
  feather.replace();

  const eye = document.querySelector(".eye");
  const eyeOff = document.querySelector(".eye-off");
  const passwordField = document.querySelector("#password");

  passwordField.type = "password";
  eyeOff.style.display = "none";
  eye.style.display = "block";

  function togglePasswordVisibility() {
    const isPasswordVisible = passwordField.type === "text";

    passwordField.type = isPasswordVisible ? "password" : "text";

    eye.style.display = isPasswordVisible ? "block" : "none";
    eyeOff.style.display = isPasswordVisible ? "none" : "block";
  }

  document
    .querySelector(".password-icon")
    .addEventListener("click", togglePasswordVisibility);
});
