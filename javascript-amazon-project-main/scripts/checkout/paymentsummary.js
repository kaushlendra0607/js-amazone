import { cart, calcQty } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1
  const totalCents = totalBeforeTaxCents + taxCents;
  const paymentSummaryHTML = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (<span class="showing-qty">5</span>):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary
           js-place-order">
            Place your order
          </button>
    `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {//header gives the backend more info about our request
          'Content-Type': 'application/json'
        },//actual data which is to be sent to backend is inside body
        //we cant send an object directly to the backend we need to stringify it
        body: JSON.stringify({
          cart: cart
        })
      });
      //json is also a promise so we have to wait to finish and we can also save it in a variable
      const order = await response.json();
      addOrder(order);
    } catch (error) {
        console.log('Unexpected Error');
        
    }
    //this line(below) will change the url of the page gpt for more accurate info
    window.location.href = 'orders.html';

  });
  calcQty();
}