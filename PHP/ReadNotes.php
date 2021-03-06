<?php
//NEW PDO VERSION

$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

try {
    //create a PDO connection object
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    //PDO query with no parameters
    $statement = $pdo->query('SELECT notes_tbl.NotesId, notes_tbl.NoteText, notes_tbl.TrainerId, trainer_tbl.TrainerName, page_tbl.PageId, page_tbl.PageTitle 
    FROM notes_tbl 
    INNER JOIN trainer_tbl 
    ON notes_tbl.TrainerId = trainer_tbl.TrainerId 
    INNER JOIN page_tbl 
    ON notes_tbl.PageId = page_tbl.PageId');

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());  
    echo "Failed";
}

    //Initialize array variable
    $dbdata = array();

  //Fetch into associative array
    while ( $row = $statement->fetch())  {
      $dbdata[]=$row;
    }
  
  //Print array in JSON format
   echo json_encode($dbdata);
?>



