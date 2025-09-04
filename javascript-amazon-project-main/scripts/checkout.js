import { renderOrderSummary } from "./checkout/ordersummary.js";
// import { renderPaymentSummary } from "./checkout/paymentsummary";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

//async makes a function return a promise and it lets us use await
//await waits for a promise to finish or simply it lets us run asynch code like normal code without using then
//we can only use await when we're inside async and the closest funcn shold be async
//try catch is very usefull it can be used with asynch or normal code as well
//but try ctach is meant to controll unexpected errors which means our code is correct and error is outside our controll
//when an error occurs inside try it skips rest of code below the line where error occured and goes to catch straight
//we can manually create errors using throw which will be caught by catch
//reject is another way to create error in promises and it creates errors in future like when backend is gonna load etc gpt for more
async function loadPage(){
    try{
        // throw 'error1';
         await loadProductsFetch();//Promise is a built in class
         //promises are better way to handle asynchronous code they also allow to do multiple things at the same time
    const value = await new Promise((resolve,reject) => {//resolve and reject are provided by promise which let us controll the flow of codes gpt for more
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