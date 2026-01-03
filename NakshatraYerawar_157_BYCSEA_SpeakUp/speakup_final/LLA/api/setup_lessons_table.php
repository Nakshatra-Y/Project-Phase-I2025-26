<?php
include 'db_connect.php';

// Create lessons table
$sql_table = "CREATE TABLE IF NOT EXISTS lessons (
    id INT(11) PRIMARY KEY,
    language VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    level VARCHAR(50),
    icon VARCHAR(50),
    duration VARCHAR(20)
)";

if ($conn->query($sql_table) === TRUE) {
    echo "Table lessons created successfully<br>";
} else {
    echo "Error creating table: " . $conn->error . "<br>";
}

// Insert Data (using ON DUPLICATE KEY UPDATE to avoid errors if run multiple times)
// We will insert data for ALL languages to have a complete database, enabling dynamic pages for all.
$lessons = [
    // ENGLISH
    [1, 'english', 'English Basics - Level 0', 'Learn fundamental English greetings and basic phrases', 'beginner', 'fas fa-comments', '8 min'],
    [2, 'english', 'English Pronunciation - Level 1', 'Master basic English sounds and pronunciation patterns', 'beginner', 'fas fa-volume-up', '10 min'],
    [3, 'english', 'English Vocabulary - Level 2', 'Build essential English vocabulary for daily life', 'beginner', 'fas fa-book', '12 min'],
    [4, 'english', 'English Grammar - Level 3', 'Learn intermediate English grammar structures', 'intermediate', 'fas fa-graduation-cap', '15 min'],
    [5, 'english', 'English Conversation - Level 4', 'Practice advanced English conversation skills', 'intermediate', 'fas fa-users', '18 min'],
    [6, 'english', 'English Mastery - Level 5', 'Advanced English for professional and academic use', 'advanced', 'fas fa-trophy', '20 min'],
    
    // SPANISH
    [7, 'spanish', 'Español Básico - Nivel 0', 'Aprende saludos básicos y frases fundamentales en español', 'beginner', 'fas fa-comments', '8 min'],
    [8, 'spanish', 'Pronunciación Española - Nivel 1', 'Domina los sonidos básicos del español', 'beginner', 'fas fa-volume-up', '10 min'],
    [9, 'spanish', 'Vocabulario Español - Nivel 2', 'Construye vocabulario esencial en español', 'beginner', 'fas fa-book', '12 min'],
    [10, 'spanish', 'Gramática Española - Nivel 3', 'Aprende estructuras gramaticales intermedias del español', 'intermediate', 'fas fa-graduation-cap', '15 min'],
    [11, 'spanish', 'Conversación Española - Nivel 4', 'Practica habilidades avanzadas de conversación en español', 'intermediate', 'fas fa-users', '18 min'],
    [12, 'spanish', 'Maestría Española - Nivel 5', 'Español avanzado para uso profesional y académico', 'advanced', 'fas fa-trophy', '20 min'],

    // JAPANESE
    [13, 'japanese', '日本語の基礎 - レベル0', '基本的な日本語の挨拶とフレーズを学ぶ', 'beginner', 'fas fa-comments', '8 min'],
    [14, 'japanese', '日本語の発音 - レベル1', '日本語の基本的な音と発音パターンをマスターする', 'beginner', 'fas fa-volume-up', '10 min'],
    [15, 'japanese', '日本語の語彙 - レベル2', '日常生活に必要な日本語の語彙を構築する', 'beginner', 'fas fa-book', '12 min'],
    [16, 'japanese', '日本語の文法 - レベル3', '中級の日本語文法構造を学ぶ', 'intermediate', 'fas fa-graduation-cap', '15 min'],
    [17, 'japanese', '日本語の会話 - レベル4', '上級の日本語会話スキルを練習する', 'intermediate', 'fas fa-users', '18 min'],
    [18, 'japanese', '日本語の習得 - レベル5', 'プロフェッショナル・学術用の上級日本語', 'advanced', 'fas fa-trophy', '20 min'],

    // HINDI
    [19, 'hindi', 'हिंदी की बुनियाद - स्तर 0', 'हिंदी में बुनियादी अभिवादन और वाक्यांश सीखें', 'beginner', 'fas fa-comments', '8 min'],
    [20, 'hindi', 'हिंदी उच्चारण - स्तर 1', 'हिंदी के बुनियादी ध्वनियों और उच्चारण पैटर्न में महारत हासिल करें', 'beginner', 'fas fa-volume-up', '10 min'],
    [21, 'hindi', 'हिंदी शब्दावली - स्तर 2', 'दैनिक जीवन के लिए आवश्यक हिंदी शब्दावली का निर्माण करें', 'beginner', 'fas fa-book', '12 min'],
    [22, 'hindi', 'हिंदी व्याकरण - स्तर 3', 'हिंदी के मध्यवर्ती व्याकरणिक संरचनाओं को सीखें', 'intermediate', 'fas fa-graduation-cap', '15 min'],
    [23, 'hindi', 'हिंदी बातचीत - स्तर 4', 'हिंदी में उन्नत बातचीत कौशल का अभ्यास करें', 'intermediate', 'fas fa-users', '18 min'],
    [24, 'hindi', 'हिंदी में निपुणता - स्तर 5', 'पेशेवर और शैक्षणिक उपयोग के लिए उन्नत हिंदी', 'advanced', 'fas fa-trophy', '20 min']
];

$stmt = $conn->prepare("INSERT INTO lessons (id, language, title, description, level, icon, duration) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description)");

foreach ($lessons as $lesson) {
    echo "Inserting lesson: " . $lesson[2] . "<br>";
    $stmt->bind_param("issssss", $lesson[0], $lesson[1], $lesson[2], $lesson[3], $lesson[4], $lesson[5], $lesson[6]);
    if (!$stmt->execute()) {
        echo "Error: " . $stmt->error . "<br>";
    }
}

$stmt->close();
$conn->close();
echo "Lessons data setup complete.";
?>
