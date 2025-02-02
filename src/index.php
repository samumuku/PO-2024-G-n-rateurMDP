<?php

$host = 'db';
$dbName = 'db_passgenerator';
$mySqlUser = 'root';
$mySqlPassword = 'rootpassword';
$msg = '';

$conn = new mysqli($host, $mySqlUser, $mySqlPassword, $dbName);

if ($conn->connect_error) {
    error_log("Connexion échouée: " . $conn->connect_error);
    die("Connexion à la base de données a échouée.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['hash'])) {

    $savedPassword = $_POST['savedPassword'] ?? '';

    if (empty($savedPassword)) {
        $msg = "Veuillez saisir un mot de passe !";
    } else {

      $hashedPassword = password_hash($savedPassword, PASSWORD_DEFAULT);

      $stmt = $conn->prepare("INSERT INTO t_password (savedPassword) VALUES (?)");
      $stmt->bind_param("s", $hashedPassword);

      if ($stmt->execute()) {
          $msg = "Mot de passe enregistré avec succès!";
      } else {
          $msg = "Erreur: " . $stmt->error;
      }

      $stmt->close();
    }
}

$conn->close();

if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['resetBtn'])) {
  $msg = '';
  unset($savedPassword);
  unset($hashedPassword);
  $_POST = array();
}

?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ETML - Génerateur de MdP</title>
    <link rel="stylesheet" href="password.css" />
    <link rel="icon" href="https://www.etml.ch/themes/etml/assets/images/etml_favicon_v3.ico">
  </head>
  <body>
    <script src="./javascript/generateur.js"></script>
    <script src="./javascript/afficher-effacer.js"></script>
    <script src="https://unpkg.com/feather-icons"></script>
    <script defer src="./javascript/recommendation.js"></script>
    <link href="https://fonts.cdnfonts.com/css/borna" rel="stylesheet">
    
    <header>
      <div class="logo-etml" >
        <img src="./images/etml-removebg-preview.png" alt="Logo ETML" />
      </div>
      <div class="titre">
        <h1>Introduction au monde du chiffrement des mots de passe!</h1>
      <div>
    </header>
    <main>
        <div class="all">
        <div class="header">
          <h2>Créez votre mot de passe </h2>
        <?php if (isset($msg) && $msg !== ''): ?>
          <div class="msg">
            <div class="msg-title">
                <?php echo isset($msg) ? "<h3>" . $msg. '</h3>' : '' ?>
                <?php if ($msg == 'Veuillez saisir un mot de passe !' || $msg = 'Mot de passe enregistré avec succès'): ?>
                  <form action="" method="POST"><input type="submit" id="resetBtn" name="resetBtn" value="Réinitialiser"/></form>
                <?php endif ?>
            </div>
            <?php echo isset($hashedPassword) ? 'Mot de passe haché: <span class="mdp-hashed">' . $hashedPassword . "</span>": '' ?>
            
          </div>
        <?php endif ?>
        </div>
              <form action="" method="POST">
                <div class="mdp-buttons">
                  <div class="mdp-texte" id="mdp-texte">
                    <input type="text" id="password" name="savedPassword" placeholder="Mot de passe" maxlength="16"/>
                    <div class="password-icon">
                    <i class="copy" data-feather="copy"></i>
                    <i class="eye-off" data-feather="eye-off"style="display:none;"></i>
                    <i class="eye" data-feather="eye" ></i>
                  </div>
                  </div>
                  <div class="liste-buttons">
                    <input class ="generer" type="button" value="Générer" onclick="genPassword()" />
                    <input class="hacher" type="submit" name="hash" value="Hacher" />
                  </form>
                  </div>
                </div>
              </form>
                <div class="taille">
                  <div class="longueur-taille">
                    <h3 id="texteTaille">Longueur du mot de passe : </h3>
                    <strong><p id="rangeValue">16</p></strong>
                  </div>
                  <input type="range" id="slider" name="slider" max="16" min="4" step="1" value="16" oninput="rangeValue.innerText = this.value"/>
                  <div class="chiffres-slider">
                    <datalist id="valeurs-slider">
                      <option value="4" label="4"></option>
                      <option value="8" label="8"></option>
                      <option value="12" label="12"></option>
                      <option value="16" label="16"></option>
                    </datalist>
                </div>
              <div class="choix-cocher">
                <div class="flex-box">
                  <label class="form-control">
                  <input type="checkbox" id="chiffres" name="chiffres" value="chiffres">
                  Chiffres
                </label>
                </div>
                <div class="flex-box">
                  <label class="form-control">
                  <input type="checkbox" id="chr-speciaux" name="chr-speciaux" value="chr-speciaux">
                  Caractères spéciaux
                  </label>
                </div>
                <div class="flex-box">
                  <label class="form-control">
                  <input type="checkbox" id="majuscule" name="majuscule" value="majuscule">
                   Majuscules
                  </label>
                </div>
              </div>
            </div>
      </main>
        <div id="message">
          <p>Recommendation d'un mot de passe :</p>
          <p id="letter" class="invalid">Une lettre <b>minuscule</b></p>
          <p id="capital" class="invalid">Une lettre <b>majuscule</b></p>
          <p id="number" class="invalid">Un <b>nombre</b></p>
          <p id="special" class="invalid">Un caractère <b> spécial </b></p>
          <p id="length" class="invalid">Minimum <b>8 caractères</b></p>
          <div id="time-estimate">
            <p>Temps estimé pour craquer ce mot de passe : <span id="time-estimate">--</span></p>
          </div>
        </div>   
    </main>
    <footer>
  <div class="etml-credit">
    <p>
      <strong>
        <a href="secret.html" class="hidden-link">© </a>
        <a href="https://www.etml.ch/" class="hidden-link">
        2024 Ecole technique - Ecole des métiers Lausanne |
      </a></strong>
    </p>
  </div>
  <div class="team-credit">
    <p>
      <strong><a href="./credits.html">Crédits</a></strong>
    </p>
  </div>
    </footer>
  </body>
</html>