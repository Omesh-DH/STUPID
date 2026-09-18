/**
 * STUPID - Self-Therapy for Unmotivated People In Denial
 * Main JavaScript
 */

// ============================================
// Language Support
// ============================================
let currentLanguage = localStorage.getItem('stupid_language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('stupid_language', lang);
    updateLanguage();
}

function getLanguage() {
    return currentLanguage;
}

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initScrollAnimations();
    initNavigation();
    initCarousel();
    initModals();
    initEasterEggs();
    initScrollToTop();
    initHeaderScroll();
    initProgressTracking();
    initRandomMessages();
    initLanguageToggle();
});

// ============================================
// Loading Screen
// ============================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const loadingText = document.querySelector('.loading-text');
    
    // Random loading messages
    const loadingMessages = {
        en: [
            'Loading... unlike your potential.',
            'Please wait... much like your career progress.',
            'Thinking... something you should try.',
            'Calculating how stupid you are...',
            'Generating excuses...',
            'Loading your regrets...',
            'Compiling your failures...',
            'Preparing to disappoint you...',
            'Initializing existential dread...',
            'Booting up your coping mechanisms...'
        ],
        de: [
            'Lädt... anders als dein Potenzial.',
            'Bitte warten... ähnlich wie dein Karrierefortschritt.',
            'Nachdenken... etwas, das du versuchen solltest.',
            'Berechne wie dumm du bist...',
            'Generiere Ausreden...',
            'Lade deine Reue...',
            'Kompiliere deine Misserfolge...',
            'Bereite dich darauf vor, dich zu enttäuschen...',
            'Initialisiere existenzielle Angst...',
            'Starte deine Bewältigungsmechanismen...'
        ]
    };
    
    // Get messages for current language
    const currentLoadingMessages = loadingMessages[currentLanguage] || loadingMessages.en;
    
    // Set random message
    if (loadingText) {
        loadingText.textContent = currentLoadingMessages[Math.floor(Math.random() * currentLoadingMessages.length)];
    }
    
    // Hide loading screen after animation
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 2500);
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Add reveal classes to elements
    const featureCards = document.querySelectorAll('.feature-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    featureCards.forEach((card, index) => {
        card.classList.add('reveal', `stagger-${(index % 3) + 1}`);
    });
    
    testimonialCards.forEach((card, index) => {
        card.classList.add('reveal-scale', `stagger-${(index % 4) + 1}`);
    });
    
    pricingCards.forEach((card, index) => {
        card.classList.add('reveal-right', `stagger-${(index % 3) + 1}`);
    });
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            
            if (target.startsWith('#')) {
                // Smooth scroll to section
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to page
                window.location.href = target;
            }
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

// ============================================
// Carousel
// ============================================
function initCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!carousel || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    const cardWidth = 320; // Width of card + gap
    const totalCards = cards.length;
    
    function updateCarousel() {
        carousel.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(totalCards - 1, currentIndex + 1);
        updateCarousel();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-scroll
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }, 5000);
}

// ============================================
// Modals
// ============================================
function initModals() {
    const errorModal = document.getElementById('error-modal');
    const easterEggModal = document.getElementById('easter-egg');
    const modalCloses = document.querySelectorAll('.modal-close');
    const modalButtons = document.querySelectorAll('.modal-button');
    
    // Close modals
    modalCloses.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close on backdrop click
    [errorModal, easterEggModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Random error modal trigger (1% chance on page load)
    if (Math.random() < 0.01) {
        setTimeout(() => {
            if (errorModal) {
                errorModal.classList.add('active');
            }
        }, 3000);
    }
}

// ============================================
// Easter Eggs
// ============================================
function initEasterEggs() {
    // Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            triggerEasterEgg();
        }
    });
    
    // Click logo 10 times
    let clickCount = 0;
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 10) {
                triggerEasterEgg();
                clickCount = 0;
            }
        });
    }
    
    // Double click on brand quote
    const brandQuote = document.querySelector('.brand-quote');
    if (brandQuote) {
        brandQuote.addEventListener('dblclick', () => {
            triggerEasterEgg();
        });
    }
    
    // Random easter egg trigger (0.1% chance per minute)
    setInterval(() => {
        if (Math.random() < 0.001) {
            triggerEasterEgg();
        }
    }, 60000);
}

