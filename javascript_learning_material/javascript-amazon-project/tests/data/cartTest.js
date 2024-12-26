import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

// Test coverage: how much of the code is being testsed
// the best practice of testing is to always test each condition of the test
// Unit Test: testing one piece of the code
// Integration test: testing a whole page; many units/pieces of code working together

describe('test suite: add to cart', () => {

  // Jasmine spyOn() only works with functions that exist as properties of an object
  // in modern environments, localStorage methods are not directly enumerable or modifiable
  // due to security concerns, so spy may not work
  
  // Mock localStorage manually
  let localStorageMock;

  // ensures that the mocked localStorage is reset before each test to prevent interference between tets
  beforeEach(() => {
    // Create a mock localStorage
    localStorageMock = {
      getItem: jasmine.createSpy('getItem').and.callFake(() => JSON.stringify([])),
      setItem: jasmine.createSpy('setItem'),
    };

    // Replace the global localStorage with the mock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });


  it('adds an existing product to cart', () => {

    localStorageMock = {
      getItem: jasmine.createSpy('getItem').and.callFake(() => JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1',
      }])),
      setItem: jasmine.createSpy('setItem'),
    };

    // Replace the global localStorage with the mock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    loadFromStorage();
    console.log(localStorage.getItem('cart'));
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
    expect(cart.length).toEqual(1);
   
    // because you can't access a mocked localStorage, we can check if it was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    
  });


  it('adds a new product to cart', () => {
/*
    // check if the cart.length is correct
    // if we start with an empty cart, when we add a product the cart length should be 1
    // the test fails stating the length is 2, this is because the cart is not 0 by default
    // but it can potentially pass if the local storage is cleared.
    // this is known as a 'Flaky Test'   

    // Mocks: lets us replace a method with a fake version
    // spyOn(): gives us an object
    // param1: the object we want to mock, in this case local storage
    // param2: a string of the method we want to mock
    spyOn(localStorage, 'setItem'); // spyOn records every time a method is used

    spyOn(localStorage, 'getItem').and.callFake(() => {
      // we ant getItem to return an empty array for this test
      // local storage only supports strings, so needs to be converted to JSON string
      return JSON.stringify([]);
    });
*/
    console.log(localStorage.getItem('cart'));
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
    expect(cart.length).toEqual(1);
   
    // because you can't access a mocked localStorage, we can check if it was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});