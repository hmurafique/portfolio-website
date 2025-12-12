// script.js - Complete JavaScript for H. M. U. Rafique Portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Tab Switching Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Chat Widget Functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    
    if (chatToggle && chatBox) {
        // Toggle chat box
        chatToggle.addEventListener('click', function() {
            chatBox.classList.toggle('active');
        });
        
        // Close chat box
        if (chatClose) {
            chatClose.addEventListener('click', function() {
                chatBox.classList.remove('active');
            });
        }
        
        // Send message functionality
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'chat-message user';
                userMessage.innerHTML = `<p>${message}</p>`;
                document.querySelector('.chat-body').appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                const chatBody = document.querySelector('.chat-body');
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Simulate bot response after delay
                setTimeout(() => {
                    const botResponses = [
                        "Thanks for your message! I'll get back to you soon.",
                        "That's interesting! Could you tell me more about that?",
                        "I can help you with DevOps, Terraform, or Perforce Helix Core questions. What would you like to know?",
                        "Great question! As a DevSysOps Engineer, I specialize in multi-cloud infrastructure and CI/CD pipelines.",
                        "Feel free to email me at contact@hmurafique.com for detailed discussions."
                    ];
                    
                    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                    
                    const botMessage = document.createElement('div');
                    botMessage.className = 'chat-message bot';
                    botMessage.innerHTML = `<p>${randomResponse}</p>`;
                    document.querySelector('.chat-body').appendChild(botMessage);
                    
                    // Scroll to bottom
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }
        
        // Send message on button click
        if (sendMessageBtn) {
            sendMessageBtn.addEventListener('click', sendMessage);
        }
        
        // Send message on Enter key
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Find and activate the clicked link
                const clickedLink = document.querySelector(`.nav-menu a[href="${targetId}"]`);
                if (clickedLink) {
                    clickedLink.classList.add('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // CV Download Button
    const downloadCvBtn = document.querySelector('.btn-secondary[target="_blank"]');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('CV download would start here. In a real implementation, this would download your PDF CV.');
            // In real implementation: window.open('path/to/your-cv.pdf', '_blank');
        });
    }
    
    // Progress bar animation on scroll
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Animate progress bars when they come into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const buildingSection = document.querySelector('.building-section');
    if (buildingSection) {
        observer.observe(buildingSection);
    }
    
    // Active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add animation to cards on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-card, .expertise-card, .project-card, .award-card, .cert-card, .education-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.about-card, .expertise-card, .project-card, .award-card, .cert-card, .education-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on load
    animateOnScroll();
    
    // Initialize tooltips for certification buttons
    document.querySelectorAll('.btn-cert').forEach(button => {
        button.addEventListener('click', function() {
            const certTitle = this.parentElement.querySelector('.cert-title').textContent;
            alert(`This would show the "${certTitle}" credential. In a real implementation, this would open a modal or link to the actual certificate.`);
        });
    });
    
    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Print-friendly page
    window.addEventListener('beforeprint', function() {
        document.querySelector('.chat-widget').style.display = 'none';
    });
    
    window.addEventListener('afterprint', function() {
        document.querySelector('.chat-widget').style.display = 'block';
    });
    
    // Initialize tabs on page load
    if (tabBtns.length > 0) {
        // Show first tab by default
        document.querySelector('.tab-btn.active').click();
    }
});
