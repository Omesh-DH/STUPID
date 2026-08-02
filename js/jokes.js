/**
 * STUPID - Jokes Page JavaScript
 * Handles joke display, filtering, and random generation
 */

// ============================================
// State
// ============================================
let currentCategory = 'all';
let currentPage = 1;
const jokesPerPage = 10;
let allJokes = [];

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initJokeDatabase();
    initJokeOfTheDay();
    initCategoryGrid();
    initFilters();
    initRandomJokes();
    initLoadMore();
    initSurpriseMe();
    updateStats();
    initAnimations();
});

// ============================================
// Initialize Joke Database
// ============================================
function initJokeDatabase() {
    // Flatten all jokes into a single array with category info
    allJokes = [];
    
    for (const [category, jokes] of Object.entries(STUPID_JOKES)) {
        jokes.forEach(joke => {
            allJokes.push({
                text: joke,
                category: category,
                categoryName: getCategoryName(category)
            });
        });
    }
    
    // Shuffle the array
    shuffleArray(allJokes);
}

function getCategoryName(category) {
    const names = {
        'dadJokes': 'Dad Jokes',
        'darkDadJokes': 'Dark Dad Jokes',
        'wellnessRoasts': 'Wellness Roasts',
        'corporateGaslighting': 'Corporate Gaslighting',
        'randomChaos': 'Random Chaos',
        'meanMotivation': 'Mean Motivation',
        'selfDeprecating': 'Self-Deprecating',
        'playfulInsults': 'Playful Insults'
    };
    return names[category] || category;
}

// ============================================
// Joke of the Day
// ============================================
function initJokeOfTheDay() {
    const jokeText = document.getElementById('joke-text');
    const jokeCategory = document.getElementById('joke-category');
    const newJokeButton = document.getElementById('new-joke');
    const shareButton = document.getElementById('share-joke');
    const saveButton = document.getElementById('save-joke');
    
    // Set initial joke
    showRandomJokeOfTheDay();
    
    // New joke button
    newJokeButton.addEventListener('click', showRandomJokeOfTheDay);
    
    // Share button
    shareButton.addEventListener('click', () => {
        const text = jokeText.textContent;
        shareJoke(text);
    });
    
    // Save button
    saveButton.addEventListener('click', () => {
        const text = jokeText.textContent;
        const category = jokeCategory.textContent;
        saveJokeToFavorites(text, category);
    });
}

function showRandomJokeOfTheDay() {
    const jokeText = document.getElementById('joke-text');
    const jokeCategory = document.getElementById('joke-category');
    
    // Get a random joke
    const categories = Object.keys(STUPID_JOKES);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomJoke = getRandomJoke(randomCategory);
    
    // Display it
    jokeText.textContent = randomJoke;
    jokeCategory.textContent = getCategoryName(randomCategory);
    
    // Animate
    jokeText.style.opacity = '0';
    jokeText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        jokeText.style.opacity = '1';
        jokeText.style.transform = 'translateY(0)';
    }, 200);
}

function shareJoke(text) {
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Joke copied! (No one will laugh)');
    });
}

function saveJokeToFavorites(text, category) {
    let favorites = JSON.parse(localStorage.getItem('stupid_joke_favorites')) || [];
    
    favorites.push({
        text,
        category,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('stupid_joke_favorites', JSON.stringify(favorites));
    showNotification('Joke saved to favorites! (You\'ll forget about it)');
}

// ============================================
// Category Grid
// ============================================
function initCategoryGrid() {
    const categoryGrid = document.getElementById('category-grid');
    if (!categoryGrid) return;
    
    const categories = Object.keys(STUPID_JOKES);
    
    categoryGrid.innerHTML = categories.map(category => {
        const count = STUPID_JOKES[category].length;
        const name = getCategoryName(category);
        
        return `
            <div class="category-card joke-category" data-category="${category}">
                <div class="category-icon">${getCategoryIcon(category)}</div>
                <h3 class="category-title">${name}</h3>
                <p class="category-description">${getCategoryDescription(category)}</p>
                <span class="category-count">${count} jokes</span>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    document.querySelectorAll('.category-card.joke-category').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            currentCategory = category;
            currentPage = 1;
            updateJokeList();
            
            // Update filter buttons
            document.querySelectorAll('.filter-button.joke-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-filter="${category}"]`)?.classList.add('active');
            
            // Scroll to joke list
            document.getElementById('joke-list-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function getCategoryIcon(category) {
    const icons = {
        'dadJokes': '😂',
        'darkDadJokes': '😈',
        'wellnessRoasts': '🔥',
        'corporateGaslighting': '💼',
        'randomChaos': '🌪️',
        'meanMotivation': '💪',
        'selfDeprecating': '🤷',
        'playfulInsults': '😏'
    };
    return icons[category] || '😂';
}

function getCategoryDescription(category) {
    const descriptions = {
        'dadJokes': 'Classic dad jokes that will make you groan.',
        'darkDadJokes': 'Dad jokes with a dark twist.',
        'wellnessRoasts': 'Satirical takes on the wellness industry.',
        'corporateGaslighting': 'Corporate phrases that mean nothing.',
        'randomChaos': 'Random thoughts that make no sense.',
        'meanMotivation': 'Motivational quotes with a savage edge.',
        'selfDeprecating': 'Jokes at your own expense.',
        'playfulInsults': 'Insults that are almost complimentary.'
    };
    return descriptions[category] || 'A collection of jokes.';
}

// ============================================
// Filters
// ============================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-button.joke-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentCategory = button.dataset.filter;
            currentPage = 1;
            updateJokeList();
        });
    });
}

