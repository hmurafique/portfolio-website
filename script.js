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
