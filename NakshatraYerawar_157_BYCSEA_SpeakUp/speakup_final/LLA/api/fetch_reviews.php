<?php
// Disable error reporting to prevent HTML warnings breaking JSON
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');

// Include DB Connect
require_once 'db_connect.php';

// Check connection (db_connect typically handles connection, but let's verify $conn exists)
if (!isset($conn) || $conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

$sql = "SELECT id, user_name, user_role, rating, review_text, image_path FROM reviews ORDER BY created_at DESC";
$result = $conn->query($sql);

$reviews = array();
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
}

echo json_encode($reviews);

$conn->close();
?>
