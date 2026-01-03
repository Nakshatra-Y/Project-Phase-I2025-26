<?php
session_start();

// --- DATABASE CONNECTION ---
include 'db_connect.php';

// --- AUTH LOGIC ---

// Handle Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit();
}

// Handle Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];

    if ($action == "register") {
        $name = $_POST['display_name'];
        $email = $_POST['email'];
        $mobile = $_POST['mobile'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        if ($password !== $confirm_password) {
            $error = "Passwords do not match";
        } else {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            // Check email
            $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0) {
                $error = "Email already registered";
            } else {
                $stmt->close();
                // Insert
                $stmt = $conn->prepare("INSERT INTO users (full_name, email, mobile, password) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssss", $name, $email, $mobile, $hashed_password);
                if ($stmt->execute()) {
                    $success = "Account created successfully! Please login.";
                } else {
                    $error = "Error creating account";
                }
            }
            $stmt->close();
        }

    } elseif ($action == "login") {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT id, full_name, email, password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                $_SESSION['user_id'] = $row['id'];
                $_SESSION['user_name'] = $row['full_name'];
                $_SESSION['user_email'] = $row['email'];
                header("Location: LLA/dashboard.php");
                exit();
            } else {
                $error = "Invalid password";
            }
        } else {
            $error = "User not found";
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
    <title>SpeakUp - Login & Sign Up</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #6366f1;
            --primary-dark: #4f46e5;
            --gradient-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --glass-bg: rgba(255, 255, 255, 0.95);
            --text-color: #1f2937;
            --text-light: #6b7280;
            --input-bg: #f3f4f6;
            --white: #ffffff;
            --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--gradient-bg); padding: 20px; }
        .container { background: var(--glass-bg); border-radius: 20px; box-shadow: var(--shadow); width: 100%; max-width: 450px; overflow: hidden; position: relative; }
        .form-container { padding: 40px; }
        .form-header { margin-bottom: 30px; text-align: center; }
        .form-header h2 { color: var(--text-color); font-size: 2rem; margin-bottom: 10px; font-weight: 700; }
        .form-header p { color: var(--text-light); }
        .input-group { margin-bottom: 20px; }
        .input-group input { width: 100%; padding: 12px 15px; background: var(--input-bg); border: 2px solid transparent; border-radius: 8px; outline: none; transition: all 0.3s ease; }
        .input-group input:focus { border-color: var(--primary-color); background: var(--white); }
        .btn { width: 100%; padding: 12px; background: var(--primary-color); color: var(--white); border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn:hover { background: var(--primary-dark); transform: translateY(-2px); }
        .switch-text { text-align: center; margin-top: 20px; color: var(--text-light); }
        .switch-text a { color: var(--primary-color); font-weight: 600; cursor: pointer; text-decoration: none; }
        .switch-text a:hover { text-decoration: underline; }
        .hidden { display: none; }
        .message { padding: 10px; border-radius: 6px; margin-bottom: 20px; text-align: center; font-size: 0.9rem; }
        .success { background: #d1fae5; color: #065f46; }
        .error { background: #fee2e2; color: #991b1b; }
    </style>
</head>
<body>

    <div class="container">
            <!-- LOGIN & SIGNUP FORMS -->
            
            <!-- Login Form -->
            <div class="form-container <?php echo (isset($_GET['view']) && $_GET['view'] == 'signup') ? 'hidden' : ''; ?>" id="loginForm">
                <div class="form-header">
                    <h2>Welcome Back</h2>
                    <p>Please enter your details to sign in</p>
                </div>
                
                <?php if(isset($success)) echo "<div class='message success'>$success</div>"; ?>
                <?php if(isset($error)) echo "<div class='message error'>$error</div>"; ?>

                <form method="POST">
                    <input type="hidden" name="action" value="login">
                    <div class="input-group">
                        <input type="email" name="email" placeholder="Email Address" required>
                    </div>
                    <div class="input-group">
                        <input type="password" name="password" placeholder="Password" required>
                    </div>
                    <button type="submit" class="btn">Sign In</button>
                </form>
                
                <div class="switch-text">
                    Don't have an account? <a onclick="toggleForm()">Sign Up</a>
                </div>
            </div>

            <!-- Sign Up Form -->
            <div class="form-container <?php echo (isset($_GET['view']) && $_GET['view'] == 'signup') ? '' : 'hidden'; ?>" id="signupForm">
                <div class="form-header">
                    <h2>Create Account</h2>
                    <p>Start your journey with us</p>
                </div>

                <form method="POST">
                    <input type="hidden" name="action" value="register">
                    <div class="input-group">
                        <input type="text" name="display_name" placeholder="Full Name" required>
                    </div>
                    <div class="input-group">
                        <input type="email" name="email" placeholder="Email Address" required>
                    </div>
                    <div class="input-group">
                        <input type="tel" name="mobile" placeholder="Mobile Number" required>
                    </div>
                    <div class="input-group">
                        <input type="password" name="password" placeholder="Password" required>
                    </div>
                    <div class="input-group">
                        <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                    </div>

                    <button type="submit" class="btn">Sign Up</button>
                </form>
                
                <div class="switch-text">
                    Already have an account? <a onclick="toggleForm()">Sign In</a>
                </div>
            </div>

    </div>

    <script>
        function toggleForm() {
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            loginForm.classList.toggle('hidden');
            signupForm.classList.toggle('hidden');
        }
    </script>
</body>
</html>
