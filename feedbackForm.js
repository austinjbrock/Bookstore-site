// Wait for the DOM content to load first
document.addEventListener('DOMContentLoaded', function() {

  // Get the form element
  const feedbackForm = document.getElementById('feedbackForm');
  
  // Event listener for form submission
  feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way (page reload)

    // Capture form data
    const customerName = document.getElementById('name').value;
    const customerEmail = document.getElementById('email').value;
    const orderDetails = document.getElementById('orderDetails').value;

    // Create an object to store the feedback/order
    const feedback = {
      name: customerName,
      email: customerEmail,
      orderDetails: orderDetails,
      dateSubmitted: new Date().toISOString() // Add the current date and time of submission
    };

    // Get existing feedback from localStorage or initialize an empty array
    let feedbackData = JSON.parse(localStorage.getItem('customerFeedback')) || [];

    // Add the new feedback to the array
    feedbackData.push(feedback);

    // Save the updated array back to localStorage
    localStorage.setItem('customerFeedback', JSON.stringify(feedbackData));

    // Optional: Log the feedback data to the console (for debugging)
    console.log('Feedback Submitted:', feedback);
    
    // Optional: Provide feedback to the user (confirmation message)
    alert("Thank you for your feedback! Your order details have been saved.");
    
    // Reset the form
    feedbackForm.reset();
  });
});



// Display feedback on the page (optional)
function displayFeedback() {
  const feedbackListContainer = document.getElementById('feedbackList');
  
  // Get the feedback data from localStorage
  const feedbackData = JSON.parse(localStorage.getItem('customerFeedback')) || [];
  
  if (feedbackData.length === 0) {
    feedbackListContainer.innerHTML = '<p>No feedback submitted yet.</p>';
  } else {
    feedbackListContainer.innerHTML = ''; // Clear previous content

    // Loop through the feedback and create HTML to display
    feedbackData.forEach(feedback => {
      const feedbackElement = document.createElement('div');
      feedbackElement.classList.add('feedback-item');
      
      feedbackElement.innerHTML = `
        <h3>Order by: ${feedback.name}</h3>
        <p>Email: ${feedback.email}</p>
        <p>Order/Feedback: ${feedback.orderDetails}</p>
        <p>Date Submitted: ${new Date(feedback.dateSubmitted).toLocaleString()}</p>
      `;
      
      feedbackListContainer.appendChild(feedbackElement);
    });
  }
}

// Call the function to display feedback on page load
document.addEventListener('DOMContentLoaded', function() {
  displayFeedback();
});
