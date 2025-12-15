// ============================================
// MAIN SCRIPT FOR PORTFOLIO WEBSITE - CORRECTED
// ============================================

// DOM Load Complete
document.addEventListener('DOMContentLoaded', function() {
    console.log("Portfolio website loaded");
    
    // Mobile Menu Toggle - CORRECT SELECTORS
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        console.log("Mobile menu elements found");
        
        hamburger.addEventListener('click', function() {
            console.log("Hamburger clicked");
            
            // Toggle active classes
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Change body padding when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    } else {
        console.error("Mobile menu elements not found!");
        console.log("Hamburger found:", hamburger);
        console.log("Nav menu found:", navMenu);
    }
    
    // Smooth Scrolling for all anchor links
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
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Navigation bar style on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
    
    // Active link highlight on scroll
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Chat Widget Functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    
    if (chatToggle && chatBox) {
        chatToggle.addEventListener('click', () => {
            chatBox.classList.toggle('active');
        });
        
        if (chatClose) {
            chatClose.addEventListener('click', () => {
                chatBox.classList.remove('active');
            });
        }
        
        // Chat message sending
        const chatInput = document.getElementById('chatInput');
        const sendMessage = document.getElementById('sendMessage');
        const chatBody = document.querySelector('.chat-body');
        
        if (sendMessage && chatInput && chatBody) {
            sendMessage.addEventListener('click', sendChatMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
        }
        
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'chat-message user';
                userMessage.innerHTML = `<p>${message}</p>`;
                chatBody.appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Simulate bot response
                setTimeout(() => {
                    const responses = [
                        "Thanks for your message! I'll get back to you soon.",
                        "Great question! Let me think about the best DevOps solution for that.",
                        "I appreciate your interest in my DevOps services!"
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    const botMessage = document.createElement('div');
                    botMessage.className = 'chat-message bot';
                    botMessage.innerHTML = `<p>${randomResponse}</p>`;
                    chatBody.appendChild(botMessage);
                    
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .expertise-card, .about-card, .award-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
    
    // Certificate buttons
    document.querySelectorAll('.btn-cert').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.cert-card');
            const title = card.querySelector('.cert-title').textContent;
            alert(`Certificate: ${title}\n\nCredential details would be shown here.`);
        });
    });
    
    // Initialize
    updateActiveLink(); // Set initial active link
});
