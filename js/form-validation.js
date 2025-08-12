// Form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize form validation for all forms
        initFormValidation();
        console.log('Form validation initialized successfully');
    } catch (error) {
        console.error('Error initializing form validation:', error);
    }
});

// Main form validation initialization
function initFormValidation() {
    try {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add real-time validation
            addRealTimeValidation(form);
            
            // Handle form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmission(this);
            });
        });
    } catch (error) {
        console.error('Error in initFormValidation:', error);
    }
}

// Add real-time validation to form inputs
function addRealTimeValidation(form) {
    try {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Validate on blur (when user leaves the field)
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear errors on input (when user starts typing)
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    } catch (error) {
        console.error('Error adding real-time validation:', error);
    }
}

// Validate individual field
function validateField(field) {
    try {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name || field.id;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${getFieldLabel(field)} is required.`;
        }
        // Email validation
        else if (fieldType === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
        // Password validation
        else if (fieldType === 'password' && value && value.length < 6) {
            isValid = false;
            errorMessage = 'Password must be at least 6 characters long.';
        }
        // Phone validation (if field has phone-related name/id)
        else if ((fieldName.includes('phone') || fieldName.includes('tel')) && value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
        // Text length validation
        else if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
            isValid = false;
            errorMessage = `${getFieldLabel(field)} must be at least ${field.getAttribute('minlength')} characters long.`;
        }
        else if (field.hasAttribute('maxlength') && value.length > parseInt(field.getAttribute('maxlength'))) {
            isValid = false;
            errorMessage = `${getFieldLabel(field)} must not exceed ${field.getAttribute('maxlength')} characters.`;
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    } catch (error) {
        console.error('Error validating field:', error);
        return false;
    }
}

// Validate entire form
function validateForm(form) {
    try {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;

        inputs.forEach(input => {
            const isFieldValid = validateField(input);
            if (!isFieldValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    } catch (error) {
        console.error('Error validating form:', error);
        return false;
    }
}

// Handle form submission
function handleFormSubmission(form) {
    try {
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        
        // Set loading state
        if (submitButton && window.ModernCorpUtils) {
            window.ModernCorpUtils.setLoadingState(submitButton, true);
        }

        // Validate form
        const isValid = validateForm(form);

        if (isValid) {
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                handleSuccessfulSubmission(form);
                
                // Reset loading state
                if (submitButton && window.ModernCorpUtils) {
                    window.ModernCorpUtils.setLoadingState(submitButton, false);
                }
            }, 1500);
        } else {
            // Reset loading state immediately if validation fails
            if (submitButton && window.ModernCorpUtils) {
                window.ModernCorpUtils.setLoadingState(submitButton, false);
            }
            
            // Show error notification
            if (window.ModernCorpUtils) {
                window.ModernCorpUtils.showNotification('Please correct the errors in the form.', 'error');
            }
            
            // Focus on first error field
            const firstErrorField = form.querySelector('.form-error');
            if (firstErrorField) {
                firstErrorField.focus();
            }
        }
    } catch (error) {
        console.error('Error handling form submission:', error);
        
        // Reset loading state on error
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitButton && window.ModernCorpUtils) {
            window.ModernCorpUtils.setLoadingState(submitButton, false);
        }
    }
}

// Handle successful form submission
function handleSuccessfulSubmission(form) {
    try {
        const formType = getFormType(form);
        
        switch (formType) {
            case 'contact':
                if (window.ModernCorpUtils) {
                    window.ModernCorpUtils.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                }
                form.reset();
                break;
                
            case 'login':
                if (window.ModernCorpUtils) {
                    window.ModernCorpUtils.showNotification('Login successful! Redirecting...', 'success');
                }
                // Simulate redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                break;
                
            case 'newsletter':
                if (window.ModernCorpUtils) {
                    window.ModernCorpUtils.showNotification('Successfully subscribed to our newsletter!', 'success');
                }
                form.reset();
                break;
                
            default:
                if (window.ModernCorpUtils) {
                    window.ModernCorpUtils.showNotification('Form submitted successfully!', 'success');
                }
                form.reset();
        }
    } catch (error) {
        console.error('Error handling successful submission:', error);
    }
}

// Utility functions
function getFormType(form) {
    try {
        const formId = form.id;
        const formClass = form.className;
        
        if (formId.includes('contact') || formClass.includes('contact')) {
            return 'contact';
        } else if (formId.includes('login') || formClass.includes('login')) {
            return 'login';
        } else if (formId.includes('newsletter') || formClass.includes('newsletter')) {
            return 'newsletter';
        }
        
        return 'generic';
    } catch (error) {
        console.error('Error getting form type:', error);
        return 'generic';
    }
}

function getFieldLabel(field) {
    try {
        // Try to find associated label
        const label = document.querySelector(`label[for="${field.id}"]`);
        if (label) {
            return label.textContent.replace('*', '').trim();
        }
        
        // Fallback to placeholder or name
        return field.placeholder || field.name || 'This field';
    } catch (error) {
        console.error('Error getting field label:', error);
        return 'This field';
    }
}

function isValidEmail(email) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    } catch (error) {
        console.error('Error validating email:', error);
        return false;
    }
}

function isValidPhone(phone) {
    try {
        // Remove all non-digit characters
        const cleanPhone = phone.replace(/\D/g, '');
        // Check if it's a valid length (10-15 digits)
        return cleanPhone.length >= 10 && cleanPhone.length <= 15;
    } catch (error) {
        console.error('Error validating phone:', error);
        return false;
    }
}

function showFieldError(field, message) {
    try {
        // Add error class to field
        field.classList.add('form-error');
        
        // Remove existing error message
        clearFieldError(field);
        
        // Create and add error message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    } catch (error) {
        console.error('Error showing field error:', error);
    }
}

function clearFieldError(field) {
    try {
        // Remove error class
        field.classList.remove('form-error');
        
        // Remove error message
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    } catch (error) {
        console.error('Error clearing field error:', error);
    }
}

// Export validation functions for external use
window.FormValidation = {
    validateField,
    validateForm,
    isValidEmail,
    isValidPhone,
    showFieldError,
    clearFieldError
};
