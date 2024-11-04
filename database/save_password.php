<?php

// Include database connection
$host = 'localhost';        // Database server (use '127.0.0.1' or 'localhost')
$dbname = 'db_passgenerator'; // Database name
$user = 'root';      // Database username
$password = 'root';  // Database password

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get the form data
    $username = $conn->real_escape_string($_POST['username']);
    $savedPassword = $conn->real_escape_string($_POST['savedPassword']);
    
    $savedPassword = password_hash($savedPassword, PASSWORD_DEFAULT);


    // Prepare and execute SQL statement
    $sql = "INSERT INTO t_password (savedPassword) VALUES ('$savedPassword')";

    if ($conn->query($sql) === TRUE) {
        echo "Password saved successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>
