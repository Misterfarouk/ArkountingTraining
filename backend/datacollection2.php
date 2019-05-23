<?php
    require_once("arkounting_training.php");

    $name = $_POST['name'];
    $contact_email = $_POST['contact_email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $nameErr = "";
    $contact_emailErr = "";
    $subjectErr = "";
    $messageErr = "";

    

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        if ($name == null || $name == "") {
            $nameErr = "Name is required";
        } else {
            $name = test_input($name);
        }
          
        if ($contact_email == null || $contact_email == "") {
            $contact_emailErr = "Email is required";
        } else if (!filter_var($contact_email, FILTER_VALIDATE_EMAIL)) {
            $contact_emailErr = "Email invalid";
        }
        
        if ($subject == null || $subject == "") {
            $subjectErr = "Subject is required";
        } else {
            $subject = test_input($subject);
        }

        if ($message == null || $message == "") {
            $messageErr = "Message is required";
        } else {
            $message = test_input($message);
        }

        if (empty($nameErr) && empty($contact_emailErr) && empty($subjectErr) && empty($messageErr)) 
        {
    
            $sql = "INSERT INTO contact_form (name, contact_email, subject , message)
            VALUES ( '$name', '$contact_email', '$subject', '$message' )";


            
            if (mysqli_query($connection, $sql)) {

                $to = "ezikevictor11@gmail.com";                
                $header = "From:abc@somedomain.com \r\n";
                $header .= "Cc:afgh@somedomain.com \r\n";
                $header .= "MIME-Version: 1.0\r\n";
                $header .= "Content-type: text/html\r\n";
                
                $mail_sent = false;
                try {
                    mail($to,$subject,$message,$header);
                    $mail_sent = true;
                } catch (\Exception $e) {
                    // $mail_sent = false
                }
                http_response_code(200);
                if ($mail_sent == true) {
                    echo "Message sent";
                } else {
                    echo "Message saved, could not be sent at this time!";
                }
            } else {
                http_response_code(400);
                echo "Error: " . $sql . "<br>" . mysqli_error($connection);        
            } 
        }
        else {
            $arr = array('name' => $nameErr, 'contact_email' => $contact_emailErr, 'subject' => $subjectErr, 'message' => $messageErr, "status" => 400);
            http_response_code(400);
            echo json_encode($arr);
        }

    }

 

?>