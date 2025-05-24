document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const usernameDisplay = document.getElementById('usernameDisplay');
    const orderNowBtn = document.getElementById('orderNowBtn');
    const tierOrderBtns = document.querySelectorAll('.tier-order-btn');
    const modal = document.getElementById('orderModal');
    const closeModal = document.querySelector('.close-modal');
    const proceedToPay = document.getElementById('proceedToPay');
    const orderQuantity = document.getElementById('orderQuantity');
    
    // Sample user data
    const user = {
        name: 'Customer'
    };
    
    // Initialize dashboard
    function initDashboard() {
        usernameDisplay.textContent = user.name;
    }
    
    // Open order modal with specific quantity
    function openOrderModal(bags) {
        orderQuantity.value = bags;
        modal.style.display = 'block';
    }
    
    // Event listeners for order buttons
    orderNowBtn.addEventListener('click', function() {
        openOrderModal('50');
    });
    
    tierOrderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const bags = this.dataset.bags;
            openOrderModal(bags);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Proceed to payment
    proceedToPay.addEventListener('click', function() {
        const bags = orderQuantity.value;
        const address = document.getElementById('deliveryAddress').value;
        const name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        const email = document.getElementById('customerEmail').value;
        
        // Validate form
        if (!address || !name || !phone || !email) {
            alert('Please fill in all fields before proceeding to payment.');
            return;
        }
        
        // Calculate total price (3000 Naira per bag)
        const totalPrice = 3000 * parseInt(bags);
        
        // In a real application, you would process the order here
        // For this demo, we'll just redirect to payment page
        
        // Redirect to payment page (REPLACE THIS WITH YOUR ACTUAL PAYMENT LINK)
        window.location.href = `YOUR_PAYMENT_LINK_HERE?bags=${bags}&total=${totalPrice}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(address)}`;
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Initialize dashboard
    initDashboard();
});
