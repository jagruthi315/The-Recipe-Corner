<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$host = "localhost";
$user = "root";
$password = "sgnjsrjh231850";
$database = "feedback";

// Create connection
$conn =  mysqli_connect($host, $user, $password, $database);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Get values from form
$user = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"]; // ✅ Added this line
$message = $_POST["message"];

// Insert into database
$sql= "INSERT INTO greetings (name, email, subject, message) 
       VALUES ('$user', '$email', '$subject', '$message')";

if(mysqli_query($conn,$sql)){
    echo("Data added Successfully");
} else {
    echo "Something went wrong: " . mysqli_error($conn);
}
?>
