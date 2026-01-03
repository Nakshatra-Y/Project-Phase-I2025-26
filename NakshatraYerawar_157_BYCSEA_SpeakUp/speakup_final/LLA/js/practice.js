// Practice Page JavaScript

// Global variables
let currentLesson = null;
let currentExercise = 0;
let exercises = [];
let startTime;
let totalScore = 0;
let isRecording = false;

// Comprehensive lessons data for English, Spanish, Japanese, and Hindi
const lessonsData = [
  // ENGLISH LESSONS
  {
    id: 1,
    title: "English Basics - Level 0",
    description: "Learn fundamental English greetings and basic phrases",
    level: "beginner",
    category: "conversation",
    language: "english",
    levelNumber: 0,
    icon: "fas fa-comments",
    progress: 0,
    exercises: 5,
    duration: "8 min",
  },
  {
    id: 2,
    title: "English Pronunciation - Level 1",
    description: "Master basic English sounds and pronunciation patterns",
    level: "beginner",
    category: "pronunciation",
    language: "english",
    levelNumber: 1,
    icon: "fas fa-volume-up",
    progress: 0,
    exercises: 6,
    duration: "10 min",
  },
  {
    id: 3,
    title: "English Vocabulary - Level 2",
    description: "Build essential English vocabulary for daily life",
    level: "beginner",
    category: "vocabulary",
    language: "english",
    levelNumber: 2,
    icon: "fas fa-book",
    progress: 0,
    exercises: 7,
    duration: "12 min",
  },
  {
    id: 4,
    title: "English Grammar - Level 3",
    description: "Learn intermediate English grammar structures",
    level: "intermediate",
    category: "grammar",
    language: "english",
    levelNumber: 3,
    icon: "fas fa-graduation-cap",
    progress: 0,
    exercises: 8,
    duration: "15 min",
  },
  {
    id: 5,
    title: "English Conversation - Level 4",
    description: "Practice advanced English conversation skills",
    level: "intermediate",
    category: "conversation",
    language: "english",
    levelNumber: 4,
    icon: "fas fa-users",
    progress: 0,
    exercises: 9,
    duration: "18 min",
  },
  {
    id: 6,
    title: "English Mastery - Level 5",
    description: "Advanced English for professional and academic use",
    level: "advanced",
    category: "conversation",
    language: "english",
    levelNumber: 5,
    icon: "fas fa-trophy",
    progress: 0,
    exercises: 10,
    duration: "20 min",
  },

  // SPANISH LESSONS
  {
    id: 7,
    title: "Español Básico - Nivel 0",
    description: "Aprende saludos básicos y frases fundamentales en español",
    level: "beginner",
    category: "conversation",
    language: "spanish",
    levelNumber: 0,
    icon: "fas fa-comments",
    progress: 0,
    exercises: 5,
    duration: "8 min",
  },
  {
    id: 8,
    title: "Pronunciación Española - Nivel 1",
    description: "Domina los sonidos básicos del español",
    level: "beginner",
    category: "pronunciation",
    language: "spanish",
    levelNumber: 1,
    icon: "fas fa-volume-up",
    progress: 0,
    exercises: 6,
    duration: "10 min",
  },
  {
    id: 9,
    title: "Vocabulario Español - Nivel 2",
    description: "Construye vocabulario esencial en español",
    level: "beginner",
    category: "vocabulary",
    language: "spanish",
    levelNumber: 2,
    icon: "fas fa-book",
    progress: 0,
    exercises: 7,
    duration: "12 min",
  },
  {
    id: 10,
    title: "Gramática Española - Nivel 3",
    description: "Aprende estructuras gramaticales intermedias del español",
    level: "intermediate",
    category: "grammar",
    language: "spanish",
    levelNumber: 3,
    icon: "fas fa-graduation-cap",
    progress: 0,
    exercises: 8,
    duration: "15 min",
  },
  {
    id: 11,
    title: "Conversación Española - Nivel 4",
    description: "Practica habilidades avanzadas de conversación en español",
    level: "intermediate",
    category: "conversation",
    language: "spanish",
    levelNumber: 4,
    icon: "fas fa-users",
    progress: 0,
    exercises: 9,
    duration: "18 min",
  },
  {
    id: 12,
    title: "Maestría Española - Nivel 5",
    description: "Español avanzado para uso profesional y académico",
    level: "advanced",
    category: "conversation",
    language: "spanish",
    levelNumber: 5,
    icon: "fas fa-trophy",
    progress: 0,
    exercises: 10,
    duration: "20 min",
  },

  // JAPANESE LESSONS
  {
    id: 13,
    title: "日本語の基礎 - レベル0",
    description: "基本的な日本語の挨拶とフレーズを学ぶ",
    level: "beginner",
    category: "conversation",
    language: "japanese",
    levelNumber: 0,
    icon: "fas fa-comments",
    progress: 0,
    exercises: 5,
    duration: "8 min",
  },
  {
    id: 14,
    title: "日本語の発音 - レベル1",
    description: "日本語の基本的な音と発音パターンをマスターする",
    level: "beginner",
    category: "pronunciation",
    language: "japanese",
    levelNumber: 1,
    icon: "fas fa-volume-up",
    progress: 0,
    exercises: 6,
    duration: "10 min",
  },
  {
    id: 15,
    title: "日本語の語彙 - レベル2",
    description: "日常生活に必要な日本語の語彙を構築する",
    level: "beginner",
    category: "vocabulary",
    language: "japanese",
    levelNumber: 2,
    icon: "fas fa-book",
    progress: 0,
    exercises: 7,
    duration: "12 min",
  },
  {
    id: 16,
    title: "日本語の文法 - レベル3",
    description: "中級の日本語文法構造を学ぶ",
    level: "intermediate",
    category: "grammar",
    language: "japanese",
    levelNumber: 3,
    icon: "fas fa-graduation-cap",
    progress: 0,
    exercises: 8,
    duration: "15 min",
  },
  {
    id: 17,
    title: "日本語の会話 - レベル4",
    description: "上級の日本語会話スキルを練習する",
    level: "intermediate",
    category: "conversation",
    language: "japanese",
    levelNumber: 4,
    icon: "fas fa-users",
    progress: 0,
    exercises: 9,
    duration: "18 min",
  },
  {
    id: 18,
    title: "日本語の習得 - レベル5",
    description: "プロフェッショナル・学術用の上級日本語",
    level: "advanced",
    category: "conversation",
    language: "japanese",
    levelNumber: 5,
    icon: "fas fa-trophy",
    progress: 0,
    exercises: 10,
    duration: "20 min",
  },

  // HINDI LESSONS
  {
    id: 19,
    title: "हिंदी की बुनियाद - स्तर 0",
    description: "हिंदी में बुनियादी अभिवादन और वाक्यांश सीखें",
    level: "beginner",
    category: "conversation",
    language: "hindi",
    levelNumber: 0,
    icon: "fas fa-comments",
    progress: 0,
    exercises: 5,
    duration: "8 min",
  },
  {
    id: 20,
    title: "हिंदी उच्चारण - स्तर 1",
    description:
      "हिंदी के बुनियादी ध्वनियों और उच्चारण पैटर्न में महारत हासिल करें",
    level: "beginner",
    category: "pronunciation",
    language: "hindi",
    levelNumber: 1,
    icon: "fas fa-volume-up",
    progress: 0,
    exercises: 6,
    duration: "10 min",
  },
  {
    id: 21,
    title: "हिंदी शब्दावली - स्तर 2",
    description: "दैनिक जीवन के लिए आवश्यक हिंदी शब्दावली का निर्माण करें",
    level: "beginner",
    category: "vocabulary",
    language: "hindi",
    levelNumber: 2,
    icon: "fas fa-book",
    progress: 0,
    exercises: 7,
    duration: "12 min",
  },
  {
    id: 22,
    title: "हिंदी व्याकरण - स्तर 3",
    description: "हिंदी के मध्यवर्ती व्याकरणिक संरचनाओं को सीखें",
    level: "intermediate",
    category: "grammar",
    language: "hindi",
    levelNumber: 3,
    icon: "fas fa-graduation-cap",
    progress: 0,
    exercises: 8,
    duration: "15 min",
  },
  {
    id: 23,
    title: "हिंदी बातचीत - स्तर 4",
    description: "हिंदी में उन्नत बातचीत कौशल का अभ्यास करें",
    level: "intermediate",
    category: "conversation",
    language: "hindi",
    levelNumber: 4,
    icon: "fas fa-users",
    progress: 0,
    exercises: 9,
    duration: "18 min",
  },
  {
    id: 24,
    title: "हिंदी में निपुणता - स्तर 5",
    description: "पेशेवर और शैक्षणिक उपयोग के लिए उन्नत हिंदी",
    level: "advanced",
    category: "conversation",
    language: "hindi",
    levelNumber: 5,
    icon: "fas fa-trophy",
    progress: 0,
    exercises: 10,
    duration: "20 min",
  },
];

