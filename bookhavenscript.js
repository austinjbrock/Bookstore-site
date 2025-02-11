// Initialize cart from localStorage (using an object instead of an array)
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Update the cart count in the navbar
function updateCartCount() {
  document.getElementById('cartCount').textContent = Object.keys(cart).length;  // Count the number of unique items in the cart
}

// Update the cart modal with items
function updateCartModal() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalPriceContainer = document.getElementById('totalPrice');
  cartItemsContainer.innerHTML = ''; // Clear current items

  let total = 0;

  if (Object.keys(cart).length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceContainer.textContent = '0.00';
  } else {
    // Loop through the cart object
    for (let id in cart) {
      const item = cart[id];
      const itemElement = document.createElement('p');
      itemElement.textContent = `${item.name} - $${item.price}`;
      cartItemsContainer.appendChild(itemElement);
      total += item.price;
    }

    totalPriceContainer.textContent = total.toFixed(2);
  }

  console.log("Current Cart:", cart);  // Log cart when modal is updated
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

// Add item to cart (with key-value pairs)
function addToCart(item) {
  if (!cart[item.id]) {
    cart[item.id] = item;  // Add item to the cart object, using its id as the key
    localStorage.setItem('cart', JSON.stringify(cart));  // Save cart to localStorage
    updateCartCount();  // Update cart count in navbar
    console.log("Cart after adding item:", cart);  // Log the entire cart
  } else {
    alert(`${item.name} has been added to the cart.`);  // Add item confirmation alert
  }
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.addToCartBtn').forEach(button => {
  button.addEventListener('click', function() {
    const item = {
      id: this.dataset.id,
      name: this.dataset.name,  // Ensure this is provided in the HTML
      price: parseFloat(this.dataset.price),
    };

    if (item.name && item.name !== 'undefined') {  // Check if item.name is valid
      addToCart(item);  // Add the item to the cart
    } else {
      alert("Error: Item name is undefined or missing. Please check the product data.");
    }
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
  cart = {};  // Reset the cart to an empty object
  localStorage.removeItem('cart');  // Remove cart from localStorage
  updateCartCount();  // Update cart count in the navbar
  updateCartModal();  // Update the cart modal (it will show the empty state)
  console.log("Cart has been cleared.");  // Log the cart being cleared
  console.log("Cart after clearing:", cart);  // Log the empty cart
}

// Event listener for the "Clear Cart" button
document.getElementById('clearCartBtn').addEventListener('click', clearCart);

updateCartCount();
