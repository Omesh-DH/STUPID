/**
 * STUPID - Progress Dashboard Feature
 * Public humiliation mode
 */

// ============================================
// Data
// ============================================
let userStats = JSON.parse(localStorage.getItem('stupid_user_stats')) || {
    affirmations: 0,
    moods: 0,
    steps: 0,
    water: 0,
    sleep: 0,
    challenges: 0
};

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    initPublicHumiliation();
    initImprovementTips();
    updateStats();
    updateLeaderboard();
    initAnimations();
});

// ============================================
// Stats
// ============================================
function updateStats() {
    // Load stats from localStorage
    const affirmationsHistory = JSON.parse(localStorage.getItem('stupid_affirmation_history')) || [];
    const moodHistory = JSON.parse(localStorage.getItem('stupid_mood_history')) || [];
    const stepHistory = JSON.parse(localStorage.getItem('stupid_step_history')) || [];
    const waterHistory = JSON.parse(localStorage.getItem('stupid_water_history')) || [];
    const sleepHistory = JSON.parse(localStorage.getItem('stupid_sleep_history')) || [];
    const activeChallenges = JSON.parse(localStorage.getItem('stupid_active_challenges')) || [];
    
    // Update user stats
    userStats = {
        affirmations: affirmationsHistory.length,
        moods: moodHistory.length,
        steps: stepHistory.reduce((sum, entry) => sum + entry.steps, 0),
        water: waterHistory.reduce((sum, entry) => sum + entry.glasses, 0),
        sleep: sleepHistory.reduce((sum, entry) => sum + entry.durationHours, 0),
        challenges: activeChallenges.length
    };
    
    localStorage.setItem('stupid_user_stats', JSON.stringify(userStats));
    
    // Update DOM
    updateElementText('total-affirmations', userStats.affirmations);
    updateElementText('total-moods', userStats.moods);
    updateElementText('total-steps', userStats.steps.toLocaleString());
    updateElementText('total-water', userStats.water);
    updateElementText('total-sleep', `${userStats.sleep}h`);
    updateElementText('challenges-completed', Math.floor(userStats.challenges * 0.05));
    
    // Calculate STUPID score (completely arbitrary)
    const stupidScore = Math.floor(
        (userStats.affirmations * 10) +
        (userStats.moods * 5) +
        (userStats.steps / 1000) +
        (userStats.water * 20) +
        (userStats.sleep * 10) +
        (userStats.challenges * 50)
    );
    updateElementText('stupid-score', stupidScore.toLocaleString());
    
    // Calculate rank (completely made up)
    const rank = Math.floor(Math.random() * 10000) + 1;
    updateElementText('global-rank', `#${rank.toLocaleString()}`);
    
    // Calculate percentile (always in the bottom)
    const percentile = Math.floor(Math.random() * 50) + 1; // 1-50%
    updateElementText('percentile', `${percentile}%`);
    
    // Update rank fill
    const rankFill = document.getElementById('rank-fill');
    if (rankFill) {
        rankFill.style.width = `${percentile}%`;
    }
    
    // Update bottom percent
    updateElementText('bottom-percent', `${100 - percentile}%`);
    
    // Update current rank
    updateElementText('current-rank', `#${rank.toLocaleString()}`);
    updateElementText('total-users', (rank + Math.floor(Math.random() * 1000)).toLocaleString());
}

// ============================================
// Charts
// ============================================
let activityChart = null;
let wellnessChart = null;