// Comprehensive exercises data for all languages and levels
const exercisesData = {
  // ENGLISH EXERCISES
  1: [
    // English Basics - Level 0
    {
      id: 1,
      title: "Greetings",
      text: "Hello, how are you?",
      type: "listen_repeat",
    },
    {
      id: 2,
      title: "Basic Phrases",
      text: "Thank you very much.",
      type: "listen_repeat",
    },
    {
      id: 3,
      title: "Introductions",
      text: "My name is John.",
      type: "listen_repeat",
    },
    {
      id: 4,
      title: "Polite Expressions",
      text: "Excuse me, please.",
      type: "listen_repeat",
    },
    {
      id: 5,
      title: "Farewells",
      text: "Goodbye, see you later.",
      type: "listen_repeat",
    },
  ],
  2: [
    // English Pronunciation - Level 1
    {
      id: 1,
      title: "Th Sound",
      text: "The weather is nice today.",
      type: "pronunciation",
    },
    {
      id: 2,
      title: "R Sound",
      text: "The red car is running.",
      type: "pronunciation",
    },
    {
      id: 3,
      title: "L Sound",
      text: "I love learning languages.",
      type: "pronunciation",
    },
    {
      id: 4,
      title: "V Sound",
      text: "Very good, you're improving.",
      type: "pronunciation",
    },
    {
      id: 5,
      title: "W Sound",
      text: "What would you like to do?",
      type: "pronunciation",
    },
    {
      id: 6,
      title: "S Sound",
      text: "She sells seashells by the seashore.",
      type: "pronunciation",
    },
  ],
  3: [
    // English Vocabulary - Level 2
    {
      id: 1,
      title: "Family",
      text: "My family is very important to me.",
      type: "vocabulary",
    },
    {
      id: 2,
      title: "Food",
      text: "I like to eat healthy food.",
      type: "vocabulary",
    },
    {
      id: 3,
      title: "Colors",
      text: "The blue sky is beautiful.",
      type: "vocabulary",
    },
    {
      id: 4,
      title: "Numbers",
      text: "I have five books on my desk.",
      type: "vocabulary",
    },
    {
      id: 5,
      title: "Time",
      text: "It's three o'clock in the afternoon.",
      type: "vocabulary",
    },
    {
      id: 6,
      title: "Weather",
      text: "It's sunny and warm today.",
      type: "vocabulary",
    },
    {
      id: 7,
      title: "Animals",
      text: "The cat is sleeping on the chair.",
      type: "vocabulary",
    },
  ],
  4: [
    // English Grammar - Level 3
    {
      id: 1,
      title: "Present Tense",
      text: "I work at a company downtown.",
      type: "grammar",
    },
    {
      id: 2,
      title: "Past Tense",
      text: "Yesterday, I visited my grandmother.",
      type: "grammar",
    },
    {
      id: 3,
      title: "Future Tense",
      text: "Tomorrow, I will go to the library.",
      type: "grammar",
    },
    { id: 4, title: "Questions", text: "Where do you live?", type: "grammar" },
    {
      id: 5,
      title: "Negatives",
      text: "I don't like coffee very much.",
      type: "grammar",
    },
    {
      id: 6,
      title: "Comparatives",
      text: "This book is more interesting than that one.",
      type: "grammar",
    },
    {
      id: 7,
      title: "Conditionals",
      text: "If it rains, I will stay home.",
      type: "grammar",
    },
    {
      id: 8,
      title: "Prepositions",
      text: "The book is on the table.",
      type: "grammar",
    },
  ],
  5: [
    // English Conversation - Level 4
    {
      id: 1,
      title: "Making Plans",
      text: "Would you like to go to the movies tonight?",
      type: "conversation",
    },
    {
      id: 2,
      title: "Giving Opinions",
      text: "In my opinion, this is a great idea.",
      type: "conversation",
    },
    {
      id: 3,
      title: "Describing Experiences",
      text: "Last summer, I traveled to Europe.",
      type: "conversation",
    },
    {
      id: 4,
      title: "Expressing Preferences",
      text: "I prefer tea over coffee.",
      type: "conversation",
    },
    {
      id: 5,
      title: "Making Suggestions",
      text: "Why don't we try a different approach?",
      type: "conversation",
    },
    {
      id: 6,
      title: "Agreeing/Disagreeing",
      text: "I completely agree with your point.",
      type: "conversation",
    },
    {
      id: 7,
      title: "Asking for Clarification",
      text: "Could you please explain that again?",
      type: "conversation",
    },
    {
      id: 8,
      title: "Expressing Concerns",
      text: "I'm worried about the deadline.",
      type: "conversation",
    },
    {
      id: 9,
      title: "Giving Advice",
      text: "I think you should consider all options.",
      type: "conversation",
    },
  ],
  6: [
    // English Mastery - Level 5
    {
      id: 1,
      title: "Business Communication",
      text: "We need to discuss the quarterly results.",
      type: "business",
    },
    {
      id: 2,
      title: "Academic Writing",
      text: "The research demonstrates significant findings.",
      type: "academic",
    },
    {
      id: 3,
      title: "Formal Presentations",
      text: "Let me present the key findings of our study.",
      type: "presentation",
    },
    {
      id: 4,
      title: "Negotiation Skills",
      text: "I believe we can reach a mutually beneficial agreement.",
      type: "negotiation",
    },
    {
      id: 5,
      title: "Critical Analysis",
      text: "The evidence suggests a correlation between variables.",
      type: "analysis",
    },
    {
      id: 6,
      title: "Professional Networking",
      text: "I'd like to connect with you on LinkedIn.",
      type: "networking",
    },
    {
      id: 7,
      title: "Leadership Communication",
      text: "Our team needs to focus on strategic objectives.",
      type: "leadership",
    },
    {
      id: 8,
      title: "Technical Discussion",
      text: "The implementation requires careful consideration.",
      type: "technical",
    },
    {
      id: 9,
      title: "Cross-cultural Communication",
      text: "I appreciate your cultural perspective on this matter.",
      type: "cultural",
    },
    {
      id: 10,
      title: "Innovation and Creativity",
      text: "We should explore innovative solutions to this challenge.",
      type: "innovation",
    },
  ],

  // SPANISH EXERCISES
  7: [
    // Español Básico - Nivel 0
    {
      id: 1,
      title: "Saludos",
      text: "Hola, ¿cómo estás?",
      type: "listen_repeat",
    },
    {
      id: 2,
      title: "Frases Básicas",
      text: "Muchas gracias.",
      type: "listen_repeat",
    },
    {
      id: 3,
      title: "Presentaciones",
      text: "Mi nombre es María.",
      type: "listen_repeat",
    },
    {
      id: 4,
      title: "Expresiones de Cortesía",
      text: "Disculpe, por favor.",
      type: "listen_repeat",
    },
    {
      id: 5,
      title: "Despedidas",
      text: "Adiós, hasta luego.",
      type: "listen_repeat",
    },
  ],
  8: [
    // Pronunciación Española - Nivel 1
    {
      id: 1,
      title: "Sonido RR",
      text: "El perro corre en el parque.",
      type: "pronunciation",
    },
    {
      id: 2,
      title: "Sonido Ñ",
      text: "El niño juega en el jardín.",
      type: "pronunciation",
    },
    {
      id: 3,
      title: "Sonido J",
      text: "Juan come jamón en el jardín.",
      type: "pronunciation",
    },
    {
      id: 4,
      title: "Sonido LL",
      text: "La llave está en la mesa.",
      type: "pronunciation",
    },
    {
      id: 5,
      title: "Sonido CH",
      text: "El chico come chocolate.",
      type: "pronunciation",
    },
    {
      id: 6,
      title: "Sonido Z",
      text: "La zanahoria es naranja.",
      type: "pronunciation",
    },
  ],
  9: [
    // Vocabulario Español - Nivel 2
    {
      id: 1,
      title: "Familia",
      text: "Mi familia es muy importante para mí.",
      type: "vocabulary",
    },
    {
      id: 2,
      title: "Comida",
      text: "Me gusta comer comida saludable.",
      type: "vocabulary",
    },
    {
      id: 3,
      title: "Colores",
      text: "El cielo azul es hermoso.",
      type: "vocabulary",
    },
    {
      id: 4,
      title: "Números",
      text: "Tengo cinco libros en mi escritorio.",
      type: "vocabulary",
    },
    {
      id: 5,
      title: "Tiempo",
      text: "Son las tres de la tarde.",
      type: "vocabulary",
    },
    {
      id: 6,
      title: "Clima",
      text: "Hoy está soleado y cálido.",
      type: "vocabulary",
    },
    {
      id: 7,
      title: "Animales",
      text: "El gato está durmiendo en la silla.",
      type: "vocabulary",
    },
  ],
  10: [
    // Gramática Española - Nivel 3
    {
      id: 1,
      title: "Presente",
      text: "Yo trabajo en una empresa del centro.",
      type: "grammar",
    },
    {
      id: 2,
      title: "Pasado",
      text: "Ayer visité a mi abuela.",
      type: "grammar",
    },
    {
      id: 3,
      title: "Futuro",
      text: "Mañana iré a la biblioteca.",
      type: "grammar",
    },
    { id: 4, title: "Preguntas", text: "¿Dónde vives?", type: "grammar" },
    {
      id: 5,
      title: "Negativos",
      text: "No me gusta mucho el café.",
      type: "grammar",
    },
    {
      id: 6,
      title: "Comparativos",
      text: "Este libro es más interesante que ese.",
      type: "grammar",
    },
    {
      id: 7,
      title: "Condicionales",
      text: "Si llueve, me quedaré en casa.",
      type: "grammar",
    },
    {
      id: 8,
      title: "Preposiciones",
      text: "El libro está sobre la mesa.",
      type: "grammar",
    },
  ],
  11: [
    // Conversación Española - Nivel 4
    {
      id: 1,
      title: "Hacer Planes",
      text: "¿Te gustaría ir al cine esta noche?",
      type: "conversation",
    },
    {
      id: 2,
      title: "Dar Opiniones",
      text: "En mi opinión, esta es una gran idea.",
      type: "conversation",
    },
    {
      id: 3,
      title: "Describir Experiencias",
      text: "El verano pasado viajé a Europa.",
      type: "conversation",
    },
    {
      id: 4,
      title: "Expresar Preferencias",
      text: "Prefiero el té al café.",
      type: "conversation",
    },
    {
      id: 5,
      title: "Hacer Sugerencias",
      text: "¿Por qué no probamos un enfoque diferente?",
      type: "conversation",
    },
    {
      id: 6,
      title: "Estar de Acuerdo",
      text: "Estoy completamente de acuerdo contigo.",
      type: "conversation",
    },
    {
      id: 7,
      title: "Pedir Aclaraciones",
      text: "¿Podrías explicar eso de nuevo?",
      type: "conversation",
    },
    {
      id: 8,
      title: "Expresar Preocupaciones",
      text: "Estoy preocupado por la fecha límite.",
      type: "conversation",
    },
    {
      id: 9,
      title: "Dar Consejos",
      text: "Creo que deberías considerar todas las opciones.",
      type: "conversation",
    },
  ],
  12: [
    // Maestría Española - Nivel 5
    {
      id: 1,
      title: "Comunicación Empresarial",
      text: "Necesitamos discutir los resultados trimestrales.",
      type: "business",
    },
    {
      id: 2,
      title: "Escritura Académica",
      text: "La investigación demuestra hallazgos significativos.",
      type: "academic",
    },
    {
      id: 3,
      title: "Presentaciones Formales",
      text: "Permíteme presentar los hallazgos clave de nuestro estudio.",
      type: "presentation",
    },
    {
      id: 4,
      title: "Habilidades de Negociación",
      text: "Creo que podemos llegar a un acuerdo mutuamente beneficioso.",
      type: "negotiation",
    },
    {
      id: 5,
      title: "Análisis Crítico",
      text: "La evidencia sugiere una correlación entre variables.",
      type: "analysis",
    },
    {
      id: 6,
      title: "Networking Profesional",
      text: "Me gustaría conectarme contigo en LinkedIn.",
      type: "networking",
    },
    {
      id: 7,
      title: "Comunicación de Liderazgo",
      text: "Nuestro equipo necesita enfocarse en objetivos estratégicos.",
      type: "leadership",
    },
    {
      id: 8,
      title: "Discusión Técnica",
      text: "La implementación requiere consideración cuidadosa.",
      type: "technical",
    },
    {
      id: 9,
      title: "Comunicación Intercultural",
      text: "Aprecio tu perspectiva cultural sobre este asunto.",
      type: "cultural",
    },
    {
      id: 10,
      title: "Innovación y Creatividad",
      text: "Deberíamos explorar soluciones innovadoras a este desafío.",
      type: "innovation",
    },
  ],

  // JAPANESE EXERCISES
  13: [
    // 日本語の基礎 - レベル0
    {
      id: 1,
      title: "挨拶",
      text: "こんにちは、元気ですか？",
      type: "listen_repeat",
    },
    {
      id: 2,
      title: "基本的なフレーズ",
      text: "ありがとうございます。",
      type: "listen_repeat",
    },
    {
      id: 3,
      title: "自己紹介",
      text: "私の名前は田中です。",
      type: "listen_repeat",
    },
    {
      id: 4,
      title: "丁寧な表現",
      text: "すみません、お願いします。",
      type: "listen_repeat",
    },
    {
      id: 5,
      title: "別れの挨拶",
      text: "さようなら、また後で。",
      type: "listen_repeat",
    },
  ],
  14: [
    // 日本語の発音 - レベル1
    { id: 1, title: "ら行", text: "らりるれろ", type: "pronunciation" },
    { id: 2, title: "が行", text: "がぎぐげご", type: "pronunciation" },
    { id: 3, title: "ざ行", text: "ざじずぜぞ", type: "pronunciation" },
    { id: 4, title: "だ行", text: "だぢづでど", type: "pronunciation" },
    { id: 5, title: "ば行", text: "ばびぶべぼ", type: "pronunciation" },
    { id: 6, title: "ぱ行", text: "ぱぴぷぺぽ", type: "pronunciation" },
  ],
  15: [
    // 日本語の語彙 - レベル2
    {
      id: 1,
      title: "家族",
      text: "私の家族はとても大切です。",
      type: "vocabulary",
    },
    {
      id: 2,
      title: "食べ物",
      text: "健康的な食べ物を食べるのが好きです。",
      type: "vocabulary",
    },
    { id: 3, title: "色", text: "青い空は美しいです。", type: "vocabulary" },
    {
      id: 4,
      title: "数字",
      text: "机の上に五冊の本があります。",
      type: "vocabulary",
    },
    { id: 5, title: "時間", text: "午後三時です。", type: "vocabulary" },
    {
      id: 6,
      title: "天気",
      text: "今日は晴れて暖かいです。",
      type: "vocabulary",
    },
    {
      id: 7,
      title: "動物",
      text: "猫が椅子で寝ています。",
      type: "vocabulary",
    },
  ],
  16: [
    // 日本語の文法 - レベル3
    {
      id: 1,
      title: "現在形",
      text: "私は都心の会社で働いています。",
      type: "grammar",
    },
    {
      id: 2,
      title: "過去形",
      text: "昨日、祖母を訪ねました。",
      type: "grammar",
    },
    {
      id: 3,
      title: "未来形",
      text: "明日、図書館に行きます。",
      type: "grammar",
    },
    { id: 4, title: "疑問文", text: "どこに住んでいますか？", type: "grammar" },
    {
      id: 5,
      title: "否定文",
      text: "コーヒーはあまり好きではありません。",
      type: "grammar",
    },
    {
      id: 6,
      title: "比較",
      text: "この本はあの本より面白いです。",
      type: "grammar",
    },
    {
      id: 7,
      title: "条件文",
      text: "雨が降ったら、家にいます。",
      type: "grammar",
    },
    { id: 8, title: "助詞", text: "本は机の上にあります。", type: "grammar" },
  ],
  17: [
    // 日本語の会話 - レベル4
    {
      id: 1,
      title: "計画を立てる",
      text: "今夜映画を見に行きませんか？",
      type: "conversation",
    },
    {
      id: 2,
      title: "意見を述べる",
      text: "私の意見では、これは素晴らしいアイデアです。",
      type: "conversation",
    },
    {
      id: 3,
      title: "経験を説明する",
      text: "去年の夏、ヨーロッパを旅行しました。",
      type: "conversation",
    },
    {
      id: 4,
      title: "好みを表現する",
      text: "コーヒーよりお茶の方が好きです。",
      type: "conversation",
    },
    {
      id: 5,
      title: "提案する",
      text: "別のアプローチを試してみませんか？",
      type: "conversation",
    },
    {
      id: 6,
      title: "同意する",
      text: "あなたの意見に完全に同意します。",
      type: "conversation",
    },
    {
      id: 7,
      title: "説明を求める",
      text: "もう一度説明していただけますか？",
      type: "conversation",
    },
    {
      id: 8,
      title: "心配を表現する",
      text: "締切について心配しています。",
      type: "conversation",
    },
    {
      id: 9,
      title: "アドバイスを与える",
      text: "すべての選択肢を検討すべきだと思います。",
      type: "conversation",
    },
  ],
  18: [
    // 日本語の習得 - レベル5
    {
      id: 1,
      title: "ビジネスコミュニケーション",
      text: "四半期の結果について議論する必要があります。",
      type: "business",
    },
    {
      id: 2,
      title: "学術的文章",
      text: "研究は重要な発見を示しています。",
      type: "academic",
    },
    {
      id: 3,
      title: "正式なプレゼンテーション",
      text: "私たちの研究の主要な発見を発表させてください。",
      type: "presentation",
    },
    {
      id: 4,
      title: "交渉スキル",
      text: "相互に有益な合意に達することができると思います。",
      type: "negotiation",
    },
    {
      id: 5,
      title: "批判的分析",
      text: "証拠は変数間の相関を示唆しています。",
      type: "analysis",
    },
    {
      id: 6,
      title: "プロフェッショナルネットワーキング",
      text: "LinkedInでつながりたいです。",
      type: "networking",
    },
    {
      id: 7,
      title: "リーダーシップコミュニケーション",
      text: "私たちのチームは戦略的目標に焦点を当てる必要があります。",
      type: "leadership",
    },
    {
      id: 8,
      title: "技術的議論",
      text: "実装には慎重な検討が必要です。",
      type: "technical",
    },
    {
      id: 9,
      title: "異文化コミュニケーション",
      text: "この問題についてのあなたの文化的視点を評価します。",
      type: "cultural",
    },
    {
      id: 10,
      title: "イノベーションと創造性",
      text: "この課題に対する革新的な解決策を探るべきです。",
      type: "innovation",
    },
  ],

  // HINDI EXERCISES
  19: [
    // हिंदी की बुनियाद - स्तर 0
    {
      id: 1,
      title: "अभिवादन",
      text: "नमस्ते, आप कैसे हैं?",
      type: "listen_repeat",
    },
    {
      id: 2,
      title: "बुनियादी वाक्यांश",
      text: "बहुत धन्यवाद।",
      type: "listen_repeat",
    },
    { id: 3, title: "परिचय", text: "मेरा नाम राम है।", type: "listen_repeat" },
    {
      id: 4,
      title: "शिष्टाचार",
      text: "क्षमा करें, कृपया।",
      type: "listen_repeat",
    },
    {
      id: 5,
      title: "विदाई",
      text: "अलविदा, बाद में मिलते हैं।",
      type: "listen_repeat",
    },
  ],
  20: [
    // हिंदी उच्चारण - स्तर 1
    { id: 1, title: "ट वर्ग", text: "ट ठ ड ढ ण", type: "pronunciation" },
    { id: 2, title: "त वर्ग", text: "त थ द ध न", type: "pronunciation" },
    { id: 3, title: "प वर्ग", text: "प फ ब भ म", type: "pronunciation" },
    { id: 4, title: "य वर्ग", text: "य र ल व", type: "pronunciation" },
    { id: 5, title: "श वर्ग", text: "श ष स ह", type: "pronunciation" },
    { id: 6, title: "क्ष त्र ज्ञ", text: "क्ष त्र ज्ञ", type: "pronunciation" },
  ],
  21: [
    // हिंदी शब्दावली - स्तर 2
    {
      id: 1,
      title: "परिवार",
      text: "मेरा परिवार मेरे लिए बहुत महत्वपूर्ण है।",
      type: "vocabulary",
    },
    {
      id: 2,
      title: "भोजन",
      text: "मुझे स्वस्थ भोजन खाना पसंद है।",
      type: "vocabulary",
    },
    { id: 3, title: "रंग", text: "नीला आसमान सुंदर है।", type: "vocabulary" },
    {
      id: 4,
      title: "संख्या",
      text: "मेरी मेज पर पांच किताबें हैं।",
      type: "vocabulary",
    },
    {
      id: 5,
      title: "समय",
      text: "अभी दोपहर के तीन बजे हैं।",
      type: "vocabulary",
    },
    {
      id: 6,
      title: "मौसम",
      text: "आज धूप है और गर्मी है।",
      type: "vocabulary",
    },
    {
      id: 7,
      title: "जानवर",
      text: "बिल्ली कुर्सी पर सो रही है।",
      type: "vocabulary",
    },
  ],
  22: [
    // हिंदी व्याकरण - स्तर 3
    {
      id: 1,
      title: "वर्तमान काल",
      text: "मैं शहर के केंद्र में एक कंपनी में काम करता हूं।",
      type: "grammar",
    },
    {
      id: 2,
      title: "भूत काल",
      text: "कल मैंने अपनी दादी से मिलने गया।",
      type: "grammar",
    },
    {
      id: 3,
      title: "भविष्य काल",
      text: "कल मैं पुस्तकालय जाऊंगा।",
      type: "grammar",
    },
    { id: 4, title: "प्रश्नवाचक", text: "आप कहां रहते हैं?", type: "grammar" },
    {
      id: 5,
      title: "नकारात्मक",
      text: "मुझे कॉफी ज्यादा पसंद नहीं है।",
      type: "grammar",
    },
    {
      id: 6,
      title: "तुलनात्मक",
      text: "यह किताब उससे ज्यादा दिलचस्प है।",
      type: "grammar",
    },
    {
      id: 7,
      title: "शर्तवाचक",
      text: "अगर बारिश होगी तो मैं घर रहूंगा।",
      type: "grammar",
    },
    { id: 8, title: "पूर्वसर्ग", text: "किताब मेज पर है।", type: "grammar" },
  ],
  23: [
    // हिंदी बातचीत - स्तर 4
    {
      id: 1,
      title: "योजना बनाना",
      text: "क्या आप आज रात फिल्म देखने चलेंगे?",
      type: "conversation",
    },
    {
      id: 2,
      title: "राय देना",
      text: "मेरी राय में, यह एक बेहतरीन विचार है।",
      type: "conversation",
    },
    {
      id: 3,
      title: "अनुभव बताना",
      text: "पिछली गर्मियों में मैंने यूरोप की यात्रा की।",
      type: "conversation",
    },
    {
      id: 4,
      title: "पसंद व्यक्त करना",
      text: "मुझे कॉफी से ज्यादा चाय पसंद है।",
      type: "conversation",
    },
    {
      id: 5,
      title: "सुझाव देना",
      text: "क्यों न हम एक अलग तरीका आजमाएं?",
      type: "conversation",
    },
    {
      id: 6,
      title: "सहमति",
      text: "मैं आपकी बात से पूरी तरह सहमत हूं।",
      type: "conversation",
    },
    {
      id: 7,
      title: "स्पष्टीकरण मांगना",
      text: "क्या आप इसे फिर से समझा सकते हैं?",
      type: "conversation",
    },
    {
      id: 8,
      title: "चिंता व्यक्त करना",
      text: "मुझे समय सीमा की चिंता है।",
      type: "conversation",
    },
    {
      id: 9,
      title: "सलाह देना",
      text: "मुझे लगता है आपको सभी विकल्पों पर विचार करना चाहिए।",
      type: "conversation",
    },
  ],
  24: [
    // हिंदी में निपुणता - स्तर 5
    {
      id: 1,
      title: "व्यावसायिक संचार",
      text: "हमें तिमाही परिणामों पर चर्चा करने की आवश्यकता है।",
      type: "business",
    },
    {
      id: 2,
      title: "शैक्षणिक लेखन",
      text: "अनुसंधान महत्वपूर्ण निष्कर्ष प्रदर्शित करता है।",
      type: "academic",
    },
    {
      id: 3,
      title: "औपचारिक प्रस्तुति",
      text: "मुझे हमारे अध्ययन के मुख्य निष्कर्ष प्रस्तुत करने दें।",
      type: "presentation",
    },
    {
      id: 4,
      title: "बातचीत कौशल",
      text: "मुझे लगता है कि हम पारस्परिक रूप से लाभकारी समझौते पर पहुंच सकते हैं।",
      type: "negotiation",
    },
    {
      id: 5,
      title: "आलोचनात्मक विश्लेषण",
      text: "साक्ष्य चरों के बीच सहसंबंध का सुझाव देता है।",
      type: "analysis",
    },
    {
      id: 6,
      title: "पेशेवर नेटवर्किंग",
      text: "मैं आपसे LinkedIn पर जुड़ना चाहूंगा।",
      type: "networking",
    },
    {
      id: 7,
      title: "नेतृत्व संचार",
      text: "हमारी टीम को रणनीतिक उद्देश्यों पर ध्यान केंद्रित करने की आवश्यकता है।",
      type: "leadership",
    },
    {
      id: 8,
      title: "तकनीकी चर्चा",
      text: "कार्यान्वयन के लिए सावधानीपूर्वक विचार की आवश्यकता है।",
      type: "technical",
    },
    {
      id: 9,
      title: "अंतर-सांस्कृतिक संचार",
      text: "मैं इस मामले पर आपके सांस्कृतिक दृष्टिकोण की सराहना करता हूं।",
      type: "cultural",
    },
    {
      id: 10,
      title: "नवाचार और रचनात्मकता",
      text: "हमें इस चुनौती के लिए नवीन समाधानों का पता लगाना चाहिए।",
      type: "innovation",
    },
  ],
};

