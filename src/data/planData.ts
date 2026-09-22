import { DayPlan } from '../types';

export const GERMAN_PLAN_DATA: DayPlan[] = [
  // ==========================================
  // MILESTONE 1: DAYS 1 - 7 (A1.1 Foundations)
  // ==========================================
  {
    day: 1,
    milestone: 1,
    title: "Greetings & First Words",
    germanTitle: "Begrüßung & Erste Worte",
    topic: "Basic Greetings & Introductions",
    description: "Learn how to greet native speakers at any time of day and introduce yourself politely.",
    cefrLevel: 'A1.1',
    estimatedMinutes: 10,
    grammarNote: {
      title: "German Capitalization & Formality",
      summary: "All nouns in German are capitalized. 'Sie' (capitalized) is formal 'You', while 'du' is informal.",
      rules: [
        "Every noun starts with a capital letter (der Tag, der Morgen).",
        "Use 'Guten Morgen' until ~11:00 AM, then 'Guten Tag' until ~6:00 PM, then 'Guten Abend'.",
        "Say 'Wie heißen Sie?' to strangers, and 'Wie heißt du?' to friends and children."
      ],
      examples: [
        { de: "Hallo, ich heiße Max.", en: "Hello, my name is Max." },
        { de: "Wie geht es Ihnen?", en: "How are you? (Formal)" },
        { de: "Mir geht es sehr gut, danke!", en: "I am doing very well, thank you!" }
      ]
    },
    vocabulary: [
      { de: "Hallo", en: "Hello", example: "Hallo, wie geht's?", exampleEn: "Hello, how are you?" },
      { de: "Guten Tag", en: "Good day / Hello", example: "Guten Tag, Herr Schmidt.", exampleEn: "Good day, Mr. Schmidt." },
      { de: "Guten Morgen", en: "Good morning", example: "Guten Morgen zusammen!", exampleEn: "Good morning everyone!" },
      { de: "Guten Abend", en: "Good evening", example: "Guten Abend, willkommen!", exampleEn: "Good evening, welcome!" },
      { de: "Auf Wiedersehen", en: "Goodbye (formal)", example: "Auf Wiedersehen und schönen Tag noch!", exampleEn: "Goodbye and have a nice day!" },
      { de: "Tschüss", en: "Bye (informal)", example: "Tschüss, bis morgen!", exampleEn: "Bye, see you tomorrow!" },
      { de: "Danke", en: "Thank you", example: "Vielen Dank!", exampleEn: "Thank you very much!" },
      { de: "Bitte", en: "Please / You're welcome", example: "Bitte schön.", exampleEn: "You are welcome." }
    ],
    exercises: [
      {
        id: "d1-e1",
        type: "multiple-choice",
        prompt: "How do you greet someone formally in the morning?",
        options: ["Gute Nacht", "Guten Morgen", "Tschüss", "Auf Wiedersehen"],
        correctAnswer: "Guten Morgen",
        explanation: "'Guten Morgen' is used from sunrise until about 11 AM.",
        audioText: "Guten Morgen"
      },
      {
        id: "d1-e2",
        type: "sentence-scramble",
        prompt: "Assemble the sentence: 'Hello, my name is Lukas.'",
        options: ["Lukas", "Hallo,", "heiße", "ich"],
        correctAnswer: ["Hallo,", "ich", "heiße", "Lukas"],
        explanation: "German places the verb in second position in standard declarative sentences.",
        contextSentence: "Hallo, ich heiße Lukas."
      },
      {
        id: "d1-e3",
        type: "match-pairs",
        prompt: "Match the German greeting to its English translation:",
        correctAnswer: "pairs",
        explanation: "German greetings change depending on formality and time of day.",
        pairs: [
          { left: "Tschüss", right: "Bye (informal)" },
          { left: "Auf Wiedersehen", right: "Goodbye (formal)" },
          { left: "Guten Abend", right: "Good evening" },
          { left: "Bitte", right: "Please / You're welcome" }
        ]
      },
      {
        id: "d1-e4",
        type: "audio-listen",
        prompt: "Listen to the audio and select what was spoken:",
        audioText: "Wie geht es Ihnen?",
        options: ["Wie heißen Sie?", "Wie geht es Ihnen?", "Woher kommen Sie?", "Was machen Sie?"],
        correctAnswer: "Wie geht es Ihnen?",
        explanation: "'Wie geht es Ihnen?' means 'How are you?' in formal German."
      }
    ],
    xpReward: 20
  },
  {
    day: 2,
    milestone: 1,
    title: "Alphabet, Umlauts & 'ß'",
    germanTitle: "Alphabet, Umlaute & das 'ß'",
    topic: "German Pronunciation Rules",
    description: "Master the unique German sounds: Ä, Ö, Ü, and the sharp S (Eszett / ß).",
    cefrLevel: 'A1.1',
    estimatedMinutes: 12,
    grammarNote: {
      title: "Mastering Umlauts & Special Letters",
      summary: "Umlauts alter vowel sounds significantly and can completely change word meaning (e.g. schon = already, schön = beautiful).",
      rules: [
        "Ä is pronounced like 'e' in 'bed' (Mädchen).",
        "Ö is formed by rounding lips like 'o' while saying 'ay' (schön).",
        "Ü is formed by rounding lips while making an 'ee' sound (über, Tschüss).",
        "ß is called 'Eszett' and makes a sharp double-s sound ('ss'), never appearing at the start of a word."
      ],
      examples: [
        { de: "Das Mädchen ist schön.", en: "The girl is beautiful." },
        { de: "Die Straße ist lang.", en: "The street is long." },
        { de: "Er übt Deutsch.", en: "He practices German." }
      ]
    },
    vocabulary: [
      { de: "das Mädchen", en: "the girl", gender: "das", example: "Das Mädchen lernt Deutsch.", exampleEn: "The girl learns German." },
      { de: "schön", en: "beautiful / nice", example: "Das Wetter ist schön.", exampleEn: "The weather is beautiful." },
      { de: "die Straße", en: "the street", gender: "die", example: "Die Straße ist ruhig.", exampleEn: "The street is quiet." },
      { de: "groß", en: "tall / big", example: "Berlin ist sehr groß.", exampleEn: "Berlin is very big." },
      { de: "die Übung", en: "the exercise / practice", gender: "die", example: "Eine gute Übung!", exampleEn: "A good exercise!" },
      { de: "spät", en: "late", example: "Es ist schon spät.", exampleEn: "It is already late." }
    ],
    exercises: [
      {
        id: "d2-e1",
        type: "fill-blank",
        prompt: "Complete the word for 'street': die Stra____e",
        options: ["ss", "ß", "z", "sch"],
        correctAnswer: "ß",
        explanation: "German spells 'street' as 'die Straße' with an Eszett.",
        contextSentence: "Die Straße ist lang."
      },
      {
        id: "d2-e2",
        type: "multiple-choice",
        prompt: "What does 'schön' mean in English?",
        options: ["already", "beautiful / nice", "ugly", "clean"],
        correctAnswer: "beautiful / nice",
        explanation: "'schön' (with umlaut) means beautiful. Without umlaut ('schon') it means already!",
        audioText: "schön"
      },
      {
        id: "d2-e3",
        type: "audio-listen",
        prompt: "Listen to the word and identify it:",
        audioText: "Das Mädchen",
        options: ["Das Mädchen", "Die Mutter", "Der Mann", "Die Maus"],
        correctAnswer: "Das Mädchen",
        explanation: "'Das Mädchen' features both the 'ä' sound and 'ch' consonant blend."
      }
    ],
    xpReward: 20
  },
  {
    day: 3,
    milestone: 1,
    title: "Numbers 1-100 & Counting Euros",
    germanTitle: "Zahlen von 1 bis 100 & Euro",
    topic: "German Numbers & Inverted Order",
    description: "Learn how Germans count from 1 to 100 and understand the famous flipped number rule (einundzwanzig = one-and-twenty!).",
    cefrLevel: 'A1.1',
    estimatedMinutes: 12,
    grammarNote: {
      title: "German Numbers: Ones before Tens",
      summary: "From 21 onwards, Germans say the unit first, then 'und' (and), then the tens!",
      rules: [
        "0-10: null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn",
        "11-12: elf, zwölf (unique roots)",
        "21: ein-und-zwanzig (literally: one and twenty)",
        "Prices: 3,50 € = 'Drei Euro fünfzig'"
      ],
      examples: [
        { de: "Das kostet fünf Euro.", en: "That costs five euros." },
        { de: "Ich bin vierundzwanzig Jahre alt.", en: "I am twenty-four years old." },
        { de: "Zwei Kaffee, bitte.", en: "Two coffees, please." }
      ]
    },
    vocabulary: [
      { de: "eins", en: "one", example: "Nummer eins.", exampleEn: "Number one." },
      { de: "zwei", en: "two", example: "Zwei Euro, bitte.", exampleEn: "Two euros, please." },
      { de: "drei", en: "three", example: "Drei Personen.", exampleEn: "Three people." },
      { de: "zehn", en: "ten", example: "Zehn Minuten.", exampleEn: "Ten minutes." },
      { de: "zwanzig", en: "twenty", example: "Zwanzig Euro.", exampleEn: "Twenty euros." },
      { de: "einundzwanzig", en: "twenty-one", example: "Ich bin einundzwanzig.", exampleEn: "I am twenty-one." },
      { de: "hundert", en: "one hundred", example: "Hundert Prozent!", exampleEn: "One hundred percent!" }
    ],
    exercises: [
      {
        id: "d3-e1",
        type: "multiple-choice",
        prompt: "How is the number 25 expressed in German?",
        options: ["zwanzigfünf", "fünfundzwanzig", "fünfzigzwei", "zweifünf"],
        correctAnswer: "fünfundzwanzig",
        explanation: "In German, 25 is literally 'five and twenty' (fünf-und-zwanzig).",
        audioText: "fünfundzwanzig"
      },
      {
        id: "d3-e2",
        type: "match-pairs",
        prompt: "Match the German numbers to digits:",
        correctAnswer: "pairs",
        explanation: "Practice recognizing German number words.",
        pairs: [
          { left: "zwölf", right: "12" },
          { left: "fünfzehn", right: "15" },
          { left: "zweiundvierzig", right: "42" },
          { left: "siebzig", right: "70" }
        ]
      },
      {
        id: "d3-e3",
        type: "sentence-scramble",
        prompt: "Assemble: 'That costs four euros.'",
        options: ["Euro.", "vier", "Das", "kostet"],
        correctAnswer: ["Das", "kostet", "vier", "Euro."],
        explanation: "'Das kostet vier Euro.' uses standard subject-verb-object order.",
        contextSentence: "Das kostet vier Euro."
      }
    ],
    xpReward: 20
  },
  {
    day: 4,
    milestone: 1,
    title: "Essential Verbs: Sein, Haben & Pronouns",
    germanTitle: "Wichtige Verben: Sein & Haben",
    topic: "Core Verbs & Personal Pronouns",
    description: "Master 'to be' (sein) and 'to have' (haben)—the two most vital pillars of the German language.",
    cefrLevel: 'A1.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Conjugating 'sein' (to be) & 'haben' (to have)",
      summary: "These irregular verbs form the foundation for all future conversation and compound tenses.",
      rules: [
        "sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind",
        "haben: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben",
        "Personal pronouns: ich (I), du (you inf.), er (he), sie (she), es (it), wir (we), ihr (you pl.), Sie (you formal)"
      ],
      examples: [
        { de: "Ich bin müde.", en: "I am tired." },
        { de: "Wir haben Zeit.", en: "We have time." },
        { de: "Bist du bereit?", en: "Are you ready?" }
      ]
    },
    vocabulary: [
      { de: "sein", en: "to be", example: "Ich bin Student.", exampleEn: "I am a student." },
      { de: "haben", en: "to have", example: "Ich habe eine Frage.", exampleEn: "I have a question." },
      { de: "bereit", en: "ready", example: "Wir sind bereit!", exampleEn: "We are ready!" },
      { de: "müde", en: "tired", example: "Ich bin etwas müde.", exampleEn: "I am a bit tired." },
      { de: "die Zeit", en: "time", gender: "die", example: "Hast du heute Zeit?", exampleEn: "Do you have time today?" },
      { de: "der Hunger", en: "hunger", gender: "der", example: "Ich habe Hunger.", exampleEn: "I am hungry (I have hunger)." }
    ],
    exercises: [
      {
        id: "d4-e1",
        type: "fill-blank",
        prompt: "Choose the correct form of 'sein': 'Er ____ aus Deutschland.' (He is from Germany)",
        options: ["bin", "bist", "ist", "sind"],
        correctAnswer: "ist",
        explanation: "Third person singular of 'sein' is 'er ist'.",
        contextSentence: "Er ist aus Deutschland."
      },
      {
        id: "d4-e2",
        type: "fill-blank",
        prompt: "Choose the correct form of 'haben': 'Wir ____ großen Hunger.' (We are very hungry)",
        options: ["habe", "hast", "hat", "haben"],
        correctAnswer: "haben",
        explanation: "First person plural of 'haben' is 'wir haben'.",
        contextSentence: "Wir haben großen Hunger."
      },
      {
        id: "d4-e3",
        type: "sentence-scramble",
        prompt: "Assemble: 'Are you ready?'",
        options: ["du", "bereit?", "Bist"],
        correctAnswer: ["Bist", "du", "bereit?"],
        explanation: "In yes/no questions, the verb moves to position one.",
        contextSentence: "Bist du bereit?"
      }
    ],
    xpReward: 25
  },
  {
    day: 5,
    milestone: 1,
    title: "Ordering at a Café & Restaurant",
    germanTitle: "Im Café & Restaurant bestellen",
    topic: "Polite Ordering & Bill Settlement",
    description: "Learn how to order coffee, pretzels, and pastries like a local, plus request the bill.",
    cefrLevel: 'A1.1',
    estimatedMinutes: 12,
    grammarNote: {
      title: "Polite Requests with 'Ich möchte' & 'Hätten Sie'",
      summary: "'Ich möchte' means 'I would like' and is the friendliest way to order in German cafes.",
      rules: [
        "Say 'Ich möchte einen Kaffee, bitte' (I would like a coffee, please).",
        "To get attention: 'Entschuldigung!' (Excuse me!).",
        "To ask for the bill: 'Die Rechnung, bitte.' or 'Zusammen oder getrennt?' (Together or separate?)."
      ],
      examples: [
        { de: "Ich möchte bitte ein Wasser ohne Kohlensäure.", en: "I would like still water, please." },
        { de: "Die Rechnung, bitte!", en: "The check/bill, please!" },
        { de: "Wir möchten zahlen, bitte.", en: "We would like to pay, please." }
      ]
    },
    vocabulary: [
      { de: "der Kaffee", en: "coffee", gender: "der", example: "Einen Kaffee mit Milch, bitte.", exampleEn: "A coffee with milk, please." },
      { de: "der Tee", en: "tea", gender: "der", example: "Ich trinke grünen Tee.", exampleEn: "I drink green tea." },
      { de: "das Wasser", en: "water", gender: "das", example: "Ein Glas Wasser, bitte.", exampleEn: "A glass of water, please." },
      { de: "die Rechnung", en: "the bill / check", gender: "die", example: "Können wir die Rechnung haben?", exampleEn: "Can we have the bill?" },
      { de: "zahlen", en: "to pay", example: "Ich möchte zahlen.", exampleEn: "I would like to pay." },
      { de: "lecker", en: "delicious", example: "Das Essen ist sehr lecker.", exampleEn: "The food is very delicious." }
    ],
    exercises: [
      {
        id: "d5-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'A coffee with milk, please.'",
        options: ["bitte.", "Einen", "Milch,", "mit", "Kaffee"],
        correctAnswer: ["Einen", "Kaffee", "mit", "Milch,", "bitte."],
        explanation: "'Einen Kaffee mit Milch, bitte.' is the standard polite order.",
        contextSentence: "Einen Kaffee mit Milch, bitte."
      },
      {
        id: "d5-e2",
        type: "multiple-choice",
        prompt: "What is the standard phrase to ask for the bill?",
        options: ["Die Rechnung, bitte!", "Guten Appetit!", "Kein Problem!", "Wo ist der Kaffee?"],
        correctAnswer: "Die Rechnung, bitte!",
        explanation: "'Die Rechnung, bitte!' directly asks the waiter for the bill.",
        audioText: "Die Rechnung, bitte!"
      },
      {
        id: "d5-e3",
        type: "audio-listen",
        prompt: "Listen to the order and identify what was ordered:",
        audioText: "Ich möchte ein Wasser, bitte.",
        options: ["Ich möchte ein Wasser, bitte.", "Ich möchte einen Tee, bitte.", "Ich möchte ein Bier, bitte.", "Ich möchte einen Kaffee, bitte."],
        correctAnswer: "Ich möchte ein Wasser, bitte.",
        explanation: "The speaker asked for water ('ein Wasser, bitte')."
      }
    ],
    xpReward: 25
  },
  {
    day: 6,
    milestone: 1,
    title: "Noun Genders: Der, Die, Das & Plurals",
    germanTitle: "Nomen & Artikel: Der, Die, Das",
    topic: "Grammatical Gender & Word Endings",
    description: "Decode the mystery of German noun genders and learn memory clues to pick the right article.",
    cefrLevel: 'A1.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Gender Clues & Patterns",
      summary: "German has 3 genders: Masculine (der), Feminine (die), and Neuter (das). Plural for all is 'die'.",
      rules: [
        "Der (Masculine): Days, seasons, male persons, words ending in -or, -ling, -ismus.",
        "Die (Feminine): Words ending in -ung, -heit, -keit, -schaft, -tion, -tät (99% feminine!).",
        "Das (Neuter): Diminutives (-chen, -lein), words ending in -ment, -um, infinitives used as nouns.",
        "Plural: ALL German nouns in the nominative plural use the article 'die'!"
      ],
      examples: [
        { de: "der Mann, die Frau, das Kind", en: "the man, the woman, the child" },
        { de: "die Zeitung, die Möglichkeit", en: "the newspaper, the possibility (-ung/-keit)" },
        { de: "die Kinder (plural)", en: "the children (plural takes 'die')" }
      ]
    },
    vocabulary: [
      { de: "der Mann", en: "the man", gender: "der", example: "Der Mann liest ein Buch.", exampleEn: "The man reads a book." },
      { de: "die Frau", en: "the woman", gender: "die", example: "Die Frau spricht Deutsch.", exampleEn: "The woman speaks German." },
      { de: "das Kind", en: "the child", gender: "das", example: "Das Kind spielt gern.", exampleEn: "The child likes playing." },
      { de: "die Zeitung", en: "the newspaper", gender: "die", example: "Ich lese die Zeitung.", exampleEn: "I read the newspaper." },
      { de: "das Buch", en: "the book", gender: "das", example: "Das Buch ist spannend.", exampleEn: "The book is exciting." },
      { de: "der Tisch", en: "the table", gender: "der", example: "Der Tisch ist aus Holz.", exampleEn: "The table is made of wood." }
    ],
    exercises: [
      {
        id: "d6-e1",
        type: "fill-blank",
        prompt: "Choose the correct article for 'Zeitung' (newspaper, ends in -ung):",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        explanation: "German words ending in '-ung' are virtually always feminine ('die Zeitung').",
        contextSentence: "____ Zeitung liegt auf dem Tisch."
      },
      {
        id: "d6-e2",
        type: "match-pairs",
        prompt: "Match each noun with its gender:",
        correctAnswer: "pairs",
        explanation: "Practice associating the correct definite article.",
        pairs: [
          { left: "Mann (man)", right: "der" },
          { left: "Frau (woman)", right: "die" },
          { left: "Kind (child)", right: "das" },
          { left: "Kinder (children pl.)", right: "die" }
        ]
      },
      {
        id: "d6-e3",
        type: "multiple-choice",
        prompt: "Which article do ALL plural nouns take in the nominative case?",
        options: ["der", "die", "das", "den"],
        correctAnswer: "die",
        explanation: "Regardless of the singular gender, ALL plural nouns take 'die' in the nominative case.",
        audioText: "die Kinder"
      }
    ],
    xpReward: 25
  },
  {
    day: 7,
    milestone: 1,
    title: "Milestone 1 Checkpoint: Foundations Boss",
    germanTitle: "Meilenstein 1 Prüfung: Grundlagen Boss",
    topic: "7-Day Foundations Mastery Exam",
    description: "Celebrate completing Week 1! Prove your mastery of greetings, numbers, pronouns, ordering, and genders to unlock the Milestone 1 Certificate!",
    cefrLevel: 'A1.1',
    estimatedMinutes: 18,
    isMilestoneBoss: true,
    bossBadge: "Bronze German Eagle",
    grammarNote: {
      title: "Week 1 Comprehensive Review",
      summary: "You now know the bedrock of German: greeting, spelling, counting, core verbs, cafe ordering, and articles.",
      rules: [
        "Verb is always position 2 in main statements.",
        "Capitalize all nouns without exception.",
        "sein (bin/bist/ist) and haben (habe/hast/hat) are essential.",
        "You have officially completed 25% of your 30-day journey!"
      ],
      examples: [
        { de: "Guten Tag! Ich habe zwei Fragen.", en: "Good day! I have two questions." },
        { de: "Wir möchten zahlen, bitte.", en: "We would like to pay, please." },
        { de: "Das Mädchen liest das Buch.", en: "The girl reads the book." }
      ]
    },
    vocabulary: [
      { de: "der Erfolg", en: "success", gender: "der", example: "Herzlichen Glückwunsch zum Erfolg!", exampleEn: "Congratulations on your success!" },
      { de: "die Prüfung", en: "exam / test", gender: "die", example: "Die erste Prüfung ist geschafft.", exampleEn: "The first test is accomplished." },
      { de: "ausgezeichnet", en: "excellent", example: "Ausgezeichnet gemacht!", exampleEn: "Excellently done!" },
      { de: "weiter so", en: "keep it up", example: "Weiter so!", exampleEn: "Keep it up!" }
    ],
    exercises: [
      {
        id: "d7-e1",
        type: "multiple-choice",
        prompt: "[Boss Q1] What is the correct formal response to 'Wie geht es Ihnen?'",
        options: ["Mir geht es gut, danke.", "Ich heiße Anna.", "Auf Wiedersehen.", "Drei Euro bitte."],
        correctAnswer: "Mir geht es gut, danke.",
        explanation: "'Mir geht es gut, danke' means 'I am doing well, thank you.'",
        audioText: "Mir geht es gut, danke."
      },
      {
        id: "d7-e2",
        type: "sentence-scramble",
        prompt: "[Boss Q2] Assemble: 'We would like two coffees, please.'",
        options: ["zwei", "Wir", "Kaffee,", "möchten", "bitte."],
        correctAnswer: ["Wir", "möchten", "zwei", "Kaffee,", "bitte."],
        explanation: "Verb 'möchten' sits in position 2; quantity 'zwei Kaffee' follows.",
        contextSentence: "Wir möchten zwei Kaffee, bitte."
      },
      {
        id: "d7-e3",
        type: "fill-blank",
        prompt: "[Boss Q3] Fill with the correct pronoun: '____ bist sehr freundlich.' (You are very friendly)",
        options: ["Ich", "Du", "Er", "Wir"],
        correctAnswer: "Du",
        explanation: "'bist' matches the informal pronoun 'du' (du bist).",
        contextSentence: "Du bist sehr freundlich."
      },
      {
        id: "d7-e4",
        type: "audio-listen",
        prompt: "[Boss Q4] Listen and identify the German number:",
        audioText: "einundzwanzig",
        options: ["zwölf", "einundzwanzig", "zweiundzwanzig", "fünfzig"],
        correctAnswer: "einundzwanzig",
        explanation: "The audio spoke 'einundzwanzig' (21)."
      },
      {
        id: "d7-e5",
        type: "match-pairs",
        prompt: "[Boss Q5] Final Boss Pair Match: Core Foundations",
        correctAnswer: "pairs",
        explanation: "Master the fundamental vocabulary from Week 1.",
        pairs: [
          { left: "Guten Tag", right: "Good day" },
          { left: "die Rechnung", right: "the bill" },
          { left: "Wir haben", right: "We have" },
          { left: "Er ist", right: "He is" }
        ]
      }
    ],
    xpReward: 50
  },

  // ==========================================
  // MILESTONE 2: DAYS 8 - 15 (A1.2 Everyday Life)
  // ==========================================
  {
    day: 8,
    milestone: 2,
    title: "Asking for Directions & Navigation",
    germanTitle: "Nach dem Weg fragen & Orientierung",
    topic: "City Navigation & Spatial Prepositions",
    description: "Navigate Berlin, Munich, or Vienna with confidence using essential direction phrases.",
    cefrLevel: 'A1.2',
    estimatedMinutes: 14,
    grammarNote: {
      title: "Asking 'Wo ist...?' and Direction Adverbs",
      summary: "To ask where something is, use 'Entschuldigung, wo ist...?' (Excuse me, where is...?).",
      rules: [
        "geradeaus = straight ahead",
        "nach links = to the left",
        "nach rechts = to the right",
        "an der Ecke = at the corner",
        "in der Nähe = nearby"
      ],
      examples: [
        { de: "Wo ist der Bahnhof?", en: "Where is the train station?" },
        { de: "Gehen Sie geradeaus und dann nach links.", en: "Go straight ahead and then to the left." },
        { de: "Ist das weit von hier?", en: "Is that far from here?" }
      ]
    },
    vocabulary: [
      { de: "der Bahnhof", en: "train station", gender: "der", example: "Wo ist der Hauptbahnhof?", exampleEn: "Where is the central station?" },
      { de: "geradeaus", en: "straight ahead", example: "Immer geradeaus.", exampleEn: "Always straight ahead." },
      { de: "links", en: "left", example: "Biegen Sie links ab.", exampleEn: "Turn left." },
      { de: "rechts", en: "right", example: "Auf der rechten Seite.", exampleEn: "On the right side." },
      { de: "die Ecke", en: "the corner", gender: "die", example: "Direkt an der Ecke.", exampleEn: "Right on the corner." },
      { de: "in der Nähe", en: "nearby", example: "Gibt es eine Bank in der Nähe?", exampleEn: "Is there a bank nearby?" }
    ],
    exercises: [
      {
        id: "d8-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'Where is the train station?'",
        options: ["ist", "Bahnhof?", "Wo", "der"],
        correctAnswer: ["Wo", "ist", "der", "Bahnhof?"],
        explanation: "Question word 'Wo' followed by verb 'ist' and subject 'der Bahnhof'.",
        contextSentence: "Wo ist der Bahnhof?"
      },
      {
        id: "d8-e2",
        type: "multiple-choice",
        prompt: "What does 'geradeaus' mean?",
        options: ["turn right", "turn left", "straight ahead", "stop"],
        correctAnswer: "straight ahead",
        explanation: "'geradeaus' translates to straight ahead.",
        audioText: "geradeaus"
      },
      {
        id: "d8-e3",
        type: "match-pairs",
        prompt: "Match navigation terms:",
        correctAnswer: "pairs",
        explanation: "Master spatial terms for city navigation.",
        pairs: [
          { left: "links", right: "left" },
          { left: "rechts", right: "right" },
          { left: "geradeaus", right: "straight ahead" },
          { left: "in der Nähe", right: "nearby" }
        ]
      }
    ],
    xpReward: 25
  },
  {
    day: 9,
    milestone: 2,
    title: "Time, Days of the Week & Appointments",
    germanTitle: "Uhrzeit, Wochentage & Termine",
    topic: "Days, Scheduling & Telling Time",
    description: "Learn the German days of the week and how to state exact times and appointments.",
    cefrLevel: 'A1.2',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Days of the Week & 'Um wie viel Uhr?'",
      summary: "Days of the week are all masculine ('der'). To say 'on Monday', use 'am Montag'. For time, use 'um'.",
      rules: [
        "Days: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.",
        "On [Day]: 'am Montag', 'am Wochenende' (on the weekend).",
        "At [Time]: 'um 14:00 Uhr' (at 2:00 PM).",
        "Germans frequently use the 24-hour clock for train schedules and official times."
      ],
      examples: [
        { de: "Am Freitag habe ich einen Termin.", en: "On Friday I have an appointment." },
        { de: "Der Zug kommt um 15:30 Uhr an.", en: "The train arrives at 15:30." },
        { de: "Wie spät ist es?", en: "What time is it?" }
      ]
    },
    vocabulary: [
      { de: "der Montag", en: "Monday", gender: "der", example: "Bis Montag!", exampleEn: "See you Monday!" },
      { de: "der Freitag", en: "Friday", gender: "der", example: "Schönes Wochenende!", exampleEn: "Have a nice weekend!" },
      { de: "das Wochenende", en: "the weekend", gender: "das", example: "Am Wochenende entspanne ich.", exampleEn: "On the weekend I relax." },
      { de: "die Uhrzeit", en: "time of day", gender: "die", example: "Wie spät ist es?", exampleEn: "What time is it?" },
      { de: "der Termin", en: "appointment", gender: "der", example: "Ich habe einen Termin beim Arzt.", exampleEn: "I have an appointment at the doctor." },
      { de: "heute", en: "today", example: "Heute ist ein guter Tag.", exampleEn: "Today is a good day." }
    ],
    exercises: [
      {
        id: "d9-e1",
        type: "fill-blank",
        prompt: "Choose the preposition: 'Wir treffen uns ____ Freitag.' (We meet on Friday)",
        options: ["im", "am", "um", "an"],
        correctAnswer: "am",
        explanation: "German uses 'am' (an + dem) for days of the week: 'am Freitag'.",
        contextSentence: "Wir treffen uns am Freitag."
      },
      {
        id: "d9-e2",
        type: "multiple-choice",
        prompt: "Which preposition is used for specific times of day, like 'at 3 o'clock'?",
        options: ["am", "um", "in", "zu"],
        correctAnswer: "um",
        explanation: "Specific clock times always take 'um' (e.g., 'um drei Uhr').",
        audioText: "um drei Uhr"
      },
      {
        id: "d9-e3",
        type: "sentence-scramble",
        prompt: "Assemble: 'Today is Friday.'",
        options: ["Freitag.", "ist", "Heute"],
        correctAnswer: ["Heute", "ist", "Freitag."],
        explanation: "Simple sentence with time adverb first and verb in position 2.",
        contextSentence: "Heute ist Freitag."
      }
    ],
    xpReward: 25
  },
  {
    day: 10,
    milestone: 2,
    title: "Grocery Shopping & Market Quantities",
    germanTitle: "Im Supermarkt & Einkaufen",
    topic: "Groceries, Packaging & Weighing",
    description: "Buy fruits, vegetables, bread, and groceries at German supermarkets like Rewe, Edeka, and Aldi.",
    cefrLevel: 'A1.2',
    estimatedMinutes: 14,
    grammarNote: {
      title: "Shopping Phrases & Quantities",
      summary: "To ask for price: 'Wie viel kostet das?' (How much does that cost?).",
      rules: [
        "ein Kilo Äpfel = a kilo of apples",
        "ein Pfund = 500 grams (common at markets)",
        "eine Flasche Wasser = a bottle of water",
        "eine Packung = a pack/carton"
      ],
      examples: [
        { de: "Wie viel kostet ein Kilo Äpfel?", en: "How much does a kilo of apples cost?" },
        { de: "Ich nehme drei Brötchen, bitte.", en: "I'll take three bread rolls, please." },
        { de: "Brauchen Sie eine Tüte?", en: "Do you need a bag?" }
      ]
    },
    vocabulary: [
      { de: "der Supermarkt", en: "supermarket", gender: "der", example: "Ich gehe in den Supermarkt.", exampleEn: "I am going to the supermarket." },
      { de: "der Apfel", en: "apple", gender: "der", example: "Ein Kilo Äpfel, bitte.", exampleEn: "A kilo of apples, please." },
      { de: "das Brot", en: "bread", gender: "das", example: "Frisches Brot ist herrlich.", exampleEn: "Fresh bread is wonderful." },
      { de: "die Milch", en: "milk", gender: "die", example: "Ein Liter Milch.", exampleEn: "One liter of milk." },
      { de: "der Käse", en: "cheese", gender: "der", example: "Zwei Scheiben Käse.", exampleEn: "Two slices of cheese." },
      { de: "die Tüte", en: "bag", gender: "die", example: "Brauchen Sie den Beleg?", exampleEn: "Do you need the receipt?" }
    ],
    exercises: [
      {
        id: "d10-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'How much does that cost?'",
        options: ["das?", "kostet", "viel", "Wie"],
        correctAnswer: ["Wie", "viel", "kostet", "das?"],
        explanation: "'Wie viel kostet das?' is the most common price inquiry in German stores.",
        contextSentence: "Wie viel kostet das?"
      },
      {
        id: "d10-e2",
        type: "multiple-choice",
        prompt: "What does a German cashier mean when they ask 'Brauchen Sie den Beleg?'",
        options: ["Do you want a discount?", "Do you need the receipt?", "Do you have cash?", "Is everything okay?"],
        correctAnswer: "Do you need the receipt?",
        explanation: "'Der Beleg' or 'der Kassenbon' is the store receipt.",
        audioText: "Brauchen Sie den Beleg?"
      },
      {
        id: "d10-e3",
        type: "match-pairs",
        prompt: "Match food items with their German words:",
        correctAnswer: "pairs",
        explanation: "German grocery vocabulary.",
        pairs: [
          { left: "das Brot", right: "the bread" },
          { left: "der Käse", right: "the cheese" },
          { left: "die Milch", right: "the milk" },
          { left: "der Apfel", right: "the apple" }
        ]
      }
    ],
    xpReward: 25
  },
  {
    day: 11,
    milestone: 2,
    title: "German Food Culture & Dining",
    germanTitle: "Mahlzeiten & Essen in Deutschland",
    topic: "Dining Etiquette, Breakfast & Regional Dishes",
    description: "Explore traditional German meals, from hearty 'Frühstück' to dinner ('Abendbrot') and lunch toasts.",
    cefrLevel: 'A1.2',
    estimatedMinutes: 14,
    grammarNote: {
      title: "Verbs of Consumption: essen & trinken",
      summary: "'essen' has a vowel change in 2nd and 3rd person singular (du isst, er isst)!",
      rules: [
        "essen (to eat): ich esse, du isst, er/sie/es isst, wir essen, ihr esst, sie essen",
        "trinken (to drink): ich trinke, du trinkst, er trinkt, wir trinken",
        "Before eating, Germans say 'Guten Appetit!' or 'Mahlzeit!'. When toasting: 'Prost!' or 'Zum Wohl!'"
      ],
      examples: [
        { de: "Was isst du zum Frühstück?", en: "What do you eat for breakfast?" },
        { de: "Ich trinke gerne Mineralwasser.", en: "I like drinking sparkling water." },
        { de: "Guten Appetit allerseits!", en: "Enjoy your meal, everyone!" }
      ]
    },
    vocabulary: [
      { de: "das Frühstück", en: "breakfast", gender: "das", example: "Das Frühstück ist fertig.", exampleEn: "Breakfast is ready." },
      { de: "das Mittagessen", en: "lunch", gender: "das", example: "Was gibt es zum Mittagessen?", exampleEn: "What is there for lunch?" },
      { de: "das Abendbrot", en: "dinner (light bread meal)", gender: "das", example: "Um 19 Uhr gibt es Abendbrot.", exampleEn: "At 7 PM there is dinner." },
      { de: "Guten Appetit", en: "Enjoy your meal!", example: "Guten Appetit!", exampleEn: "Enjoy your meal!" },
      { de: "Prost", en: "Cheers!", example: "Prost auf unsere Freundschaft!", exampleEn: "Cheers to our friendship!" },
      { de: "schmecken", en: "to taste good", example: "Das schmeckt hervorragend!", exampleEn: "That tastes fantastic!" }
    ],
    exercises: [
      {
        id: "d11-e1",
        type: "fill-blank",
        prompt: "Fill with correct conjugated form of 'essen': 'Was ____ du gern?' (What do you like to eat?)",
        options: ["esst", "isst", "esse", "essen"],
        correctAnswer: "isst",
        explanation: "'du isst' has the vowel change from e to i.",
        contextSentence: "Was isst du gern?"
      },
      {
        id: "d11-e2",
        type: "multiple-choice",
        prompt: "What is the traditional German toast when drinking with friends?",
        options: ["Mahlzeit", "Prost", "Gute Nacht", "Willkommen"],
        correctAnswer: "Prost",
        explanation: "'Prost!' is the standard toast when raising glasses.",
        audioText: "Prost!"
      },
      {
        id: "d11-e3",
        type: "sentence-scramble",
        prompt: "Assemble: 'The food tastes great.'",
        options: ["schmeckt", "Essen", "Das", "sehr gut."],
        correctAnswer: ["Das", "Essen", "schmeckt", "sehr gut."],
        explanation: "'Das Essen schmeckt sehr gut.' is a polite compliment to a host or chef.",
        contextSentence: "Das Essen schmeckt sehr gut."
      }
    ],
    xpReward: 25
  },
  {
    day: 12,
    milestone: 2,
    title: "The Accusative Case: Den, Die, Das & Einen",
    germanTitle: "Der Akkusativ: Den, Die, Das & Einen",
    topic: "Direct Objects & Case Transformations",
    description: "Unlock the secret to the Accusative case: the direct receiver of an action. Notice why only masculine changes!",
    cefrLevel: 'A1.2',
    estimatedMinutes: 16,
    grammarNote: {
      title: "The Golden Rule of the Accusative Case",
      summary: "In the Accusative case (direct object), ONLY the masculine gender changes! Feminine, neuter, and plural stay unchanged.",
      rules: [
        "Masculine: der -> DEN | ein -> EINEN (Ich habe einen Hund / I have a dog)",
        "Feminine: die -> DIE | eine -> EINE (Ich habe eine Katze / I have a cat)",
        "Neuter: das -> DAS | ein -> EIN (Ich habe ein Buch / I have a book)",
        "Key verbs requiring Accusative: haben, brauchen, sehen, kaufen, trinken, essen."
      ],
      examples: [
        { de: "Ich brauche den Schlüssel.", en: "I need the key. (der Schlüssel -> den Schlüssel)" },
        { de: "Er kauft einen neuen Laptop.", en: "He buys a new laptop." },
        { de: "Wir trinken einen Apfelsaft.", en: "We are drinking an apple juice." }
      ]
    },
    vocabulary: [
      { de: "der Schlüssel", en: "the key", gender: "der", example: "Ich suche den Schlüssel.", exampleEn: "I am looking for the key." },
      { de: "brauchen", en: "to need", example: "Was brauchst du?", exampleEn: "What do you need?" },
      { de: "kaufen", en: "to buy", example: "Ich kaufe einen Kaffee.", exampleEn: "I am buying a coffee." },
      { de: "sehen", en: "to see", example: "Siehst du den Hund?", exampleEn: "Do you see the dog?" },
      { de: "der Hund", en: "the dog", gender: "der", example: "Er hat einen Hund.", exampleEn: "He has a dog." },
      { de: "die Katze", en: "the cat", gender: "die", example: "Sie hat eine Katze.", exampleEn: "She has a cat." }
    ],
    exercises: [
      {
        id: "d12-e1",
        type: "fill-blank",
        prompt: "Choose the correct accusative article: 'Ich kaufe ____ Kaffee.' (der Kaffee, masculine)",
        options: ["der", "den", "dem", "das"],
        correctAnswer: "den",
        explanation: "Masculine nouns change from 'der' to 'den' in the accusative direct object position.",
        contextSentence: "Ich kaufe den Kaffee."
      },
      {
        id: "d12-e2",
        type: "fill-blank",
        prompt: "Fill with indefinite accusative: 'Er hat ____ Hund.' (der Hund)",
        options: ["ein", "einen", "einem", "einer"],
        correctAnswer: "einen",
        explanation: "Indefinite masculine accusative is 'einen'.",
        contextSentence: "Er hat einen Hund."
      },
      {
        id: "d12-e3",
        type: "sentence-scramble",
        prompt: "Assemble: 'I need the key.'",
        options: ["den", "brauche", "Ich", "Schlüssel."],
        correctAnswer: ["Ich", "brauche", "den", "Schlüssel."],
        explanation: "'Ich brauche den Schlüssel.' uses masculine accusative 'den'.",
        contextSentence: "Ich brauche den Schlüssel."
      }
    ],
    xpReward: 30
  },
  {
    day: 13,
    milestone: 2,
    title: "Hobbies, Free Time & The Magic Word 'Gern'",
    germanTitle: "Freizeit, Hobbys & das Wort 'Gern'",
    topic: "Expressing Likes & Preferences",
    description: "Instead of saying 'I like to...', Germans simply add the adverb 'gern' right after the verb!",
    cefrLevel: 'A1.2',
    estimatedMinutes: 14,
    grammarNote: {
      title: "Using 'gern' (or 'gerne') for Preferences",
      summary: "To express that you enjoy doing an action, put 'gern' after the conjugated verb.",
      rules: [
        "Ich lese gern. = I like reading.",
        "Ich spiele gern Fußball. = I like playing football.",
        "Degrees of liking: gern (like) -> lieber (prefer) -> am liebsten (like the most)."
      ],
      examples: [
        { de: "Was machst du gern am Wochenende?", en: "What do you like doing on weekends?" },
        { de: "Ich koche sehr gern mit Freunden.", en: "I like cooking with friends very much." },
        { de: "Ich trinke lieber Tee als Kaffee.", en: "I prefer drinking tea over coffee." }
      ]
    },
    vocabulary: [
      { de: "das Hobby", en: "hobby", gender: "das", example: "Mein Hobby ist Fotografieren.", exampleEn: "My hobby is photography." },
      { de: "gern / gerne", en: "gladly / like doing", example: "Ich reise sehr gern.", exampleEn: "I really like traveling." },
      { de: "spielen", en: "to play", example: "Wir spielen Gitarre.", exampleEn: "We play guitar." },
      { de: "lesen", en: "to read", example: "Liest du gern Bücher?", exampleEn: "Do you like reading books?" },
      { de: "schwimmen", en: "to swim", example: "Im Sommer schwimme ich gern.", exampleEn: "In summer I like swimming." },
      { de: "die Musik", en: "music", gender: "die", example: "Ich höre gern Musik.", exampleEn: "I like listening to music." }
    ],
    exercises: [
      {
        id: "d13-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'I like listening to music.'",
        options: ["gern", "Ich", "Musik.", "höre"],
        correctAnswer: ["Ich", "höre", "gern", "Musik."],
        explanation: "'gern' is placed right after the conjugated verb 'höre'.",
        contextSentence: "Ich höre gern Musik."
      },
      {
        id: "d13-e2",
        type: "multiple-choice",
        prompt: "How do you say 'I prefer tea over coffee'?",
        options: ["Ich trinke am liebsten Kaffee.", "Ich trinke lieber Tee als Kaffee.", "Ich mag nicht Tee.", "Tee ist schlecht."],
        correctAnswer: "Ich trinke lieber Tee als Kaffee.",
        explanation: "'lieber' is the comparative form of 'gern' meaning 'prefer'.",
        audioText: "Ich trinke lieber Tee als Kaffee."
      },
      {
        id: "d13-e3",
        type: "match-pairs",
        prompt: "Match German verbs to hobbies:",
        correctAnswer: "pairs",
        explanation: "Common hobby verbs in German.",
        pairs: [
          { left: "schwimmen", right: "to swim" },
          { left: "kochen", right: "to cook" },
          { left: "reisen", right: "to travel" },
          { left: "wandern", right: "to hike" }
        ]
      }
    ],
    xpReward: 25
  },
  {
    day: 14,
    milestone: 2,
    title: "Family & Describing People",
    germanTitle: "Familie & Personen beschreiben",
    topic: "Family Members & Possessive Pronouns",
    description: "Talk about your family members (Eltern, Geschwister) and use 'mein' and 'dein' accurately.",
    cefrLevel: 'A1.2',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Possessive Pronouns: mein & dein",
      summary: "Possessive pronouns match noun gender: mein Bruder (m), meine Schwester (f), mein Kind (n), meine Eltern (pl).",
      rules: [
        "Masculine & Neuter: mein / dein",
        "Feminine & Plural: meine / deine (add -e!)",
        "Descriptive adjectives: groß (tall/big), klein (short/small), freundlich (friendly), jung (young), alt (old)."
      ],
      examples: [
        { de: "Das ist mein Bruder. Er ist sehr groß.", en: "This is my brother. He is very tall." },
        { de: "Meine Mutter wohnt in Hamburg.", en: "My mother lives in Hamburg." },
        { de: "Hast du Geschwister?", en: "Do you have siblings?" }
      ]
    },
    vocabulary: [
      { de: "die Familie", en: "family", gender: "die", example: "Meine Familie ist groß.", exampleEn: "My family is big." },
      { de: "der Vater", en: "father", gender: "der", example: "Mein Vater ist Lehrer.", exampleEn: "My father is a teacher." },
      { de: "die Mutter", en: "mother", gender: "die", example: "Meine Mutter kocht gern.", exampleEn: "My mother likes cooking." },
      { de: "der Bruder", en: "brother", gender: "der", example: "Mein Bruder heißt Felix.", exampleEn: "My brother is named Felix." },
      { de: "die Schwester", en: "sister", gender: "die", example: "Meine Schwester studiert.", exampleEn: "My sister studies." },
      { de: "die Eltern", en: "parents (pl.)", example: "Meine Eltern leben in Berlin.", exampleEn: "My parents live in Berlin." }
    ],
    exercises: [
      {
        id: "d14-e1",
        type: "fill-blank",
        prompt: "Choose the correct possessive: 'Das ist ____ Schwester.' (die Schwester, feminine)",
        options: ["mein", "meine", "meinen", "meinem"],
        correctAnswer: "meine",
        explanation: "Feminine nouns take 'meine' with an -e ending.",
        contextSentence: "Das ist meine Schwester."
      },
      {
        id: "d14-e2",
        type: "sentence-scramble",
        prompt: "Assemble: 'My brother lives in Berlin.'",
        options: ["Berlin.", "Mein", "wohnt", "in", "Bruder"],
        correctAnswer: ["Mein", "Bruder", "wohnt", "in", "Berlin."],
        explanation: "'Mein Bruder wohnt in Berlin.'",
        contextSentence: "Mein Bruder wohnt in Berlin."
      },
      {
        id: "d14-e3",
        type: "match-pairs",
        prompt: "Match family members:",
        correctAnswer: "pairs",
        explanation: "German family vocabulary.",
        pairs: [
          { left: "der Vater", right: "the father" },
          { left: "die Mutter", right: "the mother" },
          { left: "die Geschwister", right: "the siblings" },
          { left: "die Eltern", right: "the parents" }
        ]
      }
    ],
    xpReward: 25
  },
  {
    day: 15,
    milestone: 2,
    title: "Milestone 2 Checkpoint: Midterm Boss",
    germanTitle: "Meilenstein 2 Prüfung: Halbzeit Boss",
    topic: "15-Day Midterm Fluency Milestone Exam",
    description: "Halftime reached! You are now halfway through your 30-day journey. Prove your mastery of directions, time, shopping, and the Accusative case to earn the Silver Milestone Badge!",
    cefrLevel: 'A1.2',
    estimatedMinutes: 20,
    isMilestoneBoss: true,
    bossBadge: "Silver German Crest",
    grammarNote: {
      title: "Midterm Mastery & Self-Assessment",
      summary: "You can now handle daily logistics in Germany: navigating cities, booking times, buying food, ordering in cafes, and speaking about family and hobbies.",
      rules: [
        "Accusative case: masculine turns to 'den' / 'einen'.",
        "Days of the week take 'am', clock times take 'um'.",
        "Use 'gern' for hobbies.",
        "50% of the entire German curriculum completed!"
      ],
      examples: [
        { de: "Am Samstag gehe ich mit meinem Bruder einkaufen.", en: "On Saturday I go shopping with my brother." },
        { de: "Entschuldigung, wo ist der Bahnhof?", en: "Excuse me, where is the train station?" },
        { de: "Ich möchte bitte einen Kaffee und ein Brot.", en: "I would like a coffee and a bread, please." }
      ]
    },
    vocabulary: [
      { de: "die Halbzeit", en: "halftime / midpoint", gender: "die", example: "Wir haben die Halbzeit erreicht!", exampleEn: "We reached the midpoint!" },
      { de: "stolz", en: "proud", example: "Du kannst stolz auf dich sein.", exampleEn: "You can be proud of yourself." },
      { de: "das Ziel", en: "goal / destination", gender: "das", example: "Unser Ziel ist die Meisterschaft.", exampleEn: "Our goal is mastery." },
      { de: "fleißig", en: "diligent / hardworking", example: "Du lernst sehr fleißig.", exampleEn: "You learn very diligently." }
    ],
    exercises: [
      {
        id: "d15-e1",
        type: "multiple-choice",
        prompt: "[Midterm Q1] Which phrase accurately asks for directions to the supermarket?",
        options: ["Wo ist der Supermarkt?", "Wie viel kostet der Supermarkt?", "Ich kaufe den Supermarkt.", "Der Supermarkt ist lecker."],
        correctAnswer: "Wo ist der Supermarkt?",
        explanation: "'Wo ist der Supermarkt?' asks where the supermarket is located.",
        audioText: "Wo ist der Supermarkt?"
      },
      {
        id: "d15-e2",
        type: "fill-blank",
        prompt: "[Midterm Q2] Complete the accusative sentence: 'Er sucht ____ Schlüssel.' (der Schlüssel)",
        options: ["der", "den", "dem", "das"],
        correctAnswer: "den",
        explanation: "'Schlüssel' is masculine; direct object in accusative is 'den'.",
        contextSentence: "Er sucht den Schlüssel."
      },
      {
        id: "d15-e3",
        type: "sentence-scramble",
        prompt: "[Midterm Q3] Assemble: 'On Friday we meet at 18:00.'",
        options: ["um", "treffen", "wir", "Freitag", "uns.", "18:00", "Am"],
        correctAnswer: ["Am", "Freitag", "treffen", "wir", "uns", "um", "18:00."],
        explanation: "Time element first 'Am Freitag', verb in position 2 'treffen', clock time 'um 18:00'.",
        contextSentence: "Am Freitag treffen wir uns um 18:00."
      },
      {
        id: "d15-e4",
        type: "audio-listen",
        prompt: "[Midterm Q4] Listen and select the exact hobby preference spoken:",
        audioText: "Ich koche sehr gern am Wochenende.",
        options: ["Ich koche sehr gern am Wochenende.", "Ich lese gern am Abend.", "Ich schwimme gern im Sommer.", "Ich trinke gern Kaffee."],
        correctAnswer: "Ich koche sehr gern am Wochenende.",
        explanation: "The speaker said: 'Ich koche sehr gern am Wochenende.' (I really like cooking on weekends.)"
      },
      {
        id: "d15-e5",
        type: "match-pairs",
        prompt: "[Midterm Q5] Midterm Core Match: Everyday Mastery",
        correctAnswer: "pairs",
        explanation: "Review everyday communication terms.",
        pairs: [
          { left: "geradeaus", right: "straight ahead" },
          { left: "am Wochenende", right: "on the weekend" },
          { left: "einen Hund", right: "a dog (accusative)" },
          { left: "Wie viel kostet das?", right: "How much does that cost?" }
        ]
      }
    ],
    xpReward: 50
  },

  // ==========================================
  // MILESTONE 3: DAYS 16 - 30 (A2.1 Fluency & Mastery)
  // ==========================================
  {
    day: 16,
    milestone: 3,
    title: "Weather, Seasons & Small Talk",
    germanTitle: "Wetter & Jahreszeiten",
    topic: "Weather Expressions & Small Talk",
    description: "Start every casual German conversation with meteorological observations.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 14,
    grammarNote: {
      title: "Impersonal 'Es' for Weather",
      summary: "Weather verbs in German use the impersonal pronoun 'es' (it).",
      rules: [
        "Es regnet = It is raining.",
        "Die Sonne scheint = The sun is shining.",
        "Es ist warm / kalt / windig = It is warm / cold / windy.",
        "Seasons (der Frühling, der Sommer, der Herbst, der Winter) all take the preposition 'im' (im Sommer = in summer)."
      ],
      examples: [
        { de: "Heute ist das Wetter herrlich.", en: "Today the weather is glorious." },
        { de: "Es regnet in Strömen.", en: "It is pouring rain." },
        { de: "Im Winter schneit es oft in den Bergen.", en: "In winter it often snows in the mountains." }
      ]
    },
    vocabulary: [
      { de: "das Wetter", en: "the weather", gender: "das", example: "Wie ist das Wetter heute?", exampleEn: "How is the weather today?" },
      { de: "die Sonne", en: "the sun", gender: "die", example: "Die Sonne scheint hell.", exampleEn: "The sun is shining brightly." },
      { de: "der Regen", en: "the rain", gender: "der", example: "Ich mag den Regen nicht.", exampleEn: "I don't like the rain." },
      { de: "der Sommer", en: "summer", gender: "der", example: "Im Sommer fahren wir ans Meer.", exampleEn: "In summer we travel to the sea." },
      { de: "der Winter", en: "winter", gender: "der", example: "Im Winter ist es kalt.", exampleEn: "In winter it is cold." },
      { de: "windig", en: "windy", example: "Draußen ist es ziemlich windig.", exampleEn: "Outside it is quite windy." }
    ],
    exercises: [
      {
        id: "d16-e1",
        type: "multiple-choice",
        prompt: "What does 'Die Sonne scheint' mean?",
        options: ["It is raining", "The sun is shining", "It is freezing", "It is windy"],
        correctAnswer: "The sun is shining",
        explanation: "'Die Sonne scheint' translates directly to 'The sun shines'.",
        audioText: "Die Sonne scheint"
      },
      {
        id: "d16-e2",
        type: "fill-blank",
        prompt: "Choose the preposition: '____ Sommer fahre ich nach Österreich.' (In summer)",
        options: ["Am", "Im", "Um", "Zum"],
        correctAnswer: "Im",
        explanation: "Seasons and months take 'im' (in + dem): 'im Sommer'.",
        contextSentence: "Im Sommer fahre ich nach Österreich."
      },
      {
        id: "d16-e3",
        type: "sentence-scramble",
        prompt: "Assemble: 'Today the weather is very warm.'",
        options: ["warm.", "Heute", "das", "ist", "Wetter", "sehr"],
        correctAnswer: ["Heute", "ist", "das", "Wetter", "sehr", "warm."],
        explanation: "'Heute ist das Wetter sehr warm.'",
        contextSentence: "Heute ist das Wetter sehr warm."
      }
    ],
    xpReward: 25
  },
  {
    day: 17,
    milestone: 3,
    title: "Modal Verbs: Können, Müssen, Wollen, Dürfen",
    germanTitle: "Die Modalverben: Können & Müssen",
    topic: "Expressing Ability, Obligation & Permission",
    description: "Learn how modal verbs supercharge your ability to express possibilities and necessities.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 16,
    grammarNote: {
      title: "The Modal Verb Bracket Structure (Klammer)",
      summary: "In sentences with a modal verb, the modal verb is in position 2, and the main infinitive is pushed to the VERY END of the sentence!",
      rules: [
        "können (can/be able to): ich kann, du kannst, er kann, wir können",
        "müssen (must/have to): ich muss, du musst, er muss, wir müssen",
        "wollen (want to): ich will, du willst, er will, wir wollen",
        "dürfen (allowed to/may): ich darf, du darfst, er darf, wir dürfen"
      ],
      examples: [
        { de: "Ich kann sehr gut Deutsch sprechen.", en: "I can speak German very well. ('sprechen' is at the end!)" },
        { de: "Wir müssen jetzt nach Hause gehen.", en: "We must go home now." },
        { de: "Darf ich hier parken?", en: "May I park here?" }
      ]
    },
    vocabulary: [
      { de: "können", en: "can / to be able to", example: "Kannst du mir helfen?", exampleEn: "Can you help me?" },
      { de: "müssen", en: "must / to have to", example: "Ich muss morgen früh aufstehen.", exampleEn: "I must get up early tomorrow." },
      { de: "wollen", en: "to want to", example: "Was willst du heute machen?", exampleEn: "What do you want to do today?" },
      { de: "dürfen", en: "to be allowed to", example: "Hier darf man nicht rauchen.", exampleEn: "One is not allowed to smoke here." },
      { de: "sprechen", en: "to speak", example: "Ich kann Deutsch sprechen.", exampleEn: "I can speak German." },
      { de: "helfen", en: "to help", example: "Können Sie mir helfen?", exampleEn: "Can you help me?" }
    ],
    exercises: [
      {
        id: "d17-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'I can speak German.' (Watch the verb bracket!)",
        options: ["Deutsch", "kann", "Ich", "sprechen."],
        correctAnswer: ["Ich", "kann", "Deutsch", "sprechen."],
        explanation: "Modal verb 'kann' sits in position 2; infinitive 'sprechen' goes to the very end!",
        contextSentence: "Ich kann Deutsch sprechen."
      },
      {
        id: "d17-e2",
        type: "fill-blank",
        prompt: "Choose the correct modal form: 'Er ____ heute lange arbeiten.' (He must work long today)",
        options: ["muss", "müssen", "musst", "müsst"],
        correctAnswer: "muss",
        explanation: "Third person singular of müssen is 'er muss' (no umlaut).",
        contextSentence: "Er muss heute lange arbeiten."
      },
      {
        id: "d17-e3",
        type: "match-pairs",
        prompt: "Match modal verbs to their meanings:",
        correctAnswer: "pairs",
        explanation: "German modal verbs.",
        pairs: [
          { left: "können", right: "can / able to" },
          { left: "müssen", right: "must / have to" },
          { left: "wollen", right: "want to" },
          { left: "dürfen", right: "allowed to" }
        ]
      }
    ],
    xpReward: 30
  },
  {
    day: 18,
    milestone: 3,
    title: "Public Transit: U-Bahn, S-Bahn & Tickets",
    germanTitle: "Unterwegs: U-Bahn, Bus & Bahn",
    topic: "Trains, Platforms & Travel Logistics",
    description: "Navigate Germany's DB trains, urban U-Bahn subways, and ticketing systems without stress.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Transit Terminology & Preposition 'mit'",
      summary: "Transportation means always take the preposition 'mit' + Dative case: mit der U-Bahn, mit dem Bus, mit dem Zug.",
      rules: [
        "mit dem Zug (der Zug -> dem Zug)",
        "mit der U-Bahn (die U-Bahn -> der U-Bahn)",
        "das Gleis = platform/track (e.g. 'Auf Gleis 4')",
        "die Fahrkarte / das Ticket entwerfen = validate ticket"
      ],
      examples: [
        { de: "Ich fahre jeden Tag mit der U-Bahn.", en: "I ride the subway every day." },
        { de: "Der Zug nach München fährt von Gleis 7 ab.", en: "The train to Munich departs from platform 7." },
        { de: "Ein einfaches Ticket nach Frankfurt, bitte.", en: "A one-way ticket to Frankfurt, please." }
      ]
    },
    vocabulary: [
      { de: "die U-Bahn", en: "underground subway", gender: "die", example: "Die nächste U-Bahn kommt in 3 Minuten.", exampleEn: "The next subway arrives in 3 mins." },
      { de: "der Zug", en: "train", gender: "der", example: "Der Zug hat Verspätung.", exampleEn: "The train is delayed." },
      { de: "das Gleis", en: "platform / track", gender: "das", example: "Vorsicht an Gleis 3.", exampleEn: "Attention at platform 3." },
      { de: "die Fahrkarte", en: "transit ticket", gender: "die", example: "Haben Sie eine gültige Fahrkarte?", exampleEn: "Do you have a valid ticket?" },
      { de: "die Verspätung", en: "delay", gender: "die", example: "Fünf Minuten Verspätung.", exampleEn: "Five minutes delay." },
      { de: "umsteigen", en: "to transfer / change trains", example: "Sie müssen in Köln umsteigen.", exampleEn: "You need to transfer in Cologne." }
    ],
    exercises: [
      {
        id: "d18-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'The train departs from platform 4.'",
        options: ["fährt", "Gleis", "Der", "ab.", "4", "Zug", "auf"],
        correctAnswer: ["Der", "Zug", "fährt", "auf", "Gleis", "4", "ab."],
        explanation: "'Der Zug fährt auf Gleis 4 ab.' uses separable verb 'abfahren'.",
        contextSentence: "Der Zug fährt auf Gleis 4 ab."
      },
      {
        id: "d18-e2",
        type: "multiple-choice",
        prompt: "Which preposition is used when describing travel by train ('by train')?",
        options: ["in", "an", "mit", "bei"],
        correctAnswer: "mit",
        explanation: "Transportation methods use 'mit' + dative: 'mit dem Zug'.",
        audioText: "mit dem Zug"
      },
      {
        id: "d18-e3",
        type: "audio-listen",
        prompt: "Listen to the train announcement and identify the platform:",
        audioText: "Der Zug nach Hamburg fährt auf Gleis 5 ein.",
        options: ["Gleis 3", "Gleis 4", "Gleis 5", "Gleis 6"],
        correctAnswer: "Gleis 5",
        explanation: "The announcement said 'auf Gleis 5'."
      }
    ],
    xpReward: 30
  },
  {
    day: 19,
    milestone: 3,
    title: "The Dative Case: Dem, Der, Einem & Prepositions",
    germanTitle: "Der Dativ: Dem, Der & Dativ-Präpositionen",
    topic: "Indirect Objects & Fixed Dative Prepositions",
    description: "Master the famous Dative case (indirect receiver) and key prepositions: aus, bei, mit, nach, seit, von, zu.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 16,
    grammarNote: {
      title: "The Dative Case System",
      summary: "The Dative case marks the indirect object ('to whom' or 'for whom').",
      rules: [
        "Masculine & Neuter: der/das -> DEM | ein -> EINEM",
        "Feminine: die -> DER | eine -> EINER",
        "Plural: die -> DEN (+ n on the noun!)",
        "Fixed Dative prepositions: aus, bei, mit, nach, seit, von, zu (Mnemonic: Blue Danube tune!)."
      ],
      examples: [
        { de: "Ich helfe dem Mann.", en: "I help the man. (helfen requires dative)" },
        { de: "Ich fahre mit der Bahn.", en: "I travel with the train (feminine dative 'der')." },
        { de: "Nach der Arbeit gehe ich nach Hause.", en: "After work I go home." }
      ]
    },
    vocabulary: [
      { de: "helfen", en: "to help (takes dative)", example: "Kann ich Ihnen helfen?", exampleEn: "Can I help you?" },
      { de: "danken", en: "to thank (takes dative)", example: "Ich danke dir herzlich!", exampleEn: "I thank you warmly!" },
      { de: "nach", en: "after / towards", example: "Nach dem Unterricht trinken wir Kaffee.", exampleEn: "After class we drink coffee." },
      { de: "mit", en: "with (takes dative)", example: "Ich gehe mit meiner Freundin spazieren.", exampleEn: "I go for a walk with my girlfriend." },
      { de: "bei", en: "at / near (takes dative)", example: "Er arbeitet bei Siemens.", exampleEn: "He works at Siemens." },
      { de: "zu", en: "to (takes dative)", example: "Kommst du zu mir?", exampleEn: "Are you coming to my place?" }
    ],
    exercises: [
      {
        id: "d19-e1",
        type: "fill-blank",
        prompt: "Choose the correct dative article: 'Ich helfe ____ Frau.' (die Frau, feminine)",
        options: ["die", "der", "den", "dem"],
        correctAnswer: "der",
        explanation: "Feminine nouns change to 'der' in the dative case (die -> der).",
        contextSentence: "Ich helfe der Frau."
      },
      {
        id: "d19-e2",
        type: "fill-blank",
        prompt: "Choose the correct dative article: 'Er spricht mit ____ Lehrer.' (der Lehrer, masculine)",
        options: ["dem", "den", "der", "das"],
        correctAnswer: "dem",
        explanation: "Masculine nouns change to 'dem' in the dative case (der -> dem).",
        contextSentence: "Er spricht mit dem Lehrer."
      },
      {
        id: "d19-e3",
        type: "sentence-scramble",
        prompt: "Assemble: 'After work I go home.'",
        options: ["gehe", "Hause.", "ich", "Arbeit", "Nach", "der", "nach"],
        correctAnswer: ["Nach", "der", "Arbeit", "gehe", "ich", "nach", "Hause."],
        explanation: "'Nach der Arbeit gehe ich nach Hause.' Dative preposition 'nach' triggers 'der Arbeit'.",
        contextSentence: "Nach der Arbeit gehe ich nach Hause."
      }
    ],
    xpReward: 35
  },
  {
    day: 20,
    milestone: 3,
    title: "Expressing Opinions & Feelings",
    germanTitle: "Meinungen äußern & Gefühle",
    topic: "Expressing Views, Agreement & Disagreement",
    description: "Express your personal views in discussions: 'Ich finde, dass...', 'Meiner Meinung nach...', and polite debate.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Expressing Views with 'Ich finde' & 'Meiner Meinung nach'",
      summary: "To state an opinion, use 'Ich finde...' or 'Meiner Meinung nach...' followed immediately by the verb.",
      rules: [
        "Ich finde, das ist super! = I think that is great!",
        "Meiner Meinung nach ist das wichtig. (Notice inversion: after 'Meiner Meinung nach', verb 'ist' comes next!)",
        "Das stimmt! = That's true / I agree!",
        "Ich bin nicht sicher = I am not sure."
      ],
      examples: [
        { de: "Meiner Meinung nach ist Deutsch eine logische Sprache.", en: "In my opinion, German is a logical language." },
        { de: "Ich bin ganz deiner Meinung.", en: "I completely agree with you." },
        { de: "Das sehe ich anders.", en: "I see that differently." }
      ]
    },
    vocabulary: [
      { de: "die Meinung", en: "opinion", gender: "die", example: "Was ist deine Meinung dazu?", exampleEn: "What is your opinion on that?" },
      { de: "finden", en: "to find / think", example: "Ich finde die Idee klasse.", exampleEn: "I think the idea is great." },
      { de: "wichtig", en: "important", example: "Gesundheit ist sehr wichtig.", exampleEn: "Health is very important." },
      { de: "stimmen", en: "to be correct / true", example: "Das stimmt genau!", exampleEn: "That is exactly true!" },
      { de: "sicher", en: "sure / certain", example: "Bist du dir ganz sicher?", exampleEn: "Are you completely sure?" },
      { de: "interessant", en: "interesting", example: "Das ist ein interessanter Punkt.", exampleEn: "That is an interesting point." }
    ],
    exercises: [
      {
        id: "d20-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'In my opinion that is very important.'",
        options: ["wichtig.", "Meiner", "ist", "das", "Meinung", "nach", "sehr"],
        correctAnswer: ["Meiner", "Meinung", "nach", "ist", "das", "sehr", "wichtig."],
        explanation: "After 'Meiner Meinung nach', the verb 'ist' immediately occupies the next position.",
        contextSentence: "Meiner Meinung nach ist das sehr wichtig."
      },
      {
        id: "d20-e2",
        type: "multiple-choice",
        prompt: "How do you say 'I completely agree with you' in German?",
        options: ["Ich bin ganz deiner Meinung.", "Ich sehe das anders.", "Ich habe keine Zeit.", "Wo ist meine Meinung?"],
        correctAnswer: "Ich bin ganz deiner Meinung.",
        explanation: "'Ich bin ganz deiner Meinung' expresses full agreement.",
        audioText: "Ich bin ganz deiner Meinung."
      },
      {
        id: "d20-e3",
        type: "match-pairs",
        prompt: "Match discussion phrases:",
        correctAnswer: "pairs",
        explanation: "Key conversational debate expressions.",
        pairs: [
          { left: "Das stimmt!", right: "That's true!" },
          { left: "Das sehe ich anders.", right: "I see that differently." },
          { left: "Ich finde...", right: "I think / find..." },
          { left: "wichtig", right: "important" }
        ]
      }
    ],
    xpReward: 30
  },
  {
    day: 21,
    milestone: 3,
    title: "Health, Body Parts & At the Doctor",
    germanTitle: "Beim Arzt & Gesundheit",
    topic: "Medical Appointments & Describing Symptoms",
    description: "Explain physical symptoms, describe ailments, and visit a German pharmacy ('Apotheke').",
    cefrLevel: 'A2.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Describing Pain with 'weh tun' & 'Schmerzen'",
      summary: "In German you can say 'Mein Kopf tut weh' (My head hurts) or 'Ich habe Kopfschmerzen' (I have headaches).",
      rules: [
        "weh tun (separable): Mein Hals tut weh (singular) / Meine Beine tun weh (plural).",
        "Compound words with -schmerzen: Kopfschmerzen (headache), Bauchschmerzen (stomachache), Halsschmerzen (sore throat).",
        "Wishing someone recovery: 'Gute Besserung!' (Get well soon!)."
      ],
      examples: [
        { de: "Ich habe seit zwei Tagen Kopfschmerzen.", en: "I have had a headache for two days." },
        { de: "Gute Besserung und erhol dich gut!", en: "Get well soon and rest well!" },
        { de: "Nehmen Sie diese Tablette vor dem Essen.", en: "Take this tablet before eating." }
      ]
    },
    vocabulary: [
      { de: "der Arzt", en: "doctor", gender: "der", example: "Ich gehe zum Arzt.", exampleEn: "I am going to the doctor." },
      { de: "die Apotheke", en: "pharmacy", gender: "die", example: "Die Apotheke hat Notdienst.", exampleEn: "The pharmacy is on emergency duty." },
      { de: "die Kopfschmerzen", en: "headache (pl.)", example: "Ich habe starke Kopfschmerzen.", exampleEn: "I have a severe headache." },
      { de: "weh tun", en: "to hurt / ache", example: "Mein Rücken tut weh.", exampleEn: "My back hurts." },
      { de: "die Tablette", en: "pill / tablet", gender: "die", example: "Zwei Tabletten täglich.", exampleEn: "Two tablets daily." },
      { de: "Gute Besserung", en: "Get well soon!", example: "Gute Besserung!", exampleEn: "Get well soon!" }
    ],
    exercises: [
      {
        id: "d21-e1",
        type: "multiple-choice",
        prompt: "What is the customary German wish for someone who is sick?",
        options: ["Guten Appetit!", "Gute Besserung!", "Herzlichen Glückwunsch!", "Schönes Wochenende!"],
        correctAnswer: "Gute Besserung!",
        explanation: "'Gute Besserung!' is German for 'Get well soon!'.",
        audioText: "Gute Besserung!"
      },
      {
        id: "d21-e2",
        type: "sentence-scramble",
        prompt: "Assemble: 'My back hurts.'",
        options: ["tut", "Rücken", "Mein", "weh."],
        correctAnswer: ["Mein", "Rücken", "tut", "weh."],
        explanation: "Separable verb 'wehtun' splits: 'Mein Rücken tut weh.'",
        contextSentence: "Mein Rücken tut weh."
      },
      {
        id: "d21-e3",
        type: "match-pairs",
        prompt: "Match ailments with their English meanings:",
        correctAnswer: "pairs",
        explanation: "German medical terms.",
        pairs: [
          { left: "Kopfschmerzen", right: "headache" },
          { left: "Bauchschmerzen", right: "stomachache" },
          { left: "die Apotheke", right: "the pharmacy" },
          { left: "das Fieber", right: "fever" }
        ]
      }
    ],
    xpReward: 30
  },
  {
    day: 22,
    milestone: 3,
    title: "Talking About the Past: Das Perfekt",
    germanTitle: "Die Vergangenheit: Das Perfekt",
    topic: "Spoken Past Tense with Haben & Sein",
    description: "Unlock the spoken past tense (Perfekt)—how native speakers talk about what happened yesterday or last year!",
    cefrLevel: 'A2.1',
    estimatedMinutes: 18,
    grammarNote: {
      title: "Forming the Conversational Past (Perfekt)",
      summary: "In spoken German, past events are expressed using 'haben' or 'sein' (in position 2) + the Partizip II (ge-...-t / ge-...-en) at the END of the sentence!",
      rules: [
        "Standard rule: haben + ge...t (Ich habe gelernt = I learned / have learned)",
        "Movement or state change verbs take 'sein': Ich bin gefahren (I drove), Ich bin gegangen (I went), Ich bin aufgewacht (I woke up).",
        "Sentence structure: Gestern HABE ich einen Film GESEHEN."
      ],
      examples: [
        { de: "Was hast du gestern gemacht?", en: "What did you do yesterday?" },
        { de: "Ich habe gestern viel Deutsch gelernt.", en: "I learned a lot of German yesterday." },
        { de: "Wir sind nach Berlin gefahren.", en: "We traveled/drove to Berlin (uses 'sein')." }
      ]
    },
    vocabulary: [
      { de: "gestern", en: "yesterday", example: "Gestern war schönes Wetter.", exampleEn: "Yesterday the weather was nice." },
      { de: "gemacht", en: "done / made", example: "Was hast du gemacht?", exampleEn: "What did you do?" },
      { de: "gelernt", en: "learned", example: "Ich habe fleißig gelernt.", exampleEn: "I learned diligently." },
      { de: "gesehen", en: "seen", example: "Hast du den Film gesehen?", exampleEn: "Did you see the movie?" },
      { de: "gefahren", en: "driven / traveled", example: "Wir sind mit dem Zug gefahren.", exampleEn: "We traveled by train." },
      { de: "gegangen", en: "walked / gone", example: "Er ist nach Hause gegangen.", exampleEn: "He went home." }
    ],
    exercises: [
      {
        id: "d22-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'What did you do yesterday?'",
        options: ["hast", "gestern", "du", "gemacht?", "Was"],
        correctAnswer: ["Was", "hast", "du", "gestern", "gemacht?"],
        explanation: "Question word 'Was', auxiliary 'hast', subject 'du', adverb 'gestern', participle 'gemacht' at the end.",
        contextSentence: "Was hast du gestern gemacht?"
      },
      {
        id: "d22-e2",
        type: "fill-blank",
        prompt: "Verbs of motion use 'sein' in the past: 'Ich ____ nach Berlin gefahren.'",
        options: ["habe", "bin", "hat", "war"],
        correctAnswer: "bin",
        explanation: "Movement verbs (like fahren, gehen, fliegen) take 'sein': 'Ich bin gefahren'.",
        contextSentence: "Ich bin nach Berlin gefahren."
      },
      {
        id: "d22-e3",
        type: "audio-listen",
        prompt: "Listen to the past tense sentence:",
        audioText: "Ich habe gestern Deutsch gelernt.",
        options: ["Ich habe gestern Deutsch gelernt.", "Ich lerne heute Deutsch.", "Ich will Deutsch lernen.", "Ich spreche Deutsch."],
        correctAnswer: "Ich habe gestern Deutsch gelernt.",
        explanation: "Spoken sentence: 'Ich habe gestern Deutsch gelernt.' (I learned German yesterday.)"
      }
    ],
    xpReward: 35
  },
  {
    day: 23,
    milestone: 3,
    title: "German Separable Verbs in Daily Action",
    germanTitle: "Trennbare Verben im Alltag",
    topic: "Separable Prefixes (aufstehen, einkaufen, anfangen)",
    description: "Learn how German verbs split in two! The prefix detaches and flies to the very end of the clause.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 16,
    grammarNote: {
      title: "How Separable Verbs Split",
      summary: "Common prefixes like ab-, an-, auf-, aus-, ein-, mit-, vor-, and zu- detach in present tense main clauses and move to the end.",
      rules: [
        "aufstehen (to get up): Ich stehe um 7 Uhr AUF.",
        "einkaufen (to shop): Wir kaufen im Supermarkt EIN.",
        "anfangen (to start): Der Film fängt um 20 Uhr AN.",
        "mitkommen (to come along): Kommst du MIT?"
      ],
      examples: [
        { de: "Wann stehst du morgens auf?", en: "When do you get up in the morning?" },
        { de: "Ich rufe dich später an.", en: "I'll call you later (anrufen -> rufe... an)." },
        { de: "Bitte mach die Tür zu!", en: "Please close the door! (zumachen -> mach... zu)." }
      ]
    },
    vocabulary: [
      { de: "aufstehen", en: "to get up", example: "Ich stehe früh auf.", exampleEn: "I get up early." },
      { de: "anrufen", en: "to call on phone", example: "Rufst du mich an?", exampleEn: "Will you call me?" },
      { de: "einkaufen", en: "to grocery shop", example: "Wir kaufen am Samstag ein.", exampleEn: "We shop on Saturday." },
      { de: "anfangen", en: "to begin / start", example: "Die Show fängt an.", exampleEn: "The show begins." },
      { de: "fernsehen", en: "to watch TV", example: "Er sieht gern fern.", exampleEn: "He likes watching TV." },
      { de: "mitkommen", en: "to come along", example: "Kommst du heute mit?", exampleEn: "Are you coming along today?" }
    ],
    exercises: [
      {
        id: "d23-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'I get up at 7 o'clock.' (Split 'aufstehen'!)",
        options: ["stehe", "7", "auf.", "Ich", "um", "Uhr"],
        correctAnswer: ["Ich", "stehe", "um", "7", "Uhr", "auf."],
        explanation: "Verb 'stehe' in position 2, prefix 'auf' at the very end.",
        contextSentence: "Ich stehe um 7 Uhr auf."
      },
      {
        id: "d23-e2",
        type: "fill-blank",
        prompt: "Complete the sentence with prefix of 'anrufen': 'Ich rufe meine Mutter ____.'",
        options: ["auf", "an", "aus", "mit"],
        correctAnswer: "an",
        explanation: "The verb is 'anrufen', so the detached prefix is 'an'.",
        contextSentence: "Ich rufe meine Mutter an."
      },
      {
        id: "d23-e3",
        type: "match-pairs",
        prompt: "Match separable verbs with their meanings:",
        correctAnswer: "pairs",
        explanation: "Common separable German verbs.",
        pairs: [
          { left: "aufstehen", right: "to get up" },
          { left: "anrufen", right: "to call (phone)" },
          { left: "einkaufen", right: "to shop" },
          { left: "anfangen", right: "to begin" }
        ]
      }
    ],
    xpReward: 30
  },
  {
    day: 24,
    milestone: 3,
    title: "Travel & Booking Accommodations",
    germanTitle: "Reisen & Hotelbuchung",
    topic: "Hotels, Check-in & Travel Inquiries",
    description: "Check into a hotel, reserve a room with breakfast, and ask for local recommendations.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Hotel Booking Phrases",
      summary: "Learn essential phrases to check in, request wifi, and confirm room details.",
      rules: [
        "ein Einzelzimmer = a single room",
        "ein Doppelzimmer = a double room",
        "inklusive Frühstück = including breakfast",
        "Gibt es kostenloses WLAN? = Is there free Wi-Fi?"
      ],
      examples: [
        { de: "Ich habe ein Zimmer auf den Namen Weber reserviert.", en: "I reserved a room under the name Weber." },
        { de: "Ab wann gibt es Frühstück?", en: "From when is breakfast available?" },
        { de: "Wo ist das Passwort für das WLAN?", en: "Where is the password for the Wi-Fi?" }
      ]
    },
    vocabulary: [
      { de: "das Hotel", en: "hotel", gender: "das", example: "Das Hotel ist sehr zentral.", exampleEn: "The hotel is very central." },
      { de: "das Zimmer", en: "room", gender: "das", example: "Ein ruhiges Zimmer mit Aussicht.", exampleEn: "A quiet room with a view." },
      { de: "das Doppelzimmer", en: "double room", gender: "das", example: "Wir möchten ein Doppelzimmer.", exampleEn: "We would like a double room." },
      { de: "reservieren", en: "to reserve", example: "Haben Sie reserviert?", exampleEn: "Did you make a reservation?" },
      { de: "das WLAN", en: "Wi-Fi", gender: "das", example: "Das WLAN ist schnell und kostenlos.", exampleEn: "The Wi-Fi is fast and free." },
      { de: "der Schlüssel", en: "room key / card", gender: "der", example: "Hier ist Ihre Zimmerkarte.", exampleEn: "Here is your room card." }
    ],
    exercises: [
      {
        id: "d24-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'I reserved a double room.'",
        options: ["Doppelzimmer", "Ich", "habe", "ein", "reserviert."],
        correctAnswer: ["Ich", "habe", "ein", "Doppelzimmer", "reserviert."],
        explanation: "Perfekt past tense: 'Ich habe ein Doppelzimmer reserviert.'",
        contextSentence: "Ich habe ein Doppelzimmer reserviert."
      },
      {
        id: "d24-e2",
        type: "multiple-choice",
        prompt: "What does 'inklusive Frühstück' mean?",
        options: ["Without breakfast", "Breakfast included", "Breakfast at 10", "No food permitted"],
        correctAnswer: "Breakfast included",
        explanation: "'inklusive Frühstück' means breakfast is included in the room price.",
        audioText: "inklusive Frühstück"
      },
      {
        id: "d24-e3",
        type: "audio-listen",
        prompt: "Listen to the hotel reception question:",
        audioText: "Wie ist Ihr Name, bitte?",
        options: ["Wie ist Ihr Name, bitte?", "Wie viel kostet das Zimmer?", "Haben Sie ein Zimmer frei?", "Wo ist das WLAN?"],
        correctAnswer: "Wie ist Ihr Name, bitte?",
        explanation: "The receptionist asked for the guest's name ('Wie ist Ihr Name, bitte?')."
      }
    ],
    xpReward: 30
  },
  {
    day: 25,
    milestone: 3,
    title: "German Idioms & Colloquial Gems",
    germanTitle: "Deutsche Redewendungen & Slang",
    topic: "Authentic Idioms Native Speakers Love",
    description: "Sound like a true local with famous German idioms: 'Das ist nicht mein Bier', 'Ich verstehe nur Bahnhof', and 'Ich drücke die Daumen'!",
    cefrLevel: 'A2.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Understanding Cultural Idioms",
      summary: "German idioms often involve food, beer, pigs (Schwein haben = to be lucky), and railways!",
      rules: [
        "'Ich verstehe nur Bahnhof' = I understand nothing (literally: I only understand train station).",
        "'Ich drücke dir die Daumen' = I'm crossing my fingers for you (literally: pressing thumbs).",
        "'Das ist nicht mein Bier' = That is not my problem/business.",
        "'Schwein haben' = To have great luck."
      ],
      examples: [
        { de: "Für die Prüfung drücke ich dir fest die Daumen!", en: "For the exam I'm keeping my fingers firmly crossed for you!" },
        { de: "Sorry, ich verstehe nur Bahnhof.", en: "Sorry, it's all Greek to me / I understand nothing." },
        { de: "Da hast du aber Schwein gehabt!", en: "You got really lucky there!" }
      ]
    },
    vocabulary: [
      { de: "die Daumen drücken", en: "to cross fingers / wish luck", example: "Ich drücke dir die Daumen!", exampleEn: "I'll keep my fingers crossed for you!" },
      { de: "nur Bahnhof verstehen", en: "to not understand a thing", example: "Ich verstehe nur Bahnhof.", exampleEn: "It makes zero sense to me." },
      { de: "Schwein haben", en: "to be lucky", example: "Wir haben Schwein gehabt.", exampleEn: "We were very lucky." },
      { de: "nicht mein Bier", en: "not my business", example: "Das ist nicht mein Bier.", exampleEn: "That's none of my business." },
      { de: "Na und?", en: "So what?", example: "Na und? Macht doch nichts!", exampleEn: "So what? It doesn't matter!" },
      { de: "Alles klar", en: "All clear / Got it!", example: "Alles klar, machen wir so!", exampleEn: "All clear, let's do it like that!" }
    ],
    exercises: [
      {
        id: "d25-e1",
        type: "multiple-choice",
        prompt: "What does someone mean if they say 'Ich verstehe nur Bahnhof'?",
        options: ["I want to go to the train station", "I understand nothing at all", "The train is loud", "I bought a train ticket"],
        correctAnswer: "I understand nothing at all",
        explanation: "A beloved German idiom meaning 'It makes no sense to me / I understand zero'.",
        audioText: "Ich verstehe nur Bahnhof"
      },
      {
        id: "d25-e2",
        type: "sentence-scramble",
        prompt: "Assemble: 'I am crossing my fingers for you!'",
        options: ["drücke", "die", "Ich", "dir", "Daumen!"],
        correctAnswer: ["Ich", "drücke", "dir", "die", "Daumen!"],
        explanation: "'Ich drücke dir die Daumen!' is the German equivalent of crossing fingers.",
        contextSentence: "Ich drücke dir die Daumen!"
      },
      {
        id: "d25-e3",
        type: "match-pairs",
        prompt: "Match colorful German idioms to their true meanings:",
        correctAnswer: "pairs",
        explanation: "German idioms decoded.",
        pairs: [
          { left: "Schwein haben", right: "To be lucky" },
          { left: "nicht mein Bier", right: "Not my business" },
          { left: "Daumen drücken", right: "Wish good luck" },
          { left: "Alles klar", right: "All good / Understood" }
        ]
      }
    ],
    xpReward: 30
  },
  {
    day: 26,
    milestone: 3,
    title: "Work, Career & Daily Workplace Routines",
    germanTitle: "Arbeit, Beruf & Alltag",
    topic: "Occupations, Office Talk & Feierabend",
    description: "Talk about your job, describe projects, and understand Germany's sacred cultural concept: 'Feierabend'!",
    cefrLevel: 'A2.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Describing Occupations without 'ein'",
      summary: "In German, when saying what job you do, you do NOT use an article: 'Ich bin Ingenieur' (not 'ein Ingenieur')!",
      rules: [
        "Ich arbeite als Entwickler / Ärztin / Lehrer.",
        "Female professions add -in: der Lehrer -> die Lehrerin, der Arzt -> die Ärztin.",
        "'Feierabend machen' = Clocking out / finishing work for the evening.",
        "Der Kollege (m) / die Kollegin (f) = coworker."
      ],
      examples: [
        { de: "Ich arbeite als Software-Entwickler bei einem Start-up.", en: "I work as a software developer at a startup." },
        { de: "Endlich Feierabend! Lass uns ein Bier trinken.", en: "Work is finally done! Let's drink a beer." },
        { de: "Meine Kollegen sind sehr hilfsbereit.", en: "My coworkers are very helpful." }
      ]
    },
    vocabulary: [
      { de: "der Beruf", en: "occupation / profession", gender: "der", example: "Was bist du von Beruf?", exampleEn: "What is your profession?" },
      { de: "die Arbeit", en: "work / job", gender: "die", example: "Ich gehe zur Arbeit.", exampleEn: "I am going to work." },
      { de: "der Feierabend", en: "end of workday / knock-off time", gender: "der", example: "Schönen Feierabend!", exampleEn: "Have a nice evening after work!" },
      { de: "der Kollege", en: "colleague (m)", gender: "der", example: "Mein Kollege hilft mir.", exampleEn: "My colleague helps me." },
      { de: "die Besprechung", en: "meeting", gender: "die", example: "Wir haben eine Besprechung um 10 Uhr.", exampleEn: "We have a meeting at 10 AM." },
      { de: "das Projekt", en: "project", gender: "das", example: "Das Projekt läuft super.", exampleEn: "The project is going great." }
    ],
    exercises: [
      {
        id: "d26-e1",
        type: "multiple-choice",
        prompt: "What does 'Schönen Feierabend!' mean when coworkers leave the office?",
        options: ["Have a nice weekend!", "Enjoy your evening after work!", "Good luck on the project!", "See you in an hour!"],
        correctAnswer: "Enjoy your evening after work!",
        explanation: "'Feierabend' marks the sacred time when work ends for the day.",
        audioText: "Schönen Feierabend!"
      },
      {
        id: "d26-e2",
        type: "fill-blank",
        prompt: "How do you say 'I work as a developer' in German? 'Ich arbeite ____ Entwickler.'",
        options: ["wie", "als", "für", "mit"],
        correctAnswer: "als",
        explanation: "German uses 'als' for profession: 'arbeiten als...'.",
        contextSentence: "Ich arbeite als Entwickler."
      },
      {
        id: "d26-e3",
        type: "sentence-scramble",
        prompt: "Assemble: 'Have a nice evening after work!'",
        options: ["Feierabend!", "Schönen"],
        correctAnswer: ["Schönen", "Feierabend!"],
        explanation: "'Schönen Feierabend!' is standard German office etiquette.",
        contextSentence: "Schönen Feierabend!"
      }
    ],
    xpReward: 30
  },
  {
    day: 27,
    milestone: 3,
    title: "Conjunctions & Word Order: Weil, Dass, Obwohl",
    germanTitle: "Satzbau & Nebensätze: Weil, Dass & Obwohl",
    topic: "Subordinating Conjunctions & Verb-at-the-End",
    description: "The most famous German grammatical rule: subordinating conjunctions push the conjugated verb to the very end of the clause!",
    cefrLevel: 'A2.1',
    estimatedMinutes: 18,
    grammarNote: {
      title: "The Subordinate Clause (Nebensatz) Rule",
      summary: "When connecting ideas with 'weil' (because), 'dass' (that), or 'obwohl' (although), the conjugated verb MUST jump to the final spot in that clause.",
      rules: [
        "Normal: Ich habe keine Zeit. (Verb in pos 2)",
        "With 'weil': ...weil ich keine Zeit HABE. (Verb pushed to the end!)",
        "With 'dass': Ich weiß, dass du fleißig BIST.",
        "A comma is ALWAYS required before subordinating conjunctions in German."
      ],
      examples: [
        { de: "Ich lerne Deutsch, weil ich in Berlin arbeiten will.", en: "I learn German because I want to work in Berlin." },
        { de: "Er freut sich, dass du gekommen bist.", en: "He is glad that you came." },
        { de: "Obwohl es regnet, machen wir einen Spaziergang.", en: "Although it is raining, we take a walk." }
      ]
    },
    vocabulary: [
      { de: "weil", en: "because (verb at end)", example: "Ich lerne, weil es Spaß macht.", exampleEn: "I learn because it is fun." },
      { de: "dass", en: "that (verb at end)", example: "Ich hoffe, dass alles gut geht.", exampleEn: "I hope that everything goes well." },
      { de: "obwohl", en: "although (verb at end)", example: "Obwohl es kalt ist, gehe ich raus.", exampleEn: "Although it is cold, I go out." },
      { de: "aber", en: "but (does not change order)", example: "Ich will, aber ich kann nicht.", exampleEn: "I want to, but I can't." },
      { de: "deshalb", en: "therefore", example: "Es regnet, deshalb bleibe ich hier.", exampleEn: "It rains, therefore I stay here." },
      { de: "wenn", en: "if / when (verb at end)", example: "Wenn du Zeit hast, melde dich.", exampleEn: "When you have time, get in touch." }
    ],
    exercises: [
      {
        id: "d27-e1",
        type: "sentence-scramble",
        prompt: "Assemble with 'weil' (verb to the end!): '...because it is fun.'",
        options: ["macht.", "Spaß", "es", "weil"],
        correctAnswer: ["weil", "es", "Spaß", "macht."],
        explanation: "Conjunction 'weil' pushes the conjugated verb 'macht' to the very end!",
        contextSentence: "Ich lerne Deutsch, weil es Spaß macht."
      },
      {
        id: "d27-e2",
        type: "multiple-choice",
        prompt: "Where does the conjugated verb go in a clause starting with 'weil'?",
        options: ["Position 1", "Position 2", "At the very end", "It disappears"],
        correctAnswer: "At the very end",
        explanation: "'weil' is a subordinating conjunction which moves the verb to the end of the clause.",
        audioText: "weil es Spaß macht"
      },
      {
        id: "d27-e3",
        type: "fill-blank",
        prompt: "Complete the sentence: 'Ich hoffe, dass du morgen Zeit ____.'",
        options: ["hast", "hast du", "habe", "haben"],
        correctAnswer: "hast",
        explanation: "In 'dass' clauses, the conjugated verb ('hast') goes at the very end.",
        contextSentence: "Ich hoffe, dass du morgen Zeit hast."
      }
    ],
    xpReward: 35
  },
  {
    day: 28,
    milestone: 3,
    title: "German Cultural Etiquette & Traditions",
    germanTitle: "Deutsche Kultur, Feste & Höflichkeit",
    topic: "Punctuality, Gemütlichkeit & Traditions",
    description: "Deep dive into German cultural norms: Pünktlichkeit (punctuality), quiet hours (Ruhezeit), and recycling.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 15,
    grammarNote: {
      title: "Cultural Values & Living in Germany",
      summary: "Key cultural touchstones every German speaker respects:",
      rules: [
        "Pünktlichkeit: Being 5 minutes early is considered on time. Being 10 minutes late requires a phone call.",
        "Ruhezeit: Sundays and nights after 22:00 are quiet hours—no drilling, loud music, or lawn mowers!",
        "Mülltrennung: Strict recycling (Papier, Bio, Plastik/Gelber Sack, Restmüll).",
        "Gemütlichkeit: The warm, cozy feeling of contentment with good company and comforting food."
      ],
      examples: [
        { de: "Pünktlichkeit ist in Deutschland sehr wichtig.", en: "Punctuality is very important in Germany." },
        { de: "Sonntags ist Ruhezeit.", en: "Sundays are quiet hours." },
        { de: "Wir machen es uns heute Abend gemütlich.", en: "We are making ourselves cozy tonight." }
      ]
    },
    vocabulary: [
      { de: "die Pünktlichkeit", en: "punctuality", gender: "die", example: "Pünktlichkeit wird sehr geschätzt.", exampleEn: "Punctuality is highly valued." },
      { de: "die Gemütlichkeit", en: "coziness / warmth", gender: "die", example: "Hier herrscht echte Gemütlichkeit.", exampleEn: "Genuine coziness prevails here." },
      { de: "die Ruhezeit", en: "quiet hours", gender: "die", example: "Bitte beachten Sie die Ruhezeit.", exampleEn: "Please respect quiet hours." },
      { de: "das Fest", en: "celebration / festival", gender: "das", example: "Wir feiern ein großes Fest.", exampleEn: "We are celebrating a big festival." },
      { de: "die Tradition", en: "tradition", gender: "die", example: "Eine alte deutsche Tradition.", exampleEn: "An old German tradition." },
      { de: "die Umwelt", en: "environment", gender: "die", example: "Wir schützen die Umwelt.", exampleEn: "We protect the environment." }
    ],
    exercises: [
      {
        id: "d28-e1",
        type: "multiple-choice",
        prompt: "What is the German term for the unique feeling of warmth, coziness, and belonging?",
        options: ["Pünktlichkeit", "Gemütlichkeit", "Mahlzeit", "Ruhezeit"],
        correctAnswer: "Gemütlichkeit",
        explanation: "'Gemütlichkeit' is untranslatable directly into English—it embodies coziness, good food, and warm friendship.",
        audioText: "Gemütlichkeit"
      },
      {
        id: "d28-e2",
        type: "sentence-scramble",
        prompt: "Assemble: 'Punctuality is very important in Germany.'",
        options: ["ist", "Deutschland", "wichtig.", "Pünktlichkeit", "in", "sehr"],
        correctAnswer: ["Pünktlichkeit", "ist", "in", "Deutschland", "sehr", "wichtig."],
        explanation: "'Pünktlichkeit ist in Deutschland sehr wichtig.'",
        contextSentence: "Pünktlichkeit ist in Deutschland sehr wichtig."
      },
      {
        id: "d28-e3",
        type: "match-pairs",
        prompt: "Match German cultural concepts:",
        correctAnswer: "pairs",
        explanation: "German cultural vocabulary.",
        pairs: [
          { left: "Pünktlichkeit", right: "Punctuality" },
          { left: "Ruhezeit", right: "Quiet hours" },
          { left: "Gemütlichkeit", right: "Coziness & warmth" },
          { left: "die Umwelt", right: "Environment" }
        ]
      }
    ],
    xpReward: 30
  },
  {
    day: 29,
    milestone: 3,
    title: "Conversational Flow & Storytelling",
    germanTitle: "Geschichten erzählen & Freies Sprechen",
    topic: "Connecting Thoughts & Narration",
    description: "Tie together everything you've learned into smooth, flowing paragraphs and spontaneous dialogue.",
    cefrLevel: 'A2.1',
    estimatedMinutes: 18,
    grammarNote: {
      title: "Story Connectors & Narrative Words",
      summary: "Use transitions to weave sentences together like a native German speaker.",
      rules: [
        "zuerst (first) -> dann (then) -> danach (after that) -> schließlich (finally).",
        "Inversion rule: When a transition word starts a sentence, the verb immediately follows!",
        "Example: 'Zuerst BIN ich gelaufen, dann HABE ich gegessen.'"
      ],
      examples: [
        { de: "Zuerst haben wir Berlin besichtigt, danach sind wir nach Potsdam gefahren.", en: "First we toured Berlin, after that we traveled to Potsdam." },
        { de: "Schließlich haben wir das Ziel erreicht.", en: "Finally we reached the destination." },
        { de: "Ich kann mich jetzt fließend auf Deutsch unterhalten.", en: "I can now converse fluently in German." }
      ]
    },
    vocabulary: [
      { de: "zuerst", en: "first / at first", example: "Zuerst trinken wir Kaffee.", exampleEn: "First we drink coffee." },
      { de: "dann", en: "then", example: "Dann gehen wir spazieren.", exampleEn: "Then we go for a walk." },
      { de: "danach", en: "afterwards", example: "Danach ruhen wir uns aus.", exampleEn: "After that we rest." },
      { de: "schließlich", en: "finally / ultimately", example: "Schließlich kamen wir an.", exampleEn: "Finally we arrived." },
      { de: "erzählen", en: "to tell / narrate", example: "Erzähl mir deine Geschichte!", exampleEn: "Tell me your story!" },
      { de: "die Erfahrung", en: "experience", gender: "die", example: "Eine wunderbare Erfahrung.", exampleEn: "A wonderful experience." }
    ],
    exercises: [
      {
        id: "d29-e1",
        type: "sentence-scramble",
        prompt: "Assemble: 'First we drink coffee, then we go.'",
        options: ["wir", "wir.", "gehen", "Kaffee,", "trinken", "dann", "Zuerst"],
        correctAnswer: ["Zuerst", "trinken", "wir", "Kaffee,", "dann", "gehen", "wir."],
        explanation: "Notice the inversion: 'Zuerst trinken wir..., dann gehen wir.'",
        contextSentence: "Zuerst trinken wir Kaffee, dann gehen wir."
      },
      {
        id: "d29-e2",
        type: "multiple-choice",
        prompt: "Which sequence correctly arranges chronological story flow?",
        options: [
          "zuerst -> danach -> schließlich",
          "schließlich -> zuerst -> dann",
          "danach -> zuerst -> dann",
          "dann -> schließlich -> zuerst"
        ],
        correctAnswer: "zuerst -> danach -> schließlich",
        explanation: "'zuerst' (first), 'danach' (afterwards), and 'schließlich' (finally) form the natural chronological narrative order.",
        audioText: "zuerst, danach, schließlich"
      },
      {
        id: "d29-e3",
        type: "match-pairs",
        prompt: "Match story transitions:",
        correctAnswer: "pairs",
        explanation: "German transition connectors.",
        pairs: [
          { left: "zuerst", right: "first" },
          { left: "danach", right: "afterwards" },
          { left: "schließlich", right: "finally" },
          { left: "erzählen", right: "to tell / narrate" }
        ]
      }
    ],
    xpReward: 35
  },
  {
    day: 30,
    milestone: 3,
    title: "Grand Graduation: 30-Day Mastery Exam",
    germanTitle: "Abschluss-Prüfung: Das 30-Tage Meister-Zertifikat",
    topic: "30-Day Comprehensive German Master Exam",
    description: "The summit of your journey! Test your accumulated vocabulary, grammar, listening comprehension, and conversational fluency to claim the Gold German Mastery Diploma!",
    cefrLevel: 'A2.1',
    estimatedMinutes: 25,
    isMilestoneBoss: true,
    bossBadge: "Gold 30-Day Master Crown",
    grammarNote: {
      title: "Herzlichen Glückwunsch! (Congratulations!)",
      summary: "You have conquered all 30 days of the German curriculum—from zero to confident A2 speaker!",
      rules: [
        "Milestone 1 (Days 1-7): Foundations, Greetings, Gender, cafe ordering.",
        "Milestone 2 (Days 8-15): Directions, Time, Grocery shopping, Accusative.",
        "Milestone 3 (Days 16-30): Dative, Modals, Past tense (Perfekt), Separable verbs, 'Weil' clauses, and Culture!",
        "You are now ready to visit Germany, Austria, and Switzerland with genuine speaking confidence!"
      ],
      examples: [
        { de: "Ich habe in 30 Tagen Deutsch gelernt!", en: "I learned German in 30 days!" },
        { de: "Ich kann mich auf Deutsch unterhalten.", en: "I can converse in German." },
        { de: "Übung macht den Meister!", en: "Practice makes the master! (German proverb)" }
      ]
    },
    vocabulary: [
      { de: "die Meisterschaft", en: "mastery / championship", gender: "die", example: "Du hast die Meisterschaft erreicht!", exampleEn: "You achieved mastery!" },
      { de: "das Zertifikat", en: "certificate", gender: "das", example: "Hier ist dein offizielles Zertifikat.", exampleEn: "Here is your official certificate." },
      { de: "der Absolvent", en: "graduate", gender: "der", example: "Herzlichen Glückwunsch, Absolvent!", exampleEn: "Congratulations, graduate!" },
      { de: "die Zukunft", en: "the future", gender: "die", example: "Viel Erfolg für die Zukunft!", exampleEn: "Much success for the future!" }
    ],
    exercises: [
      {
        id: "d30-e1",
        type: "multiple-choice",
        prompt: "[Graduation Q1] Which sentence correctly demonstrates the 'weil' subordinating rule?",
        options: [
          "Ich lerne Deutsch, weil ich in Deutschland wohnen will.",
          "Ich lerne Deutsch, weil ich will in Deutschland wohnen.",
          "Ich lerne Deutsch, weil wohnen ich in Deutschland will.",
          "Ich lerne Deutsch, weil will ich in Deutschland wohnen."
        ],
        correctAnswer: "Ich lerne Deutsch, weil ich in Deutschland wohnen will.",
        explanation: "In 'weil' clauses, all verbs go to the end with the finite conjugated auxiliary 'will' in final position.",
        audioText: "weil ich in Deutschland wohnen will"
      },
      {
        id: "d30-e2",
        type: "fill-blank",
        prompt: "[Graduation Q2] Choose the correct Dative preposition article: 'Wir fahren mit ____ Zug nach Berlin.' (der Zug)",
        options: ["der", "den", "dem", "das"],
        correctAnswer: "dem",
        explanation: "'mit' always takes the Dative case; masculine 'der Zug' becomes 'dem Zug'.",
        contextSentence: "Wir fahren mit dem Zug nach Berlin."
      },
      {
        id: "d30-e3",
        type: "sentence-scramble",
        prompt: "[Graduation Q3] Assemble: 'In 30 days I learned German.' (Past tense!)",
        options: ["habe", "Tagen", "ich", "In", "30", "gelernt.", "Deutsch"],
        correctAnswer: ["In", "30", "Tagen", "habe", "ich", "Deutsch", "gelernt."],
        explanation: "'In 30 Tagen habe ich Deutsch gelernt.' Auxiliary 'habe' in pos 2, participle 'gelernt' at the end.",
        contextSentence: "In 30 Tagen habe ich Deutsch gelernt."
      },
      {
        id: "d30-e4",
        type: "audio-listen",
        prompt: "[Graduation Q4] Listen to the famous German proverb spoken:",
        audioText: "Übung macht den Meister.",
        options: [
          "Übung macht den Meister.",
          "Morgenstund hat Gold im Mund.",
          "Aller Anfang ist schwer.",
          "Ende gut, alles gut."
        ],
        correctAnswer: "Übung macht den Meister.",
        explanation: "'Übung macht den Meister' is the German equivalent of 'Practice makes perfect / Practice makes the master'."
      },
      {
        id: "d30-e5",
        type: "match-pairs",
        prompt: "[Graduation Q5] Grand Finale Match: 30-Day German Mastery",
        correctAnswer: "pairs",
        explanation: "Celebrate complete German language mastery across all milestones!",
        pairs: [
          { left: "Guten Tag", right: "Hello / Good day" },
          { left: "der Akkusativ", right: "Direct object (den)" },
          { left: "der Dativ", right: "Indirect object (dem)" },
          { left: "die Meisterschaft", right: "Mastery" }
        ]
      }
    ],
    xpReward: 100
  }
];

