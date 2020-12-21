<?php
// NEW PDO VERSION //

$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

$uniqueId = time();
//from form
$trainerId = $_POST["addedNoteTrainerId"];
$pageId = $_POST["addedNotePageId"];
$noteText = $_POST["addedNoteNote"];

//test data
// $trainerId = 28;
// $pageId = 'TESTA';
// $noteText = 'Hard coded test data';

try {
    //create a PDO connection object
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    //prepare a pdo statement to call a stored statement which is stored on the db under 'routines' (see on PHPMyAdmin)
    $statement = $pdo->prepare('INSERT INTO notes_tbl (NotesId, TrainerId, PageId, NoteText) VALUES (?,?,?,?)');
    //execute with variable values
    $statement->execute([$uniqueId, $trainerId, $pageId, $noteText]);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());  
    echo "Failed";
}
?>