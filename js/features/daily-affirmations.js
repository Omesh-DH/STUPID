/**
 * STUPID - Daily Affirmations Feature
 * Mean push notifications and affirmations
 */

// ============================================
// Affirmations Data
// ============================================
const affirmations = {
    'self-worth': [
        "You're doing great... for someone with your limitations.",
        "Believe in yourself! Or don't. I'm not your dad.",
        "You are enough. Just barely, but you are.",
        "Remember: You're unique. Just like everyone else.",
        "You have so much potential. Most of it is untapped.",
        "You're special. In the same way a participation trophy is special.",
        "You matter. To someone. Probably your mom. Maybe.",
        "You're one in a million. Unfortunately, there are 7 billion people on Earth.",
        "You're perfect just the way you are. And that's the problem.",
        "You have value. Mostly as a cautionary tale."
    ],
    'productivity': [
        "Every day is a new opportunity to disappoint yourself.",
        "You're so productive! At doing nothing.",
        "The early bird gets the worm. You're the worm. And you're late.",
        "Hard work pays off. Too bad you don't do it.",
        "Productivity is just a myth we use to shame people who are relaxing.",
        "You could be doing something productive right now. But you're not.",
        "Procrastination is the art of keeping up with yesterday.",
        "You have so many talents. None of them are useful.",
        "The secret to getting ahead is getting started. You'll never know.",
        "You're not lazy, you're just on your deathbed. It's called resting in peace."
    ],
    'relationships': [
        "Love is in the air. Unfortunately, you're on the ground.",
        "Someone out there loves you. Probably a pet. Or a plant.",
        "You'll find love when you stop looking. So never.",
        "The right person is out there. They're avoiding you too.",
        "Love is blind. That explains a lot about your dating history.",
        "You're the catch of the day. In a very small, very sad pond.",
        "Soulmates are real. Yours is probably a cat.",
        "You don't need a partner to be complete. Good, because you'll never get one.",
        "The one who got away was smart. They saw you coming.",
        "Love conquers all. Except your personality."
    ],
    'health': [
        "Your body is a temple. A very run-down, poorly maintained temple.",
        "Health is wealth. You're broke.",
        "You're in great shape! Round is a shape.",
        "Take care of your body. It's the only place you have to live. And it's falling apart.",
        "You have the body of a Greek god. If Greek gods were lazy and ate too much.",
        "Your fitness journey is inspiring. To quit.",
        "Abs are made in the kitchen. So is your double chin.",
        "You're not overweight, you're just easier to see.",
        "Healthy body, healthy mind. You have neither.",
        "You're one workout away from a great body. You're also 10,000 workouts away."
    ],
    'career': [
        "Your career is taking off! Unfortunately, it's going down.",
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
    'random': [
        "Life is what happens when you're busy making other plans. Your plans are stupid.",
        "The journey of a thousand miles begins with one step. You took zero.",
        "To thine own self be true. Your self is the problem.",
        "This too shall pass. Unfortunately, so will you.",
        "The grass is always greener. Your grass is dead.",
        "When life gives you lemons, make lemonade. You have no lemons.",
        "Every cloud has a silver lining. Your cloud is all storm.",
        "You can't have your cake and eat it too. You can't even afford cake.",
        "The best things in life are free. You can't afford the rest.",
        "Where there's a will, there's a way. You have neither."
    ]
};

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initAffirmationGenerator();
    initCategoryCards();
    initPushNotifications();
    initHistory();
    initAnimations();
    loadAffirmationHistory();
    updateStats();
});

// ============================================
// Affirmation Generator
// ============================================
function initAffirmationGenerator() {
    const affirmationText = document.getElementById('daily-affirmation');
    const newAffirmationButton = document.getElementById('new-affirmation');
    const shareButton = document.getElementById('share-affirmation');
    const saveButton = document.getElementById('save-affirmation');
    
    // Set initial affirmation
    showRandomAffirmation();
    
    // New affirmation button
    newAffirmationButton.addEventListener('click', showRandomAffirmation);
    
    // Share button
    shareButton.addEventListener('click', () => {
        const affirmation = affirmationText.textContent;
        shareAffirmation(affirmation);
    });
    
    // Save button
    saveButton.addEventListener('click', () => {
        const affirmation = affirmationText.textContent;
        saveAffirmationToHistory(affirmation);
        showNotification('Affirmation saved! (You\'ll never look at it again)');
    });
}

function showRandomAffirmation(category = null) {
    const affirmationText = document.getElementById('daily-affirmation');
    
    let categoryToUse = category;
    if (!categoryToUse) {
        // Randomly select a category
        const categories = Object.keys(affirmations);
        categoryToUse = categories[Math.floor(Math.random() * categories.length)];
    }
    
    const categoryAffirmations = affirmations[categoryToUse];
    const randomIndex = Math.floor(Math.random() * categoryAffirmations.length);
    const affirmation = categoryAffirmations[randomIndex];
    
    // Animate the text
    affirmationText.style.opacity = '0';
    affirmationText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        affirmationText.textContent = affirmation;
        affirmationText.style.opacity = '1';
        affirmationText.style.transform = 'translateY(0)';
        
        // Save to history
        saveAffirmationToHistory(affirmation);
        updateStats();
    }, 200);
    
    return affirmation;
}

