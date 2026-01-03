<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    $to = "hellospeakup25@gmail.com";
    $subject = "New Contact Message from SpeakUp";
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message";

    // Use a fixed From address to avoid SPF issues, and set Reply-To to the user's email
    $headers = "From: noreply@speakup.com" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        header("Location: ../index.html?status=success");
    } else {
        // If mail fails, redirect with error status
        header("Location: ../index.html?status=error");
    }
} else {
    header("Location: ../index.html");
}
?>
