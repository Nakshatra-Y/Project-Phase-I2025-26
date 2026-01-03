// Progress Page JavaScript

// Global variables
let progressChart = null;
let progressData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  overall: [75, 78, 82, 87],
  pronunciation: [70, 75, 80, 85],
};

// Initialize progress page
document.addEventListener("DOMContentLoaded", () => {
  initializeProgressPage();
});

function initializeProgressPage() {
  setupEventListeners();
  initializeChart();
  animateElements();
  loadProgressData();
}

// Setup event listeners
function setupEventListeners() {
  // Date range comparison
  const compareBtn = document.getElementById("compare-progress");
  if (compareBtn) {
    compareBtn.addEventListener("click", compareProgress);
  }

  // Export actions
  const exportButtons = document.querySelectorAll(
    ".export-actions .btn-outline"
  );
  exportButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const action = e.target.closest(".btn-outline").textContent.trim();
      handleExportAction(action);
    });
  });

  // Calendar day interactions
  const calendarDays = document.querySelectorAll(".calendar-day");
  calendarDays.forEach((day) => {
    day.addEventListener("click", (e) => {
      showDayDetails(e.target.closest(".calendar-day"));
    });
  });

  // Skill bar animations
  const skillBars = document.querySelectorAll(".skill-fill");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBar(entry.target);
      }
    });
  });

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// Initialize progress chart
function initializeChart() {
  const ctx = document.getElementById("progress-chart");
  if (!ctx) return;

  progressChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: progressData.labels,
      datasets: [
        {
          label: "Overall Score",
          data: progressData.overall,
          borderColor: "#6366f1",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#6366f1",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: "Pronunciation",
          data: progressData.pronunciation,
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#f59e0b",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // We have custom legend
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          borderColor: "#6366f1",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function (context) {
              return context[0].label;
            },
            label: function (context) {
              return `${context.dataset.label}: ${context.parsed.y}%`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
          },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: "#f3f4f6",
            drawBorder: false,
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
    },
  });
}

// Compare progress for date range
function compareProgress() {
  const fromDate = document.getElementById("from-date").value;
  const toDate = document.getElementById("to-date").value;

  if (!fromDate || !toDate) {
    showNotification("Please select both start and end dates", "error");
    return;
  }

  if (new Date(fromDate) > new Date(toDate)) {
    showNotification("Start date must be before end date", "error");
    return;
  }

  // Show loading state
  const compareBtn = document.getElementById("compare-progress");
  const originalText = compareBtn.textContent;
  compareBtn.textContent = "Analyzing...";
  compareBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    updateProgressData(fromDate, toDate);
    compareBtn.textContent = originalText;
    compareBtn.disabled = false;
    showNotification("Progress analysis updated successfully!", "success");
  }, 2000);
}