function saveAffirmationToHistory(affirmation) {
    let history = JSON.parse(localStorage.getItem('stupid_affirmation_history')) || [];
    
    history.unshift({
        text: affirmation,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
    });
    
    // Keep only the last 50
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    
    localStorage.setItem('stupid_affirmation_history', JSON.stringify(history));
}

// ============================================
// Category Cards
// ============================================
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.affirmation-category');
    
    categoryCards.forEach(card => {
        const button = card.querySelector('.category-button');
        const category = card.dataset.category;
        
        button.addEventListener('click', () => {
            showRandomAffirmation(category);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ============================================
// Push Notifications
// ============================================
function initPushNotifications() {
    const toggle = document.getElementById('push-notifications-toggle');
    const enableAllButton = document.getElementById('enable-all-notifications');
    
    // Check if notifications are enabled
    const notificationsEnabled = localStorage.getItem('stupid_notifications_enabled') === 'true';
    if (toggle) {
        toggle.checked = notificationsEnabled;
    }
    
    // Toggle notifications
    if (toggle) {
        toggle.addEventListener('change', () => {
            localStorage.setItem('stupid_notifications_enabled', toggle.checked);
            if (toggle.checked) {
                showNotification('Notifications enabled! (You\'ll regret this)');
                scheduleRandomNotification();
            } else {
                showNotification('Notifications disabled. Smart choice.');
            }
        });
    }
    
    // Enable all button
    if (enableAllButton) {
        enableAllButton.addEventListener('click', () => {
            if (toggle) {
                toggle.checked = true;
                localStorage.setItem('stupid_notifications_enabled', 'true');
                showNotification('All notifications enabled! (Your phone will hate you)');
                scheduleRandomNotification();
            }
        });
    }
    
    // Schedule random notification if enabled
    if (notificationsEnabled) {
        scheduleRandomNotification();
    }
}

function scheduleRandomNotification() {
    // Schedule a notification in 1-24 hours
    const hours = Math.floor(Math.random() * 24) + 1;
    const milliseconds = hours * 60 * 60 * 1000;
    
    setTimeout(() => {
        if (localStorage.getItem('stupid_notifications_enabled') === 'true') {
            showRandomNotification();
            // Schedule the next one
            scheduleRandomNotification();
        }
    }, milliseconds);
}

function showRandomNotification() {
    // Check if browser supports notifications
    if (!('Notification' in window)) {
        return;
    }
    
    // Check permission
    if (Notification.permission === 'granted') {
        const categories = Object.keys(affirmations);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const affirmation = affirmations[category][Math.floor(Math.random() * affirmations[category].length)];
        
        new Notification('STUPID Daily Affirmation', {
            body: affirmation,
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🤡</text></svg>'
        });
    } else if (Notification.permission !== 'denied') {
        // Request permission
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showRandomNotification();
            }
        });
    }
}

function shareAffirmation(affirmation) {
    // Copy to clipboard
    navigator.clipboard.writeText(affirmation).then(() => {
        showNotification('Affirmation copied! (No one will read it)');
    });
}

// ============================================
// History
// ============================================
function initHistory() {
    const historyList = document.getElementById('affirmation-history');
    
    if (historyList) {
        // Load history on scroll or initially
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadAffirmationHistory();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(historyList);
    }
}

function loadAffirmationHistory() {
    const historyList = document.getElementById('affirmation-history');
    if (!historyList) return;
    
    const history = JSON.parse(localStorage.getItem('stupid_affirmation_history')) || [];
    
    if (history.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📜</div>
                <h3 class="empty-title">No History Yet</h3>
                <p class="empty-description">
                    You haven't received any affirmations yet. Your self-esteem is still intact. For now.
                </p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = history.map(item => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="history-item">
                <div class="history-icon">💬</div>
                <div class="history-content">
                    <p class="history-text">${item.text}</p>
                    <span class="history-time">${formattedDate}</span>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Stats
// ============================================
function updateStats() {
    const history = JSON.parse(localStorage.getItem('stupid_affirmation_history')) || [];
    
    // Update stats
    updateElementText('affirmations-sent', history.length);
    updateElementText('tears-shed', Math.floor(history.length * 0.7));
    updateElementText('self-esteem-lost', Math.min(history.length * 5, 100));
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate affirmation on load
    const affirmationText = document.getElementById('daily-affirmation');
    if (affirmationText) {
        affirmationText.style.opacity = '0';
        affirmationText.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            affirmationText.style.opacity = '1';
            affirmationText.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add reveal animations to cards
    const cards = document.querySelectorAll('.category-card.affirmation-category');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Trigger animations
    setTimeout(() => {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 500);
}

// ============================================
// Notifications
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'affirmation-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close">×</button>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 350px;
        animation: fadeInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-close after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
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

// Double click on affirmation to get a special message
const affirmationText = document.getElementById('daily-affirmation');
let clickCount = 0;

if (affirmationText) {
    affirmationText.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            showRandomAffirmation();
            showNotification('Congratulations! You\'ve unlocked the "Glutton for Punishment" achievement.');
            clickCount = 0;
        }
    });
}

// Console easter egg
console.log('%c STUPID Affirmations ', 'background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c You are enough. Just barely. ', 'color: #666; font-size: 14px;');
