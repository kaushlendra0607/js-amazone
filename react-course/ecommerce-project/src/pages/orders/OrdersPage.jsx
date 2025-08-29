import './OrdersPage.css';
import { Header } from '../../Components/Header';
import { Link } from 'react-router';
import buyagain from "../../assets/images/icons/buy-again.png"
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({cart, loadCart}){
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        const fetchOrdersData = async ()=>{
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data)
        }
        fetchOrdersData();
        // axios.get('/api/orders?expand=products')
        //     .then((response)=>{
        //         setOrders(response.data)
        //         console.log(response.data);
        //     })
    },[])

    return(
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
            <Header cart={cart}/>

            <div className="orders-page">
            <div className="page-title">Your Orders</div>

            <OrdersGrid orders={orders} loadCart={loadCart}/>

            </div>
        </>
    );
}