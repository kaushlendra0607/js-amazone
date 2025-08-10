import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
    {
        id:'1',
        deliveryDays:7,
        priceCents:0
    },
    {
        id:'2',
        deliveryDays:3,
        priceCents:499
    },
    {
        id:'3',
        deliveryDays:1,
        priceCents:999
    },
   
]

export function getDeliveryOption(deliveryOptionId){
     let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });
    return deliveryOption || deliveryOptions[0];
}

export function calcDeliveryDate(deliveryOption){
    const today = dayjs();
    const daysToAdd = deliveryOption.deliveryDays;
    const deliveryDate = today.add(daysToAdd, 'days');
    const dayString = deliveryDate.format('dddd');
    if(dayString=='Saturday'){
        const deliveryDate = today.add(daysToAdd+2, 'days');
        const dateString = deliveryDate.format('dddd, MM D');
        return(dateString);
    }
    if(dayString=='Sunday'){
        const deliveryDate = today.add(daysToAdd+1, 'days');
        const dateString = deliveryDate.format('dddd, MM D');
        return(dateString);
    }
    else{
        const deliveryDate = today.add(daysToAdd, 'days');
        const dateString = deliveryDate.format('dddd, MM D');
        return dateString;
    }
}
