<?php
session_start();
require_once 'api/db_connect.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: ../index.php"); 
    exit();
}

// Fetch user details
$user_id = $_SESSION['user_id'];
$user_name_prefill = "User"; // Default

// Try to fetch name from users table. 
// Note: Schema provided shows "User" table with "email". 
// We will check if there's a name column, otherwise use email.
// Adjust table/column names based on actual DB.
$sql = "SELECT * FROM users WHERE id = ?"; // Common convention
// If table is "User" and column "user_id":
// $sql = "SELECT email FROM User WHERE user_id = ?";

// Let's try flexible approach or stick to what is likely working.
// Since I cannot run interactive SQL easily to check schema, I will try 'users' first as 'submit_review.php' works with 'reviews'.
// If the login system sets $_SESSION['user_name'], that's best.
if(isset($_SESSION['user_name'])) {
    $user_name_prefill = $_SESSION['user_name'];
} else if(isset($_SESSION['name'])) {
     $user_name_prefill = $_SESSION['name'];
} else {
    // Attempt DB fetch
    // Assuming table 'users' with 'name' or 'full_name' or 'username'
    // Or table 'User' with 'email' from schema
    $stmt = $conn->prepare("SELECT email FROM users WHERE id = ?"); 
    if(!$stmt) {
       // Try "User" table from schema
       $stmt = $conn->prepare("SELECT email FROM `User` WHERE user_id = ?"); 
    }
    
    if ($stmt) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            // If we have a name column, use it, else email
            if(isset($row['name'])) $user_name_prefill = $row['name'];
            elseif(isset($row['username'])) $user_name_prefill = $row['username'];
            elseif(isset($row['email'])) $user_name_prefill = $row['email'];
        }
        $stmt->close();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Write a Review - SpeakUp</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .review-section {
            padding: 80px 0;
            background: #f9fafb;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .review-card {
            background: white;
            padding: 2.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            max-width: 600px;
            width: 100%;
        }
        .rating-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
        .rating-group input {
            display: none;
        }
        .rating-group label {
            cursor: pointer;
            color: #d1d5db;
            font-size: 24px;
            transition: color 0.3s;
        }
        .rating-group input:checked ~ label,
        .rating-group label:hover,
        .rating-group label:hover ~ label {
            color: #fbbf24;
        }
    </style>
</head>
<body>
    <nav class="navbar" style="position: relative;">
        <div class="nav-container">
            <div class="nav-logo">
                <div class="logo-icon"><i class="fas fa-comment-dots"></i></div>
                <h2>SpeakUp</h2>
            </div>
            <a href="index.html" class="nav-link">Back to Home</a>
        </div>
    </nav>

    <section class="review-section">
        <div class="review-card">
            <div class="section-header" style="margin-bottom: 2rem;">
                <h2>Write a Review</h2>
                <p>Share your experience with SpeakUp</p>
            </div>
            
            <form id="review-form" action="api/submit_review.php" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="user_name" style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Your Name</label>
                    <input type="text" name="user_name" id="user_name" value="<?php echo htmlspecialchars($user_name_prefill); ?>" readonly style="width: 100%; padding: 12px 15px; border: 1px solid #d1d5db; border-radius: 8px; background-color: #e5e7eb; cursor: not-allowed;">
                </div>

                <div class="form-group">
                    <label for="user_role" style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Your Role</label>
                    <input type="text" name="user_role" id="user_role" placeholder="Student | Developer" style="width: 100%; padding: 12px 15px; border: 1px solid #d1d5db; border-radius: 8px;">
                </div>

                <div class="form-group">
                    <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Your Rating</label>
                    <div class="rating-group">
                        <input type="radio" id="star5" name="rating" value="5" required /><label for="star5"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star4" name="rating" value="4" /><label for="star4"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star3" name="rating" value="3" /><label for="star3"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star2" name="rating" value="2" /><label for="star2"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star1" name="rating" value="1" /><label for="star1"><i class="fas fa-star"></i></label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="review_text" style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Your Review</label>
                    <textarea name="review_text" id="review_text" placeholder="Tell us what you think..." rows="5" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="review_image" style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Upload Profile/Review Image (Optional)</label>
                    <input type="file" name="review_image" id="review_image" accept="image/*" style="border: 1px solid #ddd; padding: 10px; border-radius: 8px; background: #fff;">
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Review</button>
            </form>
        </div>
    </section>

    <!-- Success/Error Message Overlay (Hidden by default, used by JS if needed) -->
    <div id="form-message" style="position: fixed; top: 20px; right: 20px; padding: 15px; border-radius: 8px; color: white; display: none; z-index: 1000;"></div>

    <script src="js/script.js?v=1.3"></script>
</body>
</html>
