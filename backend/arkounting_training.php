<?php
     $server = "localhost";
     $username = "root";
     $password = "root";
     $database = "arkounting_training";

     //create connection

     $connection = mysqli_connect( $server, $username, $password, $database);

     // Check connection
    if (!$connection) {
      die("Connection failed: " . mysqli_connect_error());
    }

    

     function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }
     
?>