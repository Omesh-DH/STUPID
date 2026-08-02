/**
 * STUPID - Mood Tracker Feature
 * Judgmental mood tracking
 */

// ============================================
// Mood Data
// ============================================
const moodResponses = {
    'happy': [
        "Cool. Don't get used to it.",
        "Enjoy it while it lasts.",
        "Finally, something to be happy about. Too bad it's temporary.",
        "We're happy for you. Mostly because we're not you.",
        "Happiness is fleeting. Like your attention span.",
        "Smile! It confuses people.",
        "You're happy? That's new.",
        "Don't worry, it'll pass.",
        "Happiness looks good on you. Too bad it's rare.",
        "Enjoy your happiness. We'll be here when it's gone."
    ],
    'sad': [
        "Have you tried not being sad? Just a thought.",
        "Cheer up! Or don't. We don't care.",
        "Sadness is just happiness taking a break. A long break.",
        "It's okay to be sad. It's your default state anyway.",
        "Cry it out. We'll wait.",
        "Sadness is your brand.",
        "You're sad? That tracks.",
        "Here, have a virtual tissue. It won't help.",
        "Sadness is just your face when no one's looking.",
        "We'd say it gets better, but we'd be lying."
    ],
    'anxious': [
        "Imagine if this energy went into something productive.",
        "Breathe. Or don't. We don't care.",
        "Anxiety is just your body preparing for disaster. It's always prepared.",
        "Calm down. Or don't. Either way, we're entertained.",
        "Your anxiety is valid. And exhausting.",
        "Worrying doesn't change the future. But it does ruin the present.",
        "Anxiety: the gift that keeps on giving.",
        "Your mind is a bad neighborhood. Don't go in there alone.",
        "Anxiety is just your brain's way of saying 'I have no idea what's going on'.",
        "We'd tell you to relax, but we know you won't."
    ],
    'angry': [
        "Yell into a pillow. Or a void. Same thing.",
        "Anger is just sadness with better PR.",
        "Calm down. Or don't. We're not your therapist.",
        "Anger management is overrated. Embrace the rage.",
        "Your anger is valid. And unproductive.",
        "Punch a wall. Or don't. We're not liable.",
        "Anger is just passion without a purpose.",
        "We'd say count to ten, but you'll just get angrier at the numbers.",
        "Anger: the emotion that makes you feel powerful while doing nothing.",
        "Your anger is showing. And it's not a good look."
    ],
    'bored': [
        "Maybe if you had hobbies, you wouldn't be bored.",
        "Boredom is just your brain's way of saying 'I need stimulation'. Too bad.",
        "Find something to do. Or don't. We don't care.",
        "Boredom is the enemy of progress. You're losing.",
        "Your boredom is our entertainment.",
        "Bored? Good. That means you have time to fail at something new.",
        "Boredom is just your life lacking meaning. As usual.",
        "We'd suggest a hobby, but you'd just quit.",
        "Boredom: the emotion that proves you have no imagination.",
        "Your boredom is a reflection of your life. And it's boring."
    ],
    'tired': [
        "Sleep is for the weak. But you're weak, so go ahead.",
        "Tired? That's what happens when you do nothing all day.",
        "Rest up. You'll need your energy for more failure tomorrow.",
        "Tiredness is just your body's way of saying 'I give up'. We relate.",
        "Go to sleep. Your dreams are more interesting than you.",
        "Tired? That's your default state.",
        "Rest. You've earned it. By doing nothing.",
        "Tiredness is just your body preparing for more disappointment.",
        "Sleep. It's the only thing you're good at.",
        "Your tiredness is a symptom of your life. And it's exhausting."
    ],
    'excited': [
        "Calm down. It's not that exciting.",
        "Enjoy your excitement. It won't last.",
        "Excitement is just happiness with caffeine.",
        "Don't get too excited. You'll be disappointed.",
        "Your excitement is cute. And naive.",
        "Excitement: the emotion that precedes disappointment.",
        "Calm down. You're embarrassing yourself.",
        "Enjoy the high. The crash is coming.",
        "Your excitement is like a candle. Short-lived and easily blown out.",
        "Excitement is just your brain's way of setting you up for failure."
    ],
    'meh': [
        "That's it? That's the mood? Wow.",
        "Meh. The emotion of champions. Or losers. Mostly losers.",
        "Indifference is a mood. A boring one.",
        "Meh. The sound of your life.",
        "You're not sad, you're not happy. You're just... there.",
        "Meh is the mood of someone who's given up. We respect that.",
        "Indifference is just your way of coping with disappointment.",
        "Meh. The emotion that requires the least effort.",
        "You're not apathetic, you're just efficient with your emotions.",
        "Meh. The mood that perfectly describes your life."
    ]
};

const moodEmojis = {
    'happy': '😊',
    'sad': '😢',
    'anxious': '😨',
    'angry': '😡',
    'bored': '🥱',
    'tired': '😴',
    'excited': '😃',
    'meh': '😐'
};

