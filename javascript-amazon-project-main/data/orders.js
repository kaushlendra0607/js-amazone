export const orders = JSON.parse(localStorage.getItem('orders')) || [];

//learn about unshift from gpt, it basically adds an item in front of array
export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}