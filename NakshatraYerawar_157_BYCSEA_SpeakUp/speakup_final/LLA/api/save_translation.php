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

$user_id = $_SESSION['user_id'];
$source_text = $conn->real_escape_string($data['source_text']);
$translated_text = $conn->real_escape_string($data['translated_text']);
$source_lang = $conn->real_escape_string($data['source_lang']);
$target_lang = $conn->real_escape_string($data['target_lang']);

$sql = "INSERT INTO translation_history (user_id, source_text, translated_text, source_lang, target_lang) 
        VALUES ('$user_id', '$source_text', '$translated_text', '$source_lang', '$target_lang')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $conn->error]);
}

$conn->close();
?>