export const INITIAL_DAILY_CHALLENGES = [
  {
    id: "ch-1",
    title: "Tageslektion meisterhaft",
    description: "Complete today's designated German lesson",
    target: 1,
    current: 0,
    rewardXp: 40,
    rewardGems: 15,
    completed: false,
    claimed: false,
    icon: "BookOpen"
  },
  {
    id: "ch-2",
    title: "Wortschatz-Blitz",
    description: "Practice and master 5 German vocabulary cards",
    target: 5,
    current: 0,
    rewardXp: 25,
    rewardGems: 10,
    completed: false,
    claimed: false,
    icon: "Sparkles"
  },
  {
    id: "ch-3",
    title: "Perfekte Aussprache",
    description: "Score 100% accuracy on any listening exercise",
    target: 1,
    current: 0,
    rewardXp: 35,
    rewardGems: 12,
    completed: false,
    claimed: false,
    icon: "Volume2"
  },
  {
    id: "ch-4",
    title: "XP Sammler",
    description: "Earn at least 60 XP across learning activities today",
    target: 60,
    current: 0,
    rewardXp: 50,
    rewardGems: 20,
    completed: false,
    claimed: false,
    icon: "Zap"
  }
];

export const MOCK_LEADERBOARD_USERS = [
  { id: "u-1", name: "Sophie M.", avatar: "👩‍💼", country: "Austria", flag: "🇦🇹", xp: 1420, streak: 28, rank: 1, trend: 'up' as const },
  { id: "u-2", name: "Lukas K.", avatar: "👨‍💻", country: "Germany", flag: "🇩🇪", xp: 1310, streak: 24, rank: 2, trend: 'same' as const },
  { id: "u-3", name: "Elena R.", avatar: "👩‍🎨", country: "Switzerland", flag: "🇨🇭", xp: 1190, streak: 19, rank: 3, trend: 'up' as const },
  { id: "u-user", name: "Du (You)", avatar: "🚀", country: "International", flag: "🌍", xp: 320, streak: 4, rank: 4, isUser: true, trend: 'up' as const },
  { id: "u-4", name: "Mateo G.", avatar: "👨‍🎓", country: "Spain", flag: "🇪🇸", xp: 290, streak: 3, rank: 5, trend: 'down' as const },
  { id: "u-5", name: "Chloe D.", avatar: "👩‍🔬", country: "France", flag: "🇫🇷", xp: 250, streak: 5, rank: 6, trend: 'same' as const },
  { id: "u-6", name: "Kenji T.", avatar: "👨‍🍳", country: "Japan", flag: "🇯🇵", xp: 210, streak: 2, rank: 7, trend: 'down' as const },
  { id: "u-7", name: "Sarah W.", avatar: "👩‍🏫", country: "United States", flag: "🇺🇸", xp: 180, streak: 1, rank: 8, trend: 'same' as const }
];
