/**
 * STUPID - Sleep Tracker Feature
 * Insult your rest
 */

// ============================================
// Sleep Data
// ============================================
let sleepHistory = JSON.parse(localStorage.getItem('stupid_sleep_history')) || [];

// ============================================
// Shame Messages
// ============================================
const sleepShameMessages = {
    '<6': [
        "Congratulations on your self-destructive lifestyle.",
        "Your sleep habits are killing you. Literally.",
        "6 hours of sleep? Your body hates you.",
        "You slept less than 6 hours. Your brain is mush.",
        "Your sleep is so short, it's practically a nap.",
        "Less than 6 hours? You're not sleeping, you're slowly dying.",
        "Your sleep habits are a crime against humanity.",
        "You slept less than 6 hours. Your productivity is zero.",
        "Your sleep is so short, your dreams don't have time to form.",
        "Less than 6 hours of sleep. Your reward is exhaustion and poor decisions."
    ],
    '6-8': [
        "Adequate. Don't expect a medal.",
        "6-8 hours? You're doing the bare minimum.",
        "Your sleep is adequate. Your life is not.",
        "You slept enough to not die. Barely.",
        "6-8 hours is great. For someone with no ambition.",
        "Your sleep is adequate. Your dreams are not.",
        "You slept 6-8 hours. Your reward is not being a complete zombie.",
        "Adequate sleep. Adequate life. Adequate disappointment.",
        "6-8 hours of sleep. The participation trophy of rest.",
        "Your sleep is adequate. Your soul is still exhausted."
    ],
    '>8': [
        "Are you a cat? Or just avoiding your problems?",
        "More than 8 hours? Are you in a coma?",
        "Your sleep is excessive. Your life is still a mess.",
        "You slept more than 8 hours. Are you depressed or just lazy?",
        "More than 8 hours of sleep. Your reward is missing out on life.",
        "Your sleep is through the roof. Your productivity is in the basement.",
        "You slept more than 8 hours. Are you running from something?",
        "More than 8 hours? Your body needed it. Your soul didn't.",
        "Your sleep is excessive. Your problems are still there.",
        "You slept more than 8 hours. Your reward is being well-rested and still unhappy."
    ]
};

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initSleepLogger();
    initQuickLog();
    initShamingCards();
    initChart();
    initFilters();
    initChallenges();
    updateStats();
    updateHistory();
    updateInsights();
    initAnimations();
});

// ============================================
// Sleep Logger
// ============================================
function initSleepLogger() {
    const logButton = document.getElementById('log-sleep');
    const bedtimeInput = document.getElementById('bedtime');
    const wakeupInput = document.getElementById('wakeup');
    const qualitySelect = document.getElementById('sleep-quality');
    
    if (logButton) {
        logButton.addEventListener('click', () => {
            const bedtime = bedtimeInput ? bedtimeInput.value : '23:00';
            const wakeup = wakeupInput ? wakeupInput.value : '07:00';
            const quality = qualitySelect ? qualitySelect.value : '3';
            
            logSleep(bedtime, wakeup, quality);
        });
    }
    
    // Set default times
    if (bedtimeInput) bedtimeInput.value = '23:00';
    if (wakeupInput) wakeupInput.value = '07:00';
}

function logSleep(bedtime, wakeup, quality) {
    // Parse times
    const [bedHours, bedMinutes] = bedtime.split(':').map(Number);
    const [wakeHours, wakeMinutes] = wakeup.split(':').map(Number);
    
    // Calculate duration in minutes
    let durationMinutes = 0;
    
    if (wakeHours >= bedHours) {
        durationMinutes = (wakeHours - bedHours) * 60 + (wakeMinutes - bedMinutes);
    } else {
        // Crossed midnight
        durationMinutes = (24 - bedHours + wakeHours) * 60 + (wakeMinutes - bedMinutes);
    }
    
    // Convert to hours
    const durationHours = Math.floor(durationMinutes / 60);
    const durationMins = durationMinutes % 60;
    
    // Create sleep entry
    const sleepEntry = {
        bedtime,
        wakeup,
        duration: durationMinutes,
        durationHours,
        durationMins,
        quality: parseInt(quality),
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
    };
    
    // Add to history
    sleepHistory.unshift(sleepEntry);
    
    // Keep only the last 30 days
    if (sleepHistory.length > 30) {
        sleepHistory = sleepHistory.slice(0, 30);
    }
    
    localStorage.setItem('stupid_sleep_history', JSON.stringify(sleepHistory));
    
    // Show response
    showSleepResponse(sleepEntry);
    
    // Update UI
    updateStats();
    updateHistory();
    updateInsights();
    updateChart();
    
    showNotification('Sleep logged! (We\'re judging you)');
}

