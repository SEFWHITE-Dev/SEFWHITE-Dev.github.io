
// OOP: organize our code into onjects, which contains the values, methods

// create a function that generates objects
function Cart(localStorageKey) {

  const cart = {
    cartItems: undefined,
  
    // 'this' gives us the outer object that contains this function
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if (!this.cartItems) { // if there is no cart saved in local storage, set a default value
        this.cartItems =
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
    },
  
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems)); // local storage can only save strings, so must be converted
    },
  
  
    addToCart(selectedProductId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (selectedProductId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity += 1;
      }
      else {
        this.cartItems.push({
          productId: selectedProductId,
          quantity: 1,
          deliveryOptionId: '1',
        });
      }
    
      this.saveToStorage();
    },
  
  
    removeFromCart(selectedProductId) {
      // 1.create new array
      // 2.loop through the cart
      // 3.add each product to new array, except for this productID
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== selectedProductId) {
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
    
      this.saveToStorage();
    },
  
  
    updateDeliveryOption(selectedProductId, deliveryOptionId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (selectedProductId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    }
    
  };

  return cart;
}

const cart = Cart('cart-oop');
const cartBusiness = Cart('cart-business');

cart.loadFromStorage();
cartBusiness.loadFromStorage();

console.log(cart);
console.log(cartBusiness);
