import { Product } from './product.js';

//Fetch & Display + Loading/Error States
const usersStatus = document.querySelector("#users-status");
const userCards = document.querySelector("#user-cards");

async function loadUsers() {
  usersStatus.textContent = "Loading users...";
  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();

    usersStatus.textContent = "";
    userCards.innerHTML = users
      .map(user => `
        <div class="user-card">
          <h4>${user.name}</h4>
          <p>${user.email}</p>
        </div>
      `)
      .join("");
  } catch (error) {
    usersStatus.textContent = "Could not load users. Please check your connection and try again.";
  }
}

loadUsers();

// Product Class
// (class itself lives in product.js — here we just use it)
const products = [
  new Product("Notebook", 25),
  new Product("Backpack", 180),
  new Product("Head Phones", 450)
];

//Persistent Cart
function getCart() {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Bring It Together 
const productCards = document.querySelector("#product-cards");
const cartItemsList = document.querySelector("#cart-items");
const cartTotalSpan = document.querySelector("#cart-total");

function renderProducts() {
  productCards.innerHTML = products
    .map((product, index) => `
      <div class="product-card">
        <h4>${product.name}</h4>
        <p>Price with tax: K${product.withTax().toFixed(2)}</p>
        <button class="add-to-cart-btn" data-index="${index}">Add to Cart</button>
      </div>
    `)
    .join("");

  // event listeners have to be attached after the buttons exist in the DOM
  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productIndex = Number(btn.dataset.index);
      addToCart(products[productIndex]);
    });
  });
}

function renderCart() {
  const cart = getCart();

  cartItemsList.innerHTML = cart
    .map(item => `<li>${item.name} - K${item.withTax.toFixed(2)}</li>`)
    .join("");

  const total = cart.reduce((sum, item) => sum + item.withTax, 0);
  cartTotalSpan.textContent = `K${total.toFixed(2)}`;
}

function addToCart(product) {
  const cart = getCart();
  cart.push({ name: product.name, withTax: product.withTax() });
  saveCart(cart);
  renderCart();
}

const clearCartBtn = document.querySelector("#clear-cart-btn");
clearCartBtn.addEventListener("click", () => {
  saveCart([]);
  renderCart();
});

renderProducts();
renderCart();