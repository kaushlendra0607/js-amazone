
import { Product } from "./Product";

export function ProductsGrid({ products,loadCart }) {
    //const [quantity, setQuantity] = useState(1);//when we are usong state here then it will be shared with all the lements created by map below
    // so we should actually put it inside the scope of return or map(do gpt for this info) but the problem is that it breaks the rule that state should be used on top(do gpt for this as well)
    //so we'll create a Product.jsx file separately so that each quantity is unique for each product 
    
    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Product key={product.id} product={product} loadCart={loadCart}/>
                    // <div key={product.id} className="product-container">
                    //     <div className="product-image-container">
                    //         <img className="product-image"
                    //             src={product.image} />
                    //     </div>

                    //     <div className="product-name limit-text-to-2-lines">
                    //         {product.name}
                    //     </div>

                    //     <div className="product-rating-container">
                    //         <img className="product-rating-stars"
                    //             src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                    //         <div className="product-rating-count link-primary">
                    //             {product.rating.count}
                    //         </div>
                    //     </div>

                    //     <div className="product-price">
                    //         {formatMoney(product.priceCents)}
                    //     </div>

                    //     <div className="product-quantity-container">
                    //         <select value={quantity} onChange={(event)=>{
                    //             const quantitySelected = Number(event.target.value);
                    //             setQuantity(quantitySelected);
                    //             console.log(quantity,quantitySelected);
                                
                    //         }}>
                    //             <option value="1">1</option>
                    //             <option value="2">2</option>
                    //             <option value="3">3</option>
                    //             <option value="4">4</option>
                    //             <option value="5">5</option>
                    //             <option value="6">6</option>
                    //             <option value="7">7</option>
                    //             <option value="8">8</option>
                    //             <option value="9">9</option>
                    //             <option value="10">10</option>
                    //         </select>
                    //     </div>

                    //     <div className="product-spacer"></div>

                    //     <div className="added-to-cart">
                    //         <img src={checkmark} />
                    //         Added
                    //     </div>

                    //     <button className="add-to-cart-button button-primary"
                    //         onClick={async ()=>{//using post request we can create data in the backend
                    //             await axios.post('/api/cart-items',{
                    //                 productId:product.id,
                    //                 quantity:1
                    //             });
                    //             await loadCart();
                    //         }}
                    //     >
                    //         Add to Cart
                    //     </button>
                    // </div>
                );
            })}
        </div>
    );
}