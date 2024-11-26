<?php

$host = 'db'; // Docker service name of the MySQL container
$dbName = 'db_passgenerator'; // Database name
$mySqlUser = 'root';      // Database username
$mySqlPassword = 'rootpassword';  // Database password

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

    $stmt = $conn->prepare("INSERT INTO t_password (savedPassword) VALUES (?)");
    $stmt->bind_param("s", $hashedPassword);

    if ($stmt->execute()) {
        echo "Password saved successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }


    if ($conn->query($sql) === TRUE) {
        echo "Password saved successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>
