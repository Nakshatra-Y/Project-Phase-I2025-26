<?php
include 'db_connect.php';
$result = $conn->query("SELECT id, title FROM lessons WHERE language='english'");
echo "Count: " . $result->num_rows . "<br>";
while($row = $result->fetch_assoc()) {
    echo $row['id'] . ": " . $row['title'] . "<br>";
}
?>
