// Mobile Navigation Toggle
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .about-text, .about-image"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  }

  updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll(".stat h4");
        stats.forEach((stat) => {
          const target = parseInt(stat.textContent);
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Contact form handling
// Contact form notification check
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('status');

  if (status === 'success') {
    showNotification("Message sent successfully!", "success");
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (status === 'error') {
    showNotification("Failed to send message. Please try again.", "error");
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === "success"
      ? "#10b981"
      : type === "error"
        ? "#ef4444"
        : "#6366f1"
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

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;

  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Button hover effects
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Service card hover effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Portfolio item hover effects
document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 500);
  }
});

// Lazy loading for images (if any are added later)
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// Scroll to top functionality
function createScrollToTopButton() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
    `;

  document.body.appendChild(scrollBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.transform = "translateY(0)";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.transform = "translateY(100px)";
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.background = "#4f46e5";
    scrollBtn.style.transform = "translateY(-2px)";
  });

  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.background = "#6366f1";
    scrollBtn.style.transform = "translateY(0)";
  });
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", createScrollToTopButton);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Any scroll-based functionality can be added here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded successfully!");

  // Add any additional initialization code here
  // For example, loading animations, initial state setup, etc.
});

// Reviews Slider Logic
document.addEventListener("DOMContentLoaded", async () => {
  const reviewsContainer = document.getElementById("reviews-container");
  const sliderControls = document.getElementById("slider-controls");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dotsContainer = document.getElementById("slider-dots");

  // Only proceed if elements exist
  if (!reviewsContainer) return;

  try {
    const response = await fetch('api/fetch_reviews.php');
    const reviews = await response.json();

    // Clear loading message
    reviewsContainer.innerHTML = '';

    if (reviews.error || reviews.length === 0) {
      reviewsContainer.innerHTML = '<div style="text-align: center; color: white;">No reviews yet. Be the first to review!</div>';
      return;
    }

    // Create Track
    const track = document.createElement('div');
    track.className = 'testimonial-track';

    // Render Cards
    reviews.forEach(review => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';

      // Generate Stars
      let starsHtml = '';
      for (let i = 0; i < 5; i++) {
        if (i < review.rating) {
          starsHtml += '<i class="fas fa-star"></i>';
        } else {
          starsHtml += '<i class="far fa-star"></i>';
        }
      }

      // Image Path Fallback
      // If image path starts with uploads/, prepend nothing if relative, or fix path
      // Assuming image_path is stored as 'uploads/filename.jpg'
      const defaultImage = 'https://ui-avatars.com/api/?name=SU&background=6366f1&color=fff';
      const imagePath = review.image_path ? review.image_path : defaultImage;

      card.innerHTML = `
                <div class="quote-icon">
                    <i class="fas fa-quote-left"></i>
                </div>
                <p class="testimonial-text">
                    ${review.review_text}
                </p>
                <div class="testimonial-footer">
                    <div class="testimonial-info">
                        <h4>${review.user_name}</h4>
                        <span>${review.user_role || 'User'}</span>
                        <div class="stars">
                            ${starsHtml}
                        </div>
                    </div>
                    <div class="testimonial-img">
                        <img src="${imagePath}" alt="${review.user_name}" onerror="this.src='${defaultImage}'">
                    </div>
                </div>
            `;
      track.appendChild(card);
    });

    reviewsContainer.appendChild(track);

    // Show controls if we have enough cards to scroll
    const cardsPerView = getCardsPerView();
    if (reviews.length > cardsPerView) {
      sliderControls.style.display = 'flex';
    }

    // Slider State
    let currentIndex = 0;
    const totalCards = reviews.length;

    // Determine Cards Per View based on screen width
    function getCardsPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function updateSlider() {
      const cardsPerView = getCardsPerView();
      // Calculate width of one card + gap. 
      const cardElement = track.children[0];
      const cardWidth = cardElement.offsetWidth;
      const gap = 30; // matched from CSS

      const moveAmount = (cardWidth + gap) * currentIndex;
      track.style.transform = `translateX(-${moveAmount}px)`;

      // Update dots
      updateDots();
    }

    function updateDots() {
      dotsContainer.innerHTML = '';
      const cardsPerView = getCardsPerView();
      // Max index we can scroll to
      const maxIndex = Math.max(0, totalCards - cardsPerView);

      // Limit dots to a reasonable number if many reviews, but for now 1 per index
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateSlider();
        });
        dotsContainer.appendChild(dot);
      }
    }

    nextBtn.addEventListener('click', () => {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, totalCards - cardsPerView);

      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      } else {
        // Loop back to start
        currentIndex = 0;
        updateSlider();
      }
    });

    prevBtn.addEventListener('click', () => {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, totalCards - cardsPerView);

      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      } else {
        // Go to end
        currentIndex = maxIndex;
        updateSlider();
      }
    });

    window.addEventListener('resize', () => {
      // Re-evaluate controls visibility
      const cardsPerView = getCardsPerView();
      if (reviews.length > cardsPerView) {
        sliderControls.style.display = 'flex';
      } else {
        sliderControls.style.display = 'none';
        track.style.transform = 'translateX(0)';
        currentIndex = 0;
      }
      // Reset index on resize to prevent out of bounds if not needed
      // currentIndex = 0; // Optional, might be annoying
      updateSlider();
    });

    // Initialize
    updateSlider();

  } catch (error) {
    console.error("Error loading reviews:", error);
    reviewsContainer.innerHTML = '<div style="text-align: center; color: white;">Failed to load reviews.</div>';
  }
});

// Form Validation Logic for Contact and Review Forms
document.addEventListener("DOMContentLoaded", () => {
  // 1. Contact Form Validation
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const emailInput = this.querySelector('input[name="email"]');
      const messageInput = this.querySelector('textarea[name="message"]');

      let isValid = true;

      // Email Validation
      if (emailInput && !isValidEmail(emailInput.value)) {
        showNotification("Please enter a valid email address.", "error");
        isValid = false;
      }

      // Message Validation
      if (messageInput && messageInput.value.trim().length < 10) {
        showNotification("Message must be at least 10 characters long.", "error");
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
      }
    });
  }

  // 2. Review Form Validation
  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      const reviewText = document.getElementById("review_text");
      const userRole = document.getElementById("user_role");
      const ratingInputs = document.querySelectorAll('input[name="rating"]');

      let isValid = true;

      // Check if rating is selected
      let ratingSelected = false;
      ratingInputs.forEach(input => {
        if (input.checked) ratingSelected = true;
      });

      if (!ratingSelected) {
        showNotification("Please select a star rating.", "error");
        isValid = false;
      }

      // Review Text Length
      if (reviewText && reviewText.value.trim().length < 10) {
        showNotification("Review must be at least 10 characters long.", "error");
        isValid = false;
      }

      // Role Length (optional but good to check)
      if (userRole && userRole.value.trim().length < 2) {
        showNotification("Please enter a valid role/job title.", "error");
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
      }
    });
  }
});
