<?php
session_start();
// Database connection (adjust path if needed, assuming it's in the same dir)
require_once 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Basic validation
    if (!isset($_SESSION['user_id'])) {
        header("Location: ../index.php");
        exit();
    }

    // Capture inputs
    $user_name = isset($_POST['user_name']) ? trim($_POST['user_name']) : 'Anonymous';
    $user_role = isset($_POST['user_role']) ? trim($_POST['user_role']) : 'User';
    $rating = isset($_POST['rating']) ? intval($_POST['rating']) : 0;
    $review_text = isset($_POST['review_text']) ? trim($_POST['review_text']) : '';
    
    // Handle File Upload
    $image_path = null;
    if (isset($_FILES['review_image']) && $_FILES['review_image']['error'] == 0) {
        $upload_dir = '../uploads/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        
        $file_name = time() . '_' . basename($_FILES['review_image']['name']);
        $target_file = $upload_dir . $file_name;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        
        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES['review_image']['tmp_name']);
        if($check !== false) {
            if (move_uploaded_file($_FILES['review_image']['tmp_name'], $target_file)) {
                $image_path = $target_file;
            }
        }
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO reviews (user_name, user_role, rating, review_text, image_path) VALUES (?, ?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("ssiss", $user_name, $user_role, $rating, $review_text, $image_path);
        if ($stmt->execute()) {
    header("Location: ../index.html?status=review_success");
        } else {
            // Log error or just redirect
            header("Location: ../index.html?status=review_error");
        }
        $stmt->close();
    } else {
        header("Location: ../index.html?status=review_success");
    }
    
    $conn->close();
} else {
    header("Location: ../index.html");
}
?>
