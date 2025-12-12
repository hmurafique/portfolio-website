// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
    
    // Download Resume
    const downloadBtn = document.getElementById('downloadResume');
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a simple resume PDF (in real scenario, link to actual PDF)
        const resumeContent = `
            H.M.U. RAFIQUE - DEVOPS ENGINEER
            =================================
            
            CONTACT
            Email: [Your Email]
            Phone: [Your Phone]
            Location: [Your Location]
            
            EDUCATION
            • Bachelor of Computer Engineering (BCE)
              Bahria University Islamabad Campus (2016-2021)
            
            • Diploma in DevSysOps Engineer
              Al-Nafi International College
            
            • DevOps & MLOps Certification
              DICE Analytics
            
            EXPERIENCE
            • Associate DevOps Engineer (June 2023 - Feb 2024)
              Appium Logics Solutions
            
            • DevOps Engineer Internee (Jan 2023 - June 2023)
              Appium Logics Solutions
            
            SKILLS
            • Cloud: AWS, Azure, GCP
            • Containerization: Docker, Kubernetes, Helm
            • CI/CD: Jenkins, GitHub Actions, Azure DevOps
            • Scripting: Bash, Python, YAML
            • Monitoring: Grafana, Prometheus, ELK Stack
            • Security: Wazuh, Suricata, Zeek
            • Web Servers: Apache, Nginx, IIS
        `;
        
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HMU_Rafique_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert('Resume downloaded! In actual deployment, link this to your actual PDF resume.');
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send this to a server
            // For demo, just show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            
            // In production, use something like:
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: { 'Accept': 'application/json' }
            // })
        });
    }
    
    // Edit Contact Information
    const contactFields = ['email-text', 'phone-text', 'location-text'];
    contactFields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('click', function() {
                const currentText = this.textContent;
                const newText = prompt('Enter new value:', currentText);
                if (newText && newText !== currentText) {
                    this.textContent = newText;
                    // Save to localStorage
                    localStorage.setItem(fieldId, newText);
                }
            });
            
            // Load saved data
            const savedValue = localStorage.getItem(fieldId);
            if (savedValue && savedValue !== '[Click to add your email]' && 
                savedValue !== '[Click to add your phone]' && 
                savedValue !== '[Click to add your location]') {
                element.textContent = savedValue;
            }
        }
    });
    
    // Smooth Scrolling for Anchor Links
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
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const width = skillLevel.style.width;
                skillLevel.style.animation = `fillBar 1.5s ease forwards`;
                skillLevel.style.setProperty('--target-width', width);
                observer.unobserve(skillLevel);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
    
    // Floating elements animation
    const floatIcons = document.querySelectorAll('.float-icon');
    floatIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
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
    
    // Initialize skill bars with animation
    setTimeout(() => {
        skillBars.forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }, 500);
});
