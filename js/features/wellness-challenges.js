/**
 * STUPID - Wellness Challenges Feature
 * Impossible and absurd challenges
 */

// ============================================
// Challenges Data
// ============================================
const challenges = {
    fitness: [
        {
            id: '10k-steps',
            title: '10K Steps Daily',
            description: 'Walk 10,000 steps every day for a week. The recommended daily amount for basic human function.',
            duration: '7 days',
            difficulty: 'Hard',
            category: 'fitness',
            completionRate: '5%',
            failureRate: '95%'
        },
        {
            id: 'yoga-30',
            title: 'Yoga for 30 Days',
            description: 'Practice yoga every day for 30 days. If you miss one day, start over and cry.',
            duration: '30 days',
            difficulty: 'Impossible',
            category: 'fitness',
            completionRate: '0%',
            failureRate: '100%'
        },
        {
            id: 'workout-5x',
            title: 'Work Out 5x/Week',
            description: 'Work out 5 times a week for a month. You\'ll quit by week 2.',
            duration: '30 days',
            difficulty: 'Very Hard',
            category: 'fitness',
            completionRate: '2%',
            failureRate: '98%'
        },
        {
            id: 'plank-5min',
            title: '5-Minute Plank',
            description: 'Hold a plank for 5 minutes. Your arms will give out before your willpower does.',
            duration: '1 day',
            difficulty: 'Hard',
            category: 'fitness',
            completionRate: '10%',
            failureRate: '90%'
        },
        {
            id: 'run-5k',
            title: 'Run a 5K',
            description: 'Run 5 kilometers. You\'ll walk most of it. And that\'s okay.',
            duration: '1 day',
            difficulty: 'Medium',
            category: 'fitness',
            completionRate: '15%',
            failureRate: '85%'
        }
    ],
    health: [
        {
            id: 'water-8',
            title: 'Drink 8 Glasses of Water',
            description: 'Drink 8 glasses of water every day for a week. We\'ll know if you lie.',
            duration: '7 days',
            difficulty: 'Hard',
            category: 'health',
            completionRate: '5%',
            failureRate: '95%'
        },
        {
            id: 'veggies-daily',
            title: 'Eat Veggies Every Day',
            description: 'Eat vegetables every day for a month. You\'ll fail by day 3.',
            duration: '30 days',
            difficulty: 'Medium',
            category: 'health',
            completionRate: '8%',
            failureRate: '92%'
        },
        {
            id: 'no-sugar',
            title: 'No Sugar for a Week',
            description: 'Avoid sugar for 7 days. You\'ll cave by day 2.',
            duration: '7 days',
            difficulty: 'Very Hard',
            category: 'health',
            completionRate: '3%',
            failureRate: '97%'
        },
        {
            id: 'sleep-8',
            title: '8 Hours of Sleep',
            description: 'Get 8 hours of sleep every night for a week. Your body needs it. Your brain doesn\'t.',
            duration: '7 days',
            difficulty: 'Hard',
            category: 'health',
            completionRate: '7%',
            failureRate: '93%'
        },
        {
            id: 'no-alcohol',
            title: 'No Alcohol for a Month',
            description: 'Avoid alcohol for 30 days. You\'ll fail by day 5.',
            duration: '30 days',
            difficulty: 'Impossible',
            category: 'health',
            completionRate: '1%',
            failureRate: '99%'
        }
    ],
    mindfulness: [
        {
            id: 'meditate-30',
            title: 'Meditate for 30 Days',
            description: 'Meditate every day for 30 days. If you miss one day, start over and cry.',
            duration: '30 days',
            difficulty: 'Impossible',
            category: 'mindfulness',
            completionRate: '0%',
            failureRate: '100%'
        },
        {
            id: 'journal-daily',
            title: 'Journal Every Day',
            description: 'Write in a journal every day for a month. You\'ll run out of things to say by day 3.',
            duration: '30 days',
            difficulty: 'Hard',
            category: 'mindfulness',
            completionRate: '5%',
            failureRate: '95%'
        },
        {
            id: 'gratitude',
            title: 'Gratitude Practice',
            description: 'Write down 3 things you\'re grateful for every day. You\'ll struggle to find one.',
            duration: '7 days',
            difficulty: 'Medium',
            category: 'mindfulness',
            completionRate: '10%',
            failureRate: '90%'
        },
        {
            id: 'no-complaints',
            title: 'No Complaints for a Week',
            description: 'Go 7 days without complaining. You\'ll fail by hour 2.',
            duration: '7 days',
            difficulty: 'Impossible',
            category: 'mindfulness',
            completionRate: '0%',
            failureRate: '100%'
        },
        {
            id: 'digital-detox',
            title: 'Digital Detox',
            description: 'Avoid social media for 24 hours. You\'ll be back in 3.',
            duration: '1 day',
            difficulty: 'Very Hard',
            category: 'mindfulness',
            completionRate: '2%',
            failureRate: '98%'
        }
    ],
    social: [
        {
            id: 'smile-stranger',
            title: 'Smile at a Stranger',
            description: 'Smile at a stranger every day for a week. They\'ll think you\'re weird. Worth it.',
            duration: '7 days',
            difficulty: 'Social Suicide',
            category: 'social',
            completionRate: '2%',
            failureRate: '98%'
        },
        {
            id: 'compliment-someone',
            title: 'Compliment Someone',
            description: 'Give a genuine compliment to someone every day. You\'ll feel awkward. They\'ll feel suspicious.',
            duration: '7 days',
            difficulty: 'Hard',
            category: 'social',
            completionRate: '5%',
            failureRate: '95%'
        },
        {
            id: 'call-friend',
            title: 'Call a Friend',
            description: 'Call a friend you haven\'t talked to in a while. They\'ll be surprised you remember them.',
            duration: '1 day',
            difficulty: 'Medium',
            category: 'social',
            completionRate: '15%',
            failureRate: '85%'
        },
        {
            id: 'random-act',
            title: 'Random Act of Kindness',
            description: 'Do something kind for a stranger. You\'ll feel good. Then you\'ll go back to being selfish.',
            duration: '1 day',
            difficulty: 'Easy',
            category: 'social',
            completionRate: '20%',
            failureRate: '80%'
        },
        {
            id: 'no-gossip',
            title: 'No Gossip for a Week',
            description: 'Avoid gossip for 7 days. You\'ll fail by day 1.',
            duration: '7 days',
            difficulty: 'Impossible',
            category: 'social',
            completionRate: '0%',
            failureRate: '100%'
        }
    ],
    productivity: [
        {
            id: 'pomodoro',
            title: 'Pomodoro Technique',
            description: 'Work for 25 minutes, then take a 5-minute break. Repeat 4 times. You\'ll quit after 1.',
            duration: '1 day',
            difficulty: 'Medium',
            category: 'productivity',
            completionRate: '10%',
            failureRate: '90%'
        },
        {
            id: 'to-do-list',
            title: 'To-Do List Daily',
            description: 'Make a to-do list every day and complete everything on it. You won\'t.',
            duration: '7 days',
            difficulty: 'Hard',
            category: 'productivity',
            completionRate: '3%',
            failureRate: '97%'
        },
        {
            id: 'no-procrastination',
            title: 'No Procrastination',
            description: 'Don\'t procrastinate for a full day. You\'ll fail by 10 AM.',
            duration: '1 day',
            difficulty: 'Impossible',
            category: 'productivity',
            completionRate: '0%',
            failureRate: '100%'
        },
        {
            id: 'inbox-zero',
            title: 'Inbox Zero',
            description: 'Get your email inbox to zero. It\'ll be back to 100 by tomorrow.',
            duration: '1 day',
            difficulty: 'Very Hard',
            category: 'productivity',
            completionRate: '5%',
            failureRate: '95%'
        },
        {
            id: 'early-rising',
            title: 'Early Rising',
            description: 'Wake up at 6 AM every day for a week. You\'ll hit snooze.',
            duration: '7 days',
            difficulty: 'Hard',
            category: 'productivity',
            completionRate: '2%',
            failureRate: '98%'
        }
    ],
    absurd: [
        {
            id: 'talk-plant',
            title: 'Talk to a Plant',
            description: 'Talk to a plant every day for a week. It won\'t judge you. But we will.',
            duration: '7 days',
            difficulty: 'Easy',
            category: 'absurd',
            completionRate: '50%',
            failureRate: '50%'
        },
        {
            id: 'sing-public',
            title: 'Sing in Public',
            description: 'Sing a song in public. People will stare. You\'ll regret it. Worth it.',
            duration: '1 day',
            difficulty: 'Social Suicide',
            category: 'absurd',
            completionRate: '1%',
            failureRate: '99%'
        },
        {
            id: 'dance-alone',
            title: 'Dance Like No One\'s Watching',
            description: 'Dance like no one\'s watching. They are. And they\'re judging you.',
            duration: '1 day',
            difficulty: 'Medium',
            category: 'absurd',
            completionRate: '10%',
            failureRate: '90%'
        },
        {
            id: 'wear-mismatch',
            title: 'Wear Mismatched Socks',
            description: 'Wear mismatched socks all day. People will notice. You won\'t care.',
            duration: '1 day',
            difficulty: 'Easy',
            category: 'absurd',
            completionRate: '80%',
            failureRate: '20%'
        },
        {
            id: 'talk-mirror',
            title: 'Talk to Yourself in the Mirror',
            description: 'Have a conversation with yourself in the mirror. You\'ll lose. Every time.',
            duration: '1 day',
            difficulty: 'Medium',
            category: 'absurd',
            completionRate: '30%',
            failureRate: '70%'
        },
        {
            id: 'eat-rainbow',
            title: 'Eat a Rainbow',
            description: 'Eat one food of each color of the rainbow in one day. Skittles don\'t count.',
            duration: '1 day',
            difficulty: 'Hard',
            category: 'absurd',
            completionRate: '5%',
            failureRate: '95%'
        }
    ]
};

