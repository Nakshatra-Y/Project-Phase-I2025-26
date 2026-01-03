// Dashboard specific JavaScript functionality

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard();
});

function initializeDashboard() {
  // Animate progress circles
  animateProgressCircles();

  // Animate chart bars
  animateChartBars();

  // Initialize real-time updates
  initializeRealTimeUpdates();

  // Add click handlers for quick actions
  addQuickActionHandlers();
}

// Animate progress circles
function animateProgressCircles() {
  const progressRing = document.querySelector(".progress-ring-fill");
  if (progressRing) {
    const circumference = 2 * Math.PI * 52; // radius = 52
    const percentage = 80; // 80% complete
    const offset = circumference - (percentage / 100) * circumference;

    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = circumference;

    // Animate the progress
    setTimeout(() => {
      progressRing.style.transition = "stroke-dashoffset 1s ease-in-out";
      progressRing.style.strokeDashoffset = offset;
    }, 500);
  }
}

// Animate chart bars
function animateChartBars() {
  const chartBars = document.querySelectorAll(".bar-fill");

  chartBars.forEach((bar, index) => {
    const height = bar.style.height;
    bar.style.height = "0%";

    setTimeout(() => {
      bar.style.transition = "height 0.8s ease-out";
      bar.style.height = height;
    }, index * 100 + 500);
  });
}

// Initialize real-time updates
function initializeRealTimeUpdates() {
  // Update time-based stats
  updateTimeStats();

  // Set up periodic updates
  setInterval(updateTimeStats, 60000); // Update every minute
}

// Update time-based statistics
function updateTimeStats() {
  const now = new Date();
  const currentHour = now.getHours();

  // Simulate dynamic updates
  const streakElement = document.querySelector(
    ".stat-card:nth-child(1) .stat-content h3"
  );
  const minutesElement = document.querySelector(
    ".stat-card:nth-child(2) .stat-content h3"
  );

  if (streakElement && minutesElement) {
    // Update minutes based on time of day (simulation)
    const baseMinutes = 24;
    const timeBonus = Math.floor(currentHour / 2);
    const newMinutes = baseMinutes + timeBonus;

    minutesElement.textContent = newMinutes;

    // Add a subtle animation
    minutesElement.style.transform = "scale(1.1)";
    setTimeout(() => {
      minutesElement.style.transform = "scale(1)";
    }, 200);
  }
}

// Add click handlers for quick actions
function addQuickActionHandlers() {
  const actionButtons = document.querySelectorAll(".action-btn");

  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // Handle specific actions
      const buttonText = this.querySelector("span").textContent;

      switch (buttonText) {
        case "Start Practice":
          // Redirect to practice page
          setTimeout(() => {
            window.location.href = "practice.html";
          }, 200);
          break;
        case "View Progress":
          // Redirect to progress page
          setTimeout(() => {
            window.location.href = "progress.html";
          }, 200);
          break;
        case "Settings":
          showSettingsModal();
          break;
        case "Help":
          showHelpModal();
          break;
      }
    });
  });
}

// Show settings modal
function showSettingsModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Settings</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="setting-item">
          <label>Daily Goal (minutes)</label>
          <input type="number" value="30" min="5" max="120">
        </div>
        <div class="setting-item">
          <label>Reminder Notifications</label>
          <input type="checkbox" checked>
        </div>
        <div class="setting-item">
          <label>Sound Effects</label>
          <input type="checkbox" checked>
        </div>
        <div class="setting-item">
          <label>Language</label>
          <select>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary modal-close">Cancel</button>
        <button class="btn btn-primary">Save Changes</button>
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
    max-width: 500px;
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
  const closeButtons = modal.querySelectorAll(".modal-close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.opacity = "0";
      modalContent.style.transform = "scale(0.9)";
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });
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

