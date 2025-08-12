// Main JavaScript file for global functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Mobile navigation toggle
        initMobileNavigation();
        
        // Smooth scrolling for anchor links
        initSmoothScrolling();
        
        // Add active states to navigation
        updateActiveNavigation();
        
        console.log('Main.js loaded successfully');
    } catch (error) {
        console.error('Error initializing main.js:', error);
    }
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    try {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
                
                if (!isClickInsideNav && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing mobile navigation:', error);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    try {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Update active navigation based on current page
function updateActiveNavigation() {
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error updating active navigation:', error);
    }
}

// Utility function for showing notifications
function showNotification(message, type = 'info') {
    try {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            border-radius: 6px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            max-width: 300px;
            word-wrap: break-word;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

// Utility function for loading states
function setLoadingState(element, isLoading) {
    try {
        if (!element) return;
        
        if (isLoading) {
            element.disabled = true;
            element.style.opacity = '0.7';
            element.style.cursor = 'not-allowed';
            
            if (element.tagName === 'BUTTON' || element.classList.contains('btn')) {
                element.originalText = element.textContent;
                element.textContent = 'Loading...';
            }
        } else {
            element.disabled = false;
            element.style.opacity = '1';
            element.style.cursor = 'pointer';
            
            if (element.originalText) {
                element.textContent = element.originalText;
                delete element.originalText;
            }
        }
    } catch (error) {
        console.error('Error setting loading state:', error);
    }
}

// Handle image loading errors gracefully
document.addEventListener('DOMContentLoaded', function() {
    try {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Hide the image if it fails to load
                this.style.display = 'none';
                
                // Optionally, you could replace with a placeholder
                console.warn('Image failed to load:', this.src);
            });
            
            img.addEventListener('load', function() {
                // Image loaded successfully
                this.style.opacity = '1';
            });
        });
    } catch (error) {
        console.error('Error handling image loading:', error);
    }
});

// Intersection Observer for animations (optional enhancement)
function initScrollAnimations() {
    try {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements that should animate
            const animateElements = document.querySelectorAll('.feature-card, .service-card, .blog-card');
            animateElements.forEach(el => {
                observer.observe(el);
            });
        }
    } catch (error) {
        console.error('Error initializing scroll animations:', error);
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Export functions for use in other scripts
window.ModernCorpUtils = {
    showNotification,
    setLoadingState
};