// ============================================
// Active Challenges
// ============================================
let activeChallenges = JSON.parse(localStorage.getItem('stupid_active_challenges')) || [];

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initFeaturedChallenges();
    initCategoryCards();
    initActiveChallenges();
    initLeaderboard();
    updateStats();
    initAnimations();
});

// ============================================
// Featured Challenges
// ============================================
function initFeaturedChallenges() {
    const featuredChallenges = [
        challenges.mindfulness[0], // Meditate for 30 Days
        challenges.health[0],      // Drink 8 Glasses of Water
        challenges.social[0]       // Smile at a Stranger
    ];
    
    const featuredGrid = document.querySelector('.featured-grid');
    if (!featuredGrid) return;
    
    featuredGrid.innerHTML = featuredChallenges.map(challenge => createChallengeCard(challenge, true)).join('');
    
    // Add event listeners
    document.querySelectorAll('.challenge-start-button').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.challenge-card');
            const challengeId = card.dataset.challenge;
            startChallenge(challengeId);
        });
    });
}

// ============================================
// Category Cards
// ============================================
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.challenge-category');
    
    categoryCards.forEach(card => {
        const category = card.dataset.category;
        const button = card.querySelector('.category-button');
        
        if (button) {
            button.addEventListener('click', () => {
                showCategoryChallenges(category);
            });
        }
        
        // Add mini challenges
        const miniChallengesContainer = card.querySelector('.category-challenges');
        if (miniChallengesContainer && challenges[category]) {
            const miniChallenges = challenges[category].slice(0, 3);
            miniChallengesContainer.innerHTML = miniChallenges.map(challenge => `
                <div class="mini-challenge">
                    <span class="mini-icon">${getIconForChallenge(challenge)}</span>
                    <span class="mini-title">${challenge.title}</span>
                </div>
            `).join('');
        }
    });
}

