<?php
   
$training = array(
    'Financial Management', 'Software Development',
    'Human Resource Management', 'Business Analysis/ Process Design',
    
);

//Print out the array in a JSON format.
header('Content-Type: application/json');
echo json_encode($training);
?>