let cart = [];

function addComponent(component, price) {
    cart.push({ component, price });
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
    document.querySelector('#total-price span').textContent = totalPrice;
}

function goToCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<p>${item.component}</p><p>₹${item.price}</p>`;
        cartItems.appendChild(div);
    });
    updateTotalPrice();
}

function goToCheckout() {
    window.location.href = 'checkout.html';
}

function submitCheckout(event) {
    event.preventDefault();
    alert('Checkout submitted');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        loadCart();
    }
});