// Initialize practice page
document.addEventListener("DOMContentLoaded", () => {
  initializePracticePage();
});

function initializePracticePage() {
  renderLessons();
  setupEventListeners();
  setupSpeechRecognition();
}

// Render lessons grid
function renderLessons() {
  const lessonsGrid = document.getElementById("lessons-grid");
  if (!lessonsGrid) return;

  lessonsGrid.innerHTML = lessonsData
    .map(
      (lesson) => `
    <div class="lesson-card" data-lesson-id="${lesson.id}">
      <div class="lesson-header">
        <div class="lesson-icon">
          <i class="${lesson.icon}"></i>
        </div>
        <div class="lesson-badges">
          <span class="lesson-language">${lesson.language.toUpperCase()}</span>
          <span class="lesson-level ${lesson.level}">Level ${lesson.levelNumber
        }</span>
        </div>
      </div>
      <div class="lesson-content">
        <h3>${lesson.title}</h3>
        <p>${lesson.description}</p>
        <div class="lesson-meta">
          <div class="lesson-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${lesson.progress
        }%"></div>
            </div>
            <span>${lesson.progress}%</span>
          </div>
          <span>${lesson.duration}</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Add click listeners to lesson cards
  document.querySelectorAll(".lesson-card").forEach((card) => {
    card.addEventListener("click", () => {
      const lessonId = parseInt(card.dataset.lessonId);
      // Redirect to lesson page
      window.location.href = `lesson.html?id=${lessonId}`;
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  // Filter controls
  const languageFilter = document.getElementById("language-filter");
  const levelFilter = document.getElementById("level-filter");
  const categoryFilter = document.getElementById("category-filter");

  if (languageFilter) {
    languageFilter.addEventListener("change", filterLessons);
  }

  if (levelFilter) {
    levelFilter.addEventListener("change", filterLessons);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterLessons);
  }

  // Practice interface controls
  const backBtn = document.getElementById("back-to-lessons");
  const playAudioBtn = document.getElementById("play-audio");
  const recordBtn = document.getElementById("record-btn");
  const skipBtn = document.getElementById("skip-exercise");
  const nextBtn = document.getElementById("next-exercise");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      showLessonSelection();
    });
  }

  if (playAudioBtn) {
    playAudioBtn.addEventListener("click", playAudio);
  }

  if (recordBtn) {
    recordBtn.addEventListener("click", toggleRecording);
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", skipExercise);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", nextExercise);
  }

  // Completion modal controls
  const reviewBtn = document.getElementById("review-lesson");
  const nextLessonBtn = document.getElementById("next-lesson");

  if (reviewBtn) {
    reviewBtn.addEventListener("click", () => {
      hideCompletionModal();
      currentExercise = 0;
      startLesson(currentLesson.id);
    });
  }

  if (nextLessonBtn) {
    nextLessonBtn.addEventListener("click", () => {
      hideCompletionModal();
      showLessonSelection();
    });
  }
}

// Setup speech recognition
function setupSpeechRecognition() {
  if (!recognition) {
    console.warn("Speech recognition not supported");
    return;
  }

  recognition.onstart = () => {
    isRecording = true;
    updateRecordingUI(true);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const confidence = event.results[0][0].confidence;

    updateSpeechFeedback(transcript, confidence);
    analyzePronunciation(transcript, confidence);
  };

  recognition.onend = () => {
    isRecording = false;
    updateRecordingUI(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    updateSpeechFeedback("Error: " + event.error, 0);
  };
}

// Filter lessons
function filterLessons() {
  const languageFilter = document.getElementById("language-filter").value;
  const levelFilter = document.getElementById("level-filter").value;
  const categoryFilter = document.getElementById("category-filter").value;

  const filteredLessons = lessonsData.filter((lesson) => {
    const languageMatch =
      languageFilter === "all" || lesson.language === languageFilter;
    const levelMatch =
      levelFilter === "all" || lesson.levelNumber.toString() === levelFilter;
    const categoryMatch =
      categoryFilter === "all" || lesson.category === categoryFilter;
    return languageMatch && levelMatch && categoryMatch;
  });

  const lessonsGrid = document.getElementById("lessons-grid");
  if (!lessonsGrid) return;

  lessonsGrid.innerHTML = filteredLessons
    .map(
      (lesson) => `
    <div class="lesson-card" data-lesson-id="${lesson.id}">
      <div class="lesson-header">
        <div class="lesson-icon">
          <i class="${lesson.icon}"></i>
        </div>
        <div class="lesson-badges">
          <span class="lesson-language">${lesson.language.toUpperCase()}</span>
          <span class="lesson-level ${lesson.level}">Level ${lesson.levelNumber
        }</span>
        </div>
      </div>
      <div class="lesson-content">
        <h3>${lesson.title}</h3>
        <p>${lesson.description}</p>
        <div class="lesson-meta">
          <div class="lesson-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${lesson.progress
        }%"></div>
            </div>
            <span>${lesson.progress}%</span>
          </div>
          <span>${lesson.duration}</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Re-add click listeners
  document.querySelectorAll(".lesson-card").forEach((card) => {
    card.addEventListener("click", () => {
      const lessonId = parseInt(card.dataset.lessonId);
      // Redirect to lesson page
      window.location.href = `lesson.php?id=${lessonId}`;
    });
  });
}

