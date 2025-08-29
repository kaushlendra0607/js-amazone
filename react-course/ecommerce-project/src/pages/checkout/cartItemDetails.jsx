import { Fragment, useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";


export function CartItemDetails({ cartItem, loadCart }) {
    const [quantity,setQuantity] = useState(cartItem.quantity);
    const [isTracked,setIsTracked] = useState(false);
    function inputQuantity(e){
        setQuantity(e.target.value);
    }
    const deleteCartItem = async()=>{
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };
    return (
        <Fragment key={cartItem.productId}>
            <img className="product-image" src={cartItem.product.image} />
            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <input type="text" onChange={inputQuantity} value={quantity} style={{width:'50px',display:isTracked?"inline-block":"none"}}/>
                    <span>
                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={async ()=>{
                            if(isTracked){
                                await axios.put(`/api/cart-items/${cartItem.productId}`, {
                                quantity: Number(quantity),
                            });
                            await loadCart();
                            setIsTracked(false);
                            }else{
                                 setIsTracked(true);
                            }
                        }}
                    >
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                     onClick={deleteCartItem}
                    >
                        Delete
                    </span>
                </div>
            </div>
        </Fragment>
    );
} 