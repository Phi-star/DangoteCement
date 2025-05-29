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

    // Payment links
    const paymentLinks = {
        50: 'https://selar.com/3e74d1',
        100: 'https://selar.com/h87x14',
        200: 'https://selar.com/9118e8'
    };

    // Telegram bot configuration
    const TELEGRAM_BOT_TOKEN = '8080602331:AAF9sM7bH1kLe4zKjI1dSJrhQJwYTOnLWH8';
    const TELEGRAM_CHAT_ID = '7279302614';

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

        console.log('Order data:', orderData);

        // Send Telegram notification
        sendOrderNotification(orderData);

        // Determine payment URL based on quantity
        const paymentUrl = paymentLinks[bags];
        if (!paymentUrl) {
            alert('Invalid quantity selected.');
            return;
        }

        // Append order details as query parameters
        const url = `${paymentUrl}?bags=${bags}&total=${totalPrice}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(address)}`;

        window.location.href = url;
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to send order notification to Telegram
    function sendOrderNotification(orderData) {
        const message = `🛒 New Order Placed\n\n` +
                       `👤 Customer: ${orderData.name}\n` +
                       `📞 Phone: ${orderData.phone}\n` +
                       `📧 Email: ${orderData.email}\n` +
                       `📍 Address: ${orderData.address}\n\n` +
                       `📦 Order Details:\n` +
                       `   - Bags: ${orderData.bags}\n` +
                       `   - Total: ₦${orderData.total.toLocaleString()}\n\n` +
                       `💳 Redirected to payment page\n` +
                       `⏰ ${new Date().toLocaleString()}`;

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
            console.log('Telegram order notification sent:', data);
        })
        .catch(error => {
            console.error('Error sending Telegram notification:', error);
        });
    }
});