// Start a lesson
function startLesson(lessonId) {
  currentLesson = lessonsData.find((lesson) => lesson.id === lessonId);
  if (!currentLesson) return;

  exercises = exercisesData[lessonId] || [];
  currentExercise = 0;
  totalScore = 0;
  startTime = Date.now();

  showPracticeInterface();
  loadExercise();
}

// Show practice interface
function showPracticeInterface() {
  const lessonSelection = document.querySelector(".lesson-selection");
  const practiceInterface = document.getElementById("practice-interface");

  if (lessonSelection) {
    lessonSelection.style.display = "none";
  }

  if (practiceInterface) {
    practiceInterface.style.display = "block";
  }

  // Update lesson info
  const lessonTitle = document.getElementById("current-lesson-title");
  const lessonLevel = document.getElementById("current-lesson-level");

  if (lessonTitle) {
    lessonTitle.textContent = currentLesson.title;
  }

  if (lessonLevel) {
    lessonLevel.textContent = currentLesson.level;
    lessonLevel.className = `lesson-level ${currentLesson.level}`;
  }
}

// Show lesson selection
function showLessonSelection() {
  const lessonSelection = document.querySelector(".lesson-selection");
  const practiceInterface = document.getElementById("practice-interface");

  if (lessonSelection) {
    lessonSelection.style.display = "block";
  }

  if (practiceInterface) {
    practiceInterface.style.display = "none";
  }
}