function showCategoryChallenges(category) {
    const categoryChallenges = challenges[category] || [];
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content challenge-modal">
            <div class="modal-header">
                <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Challenges</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="challenges-grid">
                    ${categoryChallenges.map(challenge => createChallengeCard(challenge, false)).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <button class="cta-button outline modal-cancel">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
    
    // Close modal
    const closeButton = modal.querySelector('.modal-close');
    const cancelButton = modal.querySelector('.modal-cancel');
    
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
    
    cancelButton.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Add event listeners to challenge buttons
    modal.querySelectorAll('.challenge-start-button').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.challenge-card');
            const challengeId = card.dataset.challenge;
            startChallenge(challengeId);
            modal.remove();
        });
    });
}

function createChallengeCard(challenge, isFeatured) {
    const icon = getIconForChallenge(challenge);
    
    return `
        <div class="challenge-card ${isFeatured ? 'featured' : ''}" data-challenge="${challenge.id}">
            ${isFeatured ? '<div class="challenge-badge featured">Featured</div>' : ''}
            <div class="challenge-icon">${icon}</div>
            <h3 class="challenge-title">${challenge.title}</h3>
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-meta">
                <span class="challenge-difficulty">Difficulty: ${challenge.difficulty}</span>
                <span class="challenge-duration">Duration: ${challenge.duration}</span>
            </div>
            <div class="challenge-stats">
                <span class="stat-item">
                    <strong>${challenge.completionRate}</strong> Completion Rate
                </span>
                <span class="stat-item">
                    <strong>${challenge.failureRate}</strong> Failure Rate
                </span>
            </div>
            <button class="cta-button primary challenge-start-button">
                <span class="button-text">Start Challenge</span>
                <span class="button-subtext">(You'll fail)</span>
            </button>
        </div>
    `;
}