// Update progress data based on date range
function updateProgressData(fromDate, toDate) {
  // Simulate different data based on date range
  const daysDiff = Math.ceil(
    (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff <= 7) {
    // Weekly view
    progressData.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    progressData.overall = [75, 78, 82, 80, 85, 88, 87];
    progressData.pronunciation = [70, 75, 80, 78, 83, 86, 85];
  } else if (daysDiff <= 30) {
    // Monthly view
    progressData.labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    progressData.overall = [75, 78, 82, 87];
    progressData.pronunciation = [70, 75, 80, 85];
  } else {
    // Quarterly view
    progressData.labels = ["Month 1", "Month 2", "Month 3"];
    progressData.overall = [75, 82, 87];
    progressData.pronunciation = [70, 78, 85];
  }

  // Update chart
  if (progressChart) {
    progressChart.data.labels = progressData.labels;
    progressChart.data.datasets[0].data = progressData.overall;
    progressChart.data.datasets[1].data = progressData.pronunciation;
    progressChart.update("active");
  }

  // Update insights
  updateInsights();
}

// Update insights based on current data
function updateInsights() {
  const insights = document.querySelectorAll(".insight-item");

  if (insights.length >= 3) {
    const overallImprovement =
      progressData.overall[progressData.overall.length - 1] -
      progressData.overall[0];
    const practiceDays = Math.floor(Math.random() * 7) + 1;

    insights[0].innerHTML = `
      <i class="fas fa-arrow-up text-green"></i>
      <span>Your pronunciation has improved by ${overallImprovement}% this period</span>
    `;

    insights[1].innerHTML = `
      <i class="fas fa-calendar text-blue"></i>
      <span>You've practiced ${practiceDays} days this week</span>
    `;

    insights[2].innerHTML = `
      <i class="fas fa-target text-purple"></i>
      <span>You're on track to reach your monthly goal</span>
    `;
  }
}

// Show day details
function showDayDetails(dayElement) {
  const dayNumber = dayElement.querySelector(".day-number").textContent;
  const activity = dayElement.dataset.activity;

  const modal = document.createElement("div");
  modal.className = "day-details-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>January ${dayNumber}, 2024</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="day-stats">
          <div class="stat">
            <span class="stat-value">${getRandomTime()}</span>
            <span class="stat-label">Practice Time</span>
          </div>
          <div class="stat">
            <span class="stat-value">${getRandomScore()}</span>
            <span class="stat-label">Average Score</span>
          </div>
          <div class="stat">
            <span class="stat-value">${getRandomLessons()}</span>
            <span class="stat-label">Lessons Completed</span>
          </div>
        </div>
        <div class="day-activities">
          <h4>Activities</h4>
          <ul>
            <li>Pronunciation Practice - 92%</li>
            <li>Conversation Exercise - 85%</li>
            <li>Grammar Lesson - 78%</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // Add modal styles
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.cssText = `
    background: white;
    border-radius: 15px;
    padding: 0;
    max-width: 400px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(modal);

  // Animate in
  setTimeout(() => {
    modal.style.opacity = "1";
    modalContent.style.transform = "scale(1)";
  }, 10);

  // Close modal handlers
  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    modal.style.opacity = "0";
    modalContent.style.transform = "scale(0.9)";
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  });

  // Close on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.opacity = "0";
      modalContent.style.transform = "scale(0.9)";
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    }
  });
}

// Animate skill bars
function animateSkillBar(barElement) {
  const width = barElement.style.width;
  barElement.style.width = "0%";

  setTimeout(() => {
    barElement.style.transition = "width 1s ease-out";
    barElement.style.width = width;
  }, 100);
}

// Animate elements on scroll
function animateElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  });

  const elements = document.querySelectorAll(".analytics-card, .export-card");
  elements.forEach((el) => {
    observer.observe(el);
  });
}

// Load progress data
function loadProgressData() {
  // Simulate loading progress data
  setTimeout(() => {
    updateInsights();
    animateSkillBars();
  }, 500);
}

// Animate all skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-fill");
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.style.width;
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.transition = "width 1s ease-out";
        bar.style.width = width;
      }, 100);
    }, index * 200);
  });
}

// Handle export actions
function handleExportAction(action) {
  switch (action) {
    case "Download Report":
      downloadProgressReport();
      break;
    case "Share Progress":
      shareProgress();
      break;
    case "Print Summary":
      printSummary();
      break;
  }
}

// Download progress report
function downloadProgressReport() {
  // Create a simple text report
  const report = generateProgressReport();
  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `speakup-progress-report-${
    new Date().toISOString().split("T")[0]
  }.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showNotification("Progress report downloaded successfully!", "success");
}

// Generate progress report
function generateProgressReport() {
  const currentDate = new Date().toLocaleDateString();
  const avgScore = Math.round(
    progressData.overall.reduce((a, b) => a + b, 0) /
      progressData.overall.length
  );

  return `
SpeakUp Progress Report
Generated: ${currentDate}

OVERALL PERFORMANCE
Average Score: ${avgScore}%
Total Practice Time: 2.5 hours
Lessons Completed: 24
Current Streak: 15 days

SKILL BREAKDOWN
- Pronunciation: 92%
- Fluency: 85%
- Grammar: 78%
- Vocabulary: 88%

WEEKLY ACTIVITY
- High Activity Days: 12
- Medium Activity Days: 8
- Low Activity Days: 5

RECENT ACHIEVEMENTS
- 7-Day Streak (2 days ago)
- Pronunciation Master (1 week ago)
- Lesson Complete (3 days ago)

GOALS PROGRESS
- Daily Practice: 24/30 minutes (80%)
- Weekly Lessons: 5/7 lessons (71%)
- Monthly Streak: 15/30 days (50%)

Keep up the great work! Your consistent practice is showing excellent results.
  `;
}

// Share progress
function shareProgress() {
  if (navigator.share) {
    navigator.share({
      title: "My SpeakUp Progress",
      text: `I've been practicing with SpeakUp and my pronunciation has improved by 12% this month! 🎉`,
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    const shareText = `I've been practicing with SpeakUp and my pronunciation has improved by 12% this month! Check out my progress: ${window.location.href}`;
    navigator.clipboard.writeText(shareText).then(() => {
      showNotification("Progress link copied to clipboard!", "success");
    });
  }
}

// Print summary
function printSummary() {
  const printWindow = window.open("", "_blank");
  const printContent = document.querySelector(".progress-main").innerHTML;

  printWindow.document.write(`
    <html>
      <head>
        <title>SpeakUp Progress Summary</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .container { max-width: 800px; margin: 0 auto; }
          .progress-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 10px; text-align: center; margin-bottom: 2rem; }
          .analytics-card { background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.5rem; margin-bottom: 1rem; }
          .skill-bar { height: 8px; background: #e5e7eb; border-radius: 4px; margin: 0.5rem 0; }
          .skill-fill { height: 100%; background: #6366f1; border-radius: 4px; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="container">
          ${printContent}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
}

// Utility functions
function getRandomTime() {
  const minutes = Math.floor(Math.random() * 30) + 10;
  return `${minutes} min`;
}

function getRandomScore() {
  return Math.floor(Math.random() * 20) + 80 + "%";
}

function getRandomLessons() {
  return Math.floor(Math.random() * 3) + 1;
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    background: ${
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#6366f1"
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + P for print
  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    e.preventDefault();
    printSummary();
  }

  // Ctrl/Cmd + S for download
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    downloadProgressReport();
  }
});

// Add hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to analytics cards
  const analyticsCards = document.querySelectorAll(".analytics-card");
  analyticsCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.05)";
    });
  });

  // Add hover effects to calendar days
  const calendarDays = document.querySelectorAll(".calendar-day");
  calendarDays.forEach((day) => {
    day.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });

    day.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
});
