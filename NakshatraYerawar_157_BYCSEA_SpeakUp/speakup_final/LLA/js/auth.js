// Authentication Pages JavaScript

// Initialize authentication pages
document.addEventListener("DOMContentLoaded", () => {
  initializeAuth();
});

function initializeAuth() {
  setupPasswordToggles();
  setupPasswordStrength();
  setupFormValidation();
  setupSocialLogin();
  addAnimations();
}

// Password Toggle Functionality
function setupPasswordToggles() {
  const passwordToggles = document.querySelectorAll(".password-toggle");

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.parentElement.querySelector("input");
      const icon = toggle.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });
}

// Password Strength Indicator
function setupPasswordStrength() {
  const passwordInput = document.getElementById("password");
  const strengthFill = document.getElementById("strength-fill");
  const strengthText = document.getElementById("strength-text");

  if (!passwordInput || !strengthFill || !strengthText) return;

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);

    // Remove all strength classes
    strengthFill.classList.remove("weak", "fair", "good", "strong");

    // Add appropriate strength class
    if (strength.score > 0) {
      strengthFill.classList.add(strength.level);
    }

    strengthText.textContent = strength.text;
  });
}

function calculatePasswordStrength(password) {
  let score = 0;
  let feedback = [];

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("at least 8 characters");
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("lowercase letters");
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("uppercase letters");
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("numbers");
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("special characters");
  }

  // Determine strength level
  let level, text;
  if (score === 0) {
    level = "";
    text = "Enter a password";
  } else if (score <= 2) {
    level = "weak";
    text = "Weak password";
  } else if (score <= 3) {
    level = "fair";
    text = "Fair password";
  } else if (score <= 4) {
    level = "good";
    text = "Good password";
  } else {
    level = "strong";
    text = "Strong password";
  }

  return { score, level, text, feedback };
}

// Form Validation
function setupFormValidation() {
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");

  if (signinForm) {
    signinForm.addEventListener("submit", handleSignIn);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignUp);
    setupPasswordConfirmation();
  }
}

function setupPasswordConfirmation() {
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  if (!passwordInput || !confirmPasswordInput) return;

  confirmPasswordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordInput.setCustomValidity("Passwords do not match");
      confirmPasswordInput.style.borderColor = "#ef4444";
    } else {
      confirmPasswordInput.setCustomValidity("");
      confirmPasswordInput.style.borderColor = "#e5e7eb";
    }
  });
}

// Sign In Handler
function handleSignIn(e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Show loading state
  const submitBtn = e.target.querySelector("button[type='submit']");
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
  submitBtn.disabled = true;

  // Simulate API call / form processing
  setTimeout(() => {
    // Show success message
    showNotification("Welcome back! Redirecting to home page...", "success");

    // Redirect to home page (index.html)
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }, 1000);
}

// Sign Up Handler
function handleSignUp(e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Validate password match
  if (password !== confirmPassword) {
    showNotification("Passwords do not match", "error");
    return;
  }

  // Validate password strength
  const strength = calculatePasswordStrength(password);
  if (strength.score < 3) {
    showNotification("Please choose a stronger password", "error");
    return;
  }

  // Show loading state
  const submitBtn = e.target.querySelector("button[type='submit']");
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
  submitBtn.disabled = true;

  // Simulate API call / form processing
  setTimeout(() => {
    // Show success message
    showNotification(
      "Account created successfully! Welcome to SpeakUp!",
      "success"
    );

    // Redirect to home page (index.html)
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }, 1000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Social Login
function setupSocialLogin() {
  const googleBtn = document.querySelector(".btn-google");
  const facebookBtn = document.querySelector(".btn-facebook");

  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      showNotification("Google login coming soon!", "info");
    });
  }

  if (facebookBtn) {
    facebookBtn.addEventListener("click", () => {
      showNotification("Facebook login coming soon!", "info");
    });
  }
}

// Animations
function addAnimations() {
  const authCard = document.querySelector(".auth-card");
  const authSidebar = document.querySelector(".auth-sidebar");

  if (authCard) {
    authCard.classList.add("slide-in-left");
  }

  if (authSidebar) {
    authSidebar.classList.add("slide-in-right");
  }

  // Animate form elements on focus
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "scale(1.02)";
    });

    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "scale(1)";
    });
  });
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".auth-notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `auth-notification auth-notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  });
}

function getNotificationIcon(type) {
  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  };
  return icons[type] || "info-circle";
}

function getNotificationColor(type) {
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };
  return colors[type] || "#3b82f6";
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .notification-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
document.head.appendChild(style);
