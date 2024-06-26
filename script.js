// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	const cart = getCart();
    cartList.innerHTML = '';
    cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
    cartList.appendChild(li);
  });
	const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      removeFromCart(button.getAttribute('data-id'));
    });
  });
}

// Add item to cart
function addToCart(productId) {
	 const cart = getCart();
     const product = products.find(p => p.id == productId);
     if (product) {
       cart.push(product);
       sessionStorage.setItem('cart', JSON.stringify(cart));
       renderCart();
     } else {
     console.error('Product not found', productId);
  }
}

// Remove item from cart
function removeFromCart(productId) {
	  let cart = getCart();
  cart.splice(index, 1);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  renderCart();

}

// Clear cart
function clearCart() {
	sessionStorage.removeItem('cart');
  renderCart();
}
function getCart() {
  return JSON.parse(sessionStorage.getItem('cart')) || [];
}
// Initial render
renderProducts();
renderCart();
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    addToCart(button.getAttribute('data-id'));
  });
});

// Add event listener to clear cart button
clearCartButton.addEventListener('click', clearCart);
