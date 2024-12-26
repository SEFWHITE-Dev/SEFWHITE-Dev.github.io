import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";

// Integration test: testing a whole page; many units/pieces of code working together
// 1. how the page looks
// 2. how the page behaves


describe('test suite: renderOrderSummary', () => {

  let localStorageMock;

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // Hooks: lets us run some code for each test
  // param1: done() is a Jasmine function 
  // the code will only go onto the next step when we call done()
  // otherwise beforeAll will wait indefinately
  // done() lets us control when to go on to the next step
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  
  // beforeEach() hook lets us run the code within it before each test
  beforeEach(() => {
    // Set up the required DOM structure for the test
    // generate HTML on the test page div, so that we have the element needed to renderOrderSUmmary
    const testContainer = document.querySelector('.js-test-container');
    testContainer.innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
    `;

    // Create a mock localStorage
    localStorageMock = {
      getItem: jasmine.createSpy('getItem').and.callFake(() =>
        JSON.stringify([
          {
            productId: productId1,
            quantity: 2,
            deliveryOptionId: '1',
          },
          {
            productId: productId2,
            quantity: 1,
            deliveryOptionId: '2',
          },
        ])
      ),
      setItem: jasmine.createSpy('setItem'),
    };

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Load the cart data
    loadFromStorage();

    renderOrderSummary();
  });



  it('displays the cart items and updates the header', () => {
    // Check the order summary is populated
    const orderSummaryContainer = document.querySelector('.js-order-summary');
    expect(orderSummaryContainer).not.toBeNull();
    expect(orderSummaryContainer.children.length).toBeGreaterThan(0); // Ensure items are rendered

    // Check the checkout header is updated
    const checkoutHeader = document.querySelector('.js-checkout-header');
    expect(checkoutHeader.textContent).toContain('3 items'); // 2 + 1 from mock data
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2); // check if there are 2 elements on the page
    // check if the element contains a string, in order to check for a specific value, use toContain()
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText)
      .toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText)
    .toContain('Quantity: 1');
  });


  it('removes a product', () => {
    // test the delete button
    document.querySelector(`.js-delete-link-${productId1}`).click(); // use the click() method to click the button element
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1); // check if cart has been updated
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null); // check if product has been removed
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null); // check if product still remains
    // check after deleting, is the cart array updated
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  
  afterEach(() => {
    // Clear the test DOM to avoid interference between tests
    document.querySelector('.js-test-container').innerHTML = '';
  });
});