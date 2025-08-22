//classes are object generators like the function in cart-oop.js
//by usning class instead of function we get lot of more features of js
//in classes we dont use comma for separation but can use ;
//a class isnt exactly a function

class Cart {
    cartItems;//shorthand for cartItems = undefined;
    #localStorageKey;//# sign is used to make this variable private which means it can only be used in this class only gpt for more

    constructor(localStorageKey) {//constructors are the best way to assign values to keywords of objects in classes
        this.#localStorageKey = localStorageKey;//a constructor should not return anything
        this.#loadFromStorage();//this points towards the object being generated
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if (!this.cartItems) {
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
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

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
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

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

}


//for classes we usually use new
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
//we can simply pass the argument by doing
//cart.localStorageKey = 'cart-oop';but not a good practice as it should be kept private bcz probably one can use it and change the localStorage key
//but this way well have to explicitely call the function like but using constructor we can share it for both or as much objects we want to generate
//cart.loadFromStorage(); A constructor lets us put all this setup code in inside the class and it runs that particular code automatically while getnerating objects in the class


//an object geneated by a class is called an instance of a class
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);//it will check if businessCart object was generated from class Cart.
//means above will check if buisnessCart is an instance of class Cart
