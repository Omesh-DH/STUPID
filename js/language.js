/**
 * STUPID - German Language Support
 * Adds German language support with culturally specific dark humor
 */

// ============================================
// German Language Data
// ============================================
const STUPID_GERMAN = {
    // Phrases
    phrases: [
        "Es gibt keine dummen Fragen. Nur dumme Menschen.",
        "Deine Dummheit ist nicht mein Problem.",
        "Das ist nicht mein Zirkus, nicht meine Affen.",
        "Alles Gute kommt von oben. Auch der Hagel."
    ],
    
    // Dad Jokes
    dadJokes: [
        "Warum können Geister nicht lügen? Weil man durch sie hindurchsehen kann.",
        "Treffen sich zwei Magneten. Sagt der eine: 'Was soll ich heute bloß anziehen?'",
        "Ich habe einen Witz über die Mauer. Aber der ist noch nicht so richtig rübergekommen.",
        "Warum hat der Computer eine Brille? Damit er besser sehen kann!",
        "Treffen sich zwei Tomaten auf der Straße. Sagt die eine: 'Beeil dich!' Sagt die andere: 'Ich hetze ja schon!'",
        "Was ist grün und steht vor der Tür? Ein Klopfsalat.",
        "Warum können Fische nicht Basketball spielen? Weil sie Angst vor dem Netz haben.",
        "Was sagt ein Pinguin im Dschungel? Hier ist ja kein Eis!",
        "Warum fliegt ein Vogel nach Süden? Weil es zu weit ist, um zu laufen.",
        "Was ist der Lieblingssnack von Geistern? Schockolade."
    ],
    
    // Corporate Roasts
    corporateRoasts: [
        "Wir sind wie eine Familie. (Eine kaputte.)",
        "Homeoffice: Wo 'Anzug' 'Oben Anzug, unten Jogginghose' bedeutet.",
        "Das Meeting hätte eine E-Mail sein können. (Diese E-Mail hätte Schweigen sein können.)",
        "Wir haben eine offene Türpolitik. (Die Tür ist immer zu.)",
        "Feedback ist uns wichtig. (Es ist nicht.)",
        "Wir schätzen Work-Life-Balance. (E-Mails um 2 Uhr morgens beweisen das.)",
        "Wir sind alle gleich. (Aber einige sind gleicher.)",
        "Deine Meinung zählt. (Aber nicht so viel wie meine.)",
        "Wir sind ein Team. (Du bist das schwache Glied.)",
        "Arbeite hart, dann klappt das schon. (Wird es nicht.)"
    ],
    
    // Loading Messages
    loadingMessages: [
        "Lädt... anders als dein Potenzial.",
        "Bitte warten... ähnlich wie dein Karrierefortschritt.",
        "Nachdenken... etwas, das du versuchen solltest.",
        "Berechne wie dumm du bist...",
        "Generiere Ausreden...",
        "Lade deine Reue...",
        "Kompiliere deine Misserfolge...",
        "Bereite dich darauf vor, dich zu enttäuschen...",
        "Initialisiere existenzielle Angst...",
        "Starte deine Bewältigungsmechanismen..."
    ],
    
    // Error Messages
    errorMessages: [
        "404: Motivation nicht gefunden.",
        "Etwas ist schiefgelaufen. Genau wie deine Lebensentscheidungen.",
        "Versuche es nochmal. Und nochmal. Und nochmal. Umarme den Schmerz.",
        "Fehler: Benutzerkompetenz unzureichend.",
        "Der Server hat einen Kaffee getrunken und vergessen, was er tun sollte.",
        "Dein Browser ist veraltet. Genau wie deine Denkweise."
    ],
    
    // Button Text
    buttonText: {
        submit: "Verpflichte dich zu dieser schlechten Entscheidung",
        cancel: "Gib auf (Schon wieder)",
        learnMore: "Füttere deine Illusion von Fortschritt",
        getStarted: "Tue so, als würdest du weitermachen",
        tryAgain: "Versuche es nochmal",
        giveUp: "Gib auf",
        share: "Teilen",
        save: "Speichern"
    },
    
    // Onboarding Questions
    onboardingQuestions: {
        goal: {
            question: "Was ist dein Ziel?",
            options: ["Nicht sterben", "Lebendig auf LinkedIn aussehen", "Menschen beeindrucken, die ich nicht mag"]
        },
        feeling: {
            question: "Wie fühlst du dich heute?",
            options: ["Überlebend", "Alles hinterfragend", "Innerlich weinend"]
        },
        reason: {
            question: "Was führt dich hierher?",
            options: ["Verzweiflung", "Neugier", "Man hat mir Geld gegeben, das herunterzuladen"]
        }
    },
    
    // Achievement Badges
    achievements: {
        first_open: {
            title: "Du hast die App geöffnet!",
            description: "(Erstes Mal ist gratis.)"
        },
        onboarding_complete: {
            title: "Onboarding abgeschlossen!",
            description: "(Wir sind genauso überrascht wie du.)"
        },
        seven_day_streak: {
            title: "7-Tage-Serie!",
            description: "(Du hast 7 Tage konsequent verschwendet.)"
        },
        asked_question: {
            title: "Frage gestellt!",
            description: "(Sie war trotzdem dumm.)"
        },
        completed_challenge: {
            title: "Herausforderung abgeschlossen!",
            description: "(Wir sind genauso überrascht wie du.)"
        },
        meditation_master: {
            title: "Meditationsmeister",
            description: "(Du bist 10 Mal eingeschlafen.)"
        },
        joke_connoisseur: {
            title: "Witzkenner",
            description: "(Du hast 100 schlechte Witze gelesen.)"
        },
        motivation_ignorer: {
            title: "Motivationsignorierer",
            description: "(Du hast 50 Zitate gelesen und nichts getan.)"
        }
    },
    
    // Page Titles
    pageTitles: {
        home: "STUPID | Selbst-Therapie für Unmotivierte Menschen in Leugnung",
        meditation: "Meditieren | STUPID",
        motivation: "Motivation | STUPID",
        tracking: "Verfolge dein Scheitern | STUPID",
        jokes: "Witz-Datenbank | STUPID",
        about: "Über | STUPID",
        achievements: "Erfolge | STUPID",
        onboarding: "Einrichtung | STUPID"
    },
    
    // Section Titles
    sectionTitles: {
        features: "Funktionen, die dein Leben nicht verändern werden",
        testimonials: "Was unsere Nutzer NICHT sagen",
        pricing: "Pläne, die dein Leben nicht verbessern werden",
        meditation: "Meditieren",
        motivation: "Motivation",
        tracking: "Verfolge dein Scheitern",
        achievements: "Deine Erfolge"
    },
    
    // Descriptions
    descriptions: {
        app: "Selbst-Therapie für Unmotivierte Menschen in Leugnung. Denn das Ignorieren deiner Probleme war noch nie so ästhetisch.",
        meditation: "Befreie deinen Geist von allen Gedanken. Besonders von denen, wie teuer diese App ist.",
        motivation: "Lass dich von Zitaten inspirieren, die tief klingen, aber nichts bedeuten. Perfekt für LinkedIn-Posts.",
        tracking: "Verfolge dein Scheitern in schönen Diagrammen. Beobachte, wie deine Motivation in Echtzeit abflacht.",
        jokes: "Eine riesige Sammlung von Vater-Witzen, schwarzem Humor und satirischen Inhalten, die dich stöhnen, lachen oder weinen lassen.",
        about: "Selbst-Therapie für Unmotivierte Menschen in Leugnung. Denn das Ignorieren deiner Probleme war noch nie so ästhetisch."
    }
};

