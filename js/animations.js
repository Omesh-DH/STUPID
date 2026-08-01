/**
 * STUPID - Animations Module
 * Handles all animation-related functionality
 */

// ============================================
// Animation Controller
// ============================================
class AnimationController {
    constructor() {
        this.animations = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        // Initialize Intersection Observer for scroll animations
        this.observer = new IntersectionObserver(
            this.handleIntersect.bind(this),
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );
        
        // Observe all reveal elements
        this.observeElements();
    }
    
    observeElements() {
        const elements = document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right, .reveal-scale, .fade-in, .fade-in-up, .fade-in-down'
        );
        
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add appropriate animation class based on element class
                if (element.classList.contains('reveal')) {
                    element.classList.add('revealed');
                } else if (element.classList.contains('reveal-left')) {
                    element.classList.add('revealed');
                } else if (element.classList.contains('reveal-right')) {
                    element.classList.add('revealed');
                } else if (element.classList.contains('reveal-scale')) {
                    element.classList.add('revealed');
                } else if (element.classList.contains('fade-in')) {
                    element.style.animationPlayState = 'running';
                } else if (element.classList.contains('fade-in-up')) {
                    element.style.animationPlayState = 'running';
                } else if (element.classList.contains('fade-in-down')) {
                    element.style.animationPlayState = 'running';
                }
                
                // Stop observing once animated
                this.observer.unobserve(element);
            }
        });
    }
    
    // Parallax effect for hero section
    initParallax() {
        const hero = document.querySelector('.hero');
        const heroGradient = document.querySelector('.hero-gradient');
        
        if (!hero || !heroGradient) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            heroGradient.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Animate numbers counting up
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // Animate progress bars
    animateProgressBar(bar, target) {
        const progress = bar.querySelector('.progress-fill');
        if (!progress) return;
        
        progress.style.width = `${target}%`;
    }
    
    // Typewriter effect
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Shake animation
    shake(element, duration = 500) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, duration);
    }
    
    // Pulse animation
    pulse(element, duration = 1000) {
        element.classList.add('pulse');
        setTimeout(() => {
            element.classList.remove('pulse');
        }, duration);
    }
    
    // Bounce animation
    bounce(element, duration = 1000) {
        element.classList.add('bounce');
        setTimeout(() => {
            element.classList.remove('bounce');
        }, duration);
    }
    
    // Wobble animation
    wobble(element, duration = 1000) {
        element.classList.add('wobble');
        setTimeout(() => {
            element.classList.remove('wobble');
        }, duration);
    }
    
    // Jello animation
    jello(element, duration = 500) {
        element.classList.add('jello');
        setTimeout(() => {
            element.classList.remove('jello');
        }, duration);
    }
    
    // Glitch animation
    glitch(element, duration = 300) {
        element.classList.add('glitch');
        setTimeout(() => {
            element.classList.remove('glitch');
        }, duration);
    }
    
    // Float animation
    float(element) {
        element.classList.add('floating');
    }
    
    // Stop float animation
    stopFloat(element) {
        element.classList.remove('floating');
    }
}

// ============================================
// Particle System (for confetti and effects)
// ============================================
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
    }
    
    init(canvasId = 'particle-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', this.resize.bind(this));
    }
    
    resize() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addParticle(options = {}) {
        const particle = {
            x: options.x || Math.random() * this.canvas.width,
            y: options.y || Math.random() * this.canvas.height,
            size: options.size || Math.random() * 5 + 2,
            color: options.color || this.getRandomColor(),
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            life: options.life || Math.random() * 100 + 50,
            maxLife: options.life || Math.random() * 100 + 50,
            gravity: options.gravity || 0.1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1
        };
        
        this.particles.push(particle);
        return particle;
    }
    
    getRandomColor() {
        const colors = ['#0ea5e9', '#22c55e', '#8b5cf6', '#ec4899', '#f97316', '#eab308'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.velocity.x;
            p.y += p.velocity.y;
            
            // Apply gravity
            p.velocity.y += p.gravity;
            
            // Update rotation
            p.rotation += p.rotationSpeed;
            
            // Update life
            p.life--;
            
            // Draw particle
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    startAnimation() {
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }
    
    animate() {
        this.update();
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }
    
    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
    
    clear() {
        this.particles = [];
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    createExplosion(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            this.addParticle({
                x: x,
                y: y,
                velocity: {
                    x: (Math.random() - 0.5) * 5,
                    y: (Math.random() - 0.5) * 5
                },
                life: Math.random() * 100 + 50,
                gravity: 0.2
            });
        }
    }
    
    createConfetti(count = 100) {
        for (let i = 0; i < count; i++) {
            this.addParticle({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - 200,
                size: Math.random() * 8 + 4,
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: Math.random() * 3 + 1
                },
                life: Math.random() * 200 + 100,
                gravity: 0.05,
                color: this.getRandomColor()
            });
        }
    }
}

