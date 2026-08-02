/**
 * STUPID - Step Counter Feature
 * Shame-based fitness tracking
 */

// ============================================
// Step Data
// ============================================
let stepHistory = JSON.parse(localStorage.getItem('stupid_step_history')) || [];
let dailyGoal = parseInt(localStorage.getItem('stupid_daily_goal')) || 10000;

// ============================================
// Shame Messages
// ============================================
const shameMessages = {
    '0-999': [
        "I've seen more movement in a cemetery.",
        "Are you even alive? Check your pulse.",
        "Your shoes are collecting dust. Literally.",
        "You moved less than a sloth today. And sloths are ashamed of you.",
        "Congratulations! You've achieved couch potato status.",
        "Your step count is so low, it's practically a negative number.",
        "You didn't just sit today, you committed to the lifestyle.",
        "Your legs have forgotten their purpose.",
        "You moved so little, we're surprised you're still breathing.",
        "Your step count: 0. Your excuses: Infinite."
    ],
    '1000-4999': [
        "Walking: the activity your ancestors did to not die. You're almost there.",
        "You moved! But not enough to matter.",
        "Your steps are like your motivation: present but insufficient.",
        "You took some steps. Mostly to the fridge, we assume.",
        "You're walking, but at this rate, you'll die before you reach the mailbox.",
        "Your step count is the bare minimum. Like your effort.",
        "You moved more than a rock. Congratulations.",
        "Your steps are a start. A very small, very sad start.",
        "You're walking, but you're still losing the race against a turtle.",
        "Your step count is like your willpower: barely there."
    ],
    '5000-9999': [
        "Congratulations! You've achieved the bare minimum of human function.",
        "You're halfway to not being a complete failure.",
        "Your steps are adequate. Don't expect a medal.",
        "You walked almost enough to not be embarrassed.",
        "Your step count is like your life: almost there, but not quite.",
        "You're moving! But not enough to impress anyone.",
        "Your steps are a good start. Too bad you'll quit tomorrow.",
        "You walked enough to not die. Barely.",
        "Your step count is the participation trophy of fitness.",
        "You're walking, but you're still behind a 90-year-old with a cane."
    ],
    '10000-14999': [
        "Wow, you actually moved. Who hurt you? Why are you running?",
        "You walked 10K steps! Now do it again tomorrow. (You won't.)",
        "Your step count is impressive. Your consistency is not.",
        "You hit your goal! Too bad it was the bare minimum.",
        "10K steps is great. Now try doing it every day. (Spoiler: you won't.)",
        "You walked enough to not be a complete disappointment.",
        "Your step count is like your potential: there, but rarely realized.",
        "You hit 10K! Now you can go back to being lazy.",
        "Your steps are impressive. Your life choices are not.",
        "You walked 10K steps. Your reward is not dying today."
    ],
    '15000+': [
        "Are you training for a marathon or running from your problems? Either way, slow down.",
        "You walked more than 15K steps. Are you being chased?",
        "Your step count is impressive. Your sanity is not.",
        "You're walking a lot. Too bad it's all in circles.",
        "Your steps are through the roof. Your life is still in the basement.",
        "You walked 15K+ steps. Your reward is exhaustion and blisters.",
        "Your step count is manic. Your life is still a mess.",
        "You're walking like you're being pursued. By what? Your failures?",
        "Your steps are impressive. Your ability to sit still is not.",
        "You walked 15K+ steps. Your reward is being tired and still unhappy."
    ]
};

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initStepDisplay();
    initStepActions();
    initShamingCards();
    initChart();
    initChallenges();
    initHealthIntegration();
    updateStats();
    updateHistory();
    updateMessage();
    initAnimations();
});

// ============================================
// Step Display
// ============================================
function initStepDisplay() {
    const stepCount = document.getElementById('step-count');
    const todaySteps = document.getElementById('today-steps');
    const weekSteps = document.getElementById('week-steps');
    const averageSteps = document.getElementById('average-steps');
    const stepGoalInput = document.getElementById('step-goal');
    const updateGoalButton = document.getElementById('update-goal');
    
    // Set goal input
    if (stepGoalInput) {
        stepGoalInput.value = dailyGoal;
    }
    
    // Update goal
    if (updateGoalButton) {
        updateGoalButton.addEventListener('click', () => {
            dailyGoal = parseInt(stepGoalInput.value) || 10000;
            localStorage.setItem('stupid_daily_goal', dailyGoal);
            updateMessage();
            showNotification(`Goal updated to ${dailyGoal}! (You'll never reach it)`);
        });
    }
    
    // Update display
    updateStepDisplay();
}

