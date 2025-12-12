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
        
        // Create a simple resume content
        const resumeContent = `
=============================================
        HAFIZ MUHAMMAD UMAR RAFIQUE
            DevSysOps Engineer
=============================================

CONTACT INFORMATION
───────────────────
Email: [Click to add your email]
Phone: [Click to add your phone]
Location: Karachi, Pakistan
LinkedIn: [Your LinkedIn Profile]
GitHub: [Your GitHub Profile]

SUMMARY
───────
DevOps Engineer with 3+ years of experience in designing, implementing, 
and managing cloud infrastructure, CI/CD pipelines, and monitoring solutions.
Expertise in multi-cloud environments (AWS, Azure, GCP), containerization 
(Docker, Kubernetes), and security tools (Wazuh, Suricata, ELK Stack).

EDUCATION
─────────
• Bachelor of Computer Engineering (BCE)
  Bahria University Islamabad Campus
  2016 - 2021

• Diploma in DevSysOps Engineer
  Al-Nafi International College
  DevOps & SysOps Engineering

• DevOps & MLOps Certification
  DICE Analytics

EXPERIENCE
──────────
Associate DevOps Engineer | Appium Logics Solutions
June 2023 - February 2024
- Designed and implemented CI/CD pipelines for 15+ microservices
- Managed Kubernetes clusters with 50+ nodes across AWS and Azure
- Implemented Prometheus and Grafana monitoring with 100+ dashboards
- Automated infrastructure using Terraform, reducing deployment time by 70%
- Configured Wazuh and Suricata for enterprise security monitoring

DevOps Engineer Internee | Appium Logics Solutions
January 2023 - June 2023
- Assisted in Docker containerization of legacy applications
- Implemented Jenkins pipelines for automated testing and deployment
- Configured Apache and Nginx web servers for production
- Participated in AWS cloud migration projects
- Developed Bash scripts for system automation

TECHNICAL SKILLS
────────────────
Cloud Platforms:    AWS, Azure, GCP
Containerization:   Docker, Kubernetes, Helm
CI/CD Tools:        Jenkins, GitHub Actions, Azure DevOps
Scripting:          Bash/Shell, Python, YAML
Monitoring:         Grafana, Prometheus, ELK Stack
Security:           Wazuh, Suricata, Zeek
Web Servers:        Apache, Nginx, IIS

PROJECTS
────────
1. Multi-Cloud CI/CD Pipeline
   - Implemented end-to-end pipeline across AWS, Azure, GCP
   - Technologies: Jenkins, Docker, Kubernetes, Terraform

2. Security Monitoring Stack
   - Deployed Wazuh, Suricata, ELK stack for threat detection
   - Technologies: Wazuh, ELK Stack, Docker, Grafana

3. Kubernetes Cluster Automation
   - Automated provisioning of K8s clusters across cloud providers
   - Technologies: Terraform, Kubernetes, Ansible, Helm

CERTIFICATIONS
──────────────
• Diploma in DevSysOps Engineer (Al-Nafi International College)
• DevOps & MLOps Certification (DICE Analytics)

────────────────────────────────────────────────
This is a sample resume. Please replace with your actual PDF resume.
For real deployment, link to your actual resume PDF file.
        `;
        
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'H_M_U_Rafique_DevOps_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert('Sample resume downloaded! For production, replace with link to your actual PDF resume.');
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name') || document.querySelector('input[type="text"]').value;
            const email = formData.get('email') || document.querySelector('input[type="email"]').value;
            const subject = formData.get('subject') || document.querySelectorAll('input[type="text"]')[1]?.value;
            const message = formData.get('message') || document.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`);
            contactForm.reset();
            
            // Note: For production, use a real form service like:
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: { 'Accept': 'application/json' }
            // })
        });
    }
    
    // Edit Contact Information
    const editableFields = document.querySelectorAll('.editable');
    editableFields.forEach(field => {
        field.addEventListener('click', function() {
            const currentText = this.textContent;
            const fieldName = this.id.replace('-text', '');
            const promptText = fieldName === 'email' ? 'Enter your email address:' : 
                             fieldName === 'phone' ? 'Enter your phone number:' : 
                             'Enter your location:';
            
            const newText = prompt(promptText, currentText);
            if (newText && newText.trim() !== '' && newText !== currentText) {
                this.textContent = newText;
                // Save to localStorage
                localStorage.setItem(fieldName, newText);
            }
        });
        
        // Load saved data
        const fieldName = field.id.replace('-text', '');
        const savedValue = localStorage.getItem(fieldName);
        if (savedValue && !savedValue.includes('Click to add')) {
            field.textContent = savedValue;
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
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
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillBars.forEach(bar => observer.observe(bar));
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Add active class to nav links
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Floating elements animation delay
    const floatIcons = document.querySelectorAll('.float-icon');
    floatIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Initialize skill bars with animation
    setTimeout(() => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 500);
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Form validation styling
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'var(--danger)';
            } else {
                this.style.borderColor = 'var(--primary)';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = 'var(--gray-light)';
        });
    });
    
    // Initialize with active section
    const initialSection = window.location.hash || '#home';
    const initialLink = document.querySelector(`.nav-menu a[href="${initialSection}"]`);
    if (initialLink) {
        initialLink.classList.add('active');
    }
    
    // Console greeting
    console.log('%c👋 Hello! Welcome to H.M.U. Rafique\'s Portfolio', 'color: #0d9488; font-size: 16px; font-weight: bold;');
    console.log('%c🚀 DevOps Engineer | Cloud Specialist | Automation Expert', 'color: #0891b2; font-size: 14px;');
    console.log('%c💼 Open to opportunities in DevOps, Cloud Engineering, and SRE roles', 'color: #64748b; font-size: 12px;');
});

