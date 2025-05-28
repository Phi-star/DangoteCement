document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');

    // Toggle between login and register forms
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const company = document.getElementById('reg-company').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm').value;
        
        // Validate inputs
        if (!company || !email || !phone || !password || !confirmPassword) {
            showModal('Error', 'Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            showModal('Error', 'Passwords do not match');
            return;
        }
        
        // Check if email already exists
        if (localStorage.getItem(email)) {
            showModal('Error', 'Email already registered');
            return;
        }
        
        // Save user data to localStorage
        const user = {
            company,
            email,
            phone,
            password,
            orders: []
        };
        
        localStorage.setItem(email, JSON.stringify(user));
        
        // Save list of users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(email);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        showModal('Success!', 'Account created successfully. You can now login.');
        
        // Reset form
        registerForm.reset();
        
        // Switch to login form
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check if user exists
        const user = JSON.parse(localStorage.getItem(email));
        
        if (user && user.password === password) {
            // Save current user session
            localStorage.setItem('currentUser', email);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showModal('Error', 'Invalid email or password. Please try again.');
        }
    });

    function showModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        modal.style.display = 'block';
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
