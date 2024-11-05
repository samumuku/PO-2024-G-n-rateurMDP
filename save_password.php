<?php

$host = 'localhost';        // Database server (use '127.0.0.1' or 'localhost')
$dbName = 'db_passgenerator'; // Database name
$mySqlUser = 'root';      // Database username
$mySqlPassword = 'root';  // Database password

// Create connection
$conn = new mysqli($host, $mySqlUser, $mySqlPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $savedPassword = $conn->real_escape_string($_POST['savedPassword']);
    
    $hashedPassword = password_hash($savedPassword, PASSWORD_DEFAULT);

    // Prepare and execute SQL statement
    $sql = "INSERT INTO t_password (savedPassword) VALUES ('$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        echo "Password saved successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>
