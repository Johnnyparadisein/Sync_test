// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const faqItems = document.querySelectorAll('.faq-item');

// Header scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const scrollThreshold = 50; // Pixels to scroll before changing header state

    // Toggle scrolled class based on scroll position
    if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Hide/show header based on scroll direction
    if (currentScroll <= scrollThreshold) {
        header.classList.remove('hide');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
        // Scrolling down
        header.classList.add('hide');
    } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
        // Scrolling up
        header.classList.remove('hide');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    const expanded = navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', expanded);
    if (!expanded) menuToggle.focus(); // Return focus to button when closing
});

// Close mobile menu when clicking outside or on a nav link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// FAQ Accordion
faqItems.forEach((item, idx) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((faqItem, i) => {
            faqItem.classList.remove('active');
            faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            faqItem.querySelector('.faq-answer').setAttribute('aria-hidden', 'true');
        });
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            answer.setAttribute('aria-hidden', 'false');
        }
    });
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
        // Arrow navigation
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = faqItems[idx + 1]?.querySelector('.faq-question');
            if (next) next.focus();
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = faqItems[idx - 1]?.querySelector('.faq-question');
            if (prev) prev.focus();
        }
    });
});

// Form validation and submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Something went wrong. Please try again later.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    // ARIA live region for form
    const formNotification = document.getElementById('form-notification');
    if (formNotification) {
        formNotification.textContent = message;
    }
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
        if (formNotification) {
            formNotification.textContent = '';
        }
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .team-member, .testimonial-card').forEach(element => {
    observer.observe(element);
});

// Initialize particles.js
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab"
                },
                onClick: {
                    enable: false,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 150,
                    line_linked: {
                        opacity: 0.6
                    }
                },
            }
        },
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            color: {
                value: "#aaaaaa"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.2,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.4,
                    opacity_min: 0.05,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: false,
                    speed: 20,
                    size_min: 0.1,
                    sync: false
                }
            },
            links: {
                enable: true,
                distance: 150,
                color: "#bbbbbb",
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        detectRetina: true
    });
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background: linear-gradient(135deg, #00A9FF 0%, #00FFA3 100%);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #FF3366 0%, #FF6B6B 100%);
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);

// Hero stats count-up animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const endValue = parseInt(stat.getAttribute('data-value'), 10);
        let startValue = 0;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / endValue), 10);
        const increment = Math.ceil(endValue / (duration / stepTime));
        let current = startValue;
        function update() {
            current += increment;
            if (current > endValue) current = endValue;
            stat.textContent = current;
            if (current < endValue) {
                setTimeout(update, stepTime);
            }
        }
        update();
    });
}

let statsAnimated = false;
window.addEventListener('scroll', () => {
    if (statsAnimated) return;
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateStats();
            statsAnimated = true;
        }
    }
});

// Floating Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
backToTop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Scroll indicator click: scroll to next section
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('section#services');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    darkModeToggle.setAttribute('aria-pressed', enabled);
    const icon = darkModeToggle.querySelector('i');
    if (enabled) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}
function getStoredDarkMode() {
    return localStorage.getItem('darkMode') === 'true';
}
function storeDarkMode(enabled) {
    localStorage.setItem('darkMode', enabled);
}
// Initialize dark mode on load
const initialDark = getStoredDarkMode();
setDarkMode(initialDark);
darkModeToggle.setAttribute('aria-pressed', initialDark);
darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    setDarkMode(isDark);
    storeDarkMode(isDark);
});

// Make skip link visible on focus (CSS preferred, but fallback for JS)
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('focus', () => {
        skipLink.style.position = 'static';
        skipLink.style.left = '0';
        skipLink.style.top = '0';
        skipLink.style.background = '#fff';
        skipLink.style.color = '#181a20';
        skipLink.style.zIndex = '10000';
        skipLink.style.padding = '1em 2em';
        skipLink.style.display = 'inline-block';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style = '';
    });
}

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      // Registration successful
    }, function(err) {
      // Registration failed
    });
  });
} 