// ============================================
// Mouse Trail Effect
// ============================================
class MouseTrail {
    constructor() {
        this.points = [];
        this.maxPoints = 20;
        this.canvas = null;
        this.ctx = null;
        this.enabled = false;
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.5;
        `;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', this.resize.bind(this));
        
        // Track mouse movement
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
    
    resize() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    onMouseMove(e) {
        this.points.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 10 + 5,
            color: `rgba(14, 165, 233, ${Math.random() * 0.5 + 0.2})`
        });
        
        // Limit points
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
    }
    
    start() {
        this.enabled = true;
        this.animate();
    }
    
    stop() {
        this.enabled = false;
    }
    
    animate() {
        if (!this.enabled || !this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            const alpha = i / this.points.length;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color.replace(')', `, ${alpha})`);
            this.ctx.fill();
        }
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

// ============================================
// Initialize Animations
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller
    const animationController = new AnimationController();
    animationController.initParallax();
    
    // Animate stats on hero section
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, '')) || 0;
        if (target > 0) {
            animationController.animateCounter(stat, target, 2000);
        }
    });
    
    // Add fade-in classes to elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add fade-in to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Trigger animations when page loads
    setTimeout(() => {
        featureCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 500);
    
    // Initialize particle system (but don't start it yet)
    const particleSystem = new ParticleSystem();
    particleSystem.init();
    
    // Initialize mouse trail (disabled by default)
    const mouseTrail = new MouseTrail();
    mouseTrail.init();
    
    // Enable mouse trail on hover over certain elements
    const interactiveElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            mouseTrail.start();
        });
        el.addEventListener('mouseleave', () => {
            mouseTrail.stop();
        });
    });
    
    // Export to window for access from other scripts
    window.STUPID_ANIMATIONS = {
        animationController,
        particleSystem,
        mouseTrail
    };
});

// ============================================
// CSS Animation Polyfills
// ============================================

// Check if CSS animations are supported
const animationSupported = (() => {
    const el = document.createElement('div');
    return 'animationName' in el.style || 'WebkitAnimationName' in el.style;
})();

// Fallback for browsers without CSS animation support
if (!animationSupported) {
    console.warn('CSS animations not supported. Using JavaScript fallbacks.');
    
    // Simple fade in fallback
    function fadeInFallback(element, duration = 500) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress === 1) {
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Apply to all reveal elements
    document.querySelectorAll('.reveal, .fade-in').forEach(el => {
        fadeInFallback(el, 800);
    });
}

// ============================================
// Performance Optimizations
// ============================================

// Reduce animations when page is not visible
let wasVisible = true;

document.addEventListener('visibilitychange', () => {
    const isVisible = !document.hidden;
    
    if (wasVisible && !isVisible) {
        // Page became hidden - pause animations
        document.querySelectorAll('.reveal, .fade-in, .fade-in-up, .fade-in-down').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else if (!wasVisible && isVisible) {
        // Page became visible - resume animations
        document.querySelectorAll('.reveal, .fade-in, .fade-in-up, .fade-in-down').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
    
    wasVisible = isVisible;
});

// Reduce animations on low-end devices
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Mobile device - reduce animation complexity
    document.documentElement.classList.add('mobile-device');
    
    // Disable parallax on mobile
    const heroGradient = document.querySelector('.hero-gradient');
    if (heroGradient) {
        heroGradient.style.transform = 'none';
    }
}

// ============================================
// Export for use in other modules
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        ParticleSystem,
        MouseTrail
    };
}
