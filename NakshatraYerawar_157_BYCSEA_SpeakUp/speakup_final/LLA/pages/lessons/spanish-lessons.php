<?php
include 'api/db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Spanish Lessons - SpeakUp</title>
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="stylesheet" href="css/practice.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
</head>

<body>
  <!-- Navigation -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <div class="logo-icon">
          <i class="fas fa-comment-dots"></i>
        </div>
        <h2>SpeakUp</h2>
      </div>
      <ul class="nav-menu">
        <li class="nav-item">
          <a href="dashboard.php" class="nav-link">Dashboard</a>
        </li>
        <li class="nav-item">
          <a href="practice.html" class="nav-link active">Practice</a>
        </li>
        <li class="nav-item">
          <a href="progress.html" class="nav-link">Progress</a>
        </li>
        <li class="nav-item">
          <a href="index.html#about" class="nav-link">About</a>
        </li>
        <li class="nav-item">
          <a href="index.html#contact" class="nav-link">Contact</a>
        </li>
      </ul>
      <div class="nav-toggle" id="mobile-menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>

  <main class="practice-main">
    <div class="container">
      <!-- Header -->
      <section class="practice-header">
        <div class="header-content">
          <button class="back-btn" onclick="window.location.href='practice.html'"
            style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; margin-bottom: 1rem;">
            <i class="fas fa-arrow-left"></i>
            Back to Languages
          </button>
          <h1>Spanish Lessons</h1>
          <p>Work through 15 bite-size lessons to build your Spanish skills.</p>
        </div>
      </section>

      <!-- Lessons Grid -->
      <section class="lesson-selection">
        <div class="selection-header">
          <h2>Lessons 1–6</h2>
        </div>

        <div class="lessons-grid">
          <?php
            // Fetch Spanish lessons
            $sql = "SELECT * FROM lessons WHERE language = 'spanish' ORDER BY id ASC";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $lesson_num = 1;
                while($row = $result->fetch_assoc()) {
                    ?>
                    <div class="lesson-card" onclick="window.location.href='lesson.php?id=<?php echo $row['id']; ?>'">
                        <div class="lesson-header">
                        <div class="lesson-icon">
                            <i class="<?php echo $row['icon']; ?>"></i>
                        </div>
                        <div class="lesson-badges">
                            <span class="lesson-language"><?php echo strtoupper($row['language']); ?></span>
                            <span class="lesson-level <?php echo $row['level']; ?>">Lesson <?php echo $lesson_num; ?></span>
                        </div>
                        </div>
                        <div class="lesson-content">
                        <h3><?php echo $row['title']; ?></h3>
                        <p><?php echo $row['description']; ?></p>
                        </div>
                    </div>
                    <?php
                    $lesson_num++;
                }
            } else {
                echo "<p>No lessons found.</p>";
            }
          ?>

        </div>
        </div>
      </section>
    </div>
  </main>

  <script src="js/script.js"></script>
</body>

</html>