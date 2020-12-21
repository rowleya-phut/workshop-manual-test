<?php

// NEW PDO VERSION //

$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

//from form
$recordToEdit = $_POST['recordId'];
$updatedText = $_POST['updatedTxt'];

echo $updatedText;
echo $recordToEdit;

try {
    //create a PDO connection object
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    //prepare a pdo statement to call a stored statement which is stored on the db under 'routines' (see on PHPMyAdmin)
    $statement = $pdo->prepare('UPDATE notes_tbl SET NoteText = ? WHERE NotesId = ?');
    //execute with variable values
    $statement->execute([$updatedText, $recordToEdit]);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());  
    echo "Failed";
}
?>



