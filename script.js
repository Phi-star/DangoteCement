document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const showSignUpLink = document.getElementById('showSignUp');
    const container = document.getElementById('container');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');

    // Toggle between sign up and sign in forms
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    showSignUpLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('right-panel-active');
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Sign up form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const companyName = document.getElementById('companyName').value;
        
        // Validate inputs
        if (!username || !email || !password || !companyName) {
            showModal('Error', 'Please fill in all fields');
            return;
        }
        
        // Check if username already exists
        if (localStorage.getItem(username)) {
            showModal('Error', 'Username already exists');
            return;
        }
        
        // Save user data to localStorage
        const user = {
            username,
            email,
            password,
            companyName,
            orders: []
        };
        
        localStorage.setItem(username, JSON.stringify(user));
        
        // Save list of users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(username);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        showModal('Success!', 'Account created successfully. You can now login.');
        
        // Reset form
        signupForm.reset();
        
        // Switch to login form
        container.classList.remove('right-panel-active');
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        // Check if user exists
        const user = JSON.parse(localStorage.getItem(username));
        
        if (user && user.password === password) {
            // Save current user session
            localStorage.setItem('currentUser', username);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showModal('Error', 'Invalid username or password. Please try again.');
        }
    });

    function showModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        modal.style.display = 'block';
    }
});
