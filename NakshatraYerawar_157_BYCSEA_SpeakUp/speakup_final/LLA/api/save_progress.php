<?php
session_start();
include 'db_connect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit();
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['lesson_id']) || !isset($data['score'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing data']);
    exit();
}

$lesson_id = $data['lesson_id'];
$score = $data['score'];

// Insert or Update (Upsert)
$stmt = $conn->prepare("INSERT INTO lesson_progress (user_id, lesson_id, score, completed_at) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE score = VALUES(score), completed_at = VALUES(completed_at)");
$stmt->bind_param("iii", $user_id, $lesson_id, $score);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}

$stmt->close();
$conn->close();
?>