// ============================================
// Mood History
// ============================================
let moodHistory = JSON.parse(localStorage.getItem('stupid_mood_history')) || [];

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMoodOptions();
    initIntensitySlider();
    initLogMoodButton();
    initFilters();
    initChart();
    updateStats();
    updateHistory();
    updateInsights();
    initAnimations();
});

// ============================================
// Mood Options
// ============================================
function initMoodOptions() {
    const moodOptions = document.querySelectorAll('.mood-option');
    let selectedMood = null;
    
    moodOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selection from all
            moodOptions.forEach(o => o.classList.remove('selected'));
            
            // Add selection to clicked
            option.classList.add('selected');
            selectedMood = option.dataset.mood;
            
            // Show response
            const response = option.querySelector('.mood-response');
            if (response) {
                response.style.display = 'block';
            }
        });
    });
    
    // Set first mood as default
    if (moodOptions.length > 0) {
        moodOptions[0].classList.add('selected');
        selectedMood = moodOptions[0].dataset.mood;
    }
}

// ============================================
// Intensity Slider
// ============================================
function initIntensitySlider() {
    const slider = document.getElementById('mood-intensity');
    const valueDisplay = document.getElementById('intensity-value');
    
    if (slider && valueDisplay) {
        slider.addEventListener('input', () => {
            valueDisplay.textContent = slider.value;
        });
    }
}

// ============================================
// Log Mood Button
// ============================================
function initLogMoodButton() {
    const logButton = document.getElementById('log-mood');
    const quickLogButton = document.getElementById('log-another-mood');
    
    [logButton, quickLogButton].forEach(button => {
        if (button) {
            button.addEventListener('click', logMood);
        }
    });
}

function logMood() {
    const selectedOption = document.querySelector('.mood-option.selected');
    if (!selectedOption) {
        showNotification('Please select a mood first.');
        return;
    }
    
    const mood = selectedOption.dataset.mood;
    const intensity = document.getElementById('mood-intensity').value;
    const responses = moodResponses[mood];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Create mood entry
    const moodEntry = {
        mood,
        intensity: parseInt(intensity),
        response,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
    };
    
    // Add to history
    moodHistory.unshift(moodEntry);
    localStorage.setItem('stupid_mood_history', JSON.stringify(moodHistory));
    
    // Show response
    showMoodResponse(mood, intensity, response);
    
    // Update UI
    updateStats();
    updateHistory();
    updateInsights();
    updateChart();
    
    // Show notification
    showNotification('Mood logged! (We\'re judging you)');
}

function showMoodResponse(mood, intensity, response) {
    const responseSection = document.getElementById('mood-response-section');
    const responseEmoji = document.getElementById('response-emoji');
    const responseTitle = document.getElementById('response-title');
    const responseMessage = document.getElementById('response-message');
    const responseTime = document.getElementById('response-time');
    const responseIntensity = document.getElementById('response-intensity');
    
    if (!responseSection) return;
    
    responseEmoji.textContent = moodEmojis[mood] || '😐';
    responseTitle.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
    responseMessage.textContent = response;
    responseTime.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    responseIntensity.textContent = `Intensity: ${intensity}/10`;
    
    responseSection.style.display = 'block';
    
    // Scroll to response
    responseSection.scrollIntoView({ behavior: 'smooth' });
    
    // Hide after 10 seconds
    setTimeout(() => {
        responseSection.style.display = 'none';
    }, 10000);
}

// ============================================
// Filters
// ============================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.history-filters .filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            updateHistory(button.dataset.filter);
        });
    });
}

// ============================================
// Chart
// ============================================
let moodChart = null;