function updateStepDisplay() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = stepHistory.find(entry => entry.date === today);
    const todaySteps = todayEntry ? todayEntry.steps : 0;
    
    // Update step count
    updateElementText('step-count', todaySteps.toLocaleString());
    updateElementText('today-steps', todaySteps.toLocaleString());
    
    // Calculate week steps
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekHistory = stepHistory.filter(entry => new Date(entry.date) >= oneWeekAgo);
    const weekSteps = weekHistory.reduce((sum, entry) => sum + entry.steps, 0);
    updateElementText('week-steps', weekSteps.toLocaleString());
    
    // Calculate average
    const averageSteps = weekHistory.length > 0 ? Math.round(weekSteps / weekHistory.length) : 0;
    updateElementText('average-steps', averageSteps.toLocaleString());
    
    // Update progress ring
    updateProgressRing(todaySteps, dailyGoal);
    
    // Update message
    updateMessage();
}

function updateProgressRing(current, goal) {
    const progressRing = document.querySelector('.progress-ring-fill');
    if (!progressRing) return;
    
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(current / goal, 1);
    const offset = circumference - (progress * circumference);
    
    progressRing.style.strokeDasharray = `${circumference}, ${circumference}`;
    progressRing.style.strokeDashoffset = offset;
}

function updateMessage() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = stepHistory.find(entry => entry.date === today);
    const todaySteps = todayEntry ? todayEntry.steps : 0;
    
    const messageElement = document.getElementById('step-message');
    if (!messageElement) return;
    
    let category = '0-999';
    if (todaySteps >= 15000) category = '15000+';
    else if (todaySteps >= 10000) category = '10000-14999';
    else if (todaySteps >= 5000) category = '5000-9999';
    else if (todaySteps >= 1000) category = '1000-4999';
    
    const messages = shameMessages[category];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const progress = Math.round((todaySteps / dailyGoal) * 100);
    
    messageElement.innerHTML = `
        <h3>${randomMessage}</h3>
        <p>You've taken ${todaySteps.toLocaleString()} of your ${dailyGoal.toLocaleString()} step goal (${progress}%).</p>
    `;
}

// ============================================
// Step Actions
// ============================================
function initStepActions() {
    const addGlassButtons = document.querySelectorAll('.water-button');
    const removeGlassButton = document.getElementById('remove-glass');
    const resetButton = document.getElementById('reset-water');
    const ctaButton = document.getElementById('add-water-cta');
    
    // Add step buttons (reusing water button class for now)
    const addButtons = document.querySelectorAll('.water-button');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = parseInt(button.dataset.amount) || 1;
            addSteps(amount * 1000);
        });
    });
    
    // Manual step entry
    const manualEntryButton = document.getElementById('connect-all');
    if (manualEntryButton) {
        manualEntryButton.addEventListener('click', () => {
            const steps = prompt('Enter the number of steps you took:', '1000');
            if (steps) {
                addSteps(parseInt(steps) || 0);
            }
        });
    }
}

function addSteps(amount) {
    const today = new Date().toISOString().split('T')[0];
    const todayEntryIndex = stepHistory.findIndex(entry => entry.date === today);
    
    if (todayEntryIndex >= 0) {
        stepHistory[todayEntryIndex].steps += amount;
    } else {
        stepHistory.unshift({
            date: today,
            steps: amount,
            id: Date.now().toString()
        });
    }
    
    // Keep only the last 30 days
    if (stepHistory.length > 30) {
        stepHistory = stepHistory.slice(0, 30);
    }
    
    localStorage.setItem('stupid_step_history', JSON.stringify(stepHistory));
    
    updateStepDisplay();
    updateStats();
    updateHistory();
    updateChart();
    
    showNotification(`+${amount.toLocaleString()} steps added! (Still not enough)`);
}

