<?php
include '../../db_connect.php';
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: ../../index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Translator - SpeakUp</title>
  <link rel="stylesheet" href="../styles.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js"></script>

  <!-- ================= PURPLE THEME ================= -->
  <style>
    :root {
      --primary-color: #a78bfa;
      --primary-dark: #7c3aed;
      --bg-color: #f4f0ff;
      --light-bg: #ffffff;
      --text-color: #2b2b2b;
      --light-text: #8c8c8c;
      --white: #fff;
    }

    body {
      margin: 0;
      background: var(--bg-color);
      font-family: "Poppins", sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 100px; /* Added for navbar */
    }

    .container {
      max-width: 1200px;
      width: 100%;
      display: flex;
      gap: 20px;
    }

    .card {
      flex: 1;
      background: var(--light-bg);
      padding: 25px;
      border-radius: 20px;
      box-shadow: 0 5px 15px #00000010;
    }

    textarea {
      width: 100%;
      border: none;
      outline: none;
      resize: none;
      padding: 15px;
      margin-top: 10px;
      font-size: 16px;
      background: #f4f0ff;
      border-radius: 15px;
    }

    .dropdown-container {
      margin-top: 10px;
      background: #f1eaff;
      padding: 12px;
      border-radius: 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }

    .dropdown-menu {
      display: none;
      background: white;
      padding: 10px;
      max-height: 200px;
      overflow: auto;
      border-radius: 10px;
      margin-top: 5px;
      border: 2px solid var(--primary-color);
    }

    .dropdown-container.active .dropdown-menu {
      display: block;
    }

    .dropdown-menu li {
      list-style: none;
      padding: 8px;
      border-bottom: 1px solid #eee;
    }

    .dropdown-menu li:hover {
      background: var(--primary-color);
      color: white;
      border-radius: 5px;
    }

    #micBtn {
      margin-top: 15px;
      background: var(--primary-color);
      padding: 12px 20px;
      border: none;
      color: white;
      font-size: 15px;
      cursor: pointer;
      border-radius: 30px;
      display: flex;
      align-items: center;
      gap: 10px;
      width: fit-content;
      transition: 0.3s;
    }

    #micBtn.recording {
      background: var(--primary-dark);
      box-shadow: 0 0 15px var(--primary-color);
    }

    #download-btn {
      margin-top: 20px;
      padding: 12px 20px;
      border: none;
      background: var(--primary-dark);
      color: white;
      cursor: pointer;
      border-radius: 20px;
    }
  </style>
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
          <a href="../dashboard.php" class="nav-link">Dashboard</a>
        </li>
        <li class="nav-item">
          <a href="../practice.html" class="nav-link">Practice</a>
        </li>
        <li class="nav-item">
          <a href="../quiz.php" class="nav-link">Quiz</a>
        </li>
        <li class="nav-item">
          <a href="sample2.php" class="nav-link active">Translator</a>
        </li>
        <li class="nav-item">
          <a href="../progress.html" class="nav-link">Progress</a>
        </li>
        <li class="nav-item">
          <a href="../index.html#about" class="nav-link">About</a>
        </li>
        <li class="nav-item">
          <a href="../index.html#contact" class="nav-link">Contact</a>
        </li>
      </ul>
      <div class="nav-toggle" id="mobile-menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>

  <h1 style="color: var(--primary-dark);">SpeakUp Voice Translator</h1>

  <!-- Tabs -->
  <div style="display: flex; gap: 10px; margin-bottom: 20px;">
    <button id="tab-speech" class="active" style="padding: 10px 20px; border: none; background: var(--primary-dark); color: white; border-radius: 20px; cursor: pointer;">Speech/Text</button>
    <button id="tab-doc" style="padding: 10px 20px; border: none; background: #ddd; color: #333; border-radius: 20px; cursor: pointer;">Upload Document</button>
  </div>

  <div class="container">
    <!-- ========== INPUT BOX ========== -->
    <div class="card">
      <h3>From:</h3>

      <div class="dropdown-container" id="input-language">
        <span class="selected" data-value="auto">Auto Detect</span>
        <span>▼</span>
        <ul class="dropdown-menu"></ul>
      </div>

      <textarea id="input-text" rows="10" placeholder="Enter text or use speech..."></textarea>

      <button id="micBtn">🎤 Start Speaking</button>
      
      <!-- Document Input (Hidden by default) -->
      <div id="doc-input-area" style="display: none; margin-top: 15px;">
        <input type="file" id="file-upload" accept=".txt,.doc,.docx" style="padding: 10px; background: white; border-radius: 10px; width: 100%;">
        <div style="font-size: 12px; color: #666; margin-top: 5px;">Supports .txt files directly. .doc/.docx text extraction supported for basic content.</div>
      </div>
    </div>

    <!-- ========== OUTPUT BOX ========== -->
    <div class="card">
      <h3>To:</h3>

      <div class="dropdown-container" id="output-language">
        <span class="selected" data-value="en">English</span>
        <span>▼</span>
        <ul class="dropdown-menu"></ul>
      </div>

      <textarea id="output-text" rows="10" placeholder="Translation..." disabled></textarea>

      <button id="download-btn">⬇ Download Translation</button>
      <button id="save-btn" style="background: #28a745; margin-left: 10px; margin-top: 20px; padding: 12px 20px; border: none; color: white; border-radius: 20px; cursor: pointer;">💾 Save to History</button>
    </div>
  </div>

  <!-- ==========================================================
       ==============   JAVASCRIPT SECTION  ====================
       ========================================================== -->
  <script>
    /* -------------------- LANGUAGES ARRAY -------------------- */
    const languages = [ /* SAME ARRAY AS ORIGINAL (kept intact) */ 
      { no: "0", name: "Auto", native: "Detect", code: "auto" },
      { no: "1", name: "Afrikaans", native: "Afrikaans", code: "af" },
      { no: "3", name: "Arabic", native: "عربي", code: "ar" },
      { no: "16", name: "English", native: "English", code: "en" },
      { no: "27", name: "Hindi", native: "हिन्दी", code: "hi" },
      { no: "23", name: "German", native: "Deutsch", code: "de" },
      { no: "49", name: "Spanish", native: "Español", code: "es" },
      { no: "20", name: "French", native: "Français", code: "fr" },
      { no: "32", name: "Italian", native: "Italiano", code: "it" },
      { no: "33", name: "Japanese", native: "日本語", code: "ja" },
      { no: "34", name: "Korean", native: "한국어", code: "ko" }
    ];

    /* -------------------- POPULATE DROPDOWNS -------------------- */
    function loadDropdown(id) {
      const dropdown = document.querySelector(`#${id}`);
      const menu = dropdown.querySelector(".dropdown-menu");
      menu.innerHTML = "";

      languages.forEach(lang => {
        const li = document.createElement("li");
        li.textContent = `${lang.name} (${lang.native})`;
        li.dataset.value = lang.code;

        li.onclick = () => {
          dropdown.querySelector(".selected").innerText = li.innerText;
          dropdown.querySelector(".selected").dataset.value = lang.code;
          translate();
        };

        menu.appendChild(li);
      });
    }

    loadDropdown("input-language");
    loadDropdown("output-language");

    document.querySelectorAll(".dropdown-container").forEach(drop => {
      drop.onclick = () => drop.classList.toggle("active");
    });

    document.addEventListener("click", e => {
      document.querySelectorAll(".dropdown-container").forEach(d => {
        if (!d.contains(e.target)) d.classList.remove("active");
      });
    });

    /* -------------------- TRANSLATE FUNCTION -------------------- */
    function translate() {
      const text = document.getElementById("input-text").value.trim();
      if (!text) return;

      const sl = document.querySelector("#input-language .selected").dataset.value;
      const tl = document.querySelector("#output-language .selected").dataset.value;

      const output = document.getElementById("output-text");
      output.value = "Translating...";

      fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`)
        .then(res => res.json())
        .then(data => {
          output.value = data[0].map(val => val[0]).join("");
        })
        .catch(() => {
          output.value = "❌ Translation failed.";
        });
    }

    document.getElementById("input-text").addEventListener("input", translate);

    /* -------------------- GLOBAL DOM ELEMENTS -------------------- */
    const micBtn = document.getElementById("micBtn");
    const inputText = document.getElementById("input-text"); // Standardize on inputText
    const outputText = document.getElementById("output-text");
    const tabSpeech = document.getElementById("tab-speech");
    const tabDoc = document.getElementById("tab-doc");
    const docInputArea = document.getElementById("doc-input-area");
    // inputTextArea was used, but inputText is the same element. We will use inputText.

    /* -------------------- SPEECH TO TEXT -------------------- */
    let recognition;
    if ("webkitSpeechRecognition" in window) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        micBtn.classList.add("recording");
        micBtn.innerHTML = "🎙 Listening...";
      };

      recognition.onend = () => {
        micBtn.classList.remove("recording");
        micBtn.innerHTML = "🎤 Start Speaking";
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        inputText.value = spokenText;
        translate();
      };
    } else {
      micBtn.disabled = true;
      micBtn.innerHTML = "Speech not supported";
    }

    micBtn.onclick = () => {
      if (recognition) recognition.start();
    };

    /* -------------------- TAB LOGIC -------------------- */
    tabSpeech.onclick = () => {
      tabSpeech.style.background = "var(--primary-dark)";
      tabSpeech.style.color = "white";
      tabDoc.style.background = "#ddd";
      tabDoc.style.color = "#333";
      micBtn.style.display = "flex";
      docInputArea.style.display = "none";
      inputText.placeholder = "Enter text or use speech...";
    };

    tabDoc.onclick = () => {
      tabDoc.style.background = "var(--primary-dark)";
      tabDoc.style.color = "white";
      tabSpeech.style.background = "#ddd";
      tabSpeech.style.color = "#333";
      micBtn.style.display = "none";
      docInputArea.style.display = "block";
      inputText.placeholder = "Content from uploaded file will appear here...";
    };

    /* -------------------- FILE UPLOAD LOGIC -------------------- */
    document.getElementById('file-upload').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;

      if (file.name.endsWith('.docx')) {
           const reader = new FileReader();
           reader.onload = function(event) {
               const arrayBuffer = event.target.result;
               mammoth.extractRawText({arrayBuffer: arrayBuffer})
                   .then(function(result){
                       inputText.value = result.value; 
                       translate();
                   })
                   .catch(function(err){
                       console.error(err);
                       alert("Error reading .docx file.");
                   });
           };
           reader.readAsArrayBuffer(file);
      }
      else if(file.type.match('text.*') || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            inputText.value = e.target.result;
            translate();
        };
        reader.readAsText(file);
      } 
      else {
        alert("This file type is not supported. Please upload .txt or .docx files.");
      }
    });

    /* -------------------- SAVE TO HISTORY -------------------- */
    document.getElementById("save-btn").onclick = () => {
        const sourceText = document.getElementById("input-text").value;
        const translatedText = document.getElementById("output-text").value;
        const sl = document.querySelector("#input-language .selected").dataset.value;
        const tl = document.querySelector("#output-language .selected").dataset.value;

        if(!sourceText || !translatedText) {
            alert("Nothing to save!");
            return;
        }

        fetch('../save_translation.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                source_text: sourceText,
                translated_text: translatedText,
                source_lang: sl,
                target_lang: tl
            })
        })
        .then(r => r.json())
        .then(data => {
            if(data.success) alert("Saved to history!");
            else alert("Error saving: " + data.message);
        })
        .catch(e => alert("Error: " + e));
    };
  </script>
</body>

</html>
