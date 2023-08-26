// Generate a random CAPTCHA code
function generateCaptcha() {
    const captcha = Math.random().toString(36).substr(2, 6).toUpperCase();
    return captcha;
}

// Add the CAPTCHA to the page
function addCaptcha() {
    const captchaContainer = document.getElementById('captcha-container');
    const captcha = generateCaptcha();
    captchaContainer.innerHTML = `
        <label for="captcha">Enter the CAPTCHA code: ${captcha}</label>
        <input type="text" id="captcha" required>
    `;
}

// Validate CAPTCHA
function validateCaptcha(inputValue, captcha) {
    return inputValue.toUpperCase() === captcha;
}

// Handle form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const captcha = generateCaptcha();
    const inputCaptcha = document.getElementById('captcha').value;
    
    if (validateCaptcha(inputCaptcha, captcha)) {
        alert('CAPTCHA validation successful. Logging in...');
        window.location.href = "WebForm-FileUpload.html";
    } else {
        alert('CAPTCHA validation failed. Please try again.');
        addCaptcha();
    }
});

// Initialize CAPTCHA on page load
addCaptcha();