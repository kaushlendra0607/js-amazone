import './OrdersPage.css';
import { OrderHeader } from './OrderHeader';
import { OrderDetailsGrid } from './OrderdetailsGrid';

export function OrdersGrid({ orders,loadCart }) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">

                        <OrderHeader order={order} />

                        <OrderDetailsGrid order={order} loadCart={loadCart}/>

                    </div>
                );
            })}
        </div>
    );
}