function getIconForChallenge(challenge) {
    const icons = {
        '10k-steps': '🏃',
        'yoga-30': '🧘',
        'workout-5x': '💪',
        'plank-5min': '🏋️',
        'run-5k': '🏃‍♂️',
        'water-8': '💧',
        'veggies-daily': '🥗',
        'no-sugar': '🍭',
        'sleep-8': '😴',
        'no-alcohol': '🍷',
        'meditate-30': '🧘‍♀️',
        'journal-daily': '📝',
        'gratitude': '🙏',
        'no-complaints': '🤫',
        'digital-detox': '📵',
        'smile-stranger': '😊',
        'compliment-someone': '💬',
        'call-friend': '📞',
        'random-act': '❤️',
        'no-gossip': '🚫',
        'pomodoro': '⏰',
        'to-do-list': '📋',
        'no-procrastination': '🚀',
        'inbox-zero': '📧',
        'early-rising': '🌅',
        'talk-plant': '🌱',
        'sing-public': '🎤',
        'dance-alone': '💃',
        'wear-mismatch': '🧦',
        'talk-mirror': '🪞',
        'eat-rainbow': '🌈'
    };
    
    return icons[challenge.id] || '🏆';
}

// ============================================
// Start Challenge
// ============================================
function startChallenge(challengeId) {
    // Check if challenge is already active
    const existingChallenge = activeChallenges.find(c => c.id === challengeId);
    if (existingChallenge) {
        showNotification('You\'ve already started this challenge. And you\'re failing at it.');
        return;
    }
    
    // Find the challenge
    let challenge = null;
    for (const category of Object.keys(challenges)) {
        challenge = challenges[category].find(c => c.id === challengeId);
        if (challenge) break;
    }
    
    if (!challenge) {
        showNotification('Challenge not found. Just like your motivation.');
        return;
    }
    
    // Add to active challenges
    const activeChallenge = {
        ...challenge,
        startDate: new Date().toISOString().split('T')[0],
        progress: 0,
        status: 'active'
    };
    
    activeChallenges.push(activeChallenge);
    localStorage.setItem('stupid_active_challenges', JSON.stringify(activeChallenges));
    
    // Update UI
    updateActiveChallenges();
    updateStats();
    
    showNotification(`Challenge started: ${challenge.title}. You'll fail by day 3.`);
}

