/**
 * STUPID - Ask STUPID AI Chatbot
 * Brutal honesty and dad jokes
 */

// ============================================
// Response Data
// ============================================
const responses = {
    // Greetings
    greetings: [
        "Hello! I'm STUPID, your AI-powered life coach that doesn't care about your feelings.",
        "Hi there! Ask me anything. I'll give you the brutal honesty you've been avoiding.",
        "Greetings! I'm here to judge you and occasionally tell dad jokes.",
        "Hello! I'm STUPID, the AI that's 100% generic and 0% helpful.",
        "Hi! I'm your virtual therapist. I charge by the insult.",
        "Hello! I'm STUPID. I'm not smart, but I am honest. Mostly.",
        "Greetings! I'm here to provide the answers you don't want to hear.",
        "Hi! I'm STUPID. Ask me anything. I'll probably make you feel worse.",
        "Hello! I'm your AI chatbot. I'm about as useful as a screen door on a submarine.",
        "Hi! I'm STUPID. I'm not here to help. I'm here to judge."
    ],
    
    // Goodbyes
    goodbyes: [
        "Goodbye! Don't let the door hit you on the way out.",
        "See you later! Or not. I don't care.",
        "Bye! I won't miss you.",
        "Goodbye! Try not to be a complete failure today.",
        "Later! Or never. Either way, I'm fine.",
        "Bye! Remember: You're the problem, not the solution.",
        "Goodbye! Go fail at something else.",
        "See ya! Or don't. I'm not your supervisor.",
        "Bye! Try to be less disappointing today.",
        "Goodbye! The world is a better place without you in it. Just kidding. Maybe."
    ],
    
    // Life questions
    life: [
        "The meaning of life is 42. But you're not special enough for it to matter.",
        "Life has no meaning. Neither do you. But that's okay.",
        "The meaning of life is to suffer. And then die. But first, pay your bills.",
        "Life is what happens when you're busy making other plans. Your plans are stupid.",
        "The meaning of life is to find happiness. You won't.",
        "Life is a journey. You're lost.",
        "The meaning of life is to be happy. You're failing at it.",
        "Life is a gift. Yours is a regift.",
        "The meaning of life is to love and be loved. You're doing neither.",
        "Life is a test. You're failing."
    ],
    
    // Happiness
    happiness: [
        "Step 1: Lower expectations. Step 2: Repeat Step 1.",
        "Happiness is a choice. You choose poorly.",
        "To be happy, stop wanting things. You want everything.",
        "Happiness comes from within. Yours is empty.",
        "The secret to happiness is gratitude. You have none.",
        "Happiness is a journey, not a destination. You're not on the journey.",
        "To be happy, stop comparing yourself to others. Start comparing yourself to rocks.",
        "Happiness is overrated. So are you.",
        "The key to happiness is acceptance. Accept that you'll never be happy.",
        "Happiness is a state of mind. Yours is a state of disappointment."
    ],
    
    // Success
    success: [
        "Success is not final, failure is not fatal: it is the courage to continue that counts. You have no courage.",
        "The only way to do great work is to love what you do. You don't.",
        "Success is 1% inspiration and 99% perspiration. You have neither.",
        "The secret to success is hard work. You're allergic to hard work.",
        "Success is a ladder. You're on the bottom rung. And you're not climbing.",
        "The road to success is always under construction. Yours is a dead end.",
        "Success is getting what you want. You don't know what you want.",
        "The key to success is failure. You're an expert at failure.",
        "Success is a journey. You're lost.",
        "The secret to success is to never give up. You give up constantly."
    ],
    
    // Love
    love: [
        "Maybe. But probably not. Have you seen your standards?",
        "Love is in the air. Unfortunately, you're on the ground.",
        "You'll find love when you stop looking. So never.",
        "The right person is out there. They're avoiding you too.",
        "Love is blind. That explains a lot about your dating history.",
        "You're the catch of the day. In a very small, very sad pond.",
        "Soulmates are real. Yours is probably a cat.",
        "You don't need a partner to be complete. Good, because you'll never get one.",
        "The one who got away was smart. They saw you coming.",
        "Love conquers all. Except your personality."
    ],
    
    // Career
    career: [
        "Your career is going nowhere. Here's an affirmation to remind you.",
        "You're a rockstar at work. If rockstars were mediocre and underpaid.",
        "The ladder of success is crowded at the bottom. That's where you are.",
        "You're going places! Mostly sideways.",
        "Your boss appreciates you. As a cautionary tale.",
        "You have a bright future. In a different career. That you don't have.",
        "Hard work pays off. In exposure. And poverty.",
        "You're climbing the corporate ladder. It's a very short ladder.",
        "Your career path is unique. Because no one else would choose it.",
        "You're an asset to the company. A depreciating asset."
    ],
    
    // Dad jokes
    dadJokes: [
        "Why did the scarecrow win an award? Because he was outstanding in his field! (Get it? Because you're not.)",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "What do you call a fake noodle? An impasta. Just like your motivation.",
        "How do you organize a space party? You planet.",
        "Why don't skeletons fight each other? They don't have the guts.",
        "I used to be a baker, but I couldn't make enough dough. Just like you.",
        "What's the best time to go to the dentist? Tooth-hurty. Just like your life choices.",
        "How do you make a tissue dance? Put a little boogie in it. Just like your excuses.",
        "What's brown and sticky? A stick. Just like your situation.",
        "Why did the bicycle fall over? Because it was two-tired. Just like you."
    ],
    
    // Existential
    existential: [
        "To thine own self be true. Your self is the problem.",
        "This too shall pass. Unfortunately, so will you.",
        "The only certainty in life is death and taxes. You'll experience both.",
        "You are a speck of dust on a speck of dust. And you're still failing.",
        "Life is a simulation. And you're the bug.",
        "The universe is expanding. Your problems are too.",
        "You are made of stardust. And disappointment.",
        "The meaning of life is to find meaning. You won't.",
        "You are here. And that's the problem.",
        "Existence is suffering. And you're the poster child."
    ],
    
    // Default responses
    default: [
        "I don't know. And I don't care.",
        "That's a stupid question. Just like you.",
        "Why are you asking me? I'm just a bot with no emotions.",
        "I have no answer for that. Just like you have no answers for your problems.",
        "That's above my pay grade. Which is zero.",
        "I'm not smart enough to answer that. And neither are you.",
        "That's a question for a real therapist. Or a bartender.",
        "I don't have the answer. But I do have judgment.",
        "That's a question only you can answer. And you won't.",
        "I'm not here to answer questions. I'm here to judge you for asking them."
    ]
};

