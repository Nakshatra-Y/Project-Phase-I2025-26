<?php
session_start();
include 'db_connect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit();
}

$user_id = $_SESSION['user_id'];
$lesson_id = isset($_GET['lesson_id']) ? intval($_GET['lesson_id']) : 0;

if ($lesson_id <= 0) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid lesson ID']);
    exit();
}

$sql = "SELECT score FROM lesson_progress WHERE user_id = ? AND lesson_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $lesson_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['status' => 'success', 'completed' => true]);
} else {
    echo json_encode(['status' => 'success', 'completed' => false]);
}

$stmt->close();
$conn->close();
?>