function showSleepResponse(sleepEntry) {
    const responseSection = document.getElementById('sleep-response-section');
    const responseEmoji = document.getElementById('sleep-response-emoji');
    const responseTitle = document.getElementById('sleep-response-title');
    const responseMessage = document.getElementById('sleep-response-message');
    const sleepDuration = document.getElementById('sleep-duration');
    const sleepQualityDisplay = document.getElementById('sleep-quality-display');
    const sleepVerdict = document.getElementById('sleep-verdict');
    
    if (!responseSection) return;
    
    // Determine emoji based on duration
    let emoji = '😴';
    let verdict = '';
    
    if (sleepEntry.durationHours < 6) {
        emoji = '💀';
        verdict = getRandomMessage(sleepShameMessages['<6']);
    } else if (sleepEntry.durationHours <= 8) {
        emoji = '😌';
        verdict = getRandomMessage(sleepShameMessages['6-8']);
    } else {
        emoji = '😵';
        verdict = getRandomMessage(sleepShameMessages['>8']);
    }
    
    // Quality stars
    const qualityStars = getQualityStars(sleepEntry.quality);
    
    responseEmoji.textContent = emoji;
    responseTitle.textContent = 'Your Sleep';
    responseMessage.textContent = `You slept for ${sleepEntry.durationHours}h ${sleepEntry.durationMins}m.`;
    sleepDuration.textContent = `${sleepEntry.durationHours}h ${sleepEntry.durationMins}m`;
    sleepQualityDisplay.textContent = qualityStars;
    sleepVerdict.textContent = verdict;
    
    responseSection.style.display = 'block';
    
    // Scroll to response
    responseSection.scrollIntoView({ behavior: 'smooth' });
    
    // Hide after 10 seconds
    setTimeout(() => {
        responseSection.style.display = 'none';
    }, 10000);
}

function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
}

function getQualityStars(quality) {
    const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
    return stars[quality - 1] || '⭐⭐⭐';
}

// ============================================
// Quick Log
// ============================================
function initQuickLog() {
    const quickLogButton = document.getElementById('quick-log');
    
    if (quickLogButton) {
        quickLogButton.addEventListener('click', () => {
            // Quick log with default values
            logSleep('23:00', '07:00', '3');
        });
    }
}

// ============================================
// Shaming Cards
// ============================================
function initShamingCards() {
    const shameCards = document.querySelectorAll('.shame-card.sleep');
    
    shameCards.forEach(card => {
        card.addEventListener('click', () => {
            const range = card.querySelector('.shame-range');
            if (range) {
                const rangeText = range.textContent;
                showNotification(`You clicked on ${rangeText} hours. That's your sleep pattern.`);
            }
        });
    });
}

// ============================================
// Chart
// ============================================
let sleepChart = null;

function initChart() {
    const ctx = document.getElementById('sleepChart');
    if (!ctx) return;
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    sleepChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Hours of Sleep',
                data: [],
                backgroundColor: 'rgba(139, 92, 246, 0.7)',
                borderColor: '#8b5cf6',
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
                            const hours = Math.floor(context.parsed.y / 60);
                            const mins = context.parsed.y % 60;
                            return `${hours}h ${mins}m`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 60,
                        callback: function(value) {
                            const hours = Math.floor(value / 60);
                            return `${hours}h`;
                        }
                    }
                }
            }
        }
    });
    
    updateChart();
}

function updateChart() {
    if (!sleepChart) return;
    
    // Get last 7 days
    const last7Days = [];
    const last7Durations = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const entry = sleepHistory.find(e => e.date === dateString);
        const duration = entry ? entry.duration : 0;
        
        last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        last7Durations.push(duration);
    }
    
    sleepChart.data.labels = last7Days;
    sleepChart.data.datasets[0].data = last7Durations;
    sleepChart.update();
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
// Challenges
// ============================================
function initChallenges() {
    const challengeButtons = document.querySelectorAll('.sleep-challenge .challenge-button');
    
    challengeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.challenge-card');
            const title = card.querySelector('.challenge-title').textContent;
            showNotification(`Challenge started: ${title}. You'll fail by day 3.`);
        });
    });
}

