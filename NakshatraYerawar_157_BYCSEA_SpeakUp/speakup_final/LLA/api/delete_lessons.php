<?php
include 'db_connect.php';
$conn->query("DELETE FROM lessons WHERE language='english' AND id >= 7");
echo "Deleted lessons 7+ for english.";
?>
