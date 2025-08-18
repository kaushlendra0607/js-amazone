import { Header } from '../Components/Header';
import axios from 'axios'
import { products } from "../../starting-code/data/products"
import './HomePage.css';
import checkmark from "../assets/images/icons/checkmark.png"

export function HomePage() {
    axios.get("http://localhost:3000/api/products")//fetch is actually asynchrounous thats why we have used then() here
        .then((response)=>{
            console.log(response.data);//but we're using axios not fetch now
        })
        // .then((response)=>{
        //     return response.json();//this is also asynchronous
        // }).then((data)=>{console.log(data)//this is for response being asynchronous, we can also use it inside right beside response.json() without return it will work same way
        // });
    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />{/* if we give a file name directly to href then vite will automatically search for the file in public folder */}
            <Header />
            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <div key={product.id} className="product-container">
                                <div className="product-image-container">
                                    <img className="product-image"
                                        src={product.image} />
                                </div>

                                <div className="product-name limit-text-to-2-lines">
                                    {product.name}
                                </div>

                                <div className="product-rating-container">
                                    <img className="product-rating-stars"
                                        src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                    <div className="product-rating-count link-primary">
                                        {product.rating.count}
                                    </div>
                                </div>

                                <div className="product-price">
                                    ${(product.priceCents * 0.01 ).toFixed(2)}
                                </div>

                                <div className="product-quantity-container">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <div className="product-spacer"></div>

                                <div className="added-to-cart">
                                    <img src={checkmark} />
                                    Added
                                </div>

                                <button className="add-to-cart-button button-primary">
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}