// Show help modal
function showHelpModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Help & Support</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="help-section">
          <h4>Getting Started</h4>
          <p>Welcome to SpeakUp! Start by setting your daily goal and choosing your first lesson.</p>
        </div>
        <div class="help-section">
          <h4>Practice Tips</h4>
          <ul>
            <li>Practice daily for best results</li>
            <li>Speak clearly and at a natural pace</li>
            <li>Review your progress regularly</li>
            <li>Don't be afraid to make mistakes</li>
          </ul>
        </div>
        <div class="help-section">
          <h4>Need More Help?</h4>
          <p>Contact our support team at <a href="mailto:support@speakup.com">support@speakup.com</a></p>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary modal-close">Got it!</button>
      </div>
    </div>
  `;

  // Add modal styles (same as settings modal)
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
    max-width: 500px;
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
  const closeButtons = modal.querySelectorAll(".modal-close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.opacity = "0";
      modalContent.style.transform = "scale(0.9)";
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });
  });
}

// Add hover effects for interactive elements
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to stat cards
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
    });
  });

  // Add hover effects to module items
  const moduleItems = document.querySelectorAll(".module-item");
  moduleItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(8px)";
      this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
      this.style.boxShadow = "none";
    });
  });
});

// Simulate real-time activity updates
function simulateActivityUpdate() {
  const activityList = document.querySelector(".activity-list");
  if (!activityList) return;

  const activities = [
    {
      icon: "fas fa-microphone",
      title: "Pronunciation Practice",
      score: "92%",
    },
    { icon: "fas fa-comments", title: "Conversation Practice", score: "85%" },
    { icon: "fas fa-book", title: "Grammar Lesson", score: "78%" },
    { icon: "fas fa-volume-up", title: "Listening Exercise", score: "88%" },
    { icon: "fas fa-pen", title: "Writing Practice", score: "75%" },
  ];

  const randomActivity =
    activities[Math.floor(Math.random() * activities.length)];

  const newActivity = document.createElement("div");
  newActivity.className = "activity-item";
  newActivity.innerHTML = `
    <div class="activity-icon">
      <i class="${randomActivity.icon}"></i>
    </div>
    <div class="activity-content">
      <h4>${randomActivity.title}</h4>
      <p>Just completed</p>
      <span class="activity-score">${randomActivity.score}</span>
    </div>
  `;

  // Add to top of list
  activityList.insertBefore(newActivity, activityList.firstChild);

  // Remove oldest if more than 3 items
  if (activityList.children.length > 3) {
    activityList.removeChild(activityList.lastChild);
  }

  // Add entrance animation
  newActivity.style.opacity = "0";
  newActivity.style.transform = "translateX(-20px)";
  setTimeout(() => {
    newActivity.style.transition = "all 0.3s ease";
    newActivity.style.opacity = "1";
    newActivity.style.transform = "translateX(0)";
  }, 10);
}

// Run activity simulation every 30 seconds (for demo purposes)
setInterval(simulateActivityUpdate, 30000);

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + P for practice
  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    e.preventDefault();
    window.location.href = "practice.html";
  }

  // Ctrl/Cmd + R for progress
  if ((e.ctrlKey || e.metaKey) && e.key === "r") {
    e.preventDefault();
    window.location.href = "progress.html";
  }

  // Escape to close modals
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal-overlay");
    if (modal) {
      modal.style.opacity = "0";
      const modalContent = modal.querySelector(".modal-content");
      modalContent.style.transform = "scale(0.9)";
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    }
  }
});

// Add loading states for better UX
function showLoadingState(element) {
  element.style.opacity = "0.6";
  element.style.pointerEvents = "none";

  const loader = document.createElement("div");
  loader.className = "loading-spinner";
  loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  loader.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: #6366f1;
  `;

  element.style.position = "relative";
  element.appendChild(loader);

  return loader;
}

function hideLoadingState(element, loader) {
  element.style.opacity = "1";
  element.style.pointerEvents = "auto";
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
}
