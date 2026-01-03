<?php
include 'api/db_connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: ../index.php");
    exit();
}
$user_id = $_SESSION['user_id'];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Quiz - SpeakUp</title>
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  <style>
    :root{
      --accent:#8b5cf6;
      --accent-light:#a78bfa;
      --accent-dark:#7c3aed;
      --muted:#6b7280;
      --bg:#faf5ff;
      --card:#ffffff;
      --glass: rgba(255,255,255,0.6);
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }
    *{box-sizing: border-box}
    body{margin:0; background:linear-gradient(180deg,#f3e8ff 0%,var(--bg) 100%); color:#0f172a; padding:0;}
    .container{max-width:980px;margin:0 auto;padding:40px 20px}
    header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
    header h1{font-size:20px;margin:0;color:var(--accent-dark)}
    .card{background:var(--card);border-radius:12px;padding:18px;box-shadow:0 6px 18px rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.1)}

    .controls{display:flex;gap:12px;align-items:center;margin-bottom:12px;flex-wrap:wrap}
    select,input[type=number]{padding:8px;border-radius:8px;border:1px solid #e9d5ff;background:white}
    button{background:var(--accent);color:white;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;transition:all 0.2s}
    button:hover{background:var(--accent-dark);transform:translateY(-1px)}
    button.ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}
    button.ghost:hover{background:rgba(139,92,246,0.1)}

    .quiz-area{display:grid;grid-template-columns:1fr 320px;gap:16px;margin-top:12px}
    @media (max-width:880px){.quiz-area{grid-template-columns:1fr}}

    .question-block{padding:14px;border-radius:10px;background:linear-gradient(180deg,rgba(139,92,246,0.05),rgba(139,92,246,0.02));min-height:220px;border:1px solid rgba(139,92,246,0.1)}
    .question-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
    .question-text{font-size:18px;margin:8px 0 14px;color:#1e1b4b}
    .options{display:grid;gap:8px}
    /* FIX: ensure options are full-width and text is visible */
    .option{display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 16px;border-radius:8px;border:2px solid #e9d5ff;cursor:pointer;background:white;transition:all 0.15s;font-size:15px;color:#0f172a;text-align:left}
    .option:hover{border-color:var(--accent-light);box-shadow:0 2px 8px rgba(139,92,246,0.1);transform:translateY(-1px)}
    .option.selected{border-color:var(--accent);box-shadow:0 4px 12px rgba(139,92,246,0.2);background:rgba(139,92,246,0.05)}
    .option.correct{background:#ecfdf5;border-color:#34d399}
    .option.wrong{background:#fff1f2;border-color:#fb7185}

    .sidebar{min-height:220px;padding:14px;border-radius:10px;background:linear-gradient(180deg,rgba(124,58,237,0.03),rgba(124,58,237,0.01));border:1px solid rgba(139,92,246,0.1)}
    .progress{height:12px;background:#f3e8ff;border-radius:999px;overflow:hidden;margin-top:8px}
    .progress > i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent-dark));width:0%;transition:width 0.3s}
    .small{font-size:13px;color:var(--muted)}
    .actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
    .review{margin-top:12px}

    footer{margin-top:18px;color:var(--muted);font-size:13px}

    /* accessibility focus */
    .option:focus{outline:3px solid rgba(139,92,246,0.3)}
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
          <a href="dashboard.php" class="nav-link">Dashboard</a>
        </li>
        <li class="nav-item">
          <a href="practice.html" class="nav-link">Practice</a>
        </li>
        <li class="nav-item">
          <a href="quiz.php" class="nav-link active">Quiz</a>
        </li>
        <li class="nav-item">
          <a href="lessons/sample2.php" class="nav-link">Translator</a>
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
  <div class="container">
    <header>
      <h1>🎓 Language Quiz — Lessons & Practice</h1>
    </header>

    <div class="card">
      <div class="controls">
        <label class="small">Lesson:
          <select id="lessonSelect"></select>
        </label>

        <label class="small">Question count:
          <input type="number" id="countInput" min="5" max="20" value="10" style="width:74px" />
        </label>

        <label class="small">Target language:
          <select id="langSelect">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="ja">Japanese</option>
            <option value="de">German</option>
          </select>
        </label>

        <button id="startBtn">Start Quiz</button>
        <button id="reviewBtn" class="ghost">Review All</button>
        <button id="exportBtn" class="ghost">Export Results</button>
      </div>

      <div class="quiz-area">
        <section class="question-block" id="mainBlock">
          <div class="question-meta">
            <div class="small" id="metaText">Choose lesson and press Start</div>
            <div>
              <button id="speakBtn" class="ghost" title="Listen">🔊 Listen</button>
            </div>
          </div>

          <div id="questionArea">
            <div class="question-text" id="questionText">—</div>
            <div class="options" id="options"></div>
          </div>

          <div style="display:flex;justify-content:space-between;margin-top:14px">
            <div class="small" id="hintText"></div>
            <div>
              <button id="prevBtn" class="ghost">Prev</button>
              <button id="nextBtn">Next</button>
            </div>
          </div>
        </section>

        <aside class="sidebar">
          <div class="small"><strong>Progress</strong></div>
          <div class="small" id="progressInfo">0 / 0</div>
          <div class="progress"><i id="progressBar"></i></div>

          <div class="review">
            <div class="small"><strong>Score</strong></div>
            <div id="scoreText">—</div>
            <div class="small" style="margin-top:6px">Review answers to see corrections.</div>
          </div>

          <div class="actions">
            <button id="submitBtn">Submit Quiz</button>
            <button id="resetBtn" class="ghost">Reset</button>
          </div>
        </aside>
      </div>

      <div id="reviewPanel" style="display:none;margin-top:12px"></div>

    </div>

    <footer>
      💡 Tip: Use the <strong>Listen</strong> button to hear the phrase.
    </footer>
  </div>

  <script>
    // ---------- Sample data: lessons with phrases in five languages ----------
    const lessons = {
      "basic_greetings": {
        title: "Basic Greetings",
        items: [
          {id:1, prompt_en: "Hello", translations:{en:"Hello",hi:"नमस्ते",es:"Hola",ja:"こんにちは",de:"Hallo"}, hint:"Used for greeting"},
          {id:2, prompt_en: "Good morning", translations:{en:"Good morning",hi:"सुप्रभात",es:"Buenos días",ja:"おはようございます",de:"Guten Morgen"}, hint:"Morning greeting"},
          {id:3, prompt_en: "How are you?", translations:{en:"How are you?",hi:"आप कैसे हैं?",es:"¿Cómo estás?",ja:"お元気ですか",de:"Wie geht es dir?"}, hint:"Ask about well-being"},
          {id:4, prompt_en: "Thank you", translations:{en:"Thank you",hi:"धन्यवाद",es:"Gracias",ja:"ありがとうございます",de:"Danke"}, hint:"Express gratitude"},
          {id:5, prompt_en: "Good night", translations:{en:"Good night",hi:"शुभ रात्रि",es:"Buenas noches",ja:"おやすみなさい",de:"Gute Nacht"}, hint:"Before sleeping"},
          {id:6, prompt_en: "Nice to meet you", translations:{en:"Nice to meet you",hi:"आपसे मिलकर खुशी हुई",es:"Mucho gusto",ja:"はじめまして",de:"Schön, Sie kennenzulernen"}, hint:"When meeting someone"},
          {id:7, prompt_en: "See you soon", translations:{en:"See you soon",hi:"फिर मिलेंगे",es:"Hasta pronto",ja:"またね",de:"Bis bald"}, hint:"Parting phrase"},
          {id:8, prompt_en: "Goodbye", translations:{en:"Goodbye",hi:"अलविदा",es:"Adiós",ja:"さようなら",de:"Auf Wiedersehen"}, hint:"Farewell"},
          {id:9, prompt_en: "Please", translations:{en:"Please",hi:"कृपया",es:"Por favor",ja:"お願いします",de:"Bitte"}, hint:"Polite request"},
          {id:10, prompt_en: "Excuse me", translations:{en:"Excuse me",hi:"माफ कीजिए",es:"Perdón",ja:"すみません",de:"Entschuldigung"}, hint:"Get attention / apologize"}
        ]
      },
      "numbers":{
        title: "Numbers",
        items:[
          {id:11, prompt_en:"One", translations:{en:"One",hi:"एक",es:"Uno",ja:"いち",de:"Eins"}, hint:"1"},
          {id:12, prompt_en:"Two", translations:{en:"Two",hi:"दो",es:"Dos",ja:"に",de:"Zwei"}, hint:"2"},
          {id:13, prompt_en:"Three", translations:{en:"Three",hi:"तीन",es:"Tres",ja:"さん",de:"Drei"}, hint:"3"},
          {id:14, prompt_en:"Four", translations:{en:"Four",hi:"चार",es:"Cuatro",ja:"よん",de:"Vier"}, hint:"4"},
          {id:15, prompt_en:"Five", translations:{en:"Five",hi:"पाँच",es:"Cinco",ja:"ご",de:"Fünf"}, hint:"5"}
        ]
      },
      "food_drinks":{
        title:"Food & Drinks",
        items:[
          {id:21,prompt_en:"I am hungry", translations:{en:"I am hungry",hi:"मुझे भूख लगी है",es:"Tengo hambre",ja:"お腹すいた",de:"Ich habe Hunger"}, hint:"Say when hungry"},
          {id:22,prompt_en:"Water", translations:{en:"Water",hi:"पानी",es:"Agua",ja:"水",de:"Wasser"}, hint:"Drink"},
          {id:23,prompt_en:"Tea", translations:{en:"Tea",hi:"चाय",es:"Té",ja:"お茶",de:"Tee"}, hint:"Hot beverage"},
          {id:24,prompt_en:"This is delicious", translations:{en:"This is delicious",hi:"यह स्वादिष्ट है",es:"Esto está delicioso",ja:"おいしいです",de:"Das ist lecker"}, hint:"Compliment food"},
          {id:25,prompt_en:"Bill please", translations:{en:"Bill please",hi:"बिल दीजिए",es:"La cuenta por favor",ja:"お会計お願いします",de:"Die Rechnung bitte"}, hint:"Ask for bill"}
        ]
      },
      "travel_essentials":{
        title:"Travel Essentials",
        items:[
          {id:31,prompt_en:"Where is the hotel?", translations:{en:"Where is the hotel?",hi:"होटल कहाँ है?",es:"¿Dónde está el hotel?",ja:"ホテルはどこですか",de:"Wo ist das Hotel?"}, hint:"Ask location"},
          {id:32,prompt_en:"I need a taxi", translations:{en:"I need a taxi",hi:"मुझे टैक्सी चाहिए",es:"Necesito un taxi",ja:"タクシーが必要です",de:"Ich brauche ein Taxi"}, hint:"Request transport"},
          {id:33,prompt_en:"How much is this?", translations:{en:"How much is this?",hi:"यह कितना है?",es:"¿Cuánto cuesta?",ja:"これはいくらですか",de:"Wie viel kostet das?"}, hint:"Price question"},
          {id:34,prompt_en:"I am lost", translations:{en:"I am lost",hi:"मैं रास्ता भटक गया/गई",es:"Estoy perdido/a",ja:"道に迷いました",de:"Ich habe mich verlaufen"}, hint:"Need help"},
          {id:35,prompt_en:"Train station", translations:{en:"Train station",hi:"रेलवे स्टेशन",es:"Estación de tren",ja:"駅",de:"Bahnhof"}, hint:"Place"}
        ]
      },
      "common_phrases":{
        title:"Common Phrases",
        items:[
          {id:41,prompt_en:"Yes", translations:{en:"Yes",hi:"हाँ",es:"Sí",ja:"はい",de:"Ja"}, hint:"Affirmative"},
          {id:42,prompt_en:"No", translations:{en:"No",hi:"नहीं",es:"No",ja:"いいえ",de:"Nein"}, hint:"Negative"},
          {id:43,prompt_en:"Please", translations:{en:"Please",hi:"कृपया",es:"Por favor",ja:"お願いします",de:"Bitte"}, hint:"Polite"},
          {id:44,prompt_en:"I don't understand", translations:{en:"I don't understand",hi:"मैं नहीं समझा",es:"No entiendo",ja:"わかりません",de:"Ich verstehe nicht"}, hint:"Ask for clarity"},
          {id:45,prompt_en:"I need help", translations:{en:"I need help",hi:"मुझे मदद चाहिए",es:"Necesito ayuda",ja:"助けてください",de:"Ich brauche Hilfe"}, hint:"Ask assistance"}
        ]
      },
      "business_conversations":{
        title:"Business Conversations (combined)",
        items:[
          {id:51,prompt_en:"Nice to meet you. Thank you for joining today.", translations:{en:"Nice to meet you. Thank you for joining today.",hi:"आपसे मिलकर खुशी हुई। आज शामिल होने के लिए धन्यवाद।",es:"Mucho gusto. Gracias por asistir hoy.",ja:"はじめまして。本日ご参加いただきありがとうございます。",de:"Schön, Sie kennenzulernen. Danke, dass Sie heute dabei sind."}, hint:"Meeting intro"},
          {id:52,prompt_en:"Let's begin the meeting. Please share your ideas.", translations:{en:"Let's begin the meeting. Please share your ideas.",hi:"चलिए बैठक शुरू करते हैं। कृपया अपने विचार साझा करें।",es:"Empecemos la reunión. Por favor comparte tus ideas.",ja:"会議を始めましょう。ご意見をお聞かせください。",de:"Lassen Sie uns das Meeting beginnen. Bitte teilen Sie Ihre Ideen."}, hint:"Prompt discussion"},
          {id:53,prompt_en:"I understand your point, but we need more clarity.", translations:{en:"I understand your point, but we need more clarity.",hi:"मैं आपकी बात समझता/समझती हूँ, लेकिन हमें और स्पष्टता चाहिए।",es:"Entiendo tu punto, pero necesitamos más claridad.",ja:"ご意見は理解しましたが、もう少し明確さが必要です。",de:"Ich verstehe Ihren Punkt, aber wir brauchen mehr Klarheit."}, hint:"Polite disagreement"}
        ]
      }
    };

    // ---------- App State ----------
    let state = {
      currentLessonKey: null,
      questions: [],
      answers: [],
      index: 0,
      total: 0,
      lang: 'en',
      started: false,
      submitted: false
    };

    // ---------- Helpers ----------
    const $ = sel => document.querySelector(sel);
    const $all = sel => Array.from(document.querySelectorAll(sel));

    function getLessonKeys(){
      return Object.keys(lessons);
    }

    function populateLessonSelect(){
      const ls = getLessonKeys();
      const sel = $('#lessonSelect');
      sel.innerHTML = '';
      ls.forEach(k=>{
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = lessons[k].title;
        sel.appendChild(opt);
      });
    }

    function pickQuestions(lessonKey, count){
      const pool = lessons[lessonKey].items.slice();
      // shuffle
      for(let i=pool.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [pool[i],pool[j]]=[pool[j],pool[i]];
      }
      return pool.slice(0, Math.min(count,pool.length)).map(item => ({...item}));
    }

    function renderQuestion(){
      const q = state.questions[state.index];
      if(!q){
        $('#questionText').textContent = 'No question.';
        $('#options').innerHTML='';
        $('#metaText').textContent='';
        return;
      }
      $('#metaText').textContent = `${state.index+1} of ${state.total} — ${lessons[state.currentLessonKey].title}`;
      $('#questionText').textContent = q.prompt_en;
      $('#hintText').textContent = q.hint || '';

      // generate options: correct translation + 3 distractors
      const correct = q.translations[state.lang];
      const otherCandidates = collectDistractors(state.currentLessonKey, q.id, state.lang, 3);
      const opts = [correct,...otherCandidates];
      // shuffle
      for(let i=opts.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));[opts[i],opts[j]]=[opts[j],opts[i]];
      }

      const container = $('#options'); container.innerHTML='';
      opts.forEach((text,idx)=>{
        const btn = document.createElement('button');
        btn.className='option';
        btn.type = 'button'; // ensure no accidental form submit
        btn.setAttribute('data-val',text);
        btn.setAttribute('aria-pressed','false');
        // simpler markup so text always displays
        btn.innerHTML = `<span>${escapeHtml(text)}</span>`;
        btn.tabIndex = 0;
        btn.addEventListener('click', ()=> selectOption(btn));
        container.appendChild(btn);
      });

      // highlight previously selected
      const prev = state.answers[state.index];
      if(prev!=null){
        $all('.option').forEach(o=>{ if(o.dataset.val===prev) o.classList.add('selected') });
      }

      // if submitted, mark correct/wrong inline
      if(state.submitted){
        const correctText = q.translations[state.lang];
        $all('.option').forEach(o=>{
          if(o.dataset.val === correctText) o.classList.add('correct');
          else if(o.classList.contains('selected')) o.classList.add('wrong');
        });
      }

      updateProgress();
    }

    function collectDistractors(lessonKey, excludeId, lang, count){
      const pool = [];
      for(const k in lessons){
        lessons[k].items.forEach(it=>{
          if(it.id===excludeId) return;
          const t = it.translations[lang];
          if(t && !pool.includes(t)) pool.push(t);
        });
      }
      // shuffle and pick
      for(let i=pool.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];
      }
      return pool.slice(0,count);
    }

    function selectOption(btn){
      if(state.submitted) return; // no changes after submit
      $all('.option').forEach(o=>o.classList.remove('selected'));
      btn.classList.add('selected');
      state.answers[state.index] = btn.dataset.val;
      saveProgressToLocal();
      updateProgress();
    }

    function updateProgress(){
      $('#progressInfo').textContent = `${state.index+1} / ${state.total}`;
      const filled = state.answers.filter(a=>a!=null).length;
      $('#scoreText').textContent = `${filled} answered`;
      const pct = state.total ? Math.round((filled/state.total)*100) : 0;
      $('#progressBar').style.width = `${pct}%`;
    }

    function startQuiz(){
      const lessonKey = $('#lessonSelect').value || getLessonKeys()[0];
      let count = parseInt($('#countInput').value||10,10);
      if(Number.isNaN(count)) count = 10;
      count = Math.max(5, Math.min(20, count));
      const lang = $('#langSelect').value;
      state.currentLessonKey = lessonKey;
      state.lang = lang;
      state.questions = pickQuestions(lessonKey, count);
      state.total = state.questions.length;
      state.index = 0;
      state.answers = new Array(state.total).fill(null);
      state.started = true; state.submitted=false;
      renderQuestion();
      renderReviewPanel();
      saveProgressToLocal();
    }

    function prevQuestion(){ if(state.index>0){ state.index--; renderQuestion(); } }
    function nextQuestion(){ if(state.index<state.total-1){ state.index++; renderQuestion(); } }

    function submitQuiz(){
      if(!state.started) return alert('Start the quiz first.');
      state.submitted = true;
      // compute score
      const score = state.questions.reduce((sum,q,i)=> sum + (state.answers[i] === q.translations[state.lang] ? 1:0), 0);
      
      // Save to Database
      fetch('api/save_quiz_progress.php', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              lesson: state.currentLessonKey,
              language: state.lang,
              score: score,
              total: state.total
          })
      })
      .then(r => r.json())
      .then(data => {
          if(data.success) console.log('Progress saved');
          else console.error('Error saving:', data.message);
      })
      .catch(err => console.error('Fetch error:', err));

      // build review
      const reviewHtml = state.questions.map((q,i)=>{
        const correct = q.translations[state.lang];
        const selected = state.answers[i];
        const isCorrect = selected === correct;
        return `<div style="padding:8px;border-radius:8px;margin-bottom:8px;background:#fff;border:1px solid #e9d5ff"><div class="small"><strong>Q${i+1}:</strong> ${escapeHtml(q.prompt_en)}</div><div style="margin-top:6px">Your answer: <strong>${escapeHtml(selected||'—')}</strong> ${isCorrect?'<span style="color:green">✔</span>':'<span style="color:red">✖</span>'}</div><div style="margin-top:4px" class="small">Correct: <strong>${escapeHtml(correct)}</strong></div></div>`;
      }).join('');
      $('#reviewPanel').style.display = 'block';
      $('#reviewPanel').innerHTML = `<div class="card" style="padding:12px;margin-top:8px"><h3 style="color:var(--accent-dark)">📊 Review Results</h3>${reviewHtml}</div>`;
      // update score display and mark current question options
      $('#scoreText').textContent = `${score} / ${state.total}`;
      // re-render question so inline marking is applied
      renderQuestion();
      saveProgressToLocal();
      alert(`Quiz submitted — Score: ${score} / ${state.total}`);
    }

    function renderReviewPanel(){
      $('#reviewPanel').style.display = 'none';
      $('#reviewPanel').innerHTML = '';
    }

    function exportResults(){
      if(!state.started) return alert('Start and submit a quiz first.');
      const payload = {
        date: new Date().toISOString(),
        lesson: lessons[state.currentLessonKey].title,
        lang: state.lang,
        total: state.total,
        answers: state.answers,
        questions: state.questions.map(q=>({prompt:q.prompt_en,correct:q.translations[state.lang]}))
      };
      const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'quiz-results.json'; a.click(); URL.revokeObjectURL(url);
    }

    function resetProgress(){
      if(confirm('Reset saved progress?')){
        localStorage.removeItem('langQuizState');
        location.reload();
      }
    }

    // TTS
    function speakCurrent(){
      const q = state.questions[state.index];
      if(!q) return;
      const text = q.translations[state.lang] || q.prompt_en;
      if('speechSynthesis' in window){
        const ut = new SpeechSynthesisUtterance(text);
        const map = {en:'en-US',hi:'hi-IN',es:'es-ES',ja:'ja-JP',de:'de-DE'};
        ut.lang = map[state.lang] || 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(ut);
      } else alert('Speech Synthesis not supported in this browser');
    }

    function escapeHtml(s){ if(!s) return ''; return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

    // ---------- LocalStorage persist ----------
    function saveProgressToLocal(){
      const pack = {state:{currentLessonKey:state.currentLessonKey,answers:state.answers,index:state.index,total:state.total,lang:state.lang,started:state.started,submitted:state.submitted,questions:state.questions}};
      localStorage.setItem('langQuizState', JSON.stringify(pack));
    }
    function loadProgressFromLocal(){
      try{
        const raw = localStorage.getItem('langQuizState'); if(!raw) return false;
        const pack = JSON.parse(raw);
        if(pack && pack.state){
          state.currentLessonKey = pack.state.currentLessonKey;
          state.answers = pack.state.answers || [];
          state.index = pack.state.index || 0;
          state.total = pack.state.total || 0;
          state.lang = pack.state.lang || 'en';
          state.started = !!pack.state.started;
          state.submitted = !!pack.state.submitted;
          state.questions = pack.state.questions || [];
          return true;
        }
      }catch(e){console.warn(e)}
      return false;
    }

    // ---------- Event wiring ----------
    document.addEventListener('DOMContentLoaded', ()=>{
      populateLessonSelect();
      // restore if exists
      if(loadProgressFromLocal()){
        $('#lessonSelect').value = state.currentLessonKey || $('#lessonSelect option:first-child').value;
        $('#langSelect').value = state.lang;
        $('#countInput').value = state.total || 10;
        if(state.started){
          renderQuestion();
        }
      }

      $('#startBtn').addEventListener('click', startQuiz);
      $('#prevBtn').addEventListener('click', ()=>{ prevQuestion(); });
      $('#nextBtn').addEventListener('click', ()=>{ nextQuestion(); });
      $('#submitBtn').addEventListener('click', submitQuiz);
      $('#resetBtn').addEventListener('click', resetProgress);
      $('#speakBtn').addEventListener('click', speakCurrent);
      $('#exportBtn').addEventListener('click', exportResults);
      $('#reviewBtn').addEventListener('click', ()=>{
        const answeredCount = state.answers.filter(a=>a!=null).length;
        const list = (state.questions||[]).map((q,i)=>`<li>${escapeHtml(q.prompt_en)} — <strong>${escapeHtml(state.answers[i]||'—')}</strong></li>`).join('');
        $('#reviewPanel').style.display = 'block';
        $('#reviewPanel').innerHTML = `<div class="card" style="margin-top:12px;padding:12px;border:1px solid #e9d5ff"><h3 style="color:var(--accent-dark)">Current Answers (${answeredCount}/${state.total})</h3><ul>${list}</ul></div>`;
      });

      // keyboard navigation
      document.addEventListener('keydown', (e)=>{
        if(e.key==='ArrowRight') nextQuestion();
        if(e.key==='ArrowLeft') prevQuestion();
        if(e.key===' ') { e.preventDefault(); speakCurrent(); }
      });
    });
  </script>
</body>
</html>