// Load current exercise
function loadExercise() {
  if (currentExercise >= exercises.length) {
    showCompletionModal();
    return;
  }

  const exercise = exercises[currentExercise];
  if (!exercise) return;

  // Update exercise info
  const exerciseTitle = document.getElementById("exercise-title");
  const audioText = document.getElementById("audio-text");
  const currentExerciseSpan = document.getElementById("current-exercise");
  const totalExercisesSpan = document.getElementById("total-exercises");

  if (exerciseTitle) {
    exerciseTitle.textContent = exercise.title;
  }

  if (audioText) {
    audioText.textContent = exercise.text;
  }

  if (currentExerciseSpan) {
    currentExerciseSpan.textContent = currentExercise + 1;
  }

  if (totalExercisesSpan) {
    totalExercisesSpan.textContent = exercises.length;
  }

  // Reset UI
  resetExerciseUI();
}

// Reset exercise UI
function resetExerciseUI() {
  const feedbackText = document.getElementById("feedback-text");
  const scoreFill = document.querySelector(".score-fill");
  const scoreText = document.querySelector(".score-text");
  const nextBtn = document.getElementById("next-exercise");
  const wordAnalysis = document.getElementById("word-analysis");

  if (feedbackText) {
    feedbackText.textContent = "Click the microphone to start recording";
  }

  if (scoreFill) {
    scoreFill.style.width = "0%";
  }

  if (scoreText) {
    scoreText.textContent = "0%";
  }

  if (nextBtn) {
    nextBtn.disabled = true;
  }

  if (wordAnalysis) {
    wordAnalysis.style.display = "none";
  }
}

