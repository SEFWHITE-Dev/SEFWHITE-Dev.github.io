// export lets the var be accessed outside this script, with 'module'
export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) { // if there is no cart saved in local storage, set a default value
    cart =
    [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1',
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2',
      }
    ];
  }
}

// save data locally
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); // local storage can only save strings, so must be converted
}


export function addToCart(selectedProductId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (selectedProductId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  }
  else {
    cart.push({
      productId: selectedProductId,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
}


export function removeFromCart(selectedProductId) {
  // 1.create new array
  // 2.loop through the cart
  // 3.add each product to new array, except for this productID
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== selectedProductId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}


export function updateDeliveryOption(selectedProductId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (selectedProductId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}


// param1: function to be run once loadProducts() has a response from the backend
export function loadCart(func) {
  // create and send a request to the products backend
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    
    // run the function taken in as param1
    func();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}