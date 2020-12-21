<?php

include "config2.php";

$uname = mysqli_real_escape_string($connection,$_POST['username']);
$password = mysqli_real_escape_string($connection,$_POST['password']);

// $uname = mysqli_real_escape_string($connection,'rowleya');
// $password = mysqli_real_escape_string($connection,'password');

if ($uname != "" && $password != ""){

    
    $sql_query = "SELECT Username, Password, TrainerId FROM trainer_tbl 
    WHERE Username='".$uname."'
    AND Password=PASSWORD('".$password."')";

    //prepared statement to prevent SQL injection

    
    $result = mysqli_query($connection,$sql_query);
    // var_dump($result);
    $rows = array();
    //$row = mysqli_fetch_array($result);
    while($row = mysqli_fetch_array($result)) {
        $rows[] = $row;
    }
    

    $count = count($rows);
    
    if($count > 0){
        //$_SESSION['uname'] = $uname;
        //echo $uname;
        $arr = array($rows[0]['Username'],$rows[0]['TrainerId']);
        echo json_encode($arr);
        // echo json_encode($rows[0]['Username']);
        // echo json_encode($rows[0]['TrainerId']);
    }else{
        echo 0;
    }

}
// -------------------------------------------------------------
// NEW VERSION
// -------------------------------------------------------------

// $database = include('config.php');

// $host=$database['host'];
// $user=$database['user'];
// $password=$database['password'];
// $dbName =$database['dbName'];

// $uname = mysqli_real_escape_string($connection,$_POST['username']);
// $password = mysqli_real_escape_string($connection,$_POST['password']);

// if ($uname != "" && $password != ""){

    
//     try {
//         //create a PDO connection object
//         $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
//         //prepare a pdo statement to call a stored statement which is stored on the db under 'routines' (see on PHPMyAdmin)
//         ////also prepared statement to prevent SQL injection - note password brackets - to do with encryption... may not work
//         $statement = $pdo->prepare('SELECT Username, Password, TrainerId FROM trainer_tbl WHERE Username= ? AND Password=PASSWORD(?)');
//         //execute with variable values
//         $statement->execute([$uname, $password]);
    
//     } catch (PDOException $e) {
//         die("Error occurred:" . $e->getMessage());  
//         echo "Failed";
//     }

//     while ($row = $statement -> fetch()){
//         $rows[]=$row;    
//     }
    
//     $count = count($rows);
    
//     if($count > 0){
//         //$_SESSION['uname'] = $uname;
//         //echo $uname;
//         $arr = array($rows[0]['Username'],$rows[0]['TrainerId']);
//         echo json_encode($arr);
//         // echo json_encode($rows[0]['Username']);
//         // echo json_encode($rows[0]['TrainerId']);
//     }else{
//         echo 0;
//     }

// }

?>