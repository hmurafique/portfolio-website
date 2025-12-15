// ============================================
// MAIN SCRIPT FOR PORTFOLIO WEBSITE
// ============================================

// Mobile Menu Toggle - SIRF YEHI EK FUNCTION
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Menu links par click karte hi menu band ho
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation bar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(15, 15, 26, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 15, 26, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Active link highlight on scroll (OPTIONAL - Agar chahiye toh)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// EXTRA FEATURES (Optional)
// ============================================

// Chat Widget - AGAR AAPKE PAS HAI TOH
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');

if (chatToggle && chatBox) {
    chatToggle.addEventListener('click', () => {
        chatBox.classList.toggle('active');
    });
    
    const chatClose = document.getElementById('chatClose');
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });
    }
}

// Form submission - AGAR AAPKE PAS HAI TOH
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
    });
}

// Simple hover effect for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .expertise-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
// Fix fast scrolling animations
window.addEventListener('load', function() {
    // Building section animations ko slow karein
    const progressBars = document.querySelectorAll('.progress-fill, .meter-fill');
    
    if (progressBars.length > 0) {
        // Animation delay add karein
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease-in-out'; // 2 seconds slow
                    bar.style.width = width;
                }, 100);
            }, index * 300);
        });
    }
    
    // Infinite scrolling animation hata dein (optional)
    const buildingCards = document.querySelectorAll('.building-card');
    buildingCards.forEach(card => {
        card.style.animation = 'none'; // Animation disable
    });
});
});