// Play audio
function playAudio() {
  const audioBtn = document.getElementById("play-audio");
  const waveform = document.getElementById("audio-waveform");

  if (!audioBtn || !waveform) return;

  // Simulate audio playback
  audioBtn.classList.add("playing");
  animateWaveform();

  // Simulate audio duration
  setTimeout(() => {
    audioBtn.classList.remove("playing");
    stopWaveformAnimation();
  }, 3000);
}

// Animate waveform
function animateWaveform() {
  const bars = document.querySelectorAll(".wave-bar");

  bars.forEach((bar, index) => {
    setInterval(() => {
      const randomHeight = Math.random() * 40 + 10;
      bar.style.height = randomHeight + "px";
    }, 100 + index * 50);
  });
}

// Stop waveform animation
function stopWaveformAnimation() {
  const bars = document.querySelectorAll(".wave-bar");

  bars.forEach((bar, index) => {
    const heights = [20, 35, 15, 40, 25, 30, 18, 35];
    bar.style.height = heights[index] + "px";
  });
}

// Toggle recording
function toggleRecording() {
  if (!recognition) {
    updateSpeechFeedback("Speech recognition not supported in this browser", 0);
    return;
  }

  if (isRecording) {
    recognition.stop();
  } else {
    recognition.start();
  }
}

