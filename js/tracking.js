/**
 * STUPID - Tracking Page JavaScript
 * Handles all goal tracking functionality
 */

// ============================================
// Data Store
// ============================================
let goals = JSON.parse(localStorage.getItem('stupid_goals')) || [];
let currentGoalId = null;

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initGoalModals();
    initGoalList();
    initFilters();
    initCharts();
    initAnimations();
    initQuickActions();
    updateDashboard();
});

// ============================================
// Goal Modals
// ============================================
function initGoalModals() {
    // Add Goal Modal
    const addGoalModal = document.getElementById('add-goal-modal');
    const addGoalButton = document.getElementById('add-goal');
    const addFirstGoalButton = document.getElementById('add-first-goal');
    const addGoalCtaButton = document.getElementById('add-goal-cta');
    const goalForm = document.getElementById('goal-form');
    const modalClose = addGoalModal.querySelector('.modal-close');
    const modalCancel = addGoalModal.querySelector('.modal-cancel');
    
    // Open modal
    [addGoalButton, addFirstGoalButton, addGoalCtaButton].forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                openAddGoalModal();
            });
        }
    });
    
    // Close modal
    [modalClose, modalCancel].forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                addGoalModal.classList.remove('active');
            });
        }
    });
    
    // Form submission
    if (goalForm) {
        goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addGoal();
        });
    }
    
    // Close on backdrop click
    addGoalModal.addEventListener('click', (e) => {
        if (e.target === addGoalModal) {
            addGoalModal.classList.remove('active');
        }
    });
    
    // Goal Detail Modal
    const detailModal = document.getElementById('goal-detail-modal');
    const detailModalClose = detailModal.querySelector('.modal-close');
    
    detailModalClose.addEventListener('click', () => {
        detailModal.classList.remove('active');
    });
    
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('active');
        }
    });
    
    // Detail modal actions
    const markComplete = document.getElementById('mark-complete');
    const markFailed = document.getElementById('mark-failed');
    const editGoal = document.getElementById('edit-goal');
    
    if (markComplete) {
        markComplete.addEventListener('click', () => {
            updateGoalStatus(currentGoalId, 'completed');
            detailModal.classList.remove('active');
        });
    }
    
    if (markFailed) {
        markFailed.addEventListener('click', () => {
            updateGoalStatus(currentGoalId, 'failed');
            detailModal.classList.remove('active');
        });
    }
    
    if (editGoal) {
        editGoal.addEventListener('click', () => {
            // For now, just close and reopen add modal with edit mode
            detailModal.classList.remove('active');
            openAddGoalModal(currentGoalId);
        });
    }
}

function openAddGoalModal(goalId = null) {
    const modal = document.getElementById('add-goal-modal');
    const form = document.getElementById('goal-form');
    
    if (goalId) {
        // Edit mode
        const goal = goals.find(g => g.id === goalId);
        if (goal) {
            document.getElementById('goal-title').value = goal.title;
            document.getElementById('goal-description').value = goal.description || '';
            document.getElementById('goal-category').value = goal.category || 'fitness';
            document.getElementById('goal-deadline').value = goal.deadline || '';
            document.getElementById('goal-difficulty').value = goal.difficulty || 'easy';
            
            // Update submit button
            const submitButton = form.querySelector('.modal-submit');
            submitButton.innerHTML = '<span class="button-text">Update Goal</span><span class="button-subtext">(You still won\'t do it)</span>';
            
            // Store editing ID
            form.dataset.editingId = goalId;
        }
    } else {
        // Add mode
        form.reset();
        form.removeAttribute('data-editing-id');
        
        const submitButton = form.querySelector('.modal-submit');
        submitButton.innerHTML = '<span class="button-text">Add Goal</span><span class="button-subtext">(You\'ll abandon it)</span>';
    }
    
    modal.classList.add('active');
}

