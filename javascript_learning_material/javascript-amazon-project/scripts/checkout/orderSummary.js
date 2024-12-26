
import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js'
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
// a default export, used when you only want to export one thing from a file. doesn't use {}. libraries which use {}are 'named' exports
import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

/* // exports
hello();

const today = dayjs();
const deliveryDate = today.add(7, 'days'); // add 7 days to current date

console.log(deliveryDate.format('dddd, MMMM D'));
*/

// MVC: Model-View-Controller design pattern
// where you update the data, regenerate all the HTML
// Model: saves and manages the data 
// View: takes the data and displays it on the page (generate HTML)
// Controller: runs some code when we interact with the page (event listeners)
// instead of directly updating using the DOM, regenerate data instead
export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity
            js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary 
              js-delete-link 
              js-delete-link-${matchingProduct.id}"
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });


  function deliveryOptionsHTML(matchingProduct, cartItem) {
    //1.loop through the delivery options
    //2.for each option generate html
    //3.combine the html together

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0 ? 'FREE': 
        `$${formatCurrency(deliveryOption.priceCents)}`;
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      // possible to insert turnary operator into html element
      // ${isChecked ? 'checked': ''} // checked is an attribute of radio button
      html += 
      `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked': ''} 
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
      `
    });

    return html;
  }


  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  function updateCheckoutHeader() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-checkout-header').innerHTML = 
  `${cartQuantity} items`;
  }

  updateCheckoutHeader();

  // event listener for delete button
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const selectedProductID = link.dataset.productId;
        
        removeFromCart(selectedProductID);

        const container = document.querySelector(`.js-cart-item-container-${selectedProductID}`);

        container.remove();
        updateCheckoutHeader();
        renderPaymentSummary();
      });

  });

  // event listner for delivery options radio button
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset; // shorthand way of getting data from attribute
        updateDeliveryOption(productId, deliveryOptionId);
        
        renderOrderSummary(); // take the updated data and use recursion to re-run the code
        renderPaymentSummary();
      });
  });
}
