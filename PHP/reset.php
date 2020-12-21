<?php
include "config2.php";

$uname = mysqli_real_escape_string($connection,$_POST['username']);
$password = mysqli_real_escape_string($connection,$_POST['password']);
$newPassword = mysqli_real_escape_string($connection,$_POST['newPassword']);

// $uname = mysqli_real_escape_string($connection,'rowleya');
// $password = mysqli_real_escape_string($connection,'password');

if ($uname != "" && $password != ""){

    // see if username in the db with the right db
    $sql_query = "SELECT Username, Password, TrainerId FROM trainer_tbl 
    WHERE Username='".$uname."' AND (Password = '".$password."' OR Password = PASSWORD('".$password."'))
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

        // $sql_query = "UPDATE trainer_tbl 
        // SET Password = '".$newPassword."'
        // WHERE Username = '".$uname."'";
        // $result = mysqli_query($connection,$sql_query);

        //set reset pashword as hashed
        $sql_query = "UPDATE trainer_tbl 
        SET Password = PASSWORD('".$newPassword."')
        WHERE Username = '".$uname."'";
        $result = mysqli_query($connection,$sql_query);

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

        
    }else{
        //if username not found in the db
        echo 0;
        
    }

}