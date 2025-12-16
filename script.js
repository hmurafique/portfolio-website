// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
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
                
                // Close mobile menu
                navMenu.classList.remove('active');
            }
        });
    });
});
// Typing Animation for Hero
function initTypingAnimation() {
    const roles = [
        "DevSysOps Engineer",
        "DevOps Specialist", 
        "Cloud Architect",
        "Infrastructure Engineer"
    ];
    
    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typedText) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (!isDeleting && !isPaused) {
            // Typing forward
            typedText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    setTimeout(type, 500);
                }, 2000);
                return;
            }
        } else if (isDeleting && !isPaused) {
            // Deleting
            typedText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    // Dynamic text animation
    const dynamicText = document.getElementById('dynamic-text');
    const texts = [
        "Assembling DevOps Solutions",
        "Initializing Cloud Infrastructure",
        "Loading DevOps Pipeline",
        "Deploying Portfolio"
    ];
    
    if (dynamicText) {
        let textIndex = 0;
        let textCharIndex = 0;
        let isTextDeleting = false;
        
        function typeDynamicText() {
            const currentText = texts[textIndex];
            
            if (!isTextDeleting && textCharIndex < currentText.length) {
                dynamicText.textContent = currentText.substring(0, textCharIndex + 1);
                textCharIndex++;
                setTimeout(typeDynamicText, 100);
            } else if (!isTextDeleting && textCharIndex === currentText.length) {
                setTimeout(() => {
                    isTextDeleting = true;
                    typeDynamicText();
                }, 2000);
            } else if (isTextDeleting && textCharIndex > 0) {
                dynamicText.textContent = currentText.substring(0, textCharIndex - 1);
                textCharIndex--;
                setTimeout(typeDynamicText, 50);
            } else {
                isTextDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeDynamicText, 500);
            }
        }
        
        typeDynamicText();
    }
    
    // Start typing animation after a delay
    setTimeout(type, 1000);
}

// Call this function when page loads
document.addEventListener('DOMContentLoaded', initTypingAnimation);
// Animate skill bars when scrolled into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const width = skillFill.style.width;
                skillFill.style.setProperty('--target-width', width);
                skillFill.style.animation = 'fillBar 1.5s ease-in-out forwards';
                observer.unobserve(skillFill);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Call this function when page loads
document.addEventListener('DOMContentLoaded', animateSkillBars);
// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Chatbot Widget
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotQuestion = document.getElementById('chatbot-question');
    const chatbotBody = document.getElementById('chatbot-body');
    
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
        });
        
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
        });
        
        chatbotSend.addEventListener('click', sendChatbotMessage);
        
        chatbotQuestion.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatbotMessage();
            }
        });
        
        function sendChatbotMessage() {
            const question = chatbotQuestion.value.trim();
            if (!question) return;
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message';
            userMessage.innerHTML = `<p><strong>You:</strong> ${question}</p>`;
            chatbotBody.appendChild(userMessage);
            
            // Clear input
            chatbotQuestion.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-message bot';
            typingIndicator.innerHTML = '<p><i>AI Assistant is typing...</i></p>';
            chatbotBody.appendChild(typingIndicator);
            
            // Scroll to bottom
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            
            // Simulate AI response after delay
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                
                // Add AI response
                const response = getChatbotResponse(question);
                const aiMessage = document.createElement('div');
                aiMessage.className = 'chat-message bot';
                aiMessage.innerHTML = `<p><strong>AI Assistant:</strong> ${response}</p>`;
                chatbotBody.appendChild(aiMessage);
                
                // Scroll to bottom
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }, 1500);
        }
        
        function getChatbotResponse(question) {
            const lowerQuestion = question.toLowerCase();
            
            if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology')) {
                return "H. M. U. Rafique has expertise in Cloud Platforms (AWS, Azure, GCP), Infrastructure as Code (Terraform), CI/CD (Jenkins, GitHub Actions), Containerization (Docker, Kubernetes), and Monitoring tools (Prometheus, Grafana).";
            } else if (lowerQuestion.includes('experience') || lowerQuestion.includes('work')) {
                return "He has worked as Associate DevOps Engineer at Appium Logics Solutions (Jun 2023 - Mar 2025) and as DevOps Engineer Intern (Jan 2023 - Jun 2023).";
            } else if (lowerQuestion.includes('certif')) {
                return "Certifications include Terraform Associate, DevSysOps Engineer Diploma, DevOps & MLOps Certification, and AWS Solutions Architect (in progress).";
            } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('phone')) {
                return "You can contact via email: contact@hmurafique.com or phone: +92 300 1234567";
            } else if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
                return "Hello! How can I help you learn about H. M. U. Rafique's DevOps expertise?";
            } else {
                return "I can help you with information about technical skills, work experience, certifications, or contact details. What would you like to know?";
            }
        }
    }
    
    // Open Map function
    window.openMap = function() {
        window.open('https://www.google.com/maps?q=Karachi+Pakistan', '_blank');
    };
});
