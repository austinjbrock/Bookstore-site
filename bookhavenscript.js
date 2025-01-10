document.getElementById("subscribe-btn").addEventListener("click", function() {
  const email = prompt("Enter your email to subscribe to our newsletter:");
  
  if (email) {
    // Simple validation (you can add more complex validation if needed)
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
