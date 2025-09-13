const cartSummary = document.getElementById("cart-summary");
const checkoutForm = document.getElementById("checkout-form");

function displayCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartSummary.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cartSummary.innerHTML = "<h3>Order Summary</h3>";
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item-summary");
      itemDiv.innerHTML = `
        <p><strong>${item.title}</strong> x${item.quantity}</p>
        <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartSummary.appendChild(itemDiv);
      total += item.price * item.quantity;
    });
    cartSummary.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  }
}

checkoutForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const paymentMethod = document.getElementById("payment").value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Add items to the cart before proceeding.");
    return;
  }

  let total = 0;
  cart.forEach(item => total += item.price * item.quantity);

  let paymentDetails = "";
  if (paymentMethod === "credit-card") {
    paymentDetails = "Credit Card payment selected.";
  } else if (paymentMethod === "paypal") {
    paymentDetails = "PayPal payment selected.";
  } else if (paymentMethod === "gcash") {
    paymentDetails = "Gcash payment selected. Please send the total amount to our Gcash account.";
  } else if (paymentMethod === "cod") {
    paymentDetails = "Cash on Delivery selected. Please pay upon delivery.";
  }

  alert(`Thank you for your purchase, ${name}!\nTotal amount: $${total.toFixed(2)}\nShipping to: ${address}\n${paymentDetails}`);


  localStorage.setItem("checkoutInfo", JSON.stringify({ name, address, paymentMethod, total }));


  localStorage.removeItem("cart");


  window.location.href = "confirmation.html";
});

displayCartSummary();