// ============================================
// Goal Management
// ============================================
function addGoal() {
    const form = document.getElementById('goal-form');
    const editingId = form.dataset.editingId;
    
    const goal = {
        id: editingId || Date.now().toString(),
        title: document.getElementById('goal-title').value,
        description: document.getElementById('goal-description').value,
        category: document.getElementById('goal-category').value,
        deadline: document.getElementById('goal-deadline').value,
        difficulty: document.getElementById('goal-difficulty').value,
        status: editingId ? goals.find(g => g.id === editingId).status : 'active',
        progress: editingId ? goals.find(g => g.id === editingId).progress : 0,
        createdAt: editingId ? goals.find(g => g.id === editingId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    if (editingId) {
        // Update existing goal
        goals = goals.map(g => g.id === editingId ? goal : g);
    } else {
        // Add new goal
        goals.push(goal);
    }
    
    saveGoals();
    updateGoalList();
    updateDashboard();
    
    // Close modal
    document.getElementById('add-goal-modal').classList.remove('active');
    
    // Show success message
    showNotification(editingId ? 'Goal updated! (You still won\'t do it)' : 'Goal added! (You\'ll abandon it by tomorrow)');
}

function updateGoalStatus(goalId, status) {
    goals = goals.map(goal => {
        if (goal.id === goalId) {
            return {
                ...goal,
                status,
                progress: status === 'completed' ? 100 : status === 'failed' ? 0 : goal.progress,
                updatedAt: new Date().toISOString()
            };
        }
        return goal;
    });
    
    saveGoals();
    updateGoalList();
    updateDashboard();
    
    showNotification(`Goal marked as ${status}! (Finally, some progress)`);
}

function updateGoalProgress(goalId, progress) {
    goals = goals.map(goal => {
        if (goal.id === goalId) {
            return {
                ...goal,
                progress: Math.min(100, Math.max(0, progress)),
                updatedAt: new Date().toISOString()
            };
        }
        return goal;
    });
    
    saveGoals();
    updateGoalList();
    updateDashboard();
}

function deleteGoal(goalId) {
    if (confirm('Are you sure you want to delete this goal? (You were going to fail anyway)')) {
        goals = goals.filter(goal => goal.id !== goalId);
        saveGoals();
        updateGoalList();
        updateDashboard();
        showNotification('Goal deleted! (One less thing to fail at)');
    }
}

function saveGoals() {
    localStorage.setItem('stupid_goals', JSON.stringify(goals));
}

// ============================================
// Goal List
// ============================================
function initGoalList() {
    updateGoalList();
}

function updateGoalList(filter = 'all') {
    const goalsList = document.getElementById('goals-list');
    
    if (!goalsList) return;
    
    // Filter goals
    let filteredGoals = goals;
    if (filter !== 'all') {
        filteredGoals = goals.filter(goal => goal.status === filter);
    }
    
    if (filteredGoals.length === 0) {
        goalsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎯</div>
                <h3 class="empty-title">No Goals Found</h3>
                <p class="empty-description">
                    ${filter === 'all' ? 'You haven\'t set any goals.' : `You don't have any ${filter} goals.`} 
                    That's probably for the best.
                </p>
                <button class="cta-button primary" id="add-first-goal">
                    <span class="button-text">Add a Goal</span>
                    <span class="button-subtext">(You'll abandon it)</span>
                </button>
            </div>
        `;
        
        // Re-attach event listener
        const addButton = goalsList.querySelector('#add-first-goal');
        if (addButton) {
            addButton.addEventListener('click', () => openAddGoalModal());
        }
        return;
    }
    
    // Generate goal cards
    goalsList.innerHTML = filteredGoals.map(goal => createGoalCard(goal)).join('');
    
    // Add event listeners to goal cards
    document.querySelectorAll('.goal-card').forEach(card => {
        const goalId = card.dataset.goalId;
        
        // View details
        const viewButton = card.querySelector('.view-goal');
        if (viewButton) {
            viewButton.addEventListener('click', () => showGoalDetail(goalId));
        }
        
        // Quick actions
        const completeButton = card.querySelector('.quick-complete');
        const failButton = card.querySelector('.quick-fail');
        const deleteButton = card.querySelector('.quick-delete');
        
        if (completeButton) {
            completeButton.addEventListener('click', () => updateGoalStatus(goalId, 'completed'));
        }
        if (failButton) {
            failButton.addEventListener('click', () => updateGoalStatus(goalId, 'failed'));
        }
        if (deleteButton) {
            deleteButton.addEventListener('click', () => deleteGoal(goalId));
        }
        
        // Progress bar click to increment
        const progressBar = card.querySelector('.goal-progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', () => {
                const goal = goals.find(g => g.id === goalId);
                if (goal) {
                    updateGoalProgress(goalId, goal.progress + 10);
                }
            });
        }
    });
}

function createGoalCard(goal) {
    const statusClass = goal.status;
    const statusText = getStatusText(goal.status);
    const daysLeft = getDaysLeft(goal.deadline);
    const progress = goal.progress || 0;
    
    return `
        <div class="goal-card ${statusClass}" data-goal-id="${goal.id}">
            <div class="goal-header">
                <div class="goal-info">
                    <h3 class="goal-title">${goal.title}</h3>
                    <span class="goal-category ${goal.category}">${goal.category}</span>
                </div>
                <span class="goal-status-badge ${statusClass}">${statusText}</span>
            </div>
            <p class="goal-description">${goal.description || 'No description provided.'}</p>
            <div class="goal-meta">
                <div class="goal-progress">
                    <div class="goal-progress-bar">
                        <div class="goal-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="goal-progress-text">${progress}%</span>
                </div>
                <div class="goal-deadline">
                    ${goal.deadline ? `Due: ${formatDate(goal.deadline)}` : 'No deadline'}
                    ${daysLeft !== null ? `(${daysLeft} days left)` : ''}
                </div>
            </div>
            <div class="goal-actions">
                <button class="action-button view-goal" title="View details">
                    <span>👁️</span>
                </button>
                <button class="action-button quick-complete" title="Mark complete">
                    <span>✅</span>
                </button>
                <button class="action-button quick-fail" title="Mark failed">
                    <span>❌</span>
                </button>
                <button class="action-button quick-delete" title="Delete">
                    <span>🗑️</span>
                </button>
            </div>
        </div>
    `;
}

function showGoalDetail(goalId) {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    currentGoalId = goalId;
    
    const modal = document.getElementById('goal-detail-modal');
    const title = modal.querySelector('#detail-goal-title');
    const description = modal.querySelector('#detail-goal-description');
    const category = modal.querySelector('#detail-goal-category');
    const deadline = modal.querySelector('#detail-goal-deadline');
    const difficulty = modal.querySelector('#detail-goal-difficulty');
    const status = modal.querySelector('#detail-goal-status');
    const progress = modal.querySelector('#detail-goal-progress');
    const progressBar = modal.querySelector('#detail-goal-progress-bar');
    const daysLeft = modal.querySelector('#detail-goal-days-left');
    
    title.textContent = goal.title;
    description.textContent = goal.description || 'No description provided.';
    category.textContent = goal.category;
    deadline.textContent = goal.deadline ? formatDate(goal.deadline) : 'None';
    difficulty.textContent = getDifficultyText(goal.difficulty);
    status.textContent = getStatusText(goal.status);
    progress.textContent = `${goal.progress || 0}%`;
    progressBar.style.width = `${goal.progress || 0}%`;
    daysLeft.textContent = getDaysLeft(goal.deadline) || 'None';
    
    modal.classList.add('active');
}

// ============================================
// Filters
// ============================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Update goal list
            const filter = button.dataset.filter;
            updateGoalList(filter);
        });
    });
}

// ============================================
// Charts
// ============================================
function initCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Progress Chart
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Motivation Level',
                    data: [0, 0, 0, 0, 0, 0, 0],
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
                                return `Motivation: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Goal Completion Chart
    const goalCtx = document.getElementById('goalChart');
    if (goalCtx) {
        new Chart(goalCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Failed', 'Abandoned'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#22c55e',
                        '#ef4444',
                        '#f59e0b'
                    ],
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
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return `${label}: ${value} goals`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// ============================================
// Dashboard
// ============================================
function updateDashboard() {
    // Update summary cards
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.status === 'completed').length;
    const activeGoals = goals.filter(g => g.status === 'active').length;
    const failedGoals = goals.filter(g => g.status === 'failed').length;
    const abandonedGoals = goals.filter(g => g.status === 'abandoned').length;
    
    // Calculate streak
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    
    // This is a simplified streak calculation
    // In a real app, you'd track this properly
    if (completedGoals > 0) {
        streak = Math.min(completedGoals, 7);
    }
    
    // Calculate motivation score (completely arbitrary)
    const motivationScore = Math.round((completedGoals / Math.max(totalGoals, 1)) * 100);
    
    // Update DOM
    updateElementText('total-goals', totalGoals);
    updateElementText('completed-goals', completedGoals);
    updateElementText('current-streak', streak);
    updateElementText('motivation-score', motivationScore);
    
    // Update charts if Chart.js is available
    if (typeof Chart !== 'undefined') {
        updateCharts();
    }
    
    // Update weekly stats
    updateWeeklyStats();
    
    // Update category stats
    updateCategoryStats();
}

function updateCharts() {
    // This would update the chart data
    // For simplicity, we're not implementing live updates
    // In a real app, you'd store chart instances and update their data
}

function updateWeeklyStats() {
    // This would calculate and update weekly stats
    // For now, we'll just leave them at 0%
}

function updateCategoryStats() {
    // This would calculate and update category stats
    // For now, we'll just leave them at 0%
}

// ============================================
// Quick Actions
// ============================================
function initQuickActions() {
    // Add goal from CTA
    const addGoalCta = document.getElementById('add-goal-cta');
    if (addGoalCta) {
        addGoalCta.addEventListener('click', () => openAddGoalModal());
    }
}

// ============================================
// Animations
// ============================================
function initAnimations() {
    // Animate summary cards
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Trigger animations
    setTimeout(() => {
        summaryCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 300);
    
    // Animate charts
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
    }, 500);
}

// ============================================
// Notifications
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'tracking-notification';
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
    
    // Auto-close after 3 seconds
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

function getStatusText(status) {
    const statusMap = {
        'active': 'In Progress',
        'completed': 'Completed',
        'failed': 'Failed',
        'abandoned': 'Abandoned'
    };
    return statusMap[status] || status;
}

function getDifficultyText(difficulty) {
    const difficultyMap = {
        'easy': 'Easy',
        'medium': 'Medium',
        'hard': 'Hard',
        'impossible': 'Impossible'
    };
    return difficultyMap[difficulty] || difficulty;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function getDaysLeft(deadline) {
    if (!deadline) return null;
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
}

// ============================================
// Easter Eggs
// ============================================

// Double click on summary cards
const summaryCards = document.querySelectorAll('.summary-card');
summaryCards.forEach(card => {
    card.addEventListener('dblclick', () => {
        const value = card.querySelector('.summary-value').textContent;
        alert(`Congratulations! You've unlocked the "${value} Achievements" achievement. It does nothing.`);
    });
});

// Console easter egg
console.log('%c STUPID Tracking ', 'background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Tracking your failure, one goal at a time. ', 'color: #666; font-size: 14px;');
console.log('%c PS: You have 0 goals. That\'s probably for the best. ', 'color: #999; font-size: 12px;');
