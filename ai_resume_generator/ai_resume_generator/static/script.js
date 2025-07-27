// Form progress tracking with enhanced functionality
function updateFormProgress() {
    const forms = ['resumeForm', 'coverLetterForm'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
        const allImportantInputs = form.querySelectorAll('#name, #email, #job_title, #experience, #skills, input[name="template"], input[name="page_limit"]');
        const progressFill = document.getElementById('progressFill');
        
        function calculateProgress() {
            let filledInputs = 0;
            
            if (formId === 'resumeForm') {
                allImportantInputs.forEach(input => {
                    if (input.type === 'radio') {
                        if (document.querySelector(`input[name="${input.name}"]:checked`)) {
                            filledInputs++;
                        }
                    } else if (input.value.trim() !== '') {
                        filledInputs++;
                    }
                });
            } else {
                requiredInputs.forEach(input => {
                    if (input.value.trim() !== '') {
                        filledInputs++;
                    }
                });
            }
            
            const totalInputs = formId === 'resumeForm' ? allImportantInputs.length : requiredInputs.length;
            const progress = (filledInputs / totalInputs) * 100;
            
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            
            // Update progress text
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                if (progress === 100) {
                    progressText.textContent = 'Ready to generate! ✨';
                    progressText.style.color = '#4CAF50';
                } else {
                    progressText.textContent = `Complete your information (${Math.round(progress)}% done)`;
                    progressText.style.color = '#666';
                }
            }
        }
        
        // Calculate initial progress
        calculateProgress();
        
        // Update progress on input changes
        const allInputs = form.querySelectorAll('input, textarea, select');
        allInputs.forEach(input => {
            input.addEventListener('input', calculateProgress);
            input.addEventListener('change', calculateProgress);
        });
    });
}

// URL validation functions
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function isValidLinkedInURL(url) {
    const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedinPattern.test(url);
}

function isValidGitHubURL(url) {
    const githubPattern = /^https:\/\/(www\.)?github\.com\/[\w-]+\/?$/;
    return githubPattern.test(url);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Auto-format URLs
function setupURLFormatting() {
    // Auto-format LinkedIn URLs
    const linkedinInput = document.getElementById('linkedin');
    if (linkedinInput) {
        linkedinInput.addEventListener('blur', function() {
            let value = this.value.trim();
            if (value && !value.startsWith('http')) {
                if (value.includes('linkedin.com/in/')) {
                    this.value = 'https://' + value;
                } else if (!value.includes('linkedin.com')) {
                    const username = value.replace(/[^a-zA-Z0-9-]/g, '');
                    if (username) {
                        this.value = 'https://linkedin.com/in/' + username;
                    }
                }
            }
        });

        linkedinInput.addEventListener('input', function() {
            const value = this.value;
            if (value && isValidLinkedInURL(value)) {
                this.style.borderColor = '#4CAF50';
            } else if (value) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    }

    // Auto-format GitHub URLs
    const githubInput = document.getElementById('github');
    if (githubInput) {
        githubInput.addEventListener('blur', function() {
            let value = this.value.trim();
            if (value && !value.startsWith('http')) {
                if (value.includes('github.com/')) {
                    this.value = 'https://' + value;
                } else if (!value.includes('github.com')) {
                    const username = value.replace(/[^a-zA-Z0-9-]/g, '');
                    if (username) {
                        this.value = 'https://github.com/' + username;
                    }
                }
            }
        });

        githubInput.addEventListener('input', function() {
            const value = this.value;
            if (value && isValidGitHubURL(value)) {
                this.style.borderColor = '#4CAF50';
            } else if (value) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    }

    // Portfolio URL validation
    const portfolioInput = document.getElementById('portfolio');
    if (portfolioInput) {
        portfolioInput.addEventListener('input', function() {
            const value = this.value;
            if (value && isValidURL(value)) {
                this.style.borderColor = '#4CAF50';
            } else if (value) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    }
}

// Template selection functionality
function initializeTemplateSelection() {
    const templateOptions = document.querySelectorAll('.template-option');
    const templateRadios = document.querySelectorAll('input[name="template"]');
    
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Update visual state
            templateOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Trigger progress update
            const event = new Event('change');
            radio.dispatchEvent(event);
        });
    });
    
    // Initialize first template as active
    if (templateOptions.length > 0) {
        templateOptions[0].classList.add('active');
    }
    
    // Page limit selection
    const pageOptions = document.querySelectorAll('.page-option');
    pageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Trigger progress update
            const event = new Event('change');
            radio.dispatchEvent(event);
        });
    });
}