// ============================================
// Language Utility Functions
// ============================================

/**
 * Get German text for a given category and key
 * @param {string} category - The category (e.g., 'buttonText', 'phrases')
 * @param {string} key - The key within the category
 * @returns {string} The German text
 */
function getGermanText(category, key) {
    if (STUPID_GERMAN[category] && STUPID_GERMAN[category][key]) {
        return STUPID_GERMAN[category][key];
    }
    return STUPID_GERMAN[category] || key;
}

/**
 * Get all German jokes from a specific category
 * @param {string} category - The joke category
 * @returns {string[]} Array of German jokes
 */
function getGermanJokes(category) {
    const categories = {
        'dadJokes': 'dadJokes',
        'darkDadJokes': 'dadJokes',
        'wellnessRoasts': 'corporateRoasts',
        'corporateGaslighting': 'corporateRoasts',
        'randomChaos': 'phrases'
    };
    
    const germanCategory = categories[category] || 'dadJokes';
    return STUPID_GERMAN[germanCategory] || [];
}

/**
 * Get a random German joke from a specific category
 * @param {string} category - The joke category
 * @returns {string} A random German joke
 */
function getRandomGermanJoke(category) {
    const jokes = getGermanJokes(category);
    if (!jokes || jokes.length === 0) {
        return getRandomGermanJoke('dadJokes');
    }
    return jokes[Math.floor(Math.random() * jokes.length)];
}

/**
 * Get a random German joke from any category
 * @returns {string} A random German joke
 */
function getRandomGermanJokeAny() {
    const allJokes = [];
    Object.values(STUPID_GERMAN).forEach(category => {
        if (Array.isArray(category)) {
            allJokes.push(...category);
        }
    });
    return allJokes[Math.floor(Math.random() * allJokes.length)];
}

// ============================================
// Export for use in other modules
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STUPID_GERMAN,
        getGermanText,
        getGermanJokes,
        getRandomGermanJoke,
        getRandomGermanJokeAny
    };
}

// Make available globally
window.STUPID_GERMAN = STUPID_GERMAN;
window.getGermanText = getGermanText;
window.getGermanJokes = getGermanJokes;
window.getRandomGermanJoke = getRandomGermanJoke;
window.getRandomGermanJokeAny = getRandomGermanJokeAny;
