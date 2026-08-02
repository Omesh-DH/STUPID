/**
 * STUPID - Water Reminder Feature
 * Hydration guilt
 */

// ============================================
// Water Data
// ============================================
let waterHistory = JSON.parse(localStorage.getItem('stupid_water_history')) || [];
const GLASSES_PER_DAY = 8;

// ============================================
// Shame Messages
// ============================================
const waterShameMessages = {
    '0': [
        "You're dehydrated. This explains so much.",
        "Your body is 60% water. Your brain is 100% dehydration.",
        "Drink water. Your skin is begging you.",
        "Plants need water. You're basically a plant with anxiety.",
        "Your dehydration is showing. And it's not a good look.",
        "You haven't had any water. Are you even alive?",
        "Your body is a desert. Literally.",
        "Drink water. Or don't. See if we care.",
        "Your dehydration is at critical levels. Like your life choices.",
        "You're so dehydrated, your tears are dust."
    ],
    '1-2': [
        "One glass? That's cute. Try 8.",
        "You drank some water. Mostly to wash down your regrets.",
        "Two glasses? You're getting there. Slowly.",
        "Your hydration is improving. Your life is not.",
        "You drank water! Now do it 7 more times.",
        "Two glasses down, six to go. You'll quit at three.",
        "Your hydration is like your motivation: present but insufficient.",
        "You drank water. Good job. Now do it again. (You won't.)",
        "Two glasses is a start. A very small start.",
        "You're hydrated enough to not die. Barely."
    ],
    '3-4': [
        "Halfway there! Too bad you'll quit now.",
        "Four glasses? You're doing better than we expected.",
        "Your hydration is adequate. Don't expect a medal.",
        "You're halfway to your goal. You'll never reach it.",
        "Four glasses is great. For someone who hates themselves.",
        "Your hydration is like your effort: there, but not enough.",
        "You drank four glasses. Your reward is not being dead.",
        "Halfway to hydration. Halfway to giving up.",
        "Four glasses is the participation trophy of hydration.",
        "You're hydrated enough to function. Barely."
    ],
    '5-6': [
        "Almost there! You might actually achieve something today.",
        "Six glasses? We're impressed. And suspicious.",
        "Your hydration is good. Your life is still a mess.",
        "You're almost at your goal. You'll quit tomorrow.",
        "Six glasses is great. Now do it every day. (You won't.)",
        "Your hydration is like your potential: there, but rarely realized.",
        "You drank six glasses. Your reward is not dying of dehydration.",
        "Almost at your goal. Almost good enough.",
        "Six glasses is impressive. Your consistency is not.",
        "You're hydrated! Now go fail at something else."
    ],
    '7-8': [
        "You did it! Now do it again tomorrow. (You won't.)",
        "Eight glasses? Who are you and what have you done with the real user?",
        "Your hydration is perfect. Your life is still falling apart.",
        "You hit your goal! Too bad it was the bare minimum.",
        "Eight glasses is great. Now try doing it every day. (Spoiler: you won't.)",
        "Your hydration is like your potential: there, but rarely maintained.",
        "You drank eight glasses. Your reward is not dying today.",
        "You hit your goal! Now you can go back to being lazy.",
        "Eight glasses is impressive. Your life choices are not.",
        "You're hydrated! Your reward is being slightly less dead."
    ],
    '8+': [
        "You're overhydrated. Are you trying to drown your sorrows? Literally?",
        "Nine glasses? Are you training for a water-drinking competition?",
        "Your hydration is excessive. Your life is still a mess.",
        "You drank more than eight glasses. Are you being chased by the dehydration police?",
        "Your hydration is manic. Your life is still falling apart.",
        "You're overhydrated. Your reward is having to pee constantly.",
        "More than eight glasses? Are you trying to float away from your problems?",
        "Your hydration is impressive. Your sanity is not.",
        "You drank a lot of water. Your reward is a full bladder and empty soul.",
        "Your hydration is through the roof. Your life is still in the basement."
    ]
};

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initWaterDisplay();
    initWaterActions();
    initShamingCards();
    initReminders();
    initChart();
    initChallenges();
    updateStats();
    updateHistory();
    updateMessage();
    initAnimations();
});

// ============================================
// Water Display
// ============================================
function initWaterDisplay() {
    updateWaterDisplay();
}

