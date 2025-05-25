import { cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOption.js';

export function renderOrderSummary(){
  let cartsummaryHTML = '';

  // const today = dayjs();
  // const deliveryDate = today.add(7, 'days');
  // console.log(deliveryDate.format('dddd, MMMM D'));


  cart.forEach((cartitem) => {

    const productId = cartitem.productId;
    let matchingproduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingproduct = product;
      }
    })
    console.log(matchingproduct);
    const deliveryOptionId = cartitem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    })

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dayString = deliveryDate.format('dddd, MMMM D');
    // const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
    // const isChecked = deliveryOption.id === cartitem. deliveryOptionid;
    cartsummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
              <div class="delivery-date">
                Delivery date:${dayString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingproduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingproduct.name}
                  </div>
                  <div class="product-price">
                  $${formatCurrency(matchingproduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryOptionsHTML(matchingproduct,cartitem)}
                </div>
              </div>
            </div>`;

  });

  function deliveryOptionsHTML(matchingproduct,cartitem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dayString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
      const isChecked = deliveryOption.id === cartitem. deliveryOptionId;
    html += `
    
      <div class="delivery-option js-delivery-option" data-product-id="${matchingproduct.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${isChecked ? 'checked':''} class="delivery-option-input" name="delivery-option-${matchingproduct.id}">
      <div>
      <div class="delivery-option-date">
        ${dayString}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
      </div>
      </div>
      `
      console.log(dayString);
      
    })
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId}=element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
    });
  });
}
// renderOrderSummary();