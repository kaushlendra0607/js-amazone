import { cart, removeFromCart, updateDeliveryOption, calcQty, updateQuantity } from '../../data/cart.js';
import { products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption, calcDeliveryDate } from '../../data/deliveryOptions.js';

import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
  let cartsummaryHTML = '';

  // const today = dayjs();
  // const deliveryDate = today.add(7, 'days');
  // console.log(deliveryDate.format('dddd, MMMM D'));


  cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    // console.log(matchingProduct);
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption=getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    // const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
    // const isChecked = deliveryOption.id === cartItem. deliveryOptionid;
    cartsummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date:${calcDeliveryDate(deliveryOption)}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                  ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span class="quantity">
                      Quantity: <span class="quantity-label js-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" 
                      data-product-id="${matchingProduct.id}" 
                    >
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number">
                    <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}" >Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link-${matchingProduct.id} js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
              </div>
            </div>`;

  });

  function deliveryOptionsHTML(matchingProduct,cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
      const isChecked = deliveryOption.id === cartItem. deliveryOptionId;
    html += `
    
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${isChecked ? 'checked':''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
      <div>
      <div class="delivery-option-date">
        ${calcDeliveryDate(deliveryOption)}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
      </div>
      </div>
      `
      // console.log(dayString);
      
    })
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;

  document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const {productId} = link.dataset;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.save-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const {productId} = link.dataset;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      const inputBox = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(inputBox.value);
      updateQuantity(productId,newQuantity);
      document.querySelector(`.js-quantity-${productId}`).innerHTML=newQuantity;
      calcQty();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      renderPaymentSummary();
      calcQty();
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId}=element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
// renderOrderSummary();