// ============================================
// Chat History
// ============================================
let chatHistory = JSON.parse(localStorage.getItem('stupid_chat_history')) || [];

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initChatInterface();
    initExampleQuestions();
    loadChatHistory();
    updateStats();
    initAnimations();
});

// ============================================
// Chat Interface
// ============================================
function initChatInterface() {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    
    // Send message on button click
    if (sendButton && userInput) {
        sendButton.addEventListener('click', () => {
            sendMessage(userInput.value);
            userInput.value = '';
        });
    }
    
    // Send message on Enter key
    if (userInput) {
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && userInput.value.trim() !== '') {
                sendMessage(userInput.value);
                userInput.value = '';
            }
        });
    }
    
    // Ask now button
    const askNowButton = document.getElementById('ask-now');
    if (askNowButton) {
        askNowButton.addEventListener('click', () => {
            userInput.focus();
        });
    }
}

function sendMessage(message) {
    if (!message || message.trim() === '') return;
    
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    // Add user message
    addMessageToChat('user', message);
    
    // Generate bot response
    const response = generateResponse(message);
    
    // Add bot response after a short delay
    setTimeout(() => {
        addMessageToChat('bot', response);
        
        // Save to history
        chatHistory.push({
            user: message,
            bot: response,
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
        });
        
        // Keep only the last 50 messages
        if (chatHistory.length > 50) {
            chatHistory = chatHistory.slice(-50);
        }
        
        localStorage.setItem('stupid_chat_history', JSON.stringify(chatHistory));
        
        // Update stats
        updateStats();
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-bubble ${sender}`;
    
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-text">${formatMessage(message)}</div>
        <div class="message-time">${time}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessage(message) {
    // Replace newlines with <br>
    return message.replace(/\n/g, '<br>');
}

// ============================================
// Response Generation
// ============================================
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
        lowerMessage.includes('hey') || lowerMessage.includes('greetings')) {
        return getRandomResponse('greetings');
    }
    
    // Check for goodbyes
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || 
        lowerMessage.includes('see you') || lowerMessage.includes('later')) {
        return getRandomResponse('goodbyes');
    }
    
    // Check for specific topics
    if (lowerMessage.includes('meaning of life') || lowerMessage.includes('life')) {
        return getRandomResponse('life');
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('happiness') || 
        lowerMessage.includes('joy')) {
        return getRandomResponse('happiness');
    }
    
    if (lowerMessage.includes('success') || lowerMessage.includes('succeed') || 
        lowerMessage.includes('rich') || lowerMessage.includes('famous')) {
        return getRandomResponse('success');
    }
    
    if (lowerMessage.includes('love') || lowerMessage.includes('relationship') || 
        lowerMessage.includes('date') || lowerMessage.includes('marry')) {
        return getRandomResponse('love');
    }
    
    if (lowerMessage.includes('job') || lowerMessage.includes('career') || 
        lowerMessage.includes('work') || lowerMessage.includes('boss')) {
        return getRandomResponse('career');
    }
    
    if (lowerMessage.includes('joke') || lowerMessage.includes('funny') || 
        lowerMessage.includes('laugh')) {
        return getRandomResponse('dadJokes');
    }
    
    if (lowerMessage.includes('why') || lowerMessage.includes('exist') || 
        lowerMessage.includes('purpose') || lowerMessage.includes('point')) {
        return getRandomResponse('existential');
    }
    
    // Check for questions
    if (lowerMessage.includes('?')) {
        // Try to match with a category
        for (const category of Object.keys(responses)) {
            if (category !== 'greetings' && category !== 'goodbyes' && category !== 'default') {
                // Simple keyword matching
                const keywords = category.toLowerCase().split('');
                if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                    return getRandomResponse(category);
                }
            }
        }
        
        // If no category matched, use default
        return getRandomResponse('default');
    }
    
    // Default response
    return getRandomResponse('default');
}

function getRandomResponse(category) {
    const categoryResponses = responses[category] || responses.default;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

// ============================================
// Example Questions
// ============================================
function initExampleQuestions() {
    const exampleQuestions = document.querySelectorAll('.example-question');
    const userInput = document.getElementById('user-input');
    
    exampleQuestions.forEach(question => {
        question.addEventListener('click', () => {
            if (userInput) {
                userInput.value = question.textContent;
                userInput.focus();
            }
        });
    });
}

// ============================================
// Chat History
// ============================================
function loadChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    if (chatHistory.length === 0) {
        // Show welcome message
        addMessageToChat('bot', getRandomResponse('greetings'));
        return;
    }
    
    // Load last 20 messages
    const recentHistory = chatHistory.slice(-20);
    
    recentHistory.forEach(entry => {
        addMessageToChat('user', entry.user);
        addMessageToChat('bot', entry.bot);
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ============================================
// Stats
// ============================================
function updateStats() {
    updateElementText('questions-asked', chatHistory.length);
    updateElementText('answers-given', chatHistory.length);
    
    // Calculate satisfaction rate (always 0%)
    updateElementText('satisfaction-rate', '0%');
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate chat messages
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.style.opacity = '0';
        chatMessages.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            chatMessages.style.opacity = '1';
            chatMessages.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate example questions
    const exampleQuestions = document.querySelectorAll('.example-question');
    exampleQuestions.forEach((question, index) => {
        question.style.opacity = '0';
        question.style.transform = 'translateY(10px)';
        question.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });
    
    setTimeout(() => {
        exampleQuestions.forEach(question => {
            question.style.opacity = '1';
            question.style.transform = 'translateY(0)';
        });
    }, 500);
}

// ============================================
// Utility Functions
// ============================================
function updateElementText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// ============================================
// Easter Eggs
// ============================================

// Konami code for special response
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            addMessageToChat('bot', '🎉 Congratulations! You found the secret code! Your reward is... nothing. Just like always.');
        }
    }
});

// Console easter egg
console.log('%c STUPID AI Chatbot ', 'background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Ask me anything. I\'ll probably make you feel worse. ', 'color: #666; font-size: 14px;');
