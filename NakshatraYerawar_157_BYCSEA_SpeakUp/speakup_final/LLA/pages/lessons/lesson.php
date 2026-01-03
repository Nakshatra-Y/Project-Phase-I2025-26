<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: ../index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lesson - SpeakUp</title>
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="stylesheet" href="css/lesson.css" />
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
          <a href="practice.html" class="nav-link">Practice</a>
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

  <!-- Main Content -->
  <main class="lesson-main">
    <div class="container">
      <!-- Lesson Header -->
      <section class="lesson-header">
        <div class="header-content">
          <button class="back-btn" onclick="window.location.href='practice.html'">
            <i class="fas fa-arrow-left"></i>
            Back to Practice
          </button>
          <div class="lesson-info">
            <div class="lesson-badges">
              <span class="lesson-language" id="lesson-language">LANGUAGE</span>
              <span class="lesson-level" id="lesson-level">Beginner</span>
            </div>
            <h1 id="lesson-title">Lesson Title</h1>
            <p id="lesson-description">Lesson description goes here.</p>
          </div>
        </div>
      </section>

      <!-- Lesson Content -->
      <section class="lesson-content">
        <div class="content-grid">
          <!-- Exercise List -->
          <div class="exercise-list">
            <h3>Exercises</h3>
            <div class="exercises-container" id="exercises-container">
              <!-- Exercises will be populated by JavaScript -->
            </div>
          </div>

          <!-- Current Exercise -->
          <div class="current-exercise">
            <div class="exercise-card">
              <div class="exercise-header">
                <h4 id="current-exercise-title">Exercise Title</h4>
                <div class="exercise-progress">
                  <span id="current-exercise-number">1</span> /
                  <span id="total-exercises">1</span>
                </div>
              </div>

              <div class="exercise-body">
                <!-- Audio Player -->
                <div class="audio-section">
                  <div class="audio-player">
                    <button class="audio-btn" id="play-audio">
                      <i class="fas fa-play"></i>
                    </button>
                    <div class="audio-waveform" id="audio-waveform">
                      <div class="wave-bar"></div>
                      <div class="wave-bar"></div>
                      <div class="wave-bar"></div>
                      <div class="wave-bar"></div>
                      <div class="wave-bar"></div>
                      <div class="wave-bar"></div>
                      <div class="wave-bar"></div>
                      <div class="wave-bar"></div>
                    </div>
                  </div>
                  <p class="audio-text" id="audio-text">
                    Audio or prompt text appears here.
                  </p>
                </div>

                <!-- Speech Recognition -->
                <div class="speech-section">
                  <div class="speech-recorder">
                    <button class="record-btn" id="record-btn">
                      <i class="fas fa-microphone"></i>
                      <span>Click to Record</span>
                    </button>
                    <div class="recording-indicator" id="recording-indicator">
                      <div class="pulse-ring"></div>
                      <div class="pulse-ring"></div>
                      <div class="pulse-ring"></div>
                    </div>
                  </div>
                  <div class="speech-feedback" id="speech-feedback">
                    <div class="feedback-text" id="feedback-text">
                      Click the microphone to start recording
                    </div>
                    <div class="pronunciation-score" id="pronunciation-score">
                      <div class="score-bar">
                        <div class="score-fill" style="width: 0%"></div>
                      </div>
                      <span class="score-text">0%</span>
                    </div>
                  </div>
                </div>

                <!-- Word-by-word Analysis -->
                <div class="word-analysis" id="word-analysis" style="display: none">
                  <h5>Word Analysis</h5>
                  <div class="words-grid" id="words-grid">
                    <!-- Words will be populated by JavaScript -->
                  </div>
                </div>
              </div>

              <div class="exercise-actions">
                <button class="btn btn-secondary" id="skip-exercise">
                  Skip
                </button>
                <button class="btn btn-primary" id="next-exercise" disabled>
                  Next Exercise
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Lesson Tips -->
      <section class="lesson-tips">
        <h3>Practice Tips</h3>
        <div class="tips-grid">
          <div class="tip-item">
            <i class="fas fa-volume-up"></i>
            <h4>Listen Carefully</h4>
            <p>Pay attention to pronunciation and intonation patterns</p>
          </div>
          <div class="tip-item">
            <i class="fas fa-microphone"></i>
            <h4>Speak Clearly</h4>
            <p>Enunciate each word clearly and at a natural pace</p>
          </div>
          <div class="tip-item">
            <i class="fas fa-redo"></i>
            <h4>Practice Regularly</h4>
            <p>Repeat exercises multiple times to improve accuracy</p>
          </div>
          <div class="tip-item">
            <i class="fas fa-chart-line"></i>
            <h4>Track Progress</h4>
            <p>Monitor your improvement over time</p>
          </div>
        </div>
      </section>
    </div>
  </main>

  <!-- Lesson Completion Modal -->
  <div class="completion-modal" id="completion-modal" style="display: none">
    <div class="modal-content">
      <div class="completion-header">
        <i class="fas fa-trophy"></i>
        <h3>Lesson Completed!</h3>
      </div>
      <div class="completion-stats">
        <div class="stat">
          <span class="stat-value" id="final-score">85%</span>
          <span class="stat-label">Overall Score</span>
        </div>
        <div class="stat">
          <span class="stat-value" id="time-spent">3:24</span>
          <span class="stat-label">Time Spent</span>
        </div>
        <div class="stat">
          <span class="stat-value" id="exercises-completed">5/5</span>
          <span class="stat-label">Exercises</span>
        </div>
      </div>
      <div class="completion-actions">
        <button class="btn btn-secondary" id="review-lesson">Review</button>
        <button class="btn btn-primary" id="next-lesson">Next Lesson</button>
      </div>
    </div>
  </div>

  <script src="js/script.js"></script>
  <script src="js/lesson.js?v=<?php echo time(); ?>"></script>
</body>

</html>