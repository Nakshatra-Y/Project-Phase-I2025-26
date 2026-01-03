<?php
session_start();
include '../../api/db_connect.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: ../../../index.php");
    exit();
}

$user_id = $_SESSION['user_id'];

// Fetch User Stats
$stats_sql = "SELECT COUNT(*) as lessons_completed, AVG(score) as avg_score FROM lesson_progress WHERE user_id = ?";
$stmt = $conn->prepare($stats_sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stats = $stmt->get_result()->fetch_assoc();
$lessons_completed = $stats['lessons_completed'] ?? 0;
$overall_score = round($stats['avg_score'] ?? 0);
$stmt->close();

// Calculate Minutes Today (Assuming ~5 mins per lesson for now)
$today = date('Y-m-d');
$today_sql = "SELECT COUNT(*) as count FROM lesson_progress WHERE user_id = ? AND DATE(completed_at) = ?";
$stmt = $conn->prepare($today_sql);
$stmt->bind_param("is", $user_id, $today);
$stmt->execute();
$today_count = $stmt->get_result()->fetch_assoc()['count'];
$minutes_today = $today_count * 5;
$stmt->close();

// Day Streak (Simple implementation: consecutive days with activity)
// For now, let's just show 1 if active today, else 0. A real streak requires complex query.
$streak = ($today_count > 0) ? 1 : 0; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard - SpeakUp</title>
    <link rel="stylesheet" href="../../css/styles.css" />
    <link rel="stylesheet" href="../../css/dashboard.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    />
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
            <a href="dashboard.php" class="nav-link active">Dashboard</a>
          </li>
          <li class="nav-item">
            <a href="../lessons/practice.html" class="nav-link">Practice</a>
          </li>
          <li class="nav-item">
            <a href="../lessons/quiz.php" class="nav-link">Quiz</a>
          </li>
          <li class="nav-item">
            <a href="lessons/sample2.php" class="nav-link">Translator</a>
          </li>
          <li class="nav-item">
            <a href="progress.html" class="nav-link">Progress</a>
          </li>
          <li class="nav-item">
            <a href="../../index.html#about" class="nav-link">About</a>
          </li>
          <li class="nav-item">
            <a href="../../index.html#contact" class="nav-link">Contact</a>
          </li>
          <li class="nav-item">
            <a href="../../../index.php?logout=true" class="nav-link">Sign Out</a>
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
    <main class="dashboard-main">
      <div class="container">
        <!-- Welcome Section -->
        <section class="welcome-section">
          <div class="welcome-content">
            <h1>Welcome back, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</h1>
            <p>Ready to continue your language learning journey?</p>
          </div>
          <div class="user-avatar">
            <i class="fas fa-user"></i>
          </div>
        </section>

        <!-- Account Information -->
        <section class="account-info">
          <div class="info-card">
            <h3>Account Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Full Name:</label>
                <span><?php echo htmlspecialchars($_SESSION['user_name']); ?></span>
              </div>
              <div class="info-item">
                <label>Email:</label>
                <span><?php echo htmlspecialchars($_SESSION['user_email']); ?></span>
              </div>
              <div class="info-item">
                <label>Native Language:</label>
                <span>English</span>
              </div>
              <div class="info-item">
                <label>Learning Language:</label>
                <span>Spanish</span>
              </div>
              <div class="info-item">
                <label>Member Since:</label>
                <span>Jan 2025</span>
              </div>
              <div class="info-item">
                <label>Last Login:</label>
                <span>Today</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Quick Stats -->
        <section class="quick-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-fire"></i>
            </div>
            <div class="stat-content">
              <h3><?php echo $streak; ?></h3>
              <p>Day Streak</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="stat-content">
              <h3><?php echo $minutes_today; ?></h3>
              <p>Minutes Today</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <div class="stat-content">
              <h3><?php echo $overall_score; ?>%</h3>
              <p>Overall Score</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="stat-content">
              <h3><?php echo $lessons_completed; ?></h3>
              <p>Lessons Completed</p>
            </div>
          </div>
        </section>

        <!-- Main Dashboard Content -->
        <div class="dashboard-content">
          <!-- Left Column -->
          <div class="dashboard-left">
            <!-- Today's Goal -->
            <div class="goal-card">
              <h3>Today's Goal</h3>
              <div class="goal-progress">
                <div class="progress-circle">
                  <svg class="progress-ring" width="120" height="120">
                    <circle
                      class="progress-ring-circle"
                      stroke="#e5e7eb"
                      stroke-width="8"
                      fill="transparent"
                      r="52"
                      cx="60"
                      cy="60"
                    />
                    <circle
                      class="progress-ring-circle progress-ring-fill"
                      stroke="#6366f1"
                      stroke-width="8"
                      fill="transparent"
                      r="52"
                      cx="60"
                      cy="60"
                      style="stroke-dasharray: 326.73; stroke-dashoffset: 65.35"
                    />
                  </svg>
                  <div class="progress-text">
                    <span class="progress-percentage">80%</span>
                    <span class="progress-label">Complete</span>
                  </div>
                </div>
                <div class="goal-details">
                  <h4>Daily Practice</h4>
                  <p>24 / 30 minutes</p>
                  <button class="btn btn-primary">Continue Practice</button>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="activity-card">
              <h3>Recent Activity</h3>
              <div class="activity-list">
                <div class="activity-item">
                  <div class="activity-icon">
                    <i class="fas fa-microphone"></i>
                  </div>
                  <div class="activity-content">
                    <h4>Pronunciation Practice</h4>
                    <p>Completed 15 minutes ago</p>
                    <span class="activity-score">92%</span>
                  </div>
                </div>
                <div class="activity-item">
                  <div class="activity-icon">
                    <i class="fas fa-comments"></i>
                  </div>
                  <div class="activity-content">
                    <h4>Conversation Practice</h4>
                    <p>Completed 2 hours ago</p>
                    <span class="activity-score">85%</span>
                  </div>
                </div>
                <div class="activity-item">
                  <div class="activity-icon">
                    <i class="fas fa-book"></i>
                  </div>
                  <div class="activity-content">
                    <h4>Grammar Lesson</h4>
                    <p>Completed yesterday</p>
                    <span class="activity-score">78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="dashboard-right">
            <!-- Practice Modules -->
            <div class="modules-card">
              <h3>Practice Modules</h3>
              <div class="modules-grid">
                <div class="module-item">
                  <div class="module-image">
                    <i class="fas fa-comments"></i>
                  </div>
                  <div class="module-content">
                    <h4>Daily Conversation</h4>
                    <p>Practice real-world conversations</p>
                    <div class="module-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%"></div>
                      </div>
                      <span>75% Complete</span>
                    </div>
                  </div>
                </div>
                <div class="module-item">
                  <div class="module-image">
                    <i class="fas fa-volume-up"></i>
                  </div>
                  <div class="module-content">
                    <h4>Pronunciation</h4>
                    <p>Master difficult sounds</p>
                    <div class="module-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 60%"></div>
                      </div>
                      <span>60% Complete</span>
                    </div>
                  </div>
                </div>
                <div class="module-item">
                  <div class="module-image">
                    <i class="fas fa-book"></i>
                  </div>
                  <div class="module-content">
                    <h4>Grammar & Vocabulary</h4>
                    <p>Build your foundation</p>
                    <div class="module-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 45%"></div>
                      </div>
                      <span>45% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Weekly Progress -->
            <div class="progress-card">
              <h3>Weekly Progress</h3>
              <div class="progress-chart">
                <div class="chart-bars">
                  <div class="chart-bar">
                    <div class="bar-fill" style="height: 60%"></div>
                    <span>Mon</span>
                  </div>
                  <div class="chart-bar">
                    <div class="bar-fill" style="height: 80%"></div>
                    <span>Tue</span>
                  </div>
                  <div class="chart-bar">
                    <div class="bar-fill" style="height: 45%"></div>
                    <span>Wed</span>
                  </div>
                  <div class="chart-bar">
                    <div class="bar-fill" style="height: 90%"></div>
                    <span>Thu</span>
                  </div>
                  <div class="chart-bar">
                    <div class="bar-fill" style="height: 70%"></div>
                    <span>Fri</span>
                  </div>
                  <div class="chart-bar">
                    <div class="bar-fill" style="height: 85%"></div>
                    <span>Sat</span>
                  </div>
                  <div class="chart-bar">
                    <div class="bar-fill" style="height: 80%"></div>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <section class="quick-actions">
          <h3>Quick Actions</h3>
          <div class="actions-grid">
            <button
              class="action-btn"
              onclick="window.location.href='practice.html'"
            >
              <i class="fas fa-play"></i>
              <span>Start Practice</span>
            </button>
            <button
              class="action-btn"
              onclick="window.location.href='progress.html'"
            >
              <i class="fas fa-chart-line"></i>
              <span>View Progress</span>
            </button>
            <button class="action-btn">
              <i class="fas fa-cog"></i>
              <span>Settings</span>
            </button>
            <button class="action-btn">
              <i class="fas fa-question-circle"></i>
              <span>Help</span>
            </button>
          </div>
        </section>
      </div>
    </main>

    <script src="../../js/script.js"></script>
    <script src="../../js/dashboard.js"></script>
</body>
</html>
