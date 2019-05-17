<?php
    require_once("arkounting_training.php");

    $username = $_POST['username'];
    $email = $_POST['email'];
    $training_option = $_POST['training_option'];

    $usernameErr = "";
    $emailErr = "";
    $training_optionErr = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

      if ($username == null || $username == "") {
        $usernameErr = "Full-Name is required";
      } else {
        $username = test_input($username);
      }
    
      if ($email == null || $email == "") {
          $emailErr = "Email is required";
      } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
          $emailErr = "Email invalid";
      }
      if ($training_option == null || $training_option == "") {
          $training_optionErr = "Training option is required";
        } else {
          $training_option = test_input($training_option);
      }
      if (empty($usernameErr) && empty($emailErr) && empty($training_optionErr)) 
      {
          $sql = "INSERT INTO applicants (username, email, training_option)
          VALUES ( '$username', '$email', '$training_option' )";
      
          if (mysqli_query($connection, $sql)) {
            http_response_code(200);
            echo "New record created successfully";
          } else {
            http_response_code(400);
            echo "Error: " . $sql . "<br>" . mysqli_error($connection);
          }
      }  else {
        $arr = array('username' => $usernameErr, 'email' => $emailErr, 'training_option' => $training_optionErr, "status" => 400);
        http_response_code(400);
        echo json_encode( $arr );
      }
        
    }
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM training_options";
    $result = mysqli_query ($connection, $sql) ;

    if (mysqli_num_rows($result) > 0 ){
       $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
      
    }
    
?>