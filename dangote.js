document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const orderNowBtn = document.getElementById('orderNowBtn');
    const tierOrderBtns = document.querySelectorAll('.tier-order-btn');
    const modal = document.getElementById('orderModal');
    const closeModal = document.querySelector('.close-modal');
    const proceedToPay = document.getElementById('proceedToPay');
    const orderQuantity = document.getElementById('orderQuantity');
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summaryTotal = document.getElementById('summaryTotal');
    
    // Price per bag (in Naira)
    const PRICE_PER_BAG = 3000;
    
    // Open order modal with specific quantity
    function openOrderModal(bags) {
        orderQuantity.value = bags;
        updateOrderSummary(bags);
        modal.style.display = 'block';
    }
    
    // Update order summary information
    function updateOrderSummary(bags) {
        const total = PRICE_PER_BAG * parseInt(bags);
        summaryQuantity.textContent = `${bags} bags`;
        summaryTotal.textContent = `₦${total.toLocaleString()}`;
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
    
    // Update summary when quantity changes
    orderQuantity.addEventListener('change', function() {
        updateOrderSummary(this.value);
    });
    
    // Proceed to payment
    proceedToPay.addEventListener('click', function() {
        const bags = orderQuantity.value;
        const address = document.getElementById('deliveryAddress').value.trim();
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        
        // Validate form
        if (!address) {
            alert('Please enter your delivery address');
            return;
        }
        
        if (!name) {
            alert('Please enter your full name');
            return;
        }
        
        if (!phone) {
            alert('Please enter your phone number');
            return;
        }
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        // Calculate total price
        const totalPrice = PRICE_PER_BAG * parseInt(bags);
        
        // Prepare order data
        const orderData = {
            bags: bags,
            total: totalPrice,
            name: name,
            phone: phone,
            email: email,
            address: address
        };
        
        // In a real application, you might save this order data first
        console.log('Order data:', orderData);
        
        // Redirect to payment page (REPLACE WITH YOUR ACTUAL PAYMENT LINK)
        const paymentUrl = `YOUR_PAYMENT_LINK_HERE?bags=${bags}&total=${totalPrice}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(address)}`;
        window.location.href = paymentUrl;
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
