const cartItemsContainer = document.getElementById("cart-items-container");
const totalContainer = document.getElementById("total-container");

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.innerHTML = "";
  } else {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");
      cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div>
          <button onclick="updateQuantity('${item.id}', -1)">-</button>
          <span>Quantity: ${item.quantity || 1}</span>
          <button onclick="updateQuantity('${item.id}', 1)">+</button>
        </div>
        <button onclick="removeItem('${item.id}')">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItemDiv);
      total += item.price * item.quantity;
    });
    totalContainer.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  }
}

function updateQuantity(id, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex(item => item.id === id);
  
  if (productIndex !== -1) {
    cart[productIndex].quantity += change;
    if (cart[productIndex].quantity <= 0) {
      cart.splice(productIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}

function removeItem(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  displayCart();
}

displayCart();
