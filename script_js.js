// Jeff Jen Real Estate Website - JavaScript Functionality

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize header scroll effects
    initHeaderEffects();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    console.log('Jeff Jen Real Estate Website Initialized');
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!data.name || !data.email) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual backend integration)
    submitContactForm(data);
}

function submitContactForm(data) {
    // Show loading state
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // In a real implementation, you would send this to your server
        console.log('Form Data:', data);
        
        // Show success message
        const serviceText = data.service ? ` about ${getServiceDisplayName(data.service)}` : '';
        const contactMethod = data.phone ? `at ${data.phone}` : `at ${data.email}`;
        
        showNotification(
            `Thank you ${data.name}! I've received your inquiry${serviceText}. I'll contact you ${contactMethod} within 24 hours to discuss your real estate goals.`,
            'success'
        );
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Track form submission (for analytics)
        trackFormSubmission(data.service || 'general');
        
    }, 1500);
}

function getServiceDisplayName(service) {
    const serviceMap = {
        'buying': 'buying a home',
        'selling': 'selling a home',
        'investment': 'investment properties',
        'consultation': 'a free market consultation',
        'other': 'real estate services'
    };
    return serviceMap[service] || 'real estate services';
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '500',
        zIndex: '9999',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: '#009688',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    notification.style.background = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0