// ============================================
// History
// ============================================
function updateHistory(filter = 'all') {
    const historyList = document.getElementById('sleep-list');
    if (!historyList) return;
    
    let filteredHistory = sleepHistory;
    
    // Apply filter
    if (filter === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredHistory = sleepHistory.filter(entry => new Date(entry.date) >= oneWeekAgo);
    } else if (filter === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filteredHistory = sleepHistory.filter(entry => new Date(entry.date) >= oneMonthAgo);
    }
    
    if (filteredHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <h3 class="empty-title">No Sleep Data Yet</h3>
                <p class="empty-description">
                    You haven't logged any sleep. We can't judge your rest habits if you don't participate.
                </p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = filteredHistory.map(entry => {
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
        
        return `
            <div class="sleep-item">
                <span class="sleep-date">${formattedDate}</span>
                <span class="sleep-duration">${entry.durationHours}h ${entry.durationMins}m</span>
                <span class="sleep-quality">${getQualityStars(entry.quality)}</span>
            </div>
        `;
    }).join('');
}

// ============================================
// Stats
// ============================================
function updateStats() {
    if (sleepHistory.length === 0) {
        updateElementText('last-sleep', '0h 0m');
        updateElementText('average-sleep', '0h 0m');
        updateElementText('sleep-streak', '0');
        return;
    }
    
    // Last sleep
    const lastEntry = sleepHistory[0];
    updateElementText('last-sleep', `${lastEntry.durationHours}h ${lastEntry.durationMins}m`);
    
    // Average sleep
    const totalMinutes = sleepHistory.reduce((sum, entry) => sum + entry.duration, 0);
    const averageMinutes = totalMinutes / sleepHistory.length;
    const averageHours = Math.floor(averageMinutes / 60);
    const averageMins = Math.round(averageMinutes % 60);
    updateElementText('average-sleep', `${averageHours}h ${averageMins}m`);
    
    // Streak
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < sleepHistory.length; i++) {
        const entryDate = sleepHistory[i].date;
        const entryDateObj = new Date(entryDate);
        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - i);
        
        if (entryDateObj.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
            streak++;
        } else {
            break;
        }
    }
    
    updateElementText('sleep-streak', streak);
}

// ============================================
// Insights
// ============================================
function updateInsights() {
    if (sleepHistory.length === 0) {
        updateElementText('average-sleep-insight', 'You haven\'t logged any sleep yet. We can\'t even judge you properly.');
        updateElementText('sleep-trend-insight', 'No trend data available. Probably for the best.');
        updateElementText('sleep-consistency-insight', 'Your sleep is... nonexistent. Good job.');
        updateElementText('sleep-ai-recommendation', 'We recommend you start logging your sleep. Or don\'t. We don\'t care.');
        return;
    }
    
    // Average sleep
    const totalMinutes = sleepHistory.reduce((sum, entry) => sum + entry.duration, 0);
    const averageMinutes = totalMinutes / sleepHistory.length;
    const averageHours = Math.floor(averageMinutes / 60);
    
    let averageInsight = '';
    if (averageHours < 6) averageInsight = `Your average sleep is ${averageHours}h. That's not healthy.`;
    else if (averageHours <= 8) averageInsight = `Your average sleep is ${averageHours}h. Adequate. Don't expect a medal.`;
    else averageInsight = `Your average sleep is ${averageHours}h. Are you a cat? Or just avoiding life?`;
    
    updateElementText('average-sleep-insight', averageInsight);
    
    // Trend
    const recentSleep = sleepHistory.slice(0, 5);
    const recentAvg = recentSleep.reduce((sum, entry) => sum + entry.duration, 0) / recentSleep.length;
    const allAvg = totalMinutes / sleepHistory.length;
    
    let trendInsight = '';
    if (recentAvg > allAvg + 30) trendInsight = 'Your sleep is improving! (Temporarily.)';
    else if (recentAvg < allAvg - 30) trendInsight = 'Your sleep is declining. (As expected.)';
    else trendInsight = 'Your sleep is stable. (Boring.)';
    
    updateElementText('sleep-trend-insight', trendInsight);
    
    // Consistency
    const uniqueDurations = new Set(sleepHistory.map(entry => entry.durationHours));
    let consistencyInsight = '';
    if (uniqueDurations.size <= 2) consistencyInsight = 'Your sleep is very consistent. (Predictably sad.)';
    else if (uniqueDurations.size <= 4) consistencyInsight = 'Your sleep varies. (Mostly between bad and worse.)';
    else consistencyInsight = 'Your sleep is all over the place. (Chaotic and sad.)';
    
    updateElementText('sleep-consistency-insight', consistencyInsight);
    
    // AI Recommendation
    const recommendations = [
        'We recommend you sleep more. Or at least stop lying about it.',
        'Your sleep habits are a mess. Just like your life.',
        'Consider a consistent sleep schedule. But we know you won\'t.',
        'Your sleep is as consistent as your failures.',
        'We\'d say get more sleep, but we know you won\'t listen.',
        'Your sleep history is a cautionary tale.',
        'Your sleep is like the weather. Unpredictable and often stormy.',
        'We recommend therapy. Or just more sleep. Either way, you won\'t do it.'
    ];
    const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];
    updateElementText('sleep-ai-recommendation', randomRec);
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate sleep input
    const sleepInput = document.querySelector('.sleep-input');
    if (sleepInput) {
        sleepInput.style.opacity = '0';
        sleepInput.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            sleepInput.style.opacity = '1';
            sleepInput.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate shame cards
    const shameCards = document.querySelectorAll('.shame-card.sleep');
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
    notification.className = 'sleep-notification';
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
console.log('%c STUPID Sleep Tracker ', 'background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Your sleep habits are our business. ', 'color: #666; font-size: 14px;');
