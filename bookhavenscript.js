document.getElementById("subscribe-btn").addEventListener("click", function() {
  const email = prompt("Enter your email to subscribe to our newsletter:");
  
  if (email) {
    // Simple validation for email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      alert(`Thank you for subscribing, ${email}!`);
    } else {
      alert("Please enter a valid email address.");
    }
  } else {
    alert("Subscription canceled.");
  }
});

const addToCartButtons = document.querySelectorAll(".addToCartBtn");

addToCartButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    alert("Item added to cart!");
  });
});