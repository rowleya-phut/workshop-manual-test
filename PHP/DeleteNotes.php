<?php

// NEW PDO VERSION //

$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

//from form
$recordToDelete = $_POST['recordId'];

try {
    //create a PDO connection object
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    //prepare a pdo statement to call a stored statement which is stored on the db under 'routines' (see on PHPMyAdmin)
    $statement = $pdo->prepare('DELETE FROM notes_tbl WHERE NotesId = ?');
    //execute with variable values
    $statement->execute([$recordToDelete]);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());  
    echo "Failed";
}

// end //

?>



