<?php
include 'db_connect.php';
$result = $conn->query("SELECT id, title, language FROM lessons WHERE language='spanish' ORDER BY id");
echo "Count: " . $result->num_rows . "<br>";
$i = 1;
while($row = $result->fetch_assoc()) {
    echo "ID: " . $row['id'] . " - Display should be: Lesson " . $i . " - Title: " . $row['title'] . "<br>";
    $i++;
}
?>