function initChart() {
    const ctx = document.getElementById('moodChart');
    if (!ctx) return;
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Create chart
    moodChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Happy', 'Sad', 'Anxious', 'Angry', 'Bored', 'Tired', 'Excited', 'Meh'],
            datasets: [{
                label: 'Mood Count',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    '#22c55e',
                    '#3b82f6',
                    '#8b5cf6',
                    '#ef4444',
                    '#f59e0b',
                    '#6b7280',
                    '#f97316',
                    '#9ca3af'
                ],
                borderWidth: 0
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
                            return `${context.label}: ${context.parsed.y}`;
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
    if (!moodChart) return;
    
    const moodCounts = {
        happy: 0,
        sad: 0,
        anxious: 0,
        angry: 0,
        bored: 0,
        tired: 0,
        excited: 0,
        meh: 0
    };
    
    moodHistory.forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    
    moodChart.data.datasets[0].data = [
        moodCounts.happy,
        moodCounts.sad,
        moodCounts.anxious,
        moodCounts.angry,
        moodCounts.bored,
        moodCounts.tired,
        moodCounts.excited,
        moodCounts.meh
    ];
    
    moodChart.update();
}

// ============================================
// History
// ============================================
function updateHistory(filter = 'all') {
    const historyList = document.getElementById('mood-list');
    if (!historyList) return;
    
    let filteredHistory = moodHistory;
    
    // Apply filter
    if (filter === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredHistory = moodHistory.filter(entry => new Date(entry.timestamp) >= oneWeekAgo);
    } else if (filter === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filteredHistory = moodHistory.filter(entry => new Date(entry.timestamp) >= oneMonthAgo);
    }
    
    if (filteredHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <h3 class="empty-title">No Moods Logged Yet</h3>
                <p class="empty-description">
                    You haven't logged any moods. We can't judge you if you don't participate.
                </p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = filteredHistory.map(entry => {
        const date = new Date(entry.timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="mood-item">
                <div class="mood-emoji">${moodEmojis[entry.mood] || '😐'}</div>
                <div class="mood-info">
                    <div class="mood-name">${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</div>
                    <div class="mood-time">${formattedDate} at ${formattedTime}</div>
                </div>
                <div class="mood-intensity">Intensity: ${entry.intensity}/10</div>
            </div>
        `;
    }).join('');
}

// ============================================
// Stats
// ============================================
function updateStats() {
    updateElementText('moods-logged', moodHistory.length);
    updateElementText('judgments-received', moodHistory.length);
    
    // Calculate average mood
    if (moodHistory.length > 0) {
        const moodScores = {
            happy: 10,
            excited: 8,
            meh: 5,
            tired: 4,
            bored: 3,
            anxious: 2,
            angry: 1,
            sad: 0
        };
        
        const totalScore = moodHistory.reduce((sum, entry) => sum + moodScores[entry.mood], 0);
        const averageScore = totalScore / moodHistory.length;
        
        let averageMood = '😐';
        if (averageScore >= 8) averageMood = '😊';
        else if (averageScore >= 6) averageMood = '😃';
        else if (averageScore >= 4) averageMood = '😌';
        else if (averageScore >= 2) averageMood = '😴';
        else averageMood = '😢';
        
        updateElementText('average-mood', averageMood);
    }
}

// ============================================
// Insights
// ============================================
function updateInsights() {
    if (moodHistory.length === 0) {
        updateElementText('most-common-mood', 'You haven\'t logged any moods yet. We can\'t even judge you properly.');
        updateElementText('mood-trend', 'No trend data available. Probably for the best.');
        updateElementText('mood-stability', 'Your moods are... nonexistent. Good job.');
        updateElementText('ai-recommendation', 'We recommend you start logging your moods. Or don\'t. We don\'t care.');
        return;
    }
    
    // Most common mood
    const moodCounts = {};
    moodHistory.forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    updateElementText('most-common-mood', `Your most common mood is ${mostCommonMood}. That tracks.`);
    
    // Trend
    const recentMoods = moodHistory.slice(0, 5);
    const moodScores = {
        happy: 10,
        excited: 8,
        meh: 5,
        tired: 4,
        bored: 3,
        anxious: 2,
        angry: 1,
        sad: 0
    };
    const recentScores = recentMoods.map(entry => moodScores[entry.mood]);
    const avgRecent = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const avgAll = moodHistory.reduce((sum, entry) => sum + moodScores[entry.mood], 0) / moodHistory.length;
    
    let trend = '';
    if (avgRecent > avgAll + 2) trend = 'Your mood is improving! (Temporarily.)';
    else if (avgRecent < avgAll - 2) trend = 'Your mood is declining. (As expected.)';
    else trend = 'Your mood is stable. (Boring.)';
    updateElementText('mood-trend', trend);
    
    // Stability
    const uniqueMoods = Object.keys(moodCounts).length;
    let stability = '';
    if (uniqueMoods <= 2) stability = 'Your moods are very consistent. (Predictably sad.)';
    else if (uniqueMoods <= 4) stability = 'Your moods vary. (Mostly between bad and worse.)';
    else stability = 'Your moods are all over the place. (Chaotic and sad.)';
    updateElementText('mood-stability', stability);
    
    // AI Recommendation
    const recommendations = [
        'We recommend you stop logging your moods. It\'s depressing.',
        'Your moods are a mess. Just like your life.',
        'Consider therapy. Or don\'t. We don\'t care.',
        'Your moods are as consistent as your failures.',
        'We\'d say cheer up, but we know you won\'t.',
        'Your mood history is a cautionary tale.',
        'Your moods are like the weather. Unpredictable and often stormy.',
        'We recommend more happiness. But we know you won\'t listen.'
    ];
    const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];
    updateElementText('ai-recommendation', randomRec);
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate mood options
    const moodOptions = document.querySelectorAll('.mood-option');
    moodOptions.forEach((option, index) => {
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
        option.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    setTimeout(() => {
        moodOptions.forEach(option => {
            option.style.opacity = '1';
            option.style.transform = 'translateY(0)';
        });
    }, 300);
}

// ============================================
// Notifications
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'mood-notification';
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

// Console easter egg
console.log('%c STUPID Mood Tracker ', 'background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Your moods are our business. ', 'color: #666; font-size: 14px;');