// Update recording UI
function updateRecordingUI(recording) {
  const recordBtn = document.getElementById("record-btn");
  const indicator = document.getElementById("recording-indicator");

  if (recordBtn) {
    if (recording) {
      recordBtn.classList.add("recording");
      recordBtn.innerHTML =
        '<i class="fas fa-stop"></i><span>Stop Recording</span>';
    } else {
      recordBtn.classList.remove("recording");
      recordBtn.innerHTML =
        '<i class="fas fa-microphone"></i><span>Click to Record</span>';
    }
  }

  if (indicator) {
    indicator.style.display = recording ? "block" : "none";
  }
}

// Update speech feedback
function updateSpeechFeedback(transcript, confidence) {
  const feedbackText = document.getElementById("feedback-text");

  if (feedbackText) {
    feedbackText.textContent = transcript;
  }

  // Calculate score based on confidence and text similarity
  const exercise = exercises[currentExercise];
  if (exercise) {
    const score = calculateScore(transcript, exercise.text, confidence);
    updateScoreDisplay(score);

    if (score >= 70) {
      enableNextButton();
    }
  }
}

// Calculate pronunciation score
function calculateScore(transcript, targetText, confidence) {
  // Simple scoring algorithm
  const similarity = calculateSimilarity(
    transcript.toLowerCase(),
    targetText.toLowerCase()
  );
  const baseScore = Math.round(similarity * 100);
  const confidenceBonus = Math.round(confidence * 20);

  return Math.min(100, baseScore + confidenceBonus);
}

