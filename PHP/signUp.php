<?php
include "config2.php";

$fullname = mysqli_real_escape_string($connection,$_POST['fullname']);
$uname = mysqli_real_escape_string($connection,$_POST['username']);
$password = mysqli_real_escape_string($connection,$_POST['password']);

// $uname = mysqli_real_escape_string($connection,'rowleya');
// $password = mysqli_real_escape_string($connection,'password');

if ($uname != "" && $password != ""){

    // see if username in the db
    $sql_query = "SELECT Username, Password, TrainerId FROM trainer_tbl 
    WHERE Username='".$uname."'
    ";

    
    $result = mysqli_query($connection,$sql_query);
    // var_dump($result);
    $rows = array();
    //$row = mysqli_fetch_array($result);
    while($row = mysqli_fetch_array($result)) {
        $rows[] = $row;
    }
    

    $count = count($rows);
    
    //if username IS in the db
    if($count > 0){

        echo 0;

    }else{

        // $sql_query = "INSERT INTO trainer_tbl( TrainerName, Username, Password) 
        // VALUES 
        // ('".$fullname."','".$uname."','".$password."')";

        //insert new details into the table
        $sql_query = "INSERT INTO trainer_tbl( TrainerName, Username, Password) 
        VALUES 
        ('".$fullname."','".$uname."',PASSWORD('".$password."'))";

        $result = mysqli_query($connection,$sql_query);

        //then fetch the newly inserted user from the table
        $sql_query = "SELECT Username, Password, TrainerId FROM trainer_tbl 
        WHERE Username='".$uname."'
        ";

        $result = mysqli_query($connection,$sql_query);
        // var_dump($result);
        $rows = array();
        //$row = mysqli_fetch_array($result);
        while($row = mysqli_fetch_array($result)) {
            $rows[] = $row;
        }

        $arr = array($rows[0]['Username'],$rows[0]['TrainerId']);
        echo json_encode($arr);
    }

}