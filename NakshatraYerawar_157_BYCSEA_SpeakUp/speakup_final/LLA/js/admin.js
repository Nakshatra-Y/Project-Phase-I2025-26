// Admin Page JavaScript

// Global variables
let lessons = [];
let currentEditingLesson = null;
let currentDeletingLesson = null;
let exerciseCounter = 0;

// Sample lessons data
const sampleLessons = [
  {
    id: 1,
    title: "Introduction to Spanish Pronunciation",
    description:
      "Learn the basics of Spanish pronunciation with interactive exercises",
    level: "beginner",
    category: "pronunciation",
    group: "E",
    duration: 15,
    exercises: 5,
    author: "Sarah Johnson",
    status: "active",
    createdAt: "2024-01-15",
    exercisesList: [
      {
        id: 1,
        title: "Basic Vowels",
        text: "A, E, I, O, U",
        type: "pronunciation",
      },
      {
        id: 2,
        title: "Common Consonants",
        text: "B, C, D, F, G",
        type: "pronunciation",
      },
    ],
  },
  {
    id: 2,
    title: "Daily Conversation Practice",
    description: "Practice common phrases used in everyday conversations",
    level: "intermediate",
    category: "conversation",
    group: "A",
    duration: 20,
    exercises: 8,
    author: "Mike Chen",
    status: "active",
    createdAt: "2024-01-10",
    exercisesList: [
      {
        id: 1,
        title: "Greetings",
        text: "Hello, how are you?",
        type: "conversation",
      },
      {
        id: 2,
        title: "Introductions",
        text: "Nice to meet you",
        type: "conversation",
      },
    ],
  },
  {
    id: 3,
    title: "Advanced Grammar Structures",
    description: "Master complex grammatical patterns and sentence structures",
    level: "advanced",
    category: "grammar",
    group: "C",
    duration: 25,
    exercises: 12,
    author: "Emily Rodriguez",
    status: "draft",
    createdAt: "2024-01-08",
    exercisesList: [
      {
        id: 1,
        title: "Conditional Sentences",
        text: "If I had time, I would study more",
        type: "grammar",
      },
    ],
  },
];

// Initialize admin page
document.addEventListener("DOMContentLoaded", () => {
  initializeAdminPage();
});

function initializeAdminPage() {
  lessons = [...sampleLessons];
  setupEventListeners();
  renderLessons();
  initializeFilters();
}

// Setup event listeners
function setupEventListeners() {
  // Create lesson button
  const createBtn = document.getElementById("create-lesson-btn");
  if (createBtn) {
    createBtn.addEventListener("click", () => {
      openLessonModal();
    });
  }

  // Modal controls
  const modalClose = document.getElementById("modal-close");
  const cancelLesson = document.getElementById("cancel-lesson");
  const saveLesson = document.getElementById("save-lesson");
  const addExercise = document.getElementById("add-exercise");

  if (modalClose) {
    modalClose.addEventListener("click", closeLessonModal);
  }

  if (cancelLesson) {
    cancelLesson.addEventListener("click", closeLessonModal);
  }

  if (saveLesson) {
    saveLesson.addEventListener("click", saveLessonHandler);
  }

  if (addExercise) {
    addExercise.addEventListener("click", addExerciseItem);
  }

  // Delete modal controls
  const deleteModalClose = document.getElementById("delete-modal-close");
  const cancelDelete = document.getElementById("cancel-delete");
  const confirmDelete = document.getElementById("confirm-delete");

  if (deleteModalClose) {
    deleteModalClose.addEventListener("click", closeDeleteModal);
  }

  if (cancelDelete) {
    cancelDelete.addEventListener("click", closeDeleteModal);
  }

  if (confirmDelete) {
    confirmDelete.addEventListener("click", confirmDeleteLesson);
  }

  // Search functionality
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", filterLessons);
  }

  // Filter controls
  const groupFilter = document.getElementById("group-filter");
  const lessonsFilter = document.getElementById("lessons-filter");
  const levelFilter = document.getElementById("level-filter");

  if (groupFilter) {
    groupFilter.addEventListener("change", filterLessons);
  }

  if (lessonsFilter) {
    lessonsFilter.addEventListener("change", filterLessons);
  }

  if (levelFilter) {
    levelFilter.addEventListener("change", filterLessons);
  }

  // Close modals on overlay click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("lesson-modal")) {
      closeLessonModal();
    }
    if (e.target.classList.contains("delete-modal")) {
      closeDeleteModal();
    }
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLessonModal();
      closeDeleteModal();
    }
  });
}

