<?php

$host = 'db';
$dbName = 'db_passgenerator';
$mySqlUser = 'root';
$mySqlPassword = 'rootpassword';

$conn = new mysqli($host, $mySqlUser, $mySqlPassword, $dbName);

if ($conn->connect_error) {
    error_log("Connexion échouée: " . $conn->connect_error);
    die("Connexion à la base de données a échouée.");
}

echo "Connexion avec succès<br>";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $savedPassword = $_POST['savedPassword'] ?? '';

    if (empty($savedPassword)) {
        echo "Password cannot be empty!";
        exit;
    }

    $hashedPassword = password_hash($savedPassword, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO t_password (savedPassword) VALUES (?)");
    $stmt->bind_param("s", $hashedPassword);

    if ($stmt->execute()) {
        echo "Mot de passe enregistré avec succès!";
        echo ""
    } else {
        echo "Erreur: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
