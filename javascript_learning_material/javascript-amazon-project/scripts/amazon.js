/*
// array object data structure to represent each product
const products =[
  {
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
  },
  {
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
      stars: 4.0,
      count: 127
    },
    priceCents: 2095,
  },
  {
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
  },
  {
    image: 'images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster - Black ',
    rating: {
      stars: 5.0,
      count: 2197
    },
    priceCents: 1899,
  }
];
*/


// import the 'cart' var from cart.js
//import { cart as myCart } from '../data/cart.js'; // it is possible to rename the imported variable name; 
import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { loadProducts } from '../data/products.js';

/* another syntax for import: import * as...
 this imports everything from a file and groups it inside the declared object
 we can access each member property or method

import * as cartModule from '../data/cart.js';
cartModule.cart;
cartModule.addToCart('id');
*/

// there can only be one of every var name, 
// so if another JS files uses the same var name it will cause naming conflicts
//const cart = []; 

// loadProducts() will send a request to the backend, but it takes time for a response
// returns empty 
loadProducts(renderProductsGrid);

// Callback: a function to run in the future
function renderProductsGrid() {

  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
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

            <!-- Polymorphism: use a mthod without knowing the class type -->
            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary
            js-add-to-cart-button"
            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
    `;
  });

  // a data attribute is just a HTML attribute. it allows you to attach any data to an element
  // they must start with 'data-'
  // then give it any name. e.g. data-product-name
  // the product's 'name' is attatched to the 'button' attribute it resides in
  // the kebab-case naming is automatically converted to camel-case when used in JS code

  //console.log(productsHTML);

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      // the dataset property gives us all of the 'data' attributes attatched to the element
      const selectedProductId = button.dataset.productId; // product-name => productName the name is automatically converted

      addToCart(selectedProductId);
      updateCartQuantity();
    });
  });
}