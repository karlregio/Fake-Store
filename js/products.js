const apiEndpoint = "https://fakestoreapi.com/products";
const productsGrid = document.getElementById("products-grid");

async function fetchProducts() {
  try {
    const response = await fetch(apiEndpoint);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    productsGrid.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

function displayProducts(products) {
  productsGrid.innerHTML = "";
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.id}', '${product.title}', '${product.image}', ${product.price})">Add to Cart</button>
    `;
    productsGrid.appendChild(productCard);
  });
}

function addToCart(id, title, image, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(item => item.id === id);

  if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
  } else {
      const product = { id, title, image, price, quantity: 1 };
      cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`"${title}" has been added to your cart!`);
}


fetchProducts();
