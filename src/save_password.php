<?php

$host = 'db';  // Use the MySQL service name as the host inside Docker
$dbName = 'db_passgenerator';
$mySqlUser = 'root';  // Or use 'user' if you want to use the custom user
$mySqlPassword = 'rootpassword';  // Match the root password from your docker-compose.yml

$conn = new mysqli($host, $mySqlUser, $mySqlPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);  // Log error
    die("Connection to database failed.");
}

echo "Connected successfully<br>";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $savedPassword = $_POST['savedPassword'] ?? '';

    // Validate input
    if (empty($savedPassword)) {
        echo "Password cannot be empty!";
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($savedPassword, PASSWORD_DEFAULT);

    // Prepare and execute SQL statement
    $stmt = $conn->prepare("INSERT INTO t_password (savedPassword) VALUES (?)");
    $stmt->bind_param("s", $hashedPassword);

    if ($stmt->execute()) {
        echo "Password saved successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

// Close the database connection
$conn->close();
?>
