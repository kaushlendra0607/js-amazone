import './tracking.css'
import { Header } from '../Components/Header';
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
// import { OrdersPage } from './orders/OrdersPage';

export function TrackingPage({ cart }){
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);
    useEffect(()=>{
        const fetchTrackingData = async ()=>{
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }
        fetchTrackingData();
    },[orderId]);
    if(!order){
        return null;
    }

    const orderProduct = order.products.find((orderProduct)=>{
        return orderProduct.productId === productId;
    });
    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs-order.orderTimeMs;
    const timePassedMs = dayjs().valueOf()-order.orderTimeMs;
    let percentageProgressTime = timePassedMs/totalDeliveryTimeMs * 100;
    if (percentageProgressTime>100){
        percentageProgressTime = 100;
    }
    let isPreparing;
    let isShipped;
    let isDelivered;
    let status;
    if (percentageProgressTime<33){
        // isPreparing=percentageProgressTime;
        status="preparing"
    }else if (percentageProgressTime >= 33 && percentageProgressTime < 100) {
        // isShipped=percentageProgressTime;
        status = "shipped"
    } else {
        // isDelivered=percentageProgressTime;
        status = "delivered"
    }
    console.log({
  percentageProgressTime,
  status
});
    return(<>
        <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
        <Header cart={cart}/>

        <div className="tracking-page">
        <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
            </Link>

            <div className="delivery-date">
            {percentageProgressTime===100 ? 'Delivered On':'Arriving on'}  {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="product-info">
            {orderProduct.product.name}
            </div>

            <div className="product-info">
            Quantity: {orderProduct.quantity}
            </div>

            <img className="product-image" src={orderProduct.product.image} />

            <div className="progress-labels-container">
            <div className={`progress-label ${status === "preparing" ? "current-status" : ""}`}>
                Preparing
            </div>
            <div className={`progress-label ${status === "shipped" ? "current-status" : ""}`}>
                Shipped
            </div>
            <div className={`progress-label ${status === "delivered" ? "current-status" : ""}`}>
                Delivered
            </div>
            </div>

            <div className="progress-bar-container">
            <div className="progress-bar" style={{width:`${percentageProgressTime}%`}}></div>
            </div>
        </div>
        </div>
    </>
    );
}