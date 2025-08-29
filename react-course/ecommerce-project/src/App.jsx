import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import {Routes,Route} from 'react-router'//for routing we need to put our App in Routes and Route Routes tells react that there are several pages and Route ia basically a page
import './App.css'
import { PageNotFound } from './pages/PageNotFound'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const [cart , setCart] = useState([]);

    const loadCart = async()=>{//comments for async await are in homepage.jsx
        const response = await axios.get('/api/cart-items?expand=product');
        setCart(response.data);
    };
    useEffect(()=>{
     
      loadCart();
      // axios.get('/api/cart-items?expand=product')//the part from and onwards ? is called query parameter gpt for more
      //       .then((response)=>{
      //           setCart(response.data);//we can get data by using .data in axios   
      //       })
    },[]);

  return (
    <Routes>
      <Route index /* path tells the url path of the page only a slash means url is empty which will take us to home page and index does the same thing as path="/"*/ 
      element ={ <HomePage cart={cart} loadCart={loadCart}/>}//element tells react which element(page) to display
      />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>}/>{/* this way the html of index file is shared and now we'll juast have to create the elements and put them here it's called SPA single page application*/}
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart}/>}/>
      <Route path='tracking/:orderId/:productId' element={<TrackingPage cart = {cart}/>}/>
      <Route path='*' element={ <PageNotFound cart={cart} />}></Route>
    </Routes>
  )
}

export default App
