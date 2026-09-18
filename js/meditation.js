/**
 * STUPID - Meditation Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initQuickMeditation();
    initTypeCards();
    initChallenges();
    initAnimations();
});

// ============================================
// Quick Meditation Timer
// ============================================
function initQuickMeditation() {
    const startButton = document.getElementById('start-quick');
    const resetButton = document.getElementById('reset-quick');
    const timerDisplay = document.getElementById('quick-timer');
    
    let timer;
    let seconds = 0;
    let isRunning = false;
    
    function updateTimer() {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    function startTimer() {
        if (isRunning) return;
        
        isRunning = true;
        startButton.innerHTML = '<span class="button-icon">⏸️</span><span class="button-text">Pause</span>';
        
        timer = setInterval(() => {
            seconds++;
            updateTimer();
            
            // Random motivational messages
            if (seconds % 30 === 0) {
                showRandomMessage();
            }
        }, 1000);
    }
    
    function pauseTimer() {
        if (!isRunning) return;
        
        isRunning = false;
        clearInterval(timer);
        startButton.innerHTML = '<span class="button-icon">▶️</span><span class="button-text">Resume</span>';
    }
    
    function resetTimer() {
        pauseTimer();
        seconds = 0;
        updateTimer();
        startButton.innerHTML = '<span class="button-icon">▶️</span><span class="button-text">Start</span>';
    }
    
    function toggleTimer() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
    
    startButton.addEventListener('click', toggleTimer);
    resetButton.addEventListener('click', resetTimer);
    
    // Initialize timer
    updateTimer();
}

// ============================================
// Random Messages
// ============================================
const meditationMessages = [
    "Breathe in... breathe out...",
    "Clear your mind... (Good luck with that)",
    "Focus on your breath... (Or don't, we don't care)",
    "You're doing great! (At doing nothing)",
    "Feel the energy... (Or the lack thereof)",
    "Embrace the moment... (Or ignore it completely)",
    "Let go of your thoughts... (They'll come back later)",
    "Find your center... (Or just sit there)",
    "Be present... (Or zone out, either works)",
    "You're almost there! (No you're not)"
];

function showRandomMessage() {
    const message = meditationMessages[Math.floor(Math.random() * meditationMessages.length)];
    
    // Create a toast notification
    const toast = document.createElement('div');
    toast.className = 'meditation-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(14, 165, 233, 0.9);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: fadeInUp 0.3s ease, fadeOut 0.3s ease 2s forwards;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// ============================================
// Type Cards
// ============================================
function initTypeCards() {
    const typeCards = document.querySelectorAll('.type-card');
    
    typeCards.forEach(card => {
        const button = card.querySelector('.type-button');
        
        button.addEventListener('click', () => {
            const title = card.querySelector('.type-title').textContent;
            
            // Show a modal or navigate
            showMeditationModal(title);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function showMeditationModal(type) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content meditation-modal">
            <div class="modal-header">
                <h3>${type} Meditation</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Get ready for a ${type} meditation session!</p>
                <p>Find a comfortable position. Close your eyes. Take a deep breath.</p>
                <p>Just kidding, you'll probably just sit there thinking about lunch.</p>
                <div class="meditation-options">
                    <div class="option">
                        <label>Duration</label>
                        <select id="meditation-duration">
                            <option value="5">5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="15">15 minutes</option>
                            <option value="20">20 minutes</option>
                            <option value="30">30 minutes</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="cta-button outline modal-cancel">Give Up (Again)</button>
                <button class="cta-button primary modal-start">Commit to This Poor Decision</button>
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
    
    // Start session
    const startButton = modal.querySelector('.modal-start');
    startButton.addEventListener('click', () => {
        const duration = document.getElementById('meditation-duration').value;
        startMeditationSession(type, duration);
        modal.remove();
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function startMeditationSession(type, duration) {
    // Show session started notification
    const notification = document.createElement('div');
    notification.className = 'session-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>Session Started!</h3>
            <p>Your ${type} meditation session has begun.</p>
            <p>Duration: ${duration} minutes</p>
            <p>You'll probably quit after 2 minutes. Try again. And again. And again. Embrace the pain.</p>
            <button class="cta-button primary notification-close">Cancel</button>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        max-width: 400px;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ============================================
// Challenges
// ============================================
function initChallenges() {
    const challengeButtons = document.querySelectorAll('.challenge-button');
    
    challengeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.challenge-card');
            const title = card.querySelector('.challenge-title').textContent;
            
            // Show challenge started notification
            showChallengeNotification(title);
        });
    });
}

function showChallengeNotification(title) {
    const notification = document.createElement('div');
    notification.className = 'challenge-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>Challenge Started!</h3>
            <p>You've started the "${title}" challenge.</p>
            <p>Day 1: Set a goal. You'll abandon it by Day 3.</p>
            <button class="cta-button primary notification-close">Feed Your Illusion of Progress</button>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate stats
    const statNumbers = document.querySelectorAll('.page-stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        if (text === '∞') {
            // Infinite animation
            stat.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
    
    // Add reveal animations
    const cards = document.querySelectorAll('.type-card, .challenge-card, .benefit-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Trigger animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// Easter Eggs
// ============================================

// Double click on meditation types to trigger easter egg
const typeCards = document.querySelectorAll('.type-card');
typeCards.forEach(card => {
    card.addEventListener('dblclick', () => {
        const title = card.querySelector('.type-title').textContent;
        alert(`Congratulations! You've unlocked the secret ${title} achievement. It does nothing.`);
    });
});

// Console easter egg
console.log('%c STUPID Meditation ', 'background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c The only way to achieve inner peace is to stop trying. ', 'color: #666; font-size: 14px;');
