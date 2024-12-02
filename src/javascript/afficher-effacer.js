document.addEventListener("DOMContentLoaded", function () {
  feather.replace();

  const eye = document.querySelector(".eye");
  const eyeOff = document.querySelector(".eye-off");
  const passwordField = document.querySelector("#password");
  const copyIcon = document.querySelector(".copy");

  // Initial setup for password visibility
  passwordField.type = "password";
  eyeOff.style.display = "none";
  eye.style.display = "block";

  // Toggle password visibility
  function togglePasswordVisibility() {
    const isPasswordVisible = passwordField.type === "text";

    passwordField.type = isPasswordVisible ? "password" : "text";

    eye.style.display = isPasswordVisible ? "block" : "none";
    eyeOff.style.display = isPasswordVisible ? "none" : "block";
  }

  // Add click listener for password visibility toggle
  eye.addEventListener("click", togglePasswordVisibility);
  eyeOff.addEventListener("click", togglePasswordVisibility);

  // Copy password to clipboard and change icon temporarily
  function copyToClipboard() {
    if (passwordField.value) {
      navigator.clipboard
        .writeText(passwordField.value)
        .then(() => {
          // Temporarily replace icon content
          const originalIcon = copyIcon.innerHTML;
          copyIcon.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><path d="M20 6L9 17l-5-5"/></svg>';

          // Reset icon content after 1 second
          setTimeout(() => {
            copyIcon.innerHTML = originalIcon;
          }, 1000);
        })
        .catch((err) => {
          console.error("Échec de la copie dans le presse-papiers.", err);
        });
    }
  }

  // Add click listener for copy icon
  copyIcon.addEventListener("click", copyToClipboard);
});