function initCharts() {
    const activityCtx = document.getElementById('activityChart');
    const wellnessCtx = document.getElementById('wellnessChart');
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Activity Chart
    if (activityCtx) {
        activityChart = new Chart(activityCtx, {
            type: 'bar',
            data: {
                labels: ['You', 'Average User'],
                datasets: [{
                    label: 'Steps',
                    data: [userStats.steps / 1000, (userStats.steps / 1000) + 5000],
                    backgroundColor: ['#0ea5e9', '#0ea5e9'],
                    borderWidth: 0
                }, {
                    label: 'Water (glasses)',
                    data: [userStats.water, userStats.water + 4],
                    backgroundColor: ['#22c55e', '#22c55e'],
                    borderWidth: 0
                }, {
                    label: 'Sleep (hours)',
                    data: [userStats.sleep, userStats.sleep + 2],
                    backgroundColor: ['#8b5cf6', '#8b5cf6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Wellness Chart
    if (wellnessCtx) {
        wellnessChart = new Chart(wellnessCtx, {
            type: 'doughnut',
            data: {
                labels: ['You', 'Average User', 'Top 10%'],
                datasets: [{
                    data: [userStats.moods + userStats.affirmations, 50, 100],
                    backgroundColor: ['#ef4444', '#f97316', '#22c55e'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
    
    updateCharts();
}

function updateCharts() {
    if (!activityChart || !wellnessChart) return;
    
    // Update activity chart
    activityChart.data.datasets[0].data = [userStats.steps / 1000, (userStats.steps / 1000) + 5000];
    activityChart.data.datasets[1].data = [userStats.water, userStats.water + 4];
    activityChart.data.datasets[2].data = [userStats.sleep, userStats.sleep + 2];
    activityChart.update();
    
    // Update wellness chart
    wellnessChart.data.datasets[0].data = [
        userStats.moods + userStats.affirmations,
        50,
        100
    ];
    wellnessChart.update();
}

// ============================================
// Public Humiliation
// ============================================
function initPublicHumiliation() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList.contains('twitter') ? 'Twitter' :
                            button.classList.contains('facebook') ? 'Facebook' :
                            button.classList.contains('instagram') ? 'Instagram' : 'LinkedIn';
            
            showNotification(`Shared to ${platform}! (No one cares)`);
        });
    });
}

// ============================================
// Leaderboard
// ============================================
function updateLeaderboard() {
    const rank = Math.floor(Math.random() * 10000) + 1;
    const totalUsers = rank + Math.floor(Math.random() * 1000);
    
    // Update rank
    updateElementText('current-rank', `#${rank.toLocaleString()}`);
    updateElementText('total-users', totalUsers.toLocaleString());
    
    // Update rank fill
    const rankFill = document.getElementById('rank-fill');
    if (rankFill) {
        const percentile = Math.floor((rank / totalUsers) * 100);
        rankFill.style.width = `${percentile}%`;
    }
    
    // Update bottom percent
    updateElementText('bottom-percent', `${100 - Math.floor((rank / totalUsers) * 100)}%`);
    
    // Generate fake leaderboard rows
    const leaderboardRows = document.getElementById('leaderboard-rows');
    if (leaderboardRows) {
        const fakeUsers = [
            { name: 'STUPID_Bot', avatar: '🥇', challenges: '∞', score: '99,999' },
            { name: 'NotRealUser', avatar: '🥈', challenges: '100', score: '50,000' },
            { name: 'FakePerson', avatar: '🥉', challenges: '50', score: '25,000' },
            { name: 'TestAccount', avatar: '🏅', challenges: '25', score: '12,500' },
            { name: 'DemoUser', avatar: '🎖️', challenges: '10', score: '5,000' },
            { name: 'You', avatar: '👤', challenges: activeChallenges.length, score: userStats.stupidScore }
        ];
        
        leaderboardRows.innerHTML = fakeUsers.map((user, index) => `
            <div class="leaderboard-row ${user.name === 'You' ? 'you' : ''}">
                <span class="rank">${index + 1}</span>
                <span class="user">
                    <div class="user-avatar">${user.avatar}</div>
                    <span class="user-name">${user.name}</span>
                </span>
                <span class="challenges">${user.challenges}</span>
                <span class="score">${user.score.toLocaleString()}</span>
            </div>
        `).join('');
    }
}

// ============================================
// Improvement Tips
// ============================================
function initImprovementTips() {
    const tipButtons = document.querySelectorAll('.tip-action .cta-button');
    
    tipButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tipTitle = button.closest('.tip-card').querySelector('.tip-title').textContent;
            showNotification(`Tip: ${tipTitle}. You won't follow it.`);
        });
    });
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    setTimeout(() => {
        statCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 300);
    
    // Animate chart cards
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${0.4 + index * 0.1}s`;
    });
    
    setTimeout(() => {
        chartCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 600);
    
    // Animate humiliation cards
    const humiliationCards = document.querySelectorAll('.humiliation-card');
    humiliationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${0.7 + index * 0.1}s`;
    });
    
    setTimeout(() => {
        humiliationCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 900);
}

// ============================================
// Notifications
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'dashboard-notification';
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

// Click on rank to get a special message
const rankElement = document.getElementById('global-rank');
if (rankElement) {
    rankElement.addEventListener('click', () => {
        showNotification('You clicked on your rank. It\'s as bad as you thought.');
    });
}

// Click on STUPID score to get a special message
const stupidScoreElement = document.getElementById('stupid-score');
if (stupidScoreElement) {
    stupidScoreElement.addEventListener('click', () => {
        showNotification('Your STUPID score is a reflection of your life. And it\'s not great.');
    });
}

// Console easter egg
console.log('%c STUPID Progress Dashboard ', 'background: linear-gradient(135deg, #ef4444, #f97316); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c You\'re in the bottom 10%. But hey, you\'re consistent! ', 'color: #666; font-size: 14px;');
