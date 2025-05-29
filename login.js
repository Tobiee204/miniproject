// HTML structure
const loginHTML = `
<div class="login-container">
    <div class="tabs">
        <button class="tab-btn active" data-tab="form">Đăng nhập form</button>
        <button class="tab-btn" data-tab="qr">Đăng nhập QR</button>
    </div>

    <div class="tab-content" id="form-tab">
        <form id="loginForm">
            <div class="form-group">
                <input type="text" id="username" placeholder="Email/Số điện thoại/Tên đăng nhập" required>
            </div>
            <div class="form-group">
                <input type="password" id="password" placeholder="Mật khẩu" required>
            </div>
            <button type="submit" class="login-btn">Đăng nhập</button>
            
            <div class="additional-links">
                <a href="#" class="forgot-password">Quên mật khẩu</a>
                <a href="#" class="sms-login">Đăng nhập với SMS</a>
            </div>

            <div class="social-login">
                <button type="button" class="social-btn facebook">
                    <i class="fab fa-facebook-f"></i>
                    Đăng nhập với Facebook
                </button>
                <button type="button" class="social-btn google">
                    <i class="fab fa-google"></i>
                    Đăng nhập với Google
                </button>
            </div>
        </form>
    </div>

    <div class="tab-content" id="qr-tab" style="display: none;">
        <div class="qr-container">
            <div class="qr-placeholder">
                <i class="fas fa-qrcode"></i>
            </div>
            <p class="qr-instructions">
                Quét mã QR bằng ứng dụng FoodExpress để đăng nhập
            </p>
        </div>
    </div>

    <div class="register-prompt">
        <p>Bạn mới biết đến FoodExpress? <a href="#" class="register-link">Đăng ký</a></p>
    </div>
</div>
`;

// CSS styles
const styles = `
<style>
    .login-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background: white;
    }

    .tabs {
        display: flex;
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
    }

    .tab-btn {
        flex: 1;
        padding: 10px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s;
    }

    .tab-btn.active {
        border-bottom: 2px solid #ff4d4d;
        color: #ff4d4d;
    }

    .form-group {
        margin-bottom: 15px;
    }

    input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    .login-btn {
        width: 100%;
        padding: 12px;
        background: #ff4d4d;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        margin-bottom: 15px;
    }

    .additional-links {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .additional-links a {
        color: #666;
        text-decoration: none;
        font-size: 14px;
    }

    .social-login {
        margin-top: 20px;
    }

    .social-btn {
        width: 100%;
        padding: 12px;
        margin-bottom: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }

    .facebook {
        background: #3b5998;
        color: white;
    }

    .google {
        background: white;
        color: #666;
        border: 1px solid #ddd;
    }

    .social-btn i {
        margin-right: 10px;
    }

    .qr-container {
        text-align: center;
        padding: 20px;
    }

    .qr-placeholder {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 100px;
        color: #666;
    }

    .qr-instructions {
        margin-top: 20px;
        color: #666;
    }

    .register-prompt {
        text-align: center;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
    }

    .register-prompt a {
        color: #ff4d4d;
        text-decoration: none;
        font-weight: bold;
    }

    #login-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    #login-modal-container {
        position: relative;
        animation: modalFadeIn 0.3s ease;
    }

    .modal-close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        padding: 5px 10px;
        z-index: 1;
    }

    .modal-close-btn:hover {
        color: #ff4d4d;
    }

    @keyframes modalFadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
`;

// Add Font Awesome for icons
document.head.innerHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">';

// Add styles to document
document.head.innerHTML += styles;

// Add login HTML to document
document.body.innerHTML = loginHTML;

// JavaScript for tab switching
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all content
            contents.forEach(content => content.style.display = 'none');
            // Show selected content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).style.display = 'block';
        });
    });

    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log('Login attempt:', { username, password });
        // Add your login logic here
    });

    // Social login handlers
    document.querySelector('.facebook').addEventListener('click', () => {
        console.log('Facebook login clicked');
        // Add Facebook login logic
    });

    document.querySelector('.google').addEventListener('click', () => {
        console.log('Google login clicked');
        // Add Google login logic
    });

    // Additional links handlers
    document.querySelector('.forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Forgot password clicked');
        // Add forgot password logic
    });

    document.querySelector('.sms-login').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('SMS login clicked');
        // Add SMS login logic
    });

    document.querySelector('.register-link').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Register clicked');
        // Add registration logic
    });
});

// Function to open login modal
function openLoginModal(tabName = 'form') {
    // Create modal overlay if it doesn't exist
    let modalOverlay = document.getElementById('login-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'login-modal-overlay';
        document.body.appendChild(modalOverlay);
    }

    // Create modal container if it doesn't exist
    let modalContainer = document.getElementById('login-modal-container');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'login-modal-container';
        modalContainer.innerHTML = loginHTML;
        modalOverlay.appendChild(modalContainer);

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close-btn';
        closeButton.innerHTML = '×';
        modalContainer.querySelector('.login-container').prepend(closeButton);

        // Initialize the tabs and form handlers
        initializeLoginHandlers();
    }

    // Show the modal
    modalOverlay.style.display = 'flex';
    
    // Switch to the specified tab
    const tabButton = modalContainer.querySelector(`[data-tab="${tabName}"]`);
    if (tabButton) {
        tabButton.click();
    }
}

// Function to close login modal
function closeLoginModal() {
    const modalOverlay = document.getElementById('login-modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
    }
}

// Separate initialization function
function initializeLoginHandlers() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('loginForm');
    const closeButton = document.querySelector('.modal-close-btn');

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            contents.forEach(content => content.style.display = 'none');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).style.display = 'block';
        });
    });

    // Close button handler
    if (closeButton) {
        closeButton.addEventListener('click', closeLoginModal);
    }

    // Close on overlay click
    document.getElementById('login-modal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'login-modal-overlay') {
            closeLoginModal();
        }
    });

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            console.log('Login attempt:', { username, password });
            // Add your login logic here
        });
    }

    // Social login handlers
    document.querySelector('.facebook').addEventListener('click', () => {
        console.log('Facebook login clicked');
        // Add Facebook login logic
    });

    document.querySelector('.google').addEventListener('click', () => {
        console.log('Google login clicked');
        // Add Google login logic
    });

    // Additional links handlers
    document.querySelector('.forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Forgot password clicked');
        // Add forgot password logic
    });

    document.querySelector('.sms-login').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('SMS login clicked');
        // Add SMS login logic
    });

    document.querySelector('.register-link').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Register clicked');
        // Add registration logic
    });
}

// Make the openLoginModal function globally available
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