// ============================================
// Joke List
// ============================================
function updateJokeList() {
    const jokeList = document.getElementById('joke-list');
    if (!jokeList) return;
    
    let filteredJokes = allJokes;
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filteredJokes = allJokes.filter(joke => joke.category === currentCategory);
    }
    
    // Paginate
    const startIndex = (currentPage - 1) * jokesPerPage;
    const endIndex = startIndex + jokesPerPage;
    const paginatedJokes = filteredJokes.slice(startIndex, endIndex);
    
    // Display jokes
    jokeList.innerHTML = paginatedJokes.map(joke => `
        <div class="joke-card">
            <span class="joke-category">${joke.categoryName}</span>
            <p class="joke-text">${joke.text}</p>
            <div class="joke-actions">
                <button class="cta-button outline small" onclick="shareJoke('${joke.text.replace(/'/g, "\\'")}')">
                    <span class="button-text">Share</span>
                </button>
                <button class="cta-button outline small" onclick="saveJokeToFavorites('${joke.text.replace(/'/g, "\\'")}', '${joke.categoryName}')">
                    <span class="button-text">Save</span>
                </button>
            </div>
        </div>
    `).join('');
    
    // Update load more button
    const loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
        if (endIndex < filteredJokes.length) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }
    }
}

// ============================================
// Load More
// ============================================
function initLoadMore() {
    const loadMoreButton = document.getElementById('load-more');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            currentPage++;
            updateJokeList();
            
            // Scroll to the new jokes
            document.getElementById('joke-list').scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
    }
}

// ============================================
// Random Jokes
// ============================================
function initRandomJokes() {
    const buttons = {
        'random-dad': 'dadJokes',
        'random-dark': 'darkDadJokes',
        'random-wellness': 'wellnessRoasts',
        'random-corporate': 'corporateGaslighting',
        'random-chaos': 'randomChaos',
        'random-any': null
    };
    
    Object.entries(buttons).forEach(([id, category]) => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', () => {
                showRandomJoke(category);
            });
        }
    });
}

function showRandomJoke(category) {
    const jokeText = document.getElementById('random-joke-text');
    const jokeCategory = document.getElementById('random-joke-category');
    
    let randomJoke;
    let displayCategory;
    
    if (category) {
        randomJoke = getRandomJoke(category);
        displayCategory = getCategoryName(category);
    } else {
        // Get any random joke
        const allCategories = Object.keys(STUPID_JOKES);
        const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
        randomJoke = getRandomJoke(randomCategory);
        displayCategory = getCategoryName(randomCategory);
    }
    
    jokeText.textContent = randomJoke;
    jokeCategory.textContent = displayCategory;
    
    // Animate
    jokeText.style.opacity = '0';
    jokeText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        jokeText.style.opacity = '1';
        jokeText.style.transform = 'translateY(0)';
    }, 200);
}

// ============================================
// Surprise Me
// ============================================
function initSurpriseMe() {
    const surpriseButton = document.getElementById('surprise-me');
    
    if (surpriseButton) {
        surpriseButton.addEventListener('click', () => {
            // Show a random joke from a random category
            showRandomJoke(null);
            
            // Scroll to random joke section
            document.querySelector('.random-joke').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ============================================
// Stats
// ============================================
function updateStats() {
    const totalJokes = getTotalJokeCount();
    const totalCategories = Object.keys(STUPID_JOKES).length;
    
    updateElementText('total-jokes', totalJokes.toLocaleString());
    updateElementText('total-categories', totalCategories);
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate category cards
    const categoryCards = document.querySelectorAll('.category-card.joke-category');
    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    setTimeout(() => {
        categoryCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 300);
    
    // Animate joke cards on load
    const jokeCards = document.querySelectorAll('.joke-card');
    jokeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${0.3 + index * 0.1}s`;
    });
    
    setTimeout(() => {
        jokeCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 500);
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'joke-notification';
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
// Easter Eggs
// ============================================

// Konami code for special joke
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        const jokeText = document.getElementById('joke-text') || document.getElementById('random-joke-text');
        const jokeCategory = document.getElementById('joke-category') || document.getElementById('random-joke-category');
        
        if (jokeText) {
            jokeText.textContent = 'Why did the developer go broke? Because he used up all his cache.';
            if (jokeCategory) jokeCategory.textContent = 'Easter Egg';
            showNotification('Konami code activated! Here\'s a special joke.');
        }
    }
});

// Double click on joke to get a new one
const jokeCards = document.querySelectorAll('.joke-card');
jokeCards.forEach(card => {
    card.addEventListener('dblclick', () => {
        showRandomJokeOfTheDay();
        showNotification('Double click detected! Here\'s a new joke.');
    });
});

// Console easter egg
console.log('%c STUPID Joke Database ', 'background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c ' + getRandomJokeAny(), 'color: #666; font-size: 14px;');