function updateWaterDisplay() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = waterHistory.find(entry => entry.date === today);
    const todayGlasses = todayEntry ? todayEntry.glasses : 0;
    
    // Update glasses
    updateElementText('glasses-today', todayGlasses);
    updateElementText('current-glasses', todayGlasses);
    updateElementText('total-glasses', waterHistory.reduce((sum, entry) => sum + entry.glasses, 0));
    
    // Update percentage
    const percentage = Math.min(Math.round((todayGlasses / GLASSES_PER_DAY) * 100), 100);
    updateElementText('water-percentage', `${percentage}%`);
    updateElementText('hydration-score', percentage);
    
    // Update water fill
    const waterFill = document.getElementById('water-fill');
    if (waterFill) {
        waterFill.style.height = `${percentage}%`;
    }
    
    // Update message
    updateMessage();
}

function updateMessage() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = waterHistory.find(entry => entry.date === today);
    const todayGlasses = todayEntry ? todayEntry.glasses : 0;
    
    const messageElement = document.getElementById('water-message');
    if (!messageElement) return;
    
    let category = '0';
    if (todayGlasses >= 8) category = '8+';
    else if (todayGlasses >= 7) category = '7-8';
    else if (todayGlasses >= 5) category = '5-6';
    else if (todayGlasses >= 3) category = '3-4';
    else if (todayGlasses >= 1) category = '1-2';
    
    const messages = waterShameMessages[category];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    messageElement.innerHTML = `
        <h3>${randomMessage}</h3>
        <p>You've had ${todayGlasses} of ${GLASSES_PER_DAY} glasses today.</p>
    `;
}

// ============================================
// Water Actions
// ============================================
function initWaterActions() {
    const addButtons = document.querySelectorAll('.water-button');
    const removeButton = document.getElementById('remove-glass');
    const resetButton = document.getElementById('reset-water');
    const ctaButton = document.getElementById('add-water-cta');
    
    // Add glass buttons
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = parseInt(button.dataset.amount) || 1;
            addGlasses(amount);
        });
    });
    
    // Remove glass
    if (removeButton) {
        removeButton.addEventListener('click', () => {
            addGlasses(-1);
        });
    }
    
    // Reset
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (confirm('Reset your water intake? (You\'ll just forget to drink again)')) {
                const today = new Date().toISOString().split('T')[0];
                waterHistory = waterHistory.filter(entry => entry.date !== today);
                localStorage.setItem('stupid_water_history', JSON.stringify(waterHistory));
                updateWaterDisplay();
                updateStats();
                updateHistory();
                updateChart();
                showNotification('Water intake reset! (Start failing again)');
            }
        });
    }
    
    // CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            addGlasses(1);
        });
    }
}

function addGlasses(amount) {
    const today = new Date().toISOString().split('T')[0];
    const todayEntryIndex = waterHistory.findIndex(entry => entry.date === today);
    
    if (todayEntryIndex >= 0) {
        waterHistory[todayEntryIndex].glasses += amount;
        // Don't go below 0
        waterHistory[todayEntryIndex].glasses = Math.max(0, waterHistory[todayEntryIndex].glasses);
    } else {
        waterHistory.unshift({
            date: today,
            glasses: Math.max(0, amount),
            id: Date.now().toString()
        });
    }
    
    // Keep only the last 30 days
    if (waterHistory.length > 30) {
        waterHistory = waterHistory.slice(0, 30);
    }
    
    localStorage.setItem('stupid_water_history', JSON.stringify(waterHistory));
    
    updateWaterDisplay();
    updateStats();
    updateHistory();
    updateChart();
    
    if (amount > 0) {
        showNotification(`+${amount} glass${amount > 1 ? 'es' : ''} added! (You're still dehydrated)`);
    } else {
        showNotification(`-1 glass removed! (You didn't drink it anyway)`);
    }
}

// ============================================
// Shaming Cards
// ============================================
function initShamingCards() {
    const shameCards = document.querySelectorAll('.shame-card.hydration');
    
    shameCards.forEach(card => {
        card.addEventListener('click', () => {
            const range = card.querySelector('.shame-range');
            if (range) {
                const rangeText = range.textContent;
                showNotification(`You clicked on ${rangeText} glasses. That's your hydration level.`);
            }
        });
    });
}

