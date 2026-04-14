// ============ PRELOADER MANAGEMENT ============
window.addEventListener('DOMContentLoaded', function() {
    // Handle preloader fade-out
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Simulate loading time (show preloader for at least 2 seconds)
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 2000);
    }
    
    // Initialize all features
    document.body.classList.add('loaded');
    initializeTheme();
    setupNavigation();
    setupContactForm();
    setupScrollAnimations();
    setupIntersectionObserver();
    setup3DInteractions();
});

// ============ PRELOADER AUTO HIDE ============
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
});

// ============ THEME TOGGLE ============
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        
        // Animate theme toggle
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// ============ NAVIGATION ============
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const menuToggle = document.getElementById('menu-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu with smooth animation
                    menuToggle.checked = false;
                    
                    // Smooth scroll with offset for fixed header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    navLinks.forEach(a => a.style.color = '');
                    this.style.color = '#FF3B3B';
                }
            }
        });
    });
}

// ============ CONTACT FORM ============
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const formStatus = document.getElementById('formStatus');
        
        // Validation
        if (!name) {
            showFormStatus('Please enter your name', 'error');
            return;
        }
        
        if (!email || !isValidEmail(email)) {
            showFormStatus('Please enter a valid email', 'error');
            return;
        }
        
        if (!message) {
            showFormStatus('Please enter a message', 'error');
            return;
        }
        
        // Save to localStorage
        const formData = { name, email, message, timestamp: new Date().toISOString() };
        let savedForms = JSON.parse(localStorage.getItem('contactForms') || '[]');
        savedForms.push(formData);
        localStorage.setItem('contactForms', JSON.stringify(savedForms));
        
        // Show success message
        showFormStatus('Message sent successfully! 🎉', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log to console (easter egg)
        console.log('%c✨ Contact Form Submitted ✨', 'color: #FF3B3B; font-size: 16px; font-weight: bold;');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log('📞 Direct contact: 6383425902');
        console.log('📧 Email: premrogesh007@gmail.com');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    if (type === 'success') {
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 4000);
    }
}

// ============ SCROLL ANIMATIONS ============
function setupScrollAnimations() {
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY / pageHeight;
        
        // Parallax effect on hero section
        const hero = document.querySelector('.hero');
        if (hero && window.scrollY < hero.offsetHeight) {
            hero.style.backgroundPosition = `0 ${window.scrollY * 0.5}px`;
        }
        
        // Update nav link active state
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = '#FF3B3B';
        }
    });
}

// ============ INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ============
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    document.querySelectorAll('.project-card, .stat-card, .info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============ 3D CARD INTERACTIONS ============
function setup3DInteractions() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// ============ SMOOTH PARALLAX BACKGROUND ============
function setupParallax() {
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.hero::before, .section::before');
        
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            element.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    });
}

// Initialize parallax on load
setupParallax();

// ============ SVG ANIMATION ON HOVER ============
function setupSVGAnimations() {
    const svgContainers = document.querySelectorAll('.project-icon-svg, .contact-icon-svg');
    
    svgContainers.forEach(container => {
        const svg = container.querySelector('svg');
        if (!svg) return;
        
        container.addEventListener('mouseenter', () => {
            svg.style.animation = 'none';
            svg.offsetHeight; // Trigger reflow
            svg.style.animation = null;
        });
    });
}

setupSVGAnimations();

// ============ SMOOTH SCROLL BEHAVIOR ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const headerHeight = document.querySelector('header').offsetHeight;
            const target = document.querySelector(href);
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ LOGO CLICK TO HOME ============
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============ CONSOLE EASTER EGG ============
console.log('%cWelcome to Prem Kumar\'s Portfolio 🚀', 'color: #FF3B3B; font-size: 20px; font-weight: bold;');
console.log('%cLet\'s connect!', 'color: #ff6b6b; font-size: 14px;');
console.log('📞 Phone: 6383425902');
console.log('📧 Email: premrogesh007@gmail.com');
console.log('%cBuilt with vanilla HTML, CSS & JavaScript ✨', 'color: #FF3B3B; font-size: 12px; font-style: italic;');

// ============ PERFORMANCE OPTIMIZATION ============
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        updateActiveNavLink();
    }, 100);
}, { passive: true });
