/**
 * STUPID - Motivation Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initQuoteGenerator();
    initCategoryCards();
    initChallenges();
    initAnimations();
    initSocialSharing();
});

// ============================================
// Quote Generator
// ============================================
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        highlight: "(But you don't, so give up.)",
        author: "- Steve Jobs (probably didn't say this)"
    },
    {
        text: "Believe you can and you're halfway there.",
        highlight: "(The other half is actual effort, which you won't do.)",
        author: "- Theodore Roosevelt (maybe)"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        highlight: "(You'll fail and then stop. So there's that.)",
        author: "- Winston Churchill (allegedly)"
    },
    {
        text: "Your time is limited, so don't waste it living someone else's life.",
        highlight: "(So waste it on our app instead!)",
        author: "- Steve Jobs (ironically)"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        highlight: "(Your dreams are stupid and will never come true.)",
        author: "- Eleanor Roosevelt (supposedly)"
    },
    {
        text: "Strive not to be a success, but rather to be of value.",
        highlight: "(You have no value. Just kidding! Maybe.)",
        author: "- Albert Einstein (unverified)"
    },
    {
        text: "You miss 100% of the shots you don't take.",
        highlight: "(But you'll miss 100% of the shots you do take too.)",
        author: "- Wayne Gretzky (probably)"
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        highlight: "(You'll take zero steps.)",
        author: "- Lao Tzu (allegedly)"
    },
    {
        text: "That which does not kill us makes us stronger.",
        highlight: "(You're weak and will die from paper cuts.)",
        author: "- Friedrich Nietzsche (out of context)"
    },
    {
        text: "Be the change that you wish to see in the world.",
        highlight: "(But you won't be, because you're lazy.)",
        author: "- Mahatma Gandhi (probably not)"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        highlight: "(Your doubts are justified.)",
        author: "- Franklin D. Roosevelt (maybe)"
    },
    {
        text: "Do one thing every day that scares you.",
        highlight: "(You're scared of everything, so this should be easy.)",
        author: "- Eleanor Roosevelt (again, probably)"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        highlight: "(Your plans are stupid and will fail.)",
        author: "- John Lennon (allegedly)"
    },
    {
        text: "In the middle of every difficulty lies opportunity.",
        highlight: "(The opportunity to fail spectacularly.)",
        author: "- Albert Einstein (doubtful)"
    },
    {
        text: "The best way to predict the future is to invent it.",
        highlight: "(Your future is already invented: it's failure.)",
        author: "- Alan Kay (probably misquoted)"
    }
];

function initQuoteGenerator() {
    const quoteText = document.getElementById('motivational-quote');
    const newQuoteButton = document.getElementById('new-quote');
    const shareButton = document.querySelector('.share-button');
    const saveButton = document.querySelector('.save-button');
    
    // Set initial quote
    showRandomQuote();
    
    // New quote button
    newQuoteButton.addEventListener('click', showRandomQuote);
    
    // Share button
    shareButton.addEventListener('click', () => {
        alert('Share feature coming never! Just screenshot it like a normal person.');
    });
    
    // Save button
    saveButton.addEventListener('click', () => {
        alert('Saved! (To a database that doesn\'t exist. Your quote is now in the void.)');
    });
}

function showRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteText = document.getElementById('motivational-quote');
    const authorName = document.querySelector('.author-name');
    
    quoteText.innerHTML = `${quote.text} <span class="quote-highlight">${quote.highlight}</span>`;
    authorName.textContent = quote.author;
    
    // Add animation
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        quoteText.style.opacity = '1';
        quoteText.style.transform = 'translateY(0)';
    }, 100);
}

// ============================================
// Category Cards
// ============================================
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        const button = card.querySelector('.category-button');
        
        button.addEventListener('click', () => {
            const title = card.querySelector('.category-title').textContent;
            showCategoryModal(title);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

function showCategoryModal(category) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content category-modal">
            <div class="modal-header">
                <h3>${category} Quotes</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Here are some ${category.toLowerCase()} quotes to make you feel bad about yourself:</p>
                <div class="category-quotes">
                    <div class="category-quote">
                        <p>"Quote 1 about ${category} that sounds deep but is actually meaningless."</p>
                        <span class="quote-author">- Someone Famous</span>
                    </div>
                    <div class="category-quote">
                        <p>"Quote 2 about ${category} that will make you question your life choices."</p>
                        <span class="quote-author">- Another Famous Person</span>
                    </div>
                    <div class="category-quote">
                        <p>"Quote 3 about ${category} that you'll forget in 5 minutes."</p>
                        <span class="quote-author">- Probably Not Real</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="cta-button outline modal-cancel">Close</button>
                <button class="cta-button primary">View All</button>
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
}

// ============================================
// Challenges
// ============================================
function initChallenges() {
    const challengeButtons = document.querySelectorAll('.motivation-challenges .challenge-button');
    
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
            <p>Day 1: Feel motivated. Day 2: Feel less motivated. Day 3: Give up.</p>
            <button class="cta-button primary notification-close">Got it</button>
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
// Social Sharing
// ============================================
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quote = document.getElementById('motivational-quote').textContent;
            const author = document.querySelector('.author-name').textContent;
            const fullQuote = `${quote} ${author}`;
            
            // Copy to clipboard
            navigator.clipboard.writeText(fullQuote).then(() => {
                // Show success message
                const toast = document.createElement('div');
                toast.className = 'share-toast';
                toast.textContent = 'Quote copied to clipboard! (No one will read it)';
                toast.style.cssText = `
                    position: fixed;
                    bottom: 100px;
                    right: 20px;
                    background: rgba(14, 165, 233, 0.9);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease, fadeOut 0.3s ease 2s forwards;
                `;
                
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.remove();
                }, 2500);
            });
        });
    });
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate quote on load
    const quoteText = document.getElementById('motivational-quote');
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        quoteText.style.opacity = '1';
        quoteText.style.transform = 'translateY(0)';
    }, 300);
    
    // Add reveal animations to cards
    const cards = document.querySelectorAll('.category-card, .challenge-card, .story-card, .tool-card');
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
    
    // Animate stats
    const statNumbers = document.querySelectorAll('.page-stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        if (text === '∞') {
            stat.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
}

// ============================================
// Easter Eggs
// ============================================

// Click on quote to trigger easter egg
const quoteText = document.getElementById('motivational-quote');
let clickCount = 0;

quoteText.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 5) {
        alert('Congratulations! You\'ve unlocked the "Desperate for Motivation" achievement. It does nothing.');
        clickCount = 0;
    }
});

// Console easter egg
console.log('%c STUPID Motivation ', 'background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Motivation is overrated. Just do the thing. Or don\'t. We don\'t care. ', 'color: #666; font-size: 14px;');
