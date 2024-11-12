import {cart} from "../data/cart.js";
import {products} from "../data/products.js";

function renderProducts(products) {
    let html = '';
  
    products.forEach((product) => {
      html += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}" alt="${product.name}">
          </div>
          
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
          
          <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${Math.floor(product.rating.stars * 10)}.png" alt="Rating: ${product.rating.stars}">
            <div class="product-rating-count link-primary">
              ${product.rating.count} reviews
            </div>
          </div>
          
          <div class="product-price">
            ${(product.priceCents / 100).toFixed(2)}
          </div>
  
          <div class="product-quantity-container">
            <select class="quantity-select">
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
  
          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });
  
    document.querySelector('.products-grid').innerHTML = html;
  }
  
  function addToCart(productId, quantity) {
    const existingProductIndex = cart.findIndex(item => item.productId === productId);
    
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity
      });
    }
  
    updateCartQuantity();
  }
  
  function updateCartQuantity() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-quantity').textContent = totalQuantity;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
  
    document.querySelectorAll('.add-to-cart-button').forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantity = parseInt(button.previousElementSibling.querySelector('.quantity-select').value, 10);
        addToCart(productId, quantity);
  
        console.log(cart);
      });
    });
  });
  