// ============================================
// Shaming Cards
// ============================================
function initShamingCards() {
    const shameCards = document.querySelectorAll('.shame-card');
    
    shameCards.forEach(card => {
        card.addEventListener('click', () => {
            const range = card.querySelector('.shame-range');
            if (range) {
                const rangeText = range.textContent;
                showNotification(`You clicked on ${rangeText}. That's your comfort zone.`);
            }
        });
    });
}

// ============================================
// Chart
// ============================================
let stepChart = null;

function initChart() {
    const ctx = document.getElementById('stepChart');
    if (!ctx) return;
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    stepChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Daily Steps',
                data: [],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
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
                            return `${context.parsed.y.toLocaleString()} steps`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    updateChart();
}

function updateChart() {
    if (!stepChart) return;
    
    // Get last 7 days
    const last7Days = [];
    const last7Steps = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const entry = stepHistory.find(e => e.date === dateString);
        const steps = entry ? entry.steps : 0;
        
        last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        last7Steps.push(steps);
    }
    
    stepChart.data.labels = last7Days;
    stepChart.data.datasets[0].data = last7Steps;
    stepChart.update();
}

// ============================================
// Challenges
// ============================================
function initChallenges() {
    const challengeButtons = document.querySelectorAll('.step-challenge .challenge-button');
    
    challengeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.challenge-card');
            const title = card.querySelector('.challenge-title').textContent;
            showNotification(`Challenge started: ${title}. You'll fail by day 3.`);
        });
    });
}

// ============================================
// Health Integration
// ============================================
function initHealthIntegration() {
    const connectButtons = document.querySelectorAll('.integration-button');
    
    connectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.id.replace('connect-', '');
            showNotification(`Connected to ${platform.charAt(0).toUpperCase() + platform.slice(1)}! (We'll know everything)`);
        });
    });
}

// ============================================
// History
// ============================================
function updateHistory() {
    const historyList = document.getElementById('step-list');
    if (!historyList) return;
    
    if (stepHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📈</div>
                <h3 class="empty-title">No Step Data Yet</h3>
                <p class="empty-description">
                    You haven't logged any steps. Your shoes are collecting dust. Literally.
                </p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = stepHistory.map(entry => {
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
        
        const progress = Math.round((entry.steps / dailyGoal) * 100);
        
        return `
            <div class="step-item">
                <span class="step-date">${formattedDate}</span>
                <span class="step-count">${entry.steps.toLocaleString()}</span>
                <span class="step-goal">${progress}% of goal</span>
            </div>
        `;
    }).join('');
}

// ============================================
// Stats
// ============================================
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = stepHistory.find(entry => entry.date === today);
    const todaySteps = todayEntry ? todayEntry.steps : 0;
    
    // Update today's steps
    updateElementText('today-steps', todaySteps.toLocaleString());
    
    // Calculate week steps
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekHistory = stepHistory.filter(entry => new Date(entry.date) >= oneWeekAgo);
    const weekSteps = weekHistory.reduce((sum, entry) => sum + entry.steps, 0);
    updateElementText('week-steps', weekSteps.toLocaleString());
    
    // Calculate average
    const averageSteps = weekHistory.length > 0 ? Math.round(weekSteps / weekHistory.length) : 0;
    updateElementText('average-steps', averageSteps.toLocaleString());
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate step circle
    const stepCircle = document.querySelector('.step-circle');
    if (stepCircle) {
        stepCircle.style.opacity = '0';
        stepCircle.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            stepCircle.style.opacity = '1';
            stepCircle.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Animate shame cards
    const shameCards = document.querySelectorAll('.shame-card');
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
    }, 500);
}

// ============================================
// Notifications
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'step-notification';
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

// Click on step count to add 1000 steps
const stepCountElement = document.getElementById('step-count');
if (stepCountElement) {
    stepCountElement.addEventListener('click', () => {
        addSteps(1000);
        showNotification('CheATER! +1000 steps added. (We\'re watching you)');
    });
}

// Console easter egg
console.log('%c STUPID Step Counter ', 'background: linear-gradient(135deg, #0ea5e9, #f97316); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Every step counts (against you). ', 'color: #666; font-size: 14px;');
