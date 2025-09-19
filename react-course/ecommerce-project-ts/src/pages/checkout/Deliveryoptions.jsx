import dayjs from "dayjs";
import axios from 'axios';
import { formatMoney } from "../../utils/money";


export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                let priceString = 'FREE Shipping';
                if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)}-Shipping`
                }
                const updateDeliveryOption = async()=>{//here we'll update the delevry options when we change them
                    await axios.put(`/api/cart-items/${cartItem.productId}`,{//we use put for updation
                        deliveryOptionId:deliveryOption.id
                    });
                    await loadCart();
                };
                return (
                    <div key={deliveryOption.id} className="delivery-option"
                        onClick={updateDeliveryOption}
                    >
                        <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId}
                            onChange={()=>{}}//we're providing o change here just to avoid the default error in react everything will still work fine without it
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <div className="delivery-option-price">
                                {priceString}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}