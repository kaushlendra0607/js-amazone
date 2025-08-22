//in object oriented programming we group our data and our function into objects
//oop tries to represent the real world
//use pascal case for object generators called classes like Cart here
function Cart(localStorageKey){//the parameter localStorageKey will be used for saving keys names in localStorage
    const cart = {
    cartItems: undefined,
    loadFromStorage() {//this is shorthand method syntax full code: loadFromStorage: function(){}
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        if (!this.cartItems) {//this indicates towards this object which is cart here
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }
            ];
        }
    },
    saveToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },


    addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    this.saveToStorage();//saveToStorage alone doesnt works without this here
},

    removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;
    this.saveToStorage();
},


    updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
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
const businessCart=Cart('cart-business');

cart.loadFromStorage();



businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