// Initialize filters
function initializeFilters() {
  // Set default date values
  const fromDate = document.getElementById("from-date");
  const toDate = document.getElementById("to-date");

  if (fromDate && toDate) {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    fromDate.value = lastMonth.toISOString().split("T")[0];
    toDate.value = today.toISOString().split("T")[0];
  }
}

// Render lessons grid
function renderLessons() {
  const lessonsGrid = document.getElementById("lessons-grid");
  if (!lessonsGrid) return;

  if (lessons.length === 0) {
    lessonsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-book-open"></i>
        <h3>No lessons found</h3>
        <p>Create your first lesson to get started</p>
        <button class="btn btn-primary" onclick="openLessonModal()">
          <i class="fas fa-plus"></i>
          Create Lesson
        </button>
      </div>
    `;
    return;
  }

  lessonsGrid.innerHTML = lessons
    .map(
      (lesson) => `
    <div class="lesson-card" data-lesson-id="${lesson.id}">
      <div class="lesson-header">
        <div>
          <h3 class="lesson-title">${lesson.title}</h3>
          <p class="lesson-description">${lesson.description}</p>
        </div>
        <span class="lesson-level ${lesson.level}">${lesson.level}</span>
      </div>
      
      <div class="lesson-meta">
        <div class="lesson-info">
          <span><i class="fas fa-clock"></i> ${lesson.duration} min</span>
          <span><i class="fas fa-list"></i> ${lesson.exercises} exercises</span>
          <span><i class="fas fa-layer-group"></i> Group ${lesson.group}</span>
        </div>
        <div class="lesson-author">
          <i class="fas fa-user"></i>
          ${lesson.author}
        </div>
      </div>
      
      <div class="lesson-actions">
        <button class="action-btn preview tooltip" onclick="previewLesson(${lesson.id})" title="Preview">
          <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn edit tooltip" onclick="editLesson(${lesson.id})" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete tooltip" onclick="deleteLesson(${lesson.id})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");

  // Add animation to cards
  const cards = document.querySelectorAll(".lesson-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "all 0.3s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Filter lessons
function filterLessons() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const groupFilter = document.getElementById("group-filter").value;
  const lessonsFilter = document.getElementById("lessons-filter").value;
  const levelFilter = document.getElementById("level-filter").value;

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm) ||
      lesson.description.toLowerCase().includes(searchTerm) ||
      lesson.author.toLowerCase().includes(searchTerm);

    const matchesGroup = groupFilter === "all" || lesson.group === groupFilter;
    const matchesStatus =
      lessonsFilter === "all" || lesson.status === lessonsFilter;
    const matchesLevel = levelFilter === "all" || lesson.level === levelFilter;

    return matchesSearch && matchesGroup && matchesStatus && matchesLevel;
  });

  // Temporarily replace lessons array for rendering
  const originalLessons = lessons;
  lessons = filteredLessons;
  renderLessons();
  lessons = originalLessons;
}

