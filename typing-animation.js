// typing-animation.js
document.addEventListener('DOMContentLoaded', function() {
    const textArray = [
        "Assembling DevOps Solutions",
        "Initializing Cloud Infrastructure", 
        "Loading DevOps Pipeline",
        "Deploying Portfolio"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    const typingElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('typing-cursor');
    
    if (!typingElement) {
        console.error('Typing element not found!');
        return;
    }
    
    function type() {
        const currentText = textArray[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            // Typing forward
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            isDeleting = true;
            setTimeout(type, pauseTime);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, deletingSpeed);
        } else {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }
    
    // Start animation after a brief delay
    setTimeout(type, 1000);
});
