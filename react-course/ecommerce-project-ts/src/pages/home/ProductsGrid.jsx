
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
                );
            })}
        </div>
    );
}