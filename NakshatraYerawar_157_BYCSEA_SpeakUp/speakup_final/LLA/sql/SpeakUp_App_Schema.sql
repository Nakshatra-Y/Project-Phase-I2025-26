-- SQL Script for the Speak Up Language Learning App Database Schema
-- Dialect: PostgreSQL (easily adaptable to MySQL/SQL Server)

-- -------------------------------------------------------------------
-- TEMPORARY: Disable constraints during creation for smooth execution
-- -------------------------------------------------------------------
SET session_replication_role = 'replica';

-- -------------------------------------------------------------------
-- 1. Core Tables
-- -------------------------------------------------------------------

-- Table: Language
CREATE TABLE Language (
    language_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL -- e.g., 'en', 'es'
);

-- Table: User (Quoted because 'User' is a reserved keyword in some SQL dialects)
CREATE TABLE "User" (
    user_id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    native_language_id INT NOT NULL,
    target_language_id INT NOT NULL,
    xp_points INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    -- Foreign Keys to Language
    FOREIGN KEY (native_language_id) REFERENCES Language(language_id),
    FOREIGN KEY (target_language_id) REFERENCES Language(language_id)
);

-- Table: Course
CREATE TABLE Course (
    course_id INT PRIMARY KEY,
    language_id INT NOT NULL,
    level VARCHAR(10) NOT NULL, -- e.g., 'A1', 'B2'
    -- Foreign Key to Language
    FOREIGN KEY (language_id) REFERENCES Language(language_id)
);

-- Table: Unit
CREATE TABLE Unit (
    unit_id INT PRIMARY KEY,
    course_id INT NOT NULL,
    unit_number INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    -- Foreign Key to Course
    FOREIGN KEY (course_id) REFERENCES Course(course_id),
    -- Constraint: unit_number must be unique within a course
    UNIQUE (course_id, unit_number)
);

-- Table: Lesson
CREATE TABLE Lesson (
    lesson_id INT PRIMARY KEY,
    unit_id INT NOT NULL,
    lesson_number INT NOT NULL,
    lesson_type VARCHAR(50) NOT NULL, -- e.g., 'Vocabulary', 'Grammar'
    -- Foreign Key to Unit
    FOREIGN KEY (unit_id) REFERENCES Unit(unit_id),
    -- Constraint: lesson_number must be unique within a unit
    UNIQUE (unit_id, lesson_number)
);

-- -------------------------------------------------------------------
-- 2. Content & Multilingual Tables
-- -------------------------------------------------------------------

-- Table: Exercise
CREATE TABLE Exercise (
    exercise_id INT PRIMARY KEY,
    lesson_id INT NOT NULL,
    exercise_type VARCHAR(50) NOT NULL, -- e.g., 'MATCH', 'MCQ', 'LISTEN'
    correct_answer_text TEXT,
    -- Foreign Key to Lesson
    FOREIGN KEY (lesson_id) REFERENCES Lesson(lesson_id)
);

-- Table: Exercise_Translation (Stores prompts/audio for exercises)
CREATE TABLE Exercise_Translation (
    translation_id INT PRIMARY KEY,
    exercise_id INT NOT NULL,
    language_id INT NOT NULL,
    prompt_text TEXT NOT NULL,
    audio_url VARCHAR(255),
    -- Foreign Keys
    FOREIGN KEY (exercise_id) REFERENCES Exercise(exercise_id),
    FOREIGN KEY (language_id) REFERENCES Language(language_id),
    -- Constraint: One translation per exercise/language pair
    UNIQUE (exercise_id, language_id)
);

-- Table: Vocabulary (Core word entry)
CREATE TABLE Vocabulary (
    word_id INT PRIMARY KEY,
    lesson_id INT NOT NULL,
    -- Foreign Key to Lesson
    FOREIGN KEY (lesson_id) REFERENCES Lesson(lesson_id)
);

-- Table: Vocabulary_Translation (Stores word details in a specific language)
CREATE TABLE Vocabulary_Translation (
    translation_id INT PRIMARY KEY,
    word_id INT NOT NULL,
    language_id INT NOT NULL,
    translated_word VARCHAR(100) NOT NULL,
    pronunciation_guide VARCHAR(100),
    definition TEXT,
    -- Foreign Keys
    FOREIGN KEY (word_id) REFERENCES Vocabulary(word_id),
    FOREIGN KEY (language_id) REFERENCES Language(language_id),
    -- Constraint: One translation per word/language pair
    UNIQUE (word_id, language_id)
);

-- -------------------------------------------------------------------
-- 3. User Progress Tables
-- -------------------------------------------------------------------

-- Table: User_Progress (Tracks lesson completion)
CREATE TABLE User_Progress (
    progress_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completion_date TIMESTAMP WITHOUT TIME ZONE,
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES "User"(user_id),
    FOREIGN KEY (lesson_id) REFERENCES Lesson(lesson_id),
    -- Constraint: Only one progress entry per user/lesson
    UNIQUE (user_id, lesson_id)
);

-- Table: User_Exercise_Attempt (Detailed record of every submission)
CREATE TABLE User_Exercise_Attempt (
    attempt_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    exercise_id INT NOT NULL,
    user_input TEXT,
    is_correct BOOLEAN NOT NULL,
    score FLOAT NOT NULL, -- Score from 0.0 to 1.0 (or similar)
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES "User"(user_id),
    FOREIGN KEY (exercise_id) REFERENCES Exercise(exercise_id)
);

-- Table: Spaced_Repetition_Queue (Manages vocabulary review schedule)
CREATE TABLE Spaced_Repetition_Queue (
    srs_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    review_date DATE NOT NULL,
    interval_days INT NOT NULL,
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES "User"(user_id),
    FOREIGN KEY (word_id) REFERENCES Vocabulary(word_id),
    -- Constraint: Only one SRS entry per user/word
    UNIQUE (user_id, word_id)
);

-- -------------------------------------------------------------------
-- RE-ENABLE: Enable constraints
-- -------------------------------------------------------------------
SET session_replication_role = 'origin';