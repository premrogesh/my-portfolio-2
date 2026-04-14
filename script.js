// Page Load Fade-In
window.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    initializeTheme();
    setupNavigation();
    setupContactForm();
    setupScrollAnimations();
    setupIntersectionObserver();
});

// Theme Toggle
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
    });
}

// Navigation with Smooth Scroll
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
                    // Close mobile menu
                    menuToggle.checked = false;
                    
                    // Smooth scroll
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Add active state
                    navLinks.forEach(a => a.style.color = '');
                    this.style.color = '#FF3B3B';
                }
            }
        });
    });
}

// Contact Form Handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showFormStatus('Please fill all fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormStatus('Please enter a valid email', 'error');
            return;
        }
        
        // Simulate sending (in production, use fetch or formspree)
        const formData = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage for demo
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
        
        // Clear status after 4 seconds
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 4000);
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
}

// Scroll Animations
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollTop = window.scrollY;
            
            if (scrollTop + window.innerHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
                const progress = (scrollTop + window.innerHeight - sectionTop) / (window.innerHeight + sectionHeight);
                const opacity = Math.min(progress, 1);
                section.style.opacity = opacity;
            }
        });
    });
}

// Intersection Observer for Lazy Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.stat-card, .project-card, .info-card').forEach(el => {
        observer.observe(el);
    });
}

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#hero');
    const scrollTop = window.scrollY;
    
    if (hero && scrollTop < window.innerHeight) {
        hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
        hero.style.opacity = 1 - (scrollTop / (window.innerHeight * 1.5));
    }
});

// Console Easter Egg
console.log('%cHey there! 👨‍💻', 'font-size: 20px; color: #FF3B3B; font-weight: bold;');
console.log('%cInterested in working together? Reach out!', 'font-size: 14px; color: #ffffff;');
console.log('%cEmail: prem@example.com | Phone: 9988776655', 'font-size: 12px; color: #cccccc;');
