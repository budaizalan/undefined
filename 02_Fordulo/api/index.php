<?php
$servername = "localhost";
$username = "undefined";
$password = "undefined123";
$dbname = "undefined";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

if($method == 'POST') {
    $name = $input['name'];
    $score = $input['score'];
    $date = $input['date'];
    
    $sql = "INSERT INTO Scores (id, name, score, date)
    VALUES ('', '".$name."', ".$score.", '".$date."')";
    
    $conn->query($sql);
} else if($method == 'GET') {
    $sql = "SELECT * FROM Scores ORDER BY score DESC LIMIT 1";
    $result = $conn->query($sql);
    
    $scores = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $scores[] = $row;
        }
    }
    
    echo json_encode($scores);
}


$conn->close();
?>