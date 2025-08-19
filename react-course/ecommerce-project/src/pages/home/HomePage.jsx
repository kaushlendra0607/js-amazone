import { Header } from '../../Components/Header';
import axios from 'axios'
// import { products } from "../../starting-code/data/products"
import './HomePage.css';
// import checkmark from "../assets/images/icons/checkmark.png"
import { useEffect, useState } from 'react';
// import { formatMoney } from '../../utils/money';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({cart}) {
    const [products , setProducts] = useState([]);
    useEffect(()=>{
        axios.get("/api/products")//fetch is actually asynchrounous thats why we have used then() here
            .then((response)=>{
                setProducts(response.data);//but we're using axios not fetch now
            });
        
    },[]) 
    
        // .then((response)=>{
        //     return response.json();//this is also asynchronous
        // }).then((data)=>{console.log(data)//this is for response being asynchronous, we can also use it inside right beside response.json() without return it will work same way
        // });
    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />{/* if we give a file name directly to href then vite will automatically search for the file in public folder */}
            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products}/>
            </div>
        </>
    );
}