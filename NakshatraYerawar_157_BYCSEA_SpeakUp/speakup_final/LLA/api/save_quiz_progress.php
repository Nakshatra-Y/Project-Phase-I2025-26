<?php
include 'db_connect.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit();
}

$user_id = $_SESSION['user_id']; // Use session ID for security
$language = $conn->real_escape_string($data['language']);
$lesson = $conn->real_escape_string($data['lesson']);
$score = intval($data['score']);
$total = intval($data['total']);

$sql = "INSERT INTO quiz_results (user_id, language, lesson_key, score, total_questions) VALUES ('$user_id', '$language', '$lesson', $score, $total)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $conn->error]);
}

$conn->close();
?>
