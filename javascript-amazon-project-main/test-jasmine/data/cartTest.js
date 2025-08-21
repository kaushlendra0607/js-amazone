import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

//the addToCart test is a flaky test which sometimes pass and sometimes fails even if we dont change the code
//it happens bcz it depends on local storage in real code file and local storage can change
//to fix this we create mocks which help us to replace a method with a fake version using spyon
//spyOn spies on the methods we give it and it gives us an object which has some more methods like .and then it gives us some more methods like callFake
//by callFake we'll actually overwrite and sort of create a copy of original parameter here getitem of localStorage
//this copy will not change and hence it will pass always if its correct
//the order (flow) of the code matters first we import then copy then run code for test

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage,'setItem');//we're mocking setItem od local storage bcz this is a test and we dont want it to affect our real code
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{//imp --- mock lasts for one test
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',//we give it a product here
                quantity:1,
                deliveryOptionId:'1'
            }]);
        });
        
        loadFromStorage();//we load the cart from storage
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');//then we add this existing product to cart existing in mocked localstorage above
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);//another object provided by expect only runs when argument of expect is mocked and here we expect setItem to be called one time for addToCart right above
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);//then we test all these things like quantity length etc
    });
    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});