// ============================================
// Reminders
// ============================================
function initReminders() {
    const reminderCheckboxes = document.querySelectorAll('.reminder-checkbox');
    
    reminderCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const timeText = checkbox.closest('.reminder-option').querySelector('.time-text').textContent;
            if (checkbox.checked) {
                showNotification(`Reminder set for ${timeText}! (You'll ignore it)`);
            } else {
                showNotification(`Reminder for ${timeText} disabled. (Smart choice)`);
            }
        });
    });
}

// ============================================
// Chart
// ============================================
let waterChart = null;

function initChart() {
    const ctx = document.getElementById('waterChart');
    if (!ctx) return;
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    waterChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Glasses of Water',
                data: [],
                backgroundColor: 'rgba(14, 165, 233, 0.7)',
                borderColor: '#0ea5e9',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} glass${context.parsed.y !== 1 ? 'es' : ''}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    updateChart();
}

function updateChart() {
    if (!waterChart) return;
    
    // Get last 7 days
    const last7Days = [];
    const last7Glasses = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const entry = waterHistory.find(e => e.date === dateString);
        const glasses = entry ? entry.glasses : 0;
        
        last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        last7Glasses.push(glasses);
    }
    
    waterChart.data.labels = last7Days;
    waterChart.data.datasets[0].data = last7Glasses;
    waterChart.update();
}

// ============================================
// Challenges
// ============================================
function initChallenges() {
    const challengeButtons = document.querySelectorAll('.water-challenge .challenge-button');
    
    challengeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.challenge-card');
            const title = card.querySelector('.challenge-title').textContent;
            showNotification(`Challenge started: ${title}. You'll fail by day 2.`);
        });
    });
}

// ============================================
// History
// ============================================
function updateHistory() {
    const historyList = document.getElementById('water-list');
    if (!historyList) return;
    
    if (waterHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <h3 class="empty-title">No Water Data Yet</h3>
                <p class="empty-description">
                    You haven't logged any water intake. Your body is a desert. Literally.
                </p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = waterHistory.map(entry => {
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
        
        return `
            <div class="water-item">
                <span class="water-date">${formattedDate}</span>
                <span class="water-count">${entry.glasses} glass${entry.glasses !== 1 ? 'es' : ''}</span>
                <span class="water-goal">${Math.round((entry.glasses / GLASSES_PER_DAY) * 100)}% of goal</span>
            </div>
        `;
    }).join('');
}

// ============================================
// Stats
// ============================================
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = waterHistory.find(entry => entry.date === today);
    const todayGlasses = todayEntry ? todayEntry.glasses : 0;
    
    updateElementText('glasses-today', todayGlasses);
    updateElementText('total-glasses', waterHistory.reduce((sum, entry) => sum + entry.glasses, 0));
    
    const percentage = Math.min(Math.round((todayGlasses / GLASSES_PER_DAY) * 100), 100);
    updateElementText('hydration-score', `${percentage}%`);
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate water glass
    const waterGlass = document.querySelector('.water-glass');
    if (waterGlass) {
        waterGlass.style.opacity = '0';
        waterGlass.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            waterGlass.style.opacity = '1';
            waterGlass.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Animate water fill
    const waterFill = document.getElementById('water-fill');
    if (waterFill) {
        waterFill.style.height = '0%';
        
        setTimeout(() => {
            const today = new Date().toISOString().split('T')[0];
            const todayEntry = waterHistory.find(entry => entry.date === today);
            const todayGlasses = todayEntry ? todayEntry.glasses : 0;
            const percentage = Math.min(Math.round((todayGlasses / GLASSES_PER_DAY) * 100), 100);
            waterFill.style.height = `${percentage}%`;
        }, 500);
    }
    
    // Animate shame cards
    const shameCards = document.querySelectorAll('.shame-card.hydration');
    shameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    setTimeout(() => {
        shameCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 700);
}

// ============================================
// Notifications
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'water-notification';
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

// Click on water glass to add a glass
const waterGlass = document.querySelector('.water-glass');
if (waterGlass) {
    waterGlass.addEventListener('click', () => {
        addGlasses(1);
        showNotification('+1 glass added! (CheATER!)');
    });
}

// Console easter egg
console.log('%c STUPID Water Reminder ', 'background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Drink water. Or don\'t. See if we care. ', 'color: #666; font-size: 14px;');
