import { products, Clothing, Product } from "./products.js";

//the code below is an example of procedural programming here the instructions(functions) and the data are kept seperate
export let cart;

loadFromStorage();

export function loadFromStorage(){
cart =JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:'1'
},
{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:'2'
}
];
}
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export function addToCart(productId,selectedQuantity=1){
  // console.log(productId,selectedQuantity);
  
  let matchingItem;
    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem=cartItem;
      }
    });
    if(matchingItem){
      matchingItem.quantity+=selectedQuantity;
    }else{
      cart.push({
        productId:productId,
        quantity:selectedQuantity,
        deliveryOptionId:'1'
       });
    }
    saveToStorage()
}

export function removeFromCart(productId){
  const newCart =[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart =newCart;
  saveToStorage()
}

export function updateDeliveryOption(productId,deliveryOptionId){
   let matchingItem;
    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem=cartItem;
      }
    });
    matchingItem.deliveryOptionId=deliveryOptionId;
    saveToStorage();
}

export function calcQty() {
  let cartquantity = 0;
  cart.forEach((item) => {
    cartquantity += item.quantity;
  });

  document.querySelectorAll('.showing-qty').forEach((elem)=>{
     if (elem) {
      elem.innerHTML = cartquantity;
  }
  });
}

export function updateQuantity(productId,newQuantity){
  cart.forEach((elem)=>{
    if(elem.productId===productId){
      elem.quantity=newQuantity;
    }
    
  });
  saveToStorage();
}


export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
      console.log(xhr.response);
      fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
calcQty();
