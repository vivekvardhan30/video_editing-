let captchaAnswer, signupCaptchaAnswer;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    captchaAnswer = num1 + num2;
    document.getElementById("captcha-question").textContent = `What is ${num1} + ${num2}?`;
}

function refreshCaptcha() {
    generateCaptcha();
}

function generateSignupCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    signupCaptchaAnswer = num1 + num2;
    document.getElementById("signup-captcha-question").textContent = `What is ${num1} + ${num2}?`;
}

function refreshSignupCaptcha() {
    generateSignupCaptcha();
}

// Switch between forms
document.getElementById("show-signup").onclick = function () {
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("signup-form").classList.add("active");
};

document.getElementById("show-login").onclick = function () {
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("login-form").classList.add("active");
};

// Validate Captcha on form submission
document.getElementById("login-form-element").onsubmit = function (e) {
    e.preventDefault();
    const userAnswer = parseInt(document.getElementById("captcha-input").value, 10);
    if (userAnswer !== captchaAnswer) {
        alert("Incorrect CAPTCHA. Please try again.");
        refreshCaptcha();
        return;
    }
    alert("Login successful!");
};

document.getElementById("signup-form-element").onsubmit = function (e) {
    e.preventDefault();
    const userAnswer = parseInt(document.getElementById("signup-captcha-input").value, 10);
    if (userAnswer !== signupCaptchaAnswer) {
        alert("Incorrect CAPTCHA. Please try again.");
        refreshSignupCaptcha();
        return;
    }
    alert("Signup successful!");
};

// Generate initial CAPTCHAs
window.onload = function () {
    generateCaptcha();
    generateSignupCaptcha();
};