function triggerEasterEgg() {
    const easterEggModal = document.getElementById('easter-egg');
    if (easterEggModal) {
        easterEggModal.classList.add('active');
    }
    
    // Create confetti
    createConfetti();
}

function createConfetti() {
    const colors = ['#0ea5e9', '#22c55e', '#8b5cf6', '#ec4899', '#f97316', '#eab308'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            left: ${Math.random() * 100}vw;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            animation-duration: ${Math.random() * 2 + 2}s;
            animation-delay: ${Math.random() * 2}s;
        `;
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// ============================================
// Scroll to Top
// ============================================
function initScrollToTop() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    
    if (!scrollToTopButton) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Create scroll to top button
    const button = document.createElement('button');
    button.className = 'scroll-to-top tap-highlight';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// Progress Tracking
// ============================================
function initProgressTracking() {
    // Store fake progress data
    const progressData = {
        meditation: Math.floor(Math.random() * 30),
        motivation: Math.floor(Math.random() * 20),
        productivity: Math.floor(Math.random() * 15)
    };
    
    localStorage.setItem('stupid_progress', JSON.stringify(progressData));
}

// ============================================
// Random Messages
// ============================================
function initRandomMessages() {
    // Add random microcopy to various elements
    const microcopyElements = document.querySelectorAll('[data-microcopy]');
    
    const messages = [
        'You got this! (Probably not)',
        'Keep going! (But why?)',
        'Almost there! (No you\'re not)',
        'Great job! (Just kidding)',
        'You\'re amazing! (At failing)',
        'Stay strong! (Or don\'t)',
        'Believe in yourself! (LOL)',
        'Every day is a new beginning! (To disappoint yourself)',
        'The only way is up! (From rock bottom)',
        'You are enough! (But not for this)'
    ];
    
    microcopyElements.forEach(element => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        element.textContent = messages[randomIndex];
    });
    
    // Console easter egg
    const consoleMessages = {
        en: [
            '%c STUPID ', 'background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;',
            '%c If you\'re an idiot, that\'s not my problem. ', 'color: #666; font-size: 14px;',
            '%c Stop looking at the console and go touch some grass. ', 'color: #999; font-size: 12px;'
        ],
        de: [
            '%c STUPID ', 'background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;',
            '%c Wenn du ein Idiot bist, ist das nicht mein Problem. ', 'color: #666; font-size: 14px;',
            '%c Hör auf, in die Konsole zu schauen und geh Gras anfassen. ', 'color: #999; font-size: 12px;'
        ]
    };
    
    const currentConsoleMessages = consoleMessages[currentLanguage] || consoleMessages.en;
    console.log(currentConsoleMessages[0]);
    console.log(currentConsoleMessages[1]);
    console.log(currentConsoleMessages[2]);
}

// ============================================
// Utility Functions
// ============================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// Page Visibility
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Tab is inactive
        document.title = 'STUPID | Come back...';
    } else {
        // Tab is active
        document.title = 'STUPID | Self-Therapy for Unmotivated People In Denial';
    }
});

// ============================================
// Before Unload
// ============================================
window.addEventListener('beforeunload', () => {
    // Show a funny message when leaving
    const messages = [
        '404: Motivation not found.',
        'Something went wrong. Just like your life choices.',
        'Try again. And again. And again. Embrace the pain.',
        'Error: User competence level insufficient.',
        'Your journey to self-improvement is only 0% complete!'
    ];
    
    // Note: Modern browsers don't allow custom messages in beforeunload
    // This is just for fun in the console
    const leaveMessages = {
        en: [
            'Are you sure you want to leave? Your problems will still be here when you get back.',
            'Leaving so soon? We were just getting to the good part (the disappointment).',
            'Wait! Don\'t go! We haven\'t even started judging you yet!',
            'Your journey to self-improvement is only 0% complete!',
            'But what about all the progress you haven\'t made?'
        ],
        de: [
            'Bist du sicher, dass du gehen willst? Deine Probleme werden immer noch hier sein, wenn du zurückkommst.',
            'Geht schon so bald? Wir kamen gerade zum guten Teil (der Enttäuschung).',
            'Warte! Geh nicht! Wir haben noch nicht einmal angefangen, dich zu verurteilen!',
            'Deine Reise zur Selbstverbesserung ist erst zu 0% abgeschlossen!',
            'Aber was ist mit allem Fortschritt, den du nicht gemacht hast?'
        ]
    };
    
    const currentLeaveMessages = leaveMessages[currentLanguage] || leaveMessages.en;
    console.log(currentLeaveMessages[Math.floor(Math.random() * currentLeaveMessages.length)]);
});

// ============================================
// Keyboard Shortcuts
// ============================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if we had one)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search feature coming never!');
    }
    
    // Ctrl/Cmd + / to show help
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        alert('Help: Stop using this app. Something went wrong. Just like your life choices.');
    }
});

// ============================================
// Touch Support
// ============================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left
            console.log('Swipe left detected');
        } else {
            // Swipe right
            console.log('Swipe right detected');
        }
    }
}

// ============================================
// Performance Monitoring (Satirical)
// ============================================
window.addEventListener('load', () => {
    // Log fake performance metrics
    console.log('%c Performance Report ', 'background: #f0f9ff; color: #0ea5e9; font-weight: bold; padding: 5px;');
    console.log(`%c Page loaded in ${Math.random() * 2 + 1}.${Math.floor(Math.random() * 99)} seconds `, 'color: #666;');
    console.log(`%c ${Math.floor(Math.random() * 100) + 1} requests made (mostly to track your failure) `, 'color: #666;');
    console.log(`%c Memory usage: ${Math.floor(Math.random() * 500) + 100}MB (blame the gradients) `, 'color: #666;');
});

// ============================================
// Language Toggle
// ============================================
function initLanguageToggle() {
    // Check if language toggle already exists
    if (document.getElementById('language-toggle')) return;
    
    // Create language toggle button in header
    const header = document.querySelector('.header');
    if (!header) return;
    
    const langToggle = document.createElement('div');
    langToggle.id = 'language-toggle';
    langToggle.className = 'language-toggle';
    langToggle.style.cssText = `
        margin-left: auto;
        display: flex;
        gap: 8px;
        align-items: center;
    `;
    
    const langBtn = document.createElement('button');
    langBtn.className = 'lang-btn';
    langBtn.style.cssText = `
        background: transparent;
        border: 2px solid var(--neutral-300);
        border-radius: var(--radius-md);
        padding: var(--space-xs) var(--space-md);
        font-size: 0.9rem;
        cursor: pointer;
        transition: all var(--transition-fast);
        color: var(--neutral-700);
    `;
    langBtn.textContent = currentLanguage === 'de' ? 'DE' : 'EN';
    langBtn.title = currentLanguage === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln';
    
    langBtn.addEventListener('click', () => {
        const newLang = currentLanguage === 'de' ? 'en' : 'de';
        setLanguage(newLang);
        langBtn.textContent = newLang === 'de' ? 'DE' : 'EN';
        langBtn.title = newLang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln';
        location.reload();
    });
    
    langToggle.appendChild(langBtn);
    header.querySelector('.header-content').appendChild(langToggle);
}

// ============================================
// Export for other modules
// ============================================
window.STUPID = {
    triggerEasterEgg,
    createConfetti,
    initScrollAnimations,
    debounce,
    throttle,
    setLanguage,
    getLanguage
};
