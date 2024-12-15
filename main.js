let cart = [];

function addToCart(name, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    if (quantity > 0) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCart();
    }
}

function updateCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs.${itemTotal.toFixed(2)}</td>
        `;
        cartBody.appendChild(row);
    });

    document.getElementById('total').innerText = `Total: Rs.${total.toFixed(2)}`;
}

function goToOrderPage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'order.html';
}

function saveToFavourites() {
    localStorage.setItem('favouriteOrder', JSON.stringify(cart));
    cart = [];
    updateCart();
    alert('Cart items saved to favourites and cart cleared!');
}

function applyFavourites() {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (favouriteOrder) {
        cart = favouriteOrder;
        updateCart();
        alert('Favourite items applied to cart!');
    } else {
        alert('No favourite items found!');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});