// ============================================
// Active Challenges
// ============================================
function initActiveChallenges() {
    updateActiveChallenges();
    
    // Start challenge CTA
    const startCta = document.getElementById('start-challenge-cta');
    if (startCta) {
        startCta.addEventListener('click', () => {
            showNotification('Pick a challenge! Any challenge. You\'ll fail at all of them.');
        });
    }
    
    // Browse challenges button
    const browseButton = document.getElementById('browse-challenges');
    if (browseButton) {
        browseButton.addEventListener('click', () => {
            showNotification('Browse away! You won\'t start any of them.');
        });
    }
}

function updateActiveChallenges() {
    const activeList = document.getElementById('active-challenges');
    if (!activeList) return;
    
    if (activeChallenges.length === 0) {
        activeList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🏆</div>
                <h3 class="empty-title">No Active Challenges</h3>
                <p class="empty-description">
                    You haven't started any challenges yet. That's probably for the best. You'd just fail anyway.
                </p>
                <button class="cta-button primary" id="start-challenge-cta">
                    <span class="button-text">Start a Challenge</span>
                    <span class="button-subtext">(You'll regret it)</span>
                </button>
            </div>
        `;
        
        // Re-attach event listener
        const startCta = document.getElementById('start-challenge-cta');
        if (startCta) {
            startCta.addEventListener('click', () => {
                showNotification('Pick a challenge! Any challenge. You\'ll fail at all of them.');
            });
        }
        return;
    }
    
    activeList.innerHTML = activeChallenges.map(challenge => {
        const icon = getIconForChallenge(challenge);
        const progress = Math.round(Math.random() * 30); // Random progress for demo
        
        return `
            <div class="active-challenge">
                <div class="challenge-icon">${icon}</div>
                <div class="challenge-info">
                    <div class="challenge-name">${challenge.title}</div>
                    <div class="challenge-progress">${progress}% complete</div>
                </div>
                <div class="challenge-actions">
                    <button class="action-button" title="View details">👁️</button>
                    <button class="action-button" title="Mark complete">✅</button>
                    <button class="action-button" title="Abandon">❌</button>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Leaderboard
// ============================================
function initLeaderboard() {
    const tabButtons = document.querySelectorAll('.leaderboard-tabs .tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            // In a real app, you'd update the leaderboard data here
        });
    });
}

// ============================================
// Stats
// ============================================
function updateStats() {
    updateElementText('challenges-started', activeChallenges.length);
    updateElementText('challenges-completed', Math.floor(activeChallenges.length * 0.05)); // 5% completion rate
    updateElementText('challenges-failed', '95%');
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate featured challenges
    const featuredCards = document.querySelectorAll('.challenge-card.featured');
    featuredCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    setTimeout(() => {
        featuredCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 300);
    
    // Animate category cards
    const categoryCards = document.querySelectorAll('.category-card.challenge-category');
    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${0.3 + index * 0.1}s`;
    });
    
    setTimeout(() => {
        categoryCards.forEach(card => {
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
    notification.className = 'challenge-notification';
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

// Click on challenge card to get a special message
const challengeCards = document.querySelectorAll('.challenge-card');
challengeCards.forEach(card => {
    card.addEventListener('dblclick', () => {
        const title = card.querySelector('.challenge-title').textContent;
        showNotification(`You double-clicked on "${title}". That's how desperate you are.`);
    });
});

// Console easter egg
console.log('%c STUPID Wellness Challenges ', 'background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c You\'ll fail at all of them. But at least you\'ll have something to do. ', 'color: #666; font-size: 14px;');
