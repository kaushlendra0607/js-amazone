import { renderOrderSummary } from "./checkout/ordersummary.js";
// import { renderPaymentSummary } from "./checkout/paymentsummary";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage(){
    try{
        // throw 'error1';
         await loadProductsFetch();
    const value = await new Promise((resolve,reject) => {
        // throw 'error2';
        loadCart(() => {
            // reject('error3');
            resolve();
        })
    });
    } catch(error){
        console.log('some error');
        
        
    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();


/*
Promise.all([
   loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
]).then((values)=>{
    console.log(values);
    
    renderOrderSummary();
    renderPaymentSummary();
});
*/


/*
new Promise((resolve) => {
    console.log('start promise');

    loadProducts(() => {
        console.log('finished loading');

        resolve('value1');
    });
}).then((value) => {
    console.log(value);

    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})*/
/*
loadProducts(()=>{
    loadCart(()=>{
         renderOrderSummary();
        renderPaymentSummary();
    });
});*/