import { renderOrderSummary } from '../../scripts/checkout/ordersummary.js';
import { loadFromStorage, cart} from '../../data/cart.js';
//we should create two types of test cases one for normal data other for edge cases
import { loadProducts ,loadProductsFetch} from '../../data/products.js';
//testing a function like renderOrderSummary tests several other functions which are used in it these are called integration test
//renderOrderSummary creates a part of the page so we have to test two things that how the page looks and how the page behaves
//describe and it together create a test describe creates a suite and it creates some test cases
describe('test suite:renderOrderSummary', () => {

        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeAll((done)=>{//beforeAll lets us run run some code before all of our tests and it provides a funcn usually called done which controlls exactly when our code finishes and we go for our tests
        loadProductsFetch().then(()=>{//we're taking a funcn done here so that we load our code sfter loading of products
            done();
        });
    })
    beforeEach(()=>{//beforEach lets us write some code and share it where it will be needed so we dont have to rewrite it
        spyOn(localStorage,'setItem');
        //to test that how the page looks there should be html on the page
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;
       
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(
                [{
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }
                ]
            );
        });

        loadFromStorage();
        renderOrderSummary();
    })
    it('displays the cart', () => {
        //here we're checking that if there are two elements which are in mocked cart are rendered on the page
        //and if they are rendered then there will be two elements in node provided by querySelectorAll
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
        //  document.querySelector('.js-test-container').innerHTML = '';
    });
    it('it removes a product', () => {
        //first we'll click delete on first product and then test it
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        
    });
    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = '';//cleanup code usually put in afterEach
    });//after all the tests are complete we dont want any html on our test page
});