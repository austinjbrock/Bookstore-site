// Initialize cart from localStorage or create a new one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the cart count in the navbar
function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.length;
}

// Update the cart modal with items
function updateCartModal() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalPriceContainer = document.getElementById('totalPrice');
  cartItemsContainer.innerHTML = ''; // Clear current items

  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceContainer.textContent = '0.00';
  } else {
    cart.forEach(item => {
      const itemElement = document.createElement('p');
      itemElement.textContent = `${item.name} - $${item.price}`;
      cartItemsContainer.appendChild(itemElement);
      total += item.price;
    });

    totalPriceContainer.textContent = total.toFixed(2);
  }
}

// Open cart modal
function openCartModal() {
  document.getElementById('cartModal').style.display = 'block';
  updateCartModal();
}

// Close cart modal
function closeCartModal() {
  document.getElementById('cartModal').style.display = 'none';
}

// Add item to cart
function addToCart(item) {
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
  updateCartCount(); // Update cart count in navbar
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.addToCartBtn').forEach(button => {
  button.addEventListener('click', function() {
    const item = {
      id: this.dataset.id,
      name: this.dataset.name,
      price: parseFloat(this.dataset.price),
    };
    addToCart(item);
  });
});

// Open cart modal when clicking the cart link
document.getElementById('cartLink').addEventListener('click', openCartModal);

// Close cart modal when clicking the close button (×)
document.querySelector('.close').addEventListener('click', closeCartModal);

// Close cart modal when clicking outside of the modal
window.addEventListener('click', function(event) {
  if (event.target === document.getElementById('cartModal')) {
    closeCartModal();
  }
});

// Clear cart function
function clearCart() {
  // Clear the cart array and remove from localStorage
  cart = [];
  localStorage.removeItem('cart');
  
  // Update cart count in the navbar
  updateCartCount();

  // Optionally, update the cart modal
  updateCartModal();
}

// Event listener for the "Clear Cart" button
document.getElementById('clearCartBtn').addEventListener('click', clearCart);

// Initial cart count update on page load
updateCartCount();
