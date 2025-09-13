const confirmationDetails = document.getElementById("confirmation-details");

function displayConfirmation() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutInfo = JSON.parse(localStorage.getItem("checkoutInfo"));

  if (!checkoutInfo) {
    confirmationDetails.innerHTML = "<p>No checkout information found.</p>";
    return;
  }

  const { name, address, paymentMethod, total } = checkoutInfo;

  let calculatedTotal = 0;
  cart.forEach(item => {
    const price = parseFloat(item.price);
    const quantity = item.quantity || 1;
    calculatedTotal += price * quantity;
  });

  confirmationDetails.innerHTML = `
    <h2>Thank you for your order, ${name}!</h2>
    <p>Your order has been successfully placed.</p>
    <p><strong>Shipping to:</strong> ${address}</p>
    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
    
    <h3>Order Summary</h3>
    <ul>
      ${cart.map(item => {
        const price = parseFloat(item.price);
        const quantity = item.quantity || 1;
        return `
          <li><strong>${item.title}</strong> x${quantity} - $${(price * quantity).toFixed(2)}</li>
        `;
      }).join('')}
    </ul>
    <p><strong>Total: $${total.toFixed(2)}</strong></p> <!-- Display the total from checkoutInfo -->
  `;
}

displayConfirmation();
