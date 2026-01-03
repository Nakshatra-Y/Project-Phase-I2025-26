<?php
include 'db_connect.php';

$sql = "CREATE TABLE IF NOT EXISTS lesson_progress (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    lesson_id INT(11) NOT NULL,
    score INT(11) DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_attempt (user_id, lesson_id)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table lesson_progress created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
