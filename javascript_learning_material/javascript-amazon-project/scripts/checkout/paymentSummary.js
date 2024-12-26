import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js"
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary() {
  // 1. loop through the cart
  // 2. price x quantity for each product
  // 3. add everything together

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  let totalItems = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

    totalItems += 1;
  });


  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalItems}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
    js-place-order-button">
      Place your order
    </button>
`;

// Update Payment Summary
document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

// Place Order Button
// use async for await
document.querySelector('.js-place-order-button').addEventListener('click', async () => {
  // when we click the button, make a request to the backend to create the order
  // since we need to send data (cart) in our request, we need to use a different type of request
  // GET: get something from the backend
  // POST: create something on the backend / send something to the backend
  // PUT: update something on the backend
  // DELETE: delete something from the backend
  // when making a POST request, we give an object in param2
  // waits for fetch to finish
  try {
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST', 
      headers: { // headers gives the backend more informaiton about our request
        // tells the backend what type of data we are sending in our request
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // convert JS object into JSON string
        cart: cart
      })
    });

    // to get the data attatched to the response, we need to use .json()
    // response.json() is also a Promise, so 'await' can be used
    const order = await response.json(); // the order that was created by the backend
    addOrder(order);

  } catch(error) {
    console.log('Error retreiving cart');
  }

  // window.location.href gives us the URL of the current webpage
  window.location.href = 'orders.html'; // change the file path

});

}