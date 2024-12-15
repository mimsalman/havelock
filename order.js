document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const orderSummaryBody = document.getElementById('order-summary-body');
    let total = 0;

    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'index.html'; // Return to the main page
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs.${itemTotal.toFixed(2)}</td>
        `;
        orderSummaryBody.appendChild(row);
    });

    document.getElementById('order-total').innerText = `Rs.${total.toFixed(2)}`;

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate);
        deliveryDate.setDate(currentDate.getDate() + 3); // delivery date 3 days from now

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const formattedDeliveryDate = formatDate(deliveryDate);

        // alert when clik buy now
        alert(`Thank you for your purchase, ${name}! Your order will be delivered on ${formattedDeliveryDate}. Order date: ${formatDate(currentDate)}`);
        localStorage.removeItem('cart');
        window.location.href = 'index.html'; // Return to the main page
    });
});