// Open lesson modal
function openLessonModal(lessonId = null) {
  const modal = document.getElementById("lesson-modal");
  const modalTitle = document.getElementById("modal-title");
  const form = document.getElementById("lesson-form");

  if (lessonId) {
    currentEditingLesson = lessons.find((lesson) => lesson.id === lessonId);
    modalTitle.textContent = "Edit Lesson";
    populateLessonForm(currentEditingLesson);
  } else {
    currentEditingLesson = null;
    modalTitle.textContent = "Create New Lesson";
    form.reset();
    clearExercisesList();
  }

  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

// Close lesson modal
function closeLessonModal() {
  const modal = document.getElementById("lesson-modal");
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Populate lesson form
function populateLessonForm(lesson) {
  if (!lesson) return;

  document.getElementById("lesson-title").value = lesson.title;
  document.getElementById("lesson-level").value = lesson.level;
  document.getElementById("lesson-category").value = lesson.category;
  document.getElementById("lesson-group").value = lesson.group;
  document.getElementById("lesson-description").value = lesson.description;
  document.getElementById("lesson-duration").value = lesson.duration;
  document.getElementById("lesson-exercises").value = lesson.exercises;

  // Populate exercises
  clearExercisesList();
  if (lesson.exercisesList) {
    lesson.exercisesList.forEach((exercise) => {
      addExerciseItem(exercise);
    });
  }
}

// Clear exercises list
function clearExercisesList() {
  const exercisesList = document.getElementById("exercises-list");
  if (exercisesList) {
    exercisesList.innerHTML = "";
    exerciseCounter = 0;
  }
}

// Add exercise item
function addExerciseItem(exerciseData = null) {
  exerciseCounter++;
  const exercisesList = document.getElementById("exercises-list");

  const exerciseItem = document.createElement("div");
  exerciseItem.className = "exercise-item";
  exerciseItem.innerHTML = `
    <div class="exercise-item-header">
      <span class="exercise-number">Exercise ${exerciseCounter}</span>
      <button type="button" class="remove-exercise" onclick="removeExercise(this)">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="exercise-form-row">
      <div class="exercise-form-group">
        <label>Title</label>
        <input type="text" name="exercise-title" value="${
          exerciseData?.title || ""
        }" required>
      </div>
      <div class="exercise-form-group">
        <label>Type</label>
        <select name="exercise-type" required>
          <option value="pronunciation" ${
            exerciseData?.type === "pronunciation" ? "selected" : ""
          }>Pronunciation</option>
          <option value="conversation" ${
            exerciseData?.type === "conversation" ? "selected" : ""
          }>Conversation</option>
          <option value="grammar" ${
            exerciseData?.type === "grammar" ? "selected" : ""
          }>Grammar</option>
          <option value="vocabulary" ${
            exerciseData?.type === "vocabulary" ? "selected" : ""
          }>Vocabulary</option>
        </select>
      </div>
    </div>
    <div class="exercise-form-group">
      <label>Text/Phrase</label>
      <textarea name="exercise-text" rows="2" required>${
        exerciseData?.text || ""
      }</textarea>
    </div>
  `;

  exercisesList.appendChild(exerciseItem);
}

// Remove exercise item
function removeExercise(button) {
  const exerciseItem = button.closest(".exercise-item");
  exerciseItem.remove();

  // Renumber remaining exercises
  const remainingExercises = document.querySelectorAll(".exercise-item");
  remainingExercises.forEach((exercise, index) => {
    const numberSpan = exercise.querySelector(".exercise-number");
    if (numberSpan) {
      numberSpan.textContent = `Exercise ${index + 1}`;
    }
  });
}

// Save lesson handler
function saveLessonHandler(e) {
  e.preventDefault();

  const form = document.getElementById("lesson-form");
  const formData = new FormData(form);

  // Validate form
  if (!validateLessonForm()) {
    return;
  }

  // Collect exercise data
  const exercisesList = collectExerciseData();

  const lessonData = {
    title: formData.get("title"),
    level: formData.get("level"),
    category: formData.get("category"),
    group: formData.get("group"),
    description: formData.get("description"),
    duration: parseInt(formData.get("duration")),
    exercises: parseInt(formData.get("exercises")),
    exercisesList: exercisesList,
    author: "Current User", // In real app, get from auth
    status: "active",
    createdAt: new Date().toISOString().split("T")[0],
  };

  if (currentEditingLesson) {
    // Update existing lesson
    lessonData.id = currentEditingLesson.id;
    const index = lessons.findIndex(
      (lesson) => lesson.id === currentEditingLesson.id
    );
    lessons[index] = lessonData;
    showNotification("Lesson updated successfully!", "success");
  } else {
    // Create new lesson
    lessonData.id = Date.now(); // Simple ID generation
    lessons.unshift(lessonData);
    showNotification("Lesson created successfully!", "success");
  }

  closeLessonModal();
  renderLessons();
}

// Validate lesson form
function validateLessonForm() {
  const requiredFields = [
    "title",
    "level",
    "category",
    "group",
    "description",
    "duration",
    "exercises",
  ];
  let isValid = true;

  requiredFields.forEach((field) => {
    const input = document.getElementById(`lesson-${field}`);
    if (!input.value.trim()) {
      input.classList.add("error");
      isValid = false;
    } else {
      input.classList.remove("error");
    }
  });

  // Validate exercises
  const exercises = document.querySelectorAll(".exercise-item");
  if (exercises.length === 0) {
    showNotification("Please add at least one exercise", "error");
    isValid = false;
  }

  return isValid;
}

// Collect exercise data
function collectExerciseData() {
  const exercises = [];
  const exerciseItems = document.querySelectorAll(".exercise-item");

  exerciseItems.forEach((item, index) => {
    const title = item.querySelector('input[name="exercise-title"]').value;
    const type = item.querySelector('select[name="exercise-type"]').value;
    const text = item.querySelector('textarea[name="exercise-text"]').value;

    if (title && type && text) {
      exercises.push({
        id: index + 1,
        title: title,
        type: type,
        text: text,
      });
    }
  });

  return exercises;
}

// Preview lesson
function previewLesson(lessonId) {
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) return;

  const modal = document.createElement("div");
  modal.className = "preview-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${lesson.title}</h3>
        <button class="modal-close" onclick="this.closest('.preview-modal').remove()">&times;</button>
      </div>
      <div class="modal-body">
        <div class="lesson-preview">
          <div class="preview-info">
            <p><strong>Level:</strong> ${lesson.level}</p>
            <p><strong>Category:</strong> ${lesson.category}</p>
            <p><strong>Duration:</strong> ${lesson.duration} minutes</p>
            <p><strong>Exercises:</strong> ${lesson.exercises}</p>
            <p><strong>Author:</strong> ${lesson.author}</p>
          </div>
          <div class="preview-description">
            <h4>Description</h4>
            <p>${lesson.description}</p>
          </div>
          <div class="preview-exercises">
            <h4>Exercises</h4>
            <ul>
              ${lesson.exercisesList
                .map(
                  (exercise) => `
                <li>
                  <strong>${exercise.title}</strong> (${exercise.type})
                  <br><em>${exercise.text}</em>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

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
  `;

  document.body.appendChild(modal);
}

// Edit lesson
function editLesson(lessonId) {
  openLessonModal(lessonId);
}

// Delete lesson
function deleteLesson(lessonId) {
  currentDeletingLesson = lessonId;
  const modal = document.getElementById("delete-modal");
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

// Close delete modal
function closeDeleteModal() {
  const modal = document.getElementById("delete-modal");
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    currentDeletingLesson = null;
  }, 300);
}

// Confirm delete lesson
function confirmDeleteLesson() {
  if (!currentDeletingLesson) return;

  const index = lessons.findIndex(
    (lesson) => lesson.id === currentDeletingLesson
  );
  if (index !== -1) {
    lessons.splice(index, 1);
    showNotification("Lesson deleted successfully!", "success");
    renderLessons();
  }

  closeDeleteModal();
}

// Show notification
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

// Add hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to lesson cards
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".lesson-card")) {
      const card = e.target.closest(".lesson-card");
      card.style.transform = "translateY(-3px)";
      card.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".lesson-card")) {
      const card = e.target.closest(".lesson-card");
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.05)";
    }
  });
});

// Export functions for global access
window.openLessonModal = openLessonModal;
window.previewLesson = previewLesson;
window.editLesson = editLesson;
window.deleteLesson = deleteLesson;
window.removeExercise = removeExercise;