// Calculate text similarity (simple implementation)
function calculateSimilarity(str1, str2) {
  const words1 = str1.split(" ");
  const words2 = str2.split(" ");

  let matches = 0;
  const maxLength = Math.max(words1.length, words2.length);

  words1.forEach((word1) => {
    if (
      words2.some((word2) => word1.includes(word2) || word2.includes(word1))
    ) {
      matches++;
    }
  });

  return matches / maxLength;
}

// Update score display
function updateScoreDisplay(score) {
  const scoreFill = document.querySelector(".score-fill");
  const scoreText = document.querySelector(".score-text");
  const exerciseScore = document.getElementById("exercise-score");

  if (scoreFill) {
    scoreFill.style.width = score + "%";
  }

  if (scoreText) {
    scoreText.textContent = score + "%";
  }

  if (exerciseScore) {
    const scoreSpan = exerciseScore.querySelector("span");
    if (scoreSpan) {
      scoreSpan.textContent = score + "%";
    }
  }

  // Update color based on score
  if (scoreFill) {
    if (score >= 80) {
      scoreFill.style.background = "linear-gradient(90deg, #10b981, #059669)";
    } else if (score >= 60) {
      scoreFill.style.background = "linear-gradient(90deg, #f59e0b, #d97706)";
    } else {
      scoreFill.style.background = "linear-gradient(90deg, #ef4444, #dc2626)";
    }
  }
}

// Analyze pronunciation word by word
function analyzePronunciation(transcript, confidence) {
  const exercise = exercises[currentExercise];
  if (!exercise) return;

  const targetWords = exercise.text.toLowerCase().split(" ");
  const spokenWords = transcript.toLowerCase().split(" ");

  const wordsGrid = document.getElementById("words-grid");
  const wordAnalysis = document.getElementById("word-analysis");

  if (!wordsGrid || !wordAnalysis) return;

  wordsGrid.innerHTML = targetWords
    .map((word, index) => {
      const spokenWord = spokenWords[index] || "";
      const isCorrect = spokenWord.includes(word) || word.includes(spokenWord);
      const isPartial = spokenWord.length > 0 && !isCorrect;

      let className = "word-item";
      if (isCorrect) className += " correct";
      else if (isPartial) className += " partial";
      else className += " incorrect";

      return `<span class="${className}">${word}</span>`;
    })
    .join("");

  wordAnalysis.style.display = "block";
}

// Enable next button
function enableNextButton() {
  const nextBtn = document.getElementById("next-exercise");
  if (nextBtn) {
    nextBtn.disabled = false;
  }
}

// Skip exercise
function skipExercise() {
  currentExercise++;
  loadExercise();
}

// Next exercise
function nextExercise() {
  const exercise = exercises[currentExercise];
  if (exercise) {
    const scoreFill = document.querySelector(".score-fill");
    const score = parseInt(scoreFill.style.width) || 0;
    totalScore += score;
  }

  currentExercise++;
  loadExercise();
}

// Show completion modal
function showCompletionModal() {
  const modal = document.getElementById("completion-modal");
  if (!modal) return;

  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  const averageScore = Math.round(totalScore / exercises.length);

  // Update modal content
  const finalScore = document.getElementById("final-score");
  const timeSpentSpan = document.getElementById("time-spent");
  const exercisesCompleted = document.getElementById("exercises-completed");

  if (finalScore) {
    finalScore.textContent = averageScore + "%";
  }

  if (timeSpentSpan) {
    timeSpentSpan.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  if (exercisesCompleted) {
    exercisesCompleted.textContent = `${exercises.length}/${exercises.length}`;
  }

  modal.style.display = "flex";

  // Animate modal
  setTimeout(() => {
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.style.transform = "scale(1)";
    }
  }, 10);
}

// Hide completion modal
function hideCompletionModal() {
  const modal = document.getElementById("completion-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Space to start/stop recording
  if (e.code === "Space" && !e.target.matches("input, textarea")) {
    e.preventDefault();
    toggleRecording();
  }

  // Enter to go to next exercise
  if (e.code === "Enter" && !e.target.matches("input, textarea")) {
    e.preventDefault();
    const nextBtn = document.getElementById("next-exercise");
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.click();
    }
  }

  // Escape to go back
  if (e.code === "Escape") {
    const backBtn = document.getElementById("back-to-lessons");
    if (backBtn) {
      backBtn.click();
    }
  }
});

// Add visual feedback for interactions
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to lesson cards
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".lesson-card")) {
      const card = e.target.closest(".lesson-card");
      card.style.transform = "translateY(-5px)";
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
