import './CheckoutPage.css';
import { CheckoutHeader } from './CheckoutHeader';
// import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './paymentSummary';

export function CheckoutPage({ cart, loadCart }){
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary , setPaymentSummary] = useState(null);

    useEffect(()=>{
        const fetchCheckoutData = async()=>{
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);

            response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        }
        fetchCheckoutData();
        // axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
        //     .then((response)=>{
        //         setDeliveryOptions(response.data);
        //     });
        // axios.get('/api/payment-summary')
        //     .then((response)=>{
        //         setPaymentSummary(response.data);    
        //})
    },[cart]);

    return(<>
        <title>Checkout</title>{/* pasting title element at the top will give it a different title from the title in shared html file */}
        <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
        < CheckoutHeader />

        <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
        <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
        </div>
    </>
    );
}