// Enhanced form validation
function validateEnhancedForm(formData) {
    const errors = [];
    
    // Required fields
    if (!formData.name || formData.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.job_title || formData.job_title.length < 2) {
        errors.push('Job title is required');
    }
    
    if (!formData.experience || formData.experience.length < 20) {
        errors.push('Please provide detailed work experience (at least 20 characters)');
    }
    
    if (!formData.skills || formData.skills.length < 10) {
        errors.push('Please list your skills (at least 10 characters)');
    }
    
    // URL validation
    if (formData.linkedin && !isValidLinkedInURL(formData.linkedin)) {
        errors.push('Please enter a valid LinkedIn URL');
    }
    
    if (formData.github && !isValidGitHubURL(formData.github)) {
        errors.push('Please enter a valid GitHub URL');
    }
    
    if (formData.portfolio && !isValidURL(formData.portfolio)) {
        errors.push('Please enter a valid portfolio URL');
    }
    
    return errors;
}

// Resume form submission handler
function setupResumeFormSubmission() {
    const form = document.getElementById('resumeForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        const errors = validateEnhancedForm(data);
        if (errors.length > 0) {
            alert('Please fix the following errors:\n• ' + errors.join('\n• '));
            return;
        }
        
        // Show loading state
        const generateBtn = document.getElementById('generateBtn');
        const btnText = generateBtn.querySelector('.btn-text');
        const loading = generateBtn.querySelector('.loading');
        
        generateBtn.disabled = true;
        btnText.style.display = 'none';
        loading.style.display = 'inline-flex';
        
        try {
            // Send request to backend
            const response = await fetch('/generate-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show result
                document.getElementById('resumeContent').textContent = result.content;
                document.getElementById('templateUsed').textContent = result.template;
                document.getElementById('pageCount').textContent = result.pages;
                document.getElementById('result').style.display = 'block';
                
                // Hide form
                document.querySelector('.form-wrapper').style.display = 'none';
                
                // Setup download
                const downloadBtn = document.getElementById('downloadBtn');
                downloadBtn.onclick = function() {
                    window.location.href = result.download_url;
                };
                
                // Scroll to result
                document.getElementById('result').scrollIntoView({
                    behavior: 'smooth'
                });
                
            } else {
                throw new Error(result.error || 'Failed to generate resume');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error generating resume: ' + error.message);
        } finally {
            // Reset button state
            generateBtn.disabled = false;
            btnText.style.display = 'inline';
            loading.style.display = 'none';
        }
    });
}

// Cover letter form submission handler
function setupCoverLetterFormSubmission() {
    const form = document.getElementById('coverLetterForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        const requiredFields = ['name', 'email', 'company', 'position', 'experience', 'skills'];
        const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields: ' + missingFields.join(', '));
            return;
        }
        
        if (!isValidEmail(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const generateBtn = document.getElementById('generateBtn');
        const btnText = generateBtn.querySelector('.btn-text');
        const loading = generateBtn.querySelector('.loading');
        
        generateBtn.disabled = true;
        btnText.style.display = 'none';
        loading.style.display = 'inline-flex';
        
        try {
            // Send request to backend
            const response = await fetch('/generate-cover-letter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show result
                document.getElementById('coverLetterContent').textContent = result.content;
                document.getElementById('result').style.display = 'block';
                
                // Hide form
                document.querySelector('.form-wrapper').style.display = 'none';
                
                // Setup download
                const downloadBtn = document.getElementById('downloadBtn');
                downloadBtn.onclick = function() {
                    window.location.href = result.download_url;
                };
                
                // Scroll to result
                document.getElementById('result').scrollIntoView({
                    behavior: 'smooth'
                });
                
            } else {
                throw new Error(result.error || 'Failed to generate cover letter');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error generating cover letter: ' + error.message);
        } finally {
            // Reset button state
            generateBtn.disabled = false;
            btnText.style.display = 'inline';
            loading.style.display = 'none';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateFormProgress();
    setupURLFormatting();
    initializeTemplateSelection();
    setupResumeFormSubmission();
    setupCoverLetterFormSubmission();
});

// Export functions for potential use elsewhere
window.ResumeGeneratorJS = {
    updateFormProgress,
    isValidURL,
    isValidLinkedInURL,
    isValidGitHubURL,
    isValidEmail,
    setupURLFormatting,
    initializeTemplateSelection,
    validateEnhancedForm,
    setupResumeFormSubmission,
    setupCoverLetterFormSubmission
};
