import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import {Routes,Route} from 'react-router'//for routing we need to put our App in Routes and Route Routes tells react that there are several pages and Route ia basically a page
import './App.css'
import { PageNotFound } from './pages/PageNotFound'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const [cart , setCart] = useState([]);
    useEffect(()=>{
      axios.get('/api/cart-items')
            .then((response)=>{
                setCart(response.data);//we can get data by using .data in axios   
            })
    },[])

  return (
    <Routes>
      <Route index /* path tells the url path of the page only a slash means url is empty which will take us to home page and index does the same thing as path="/"*/ 
      element ={ <HomePage cart={cart}/>}//element tells react which element(page) to display
      />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>{/* this way the html of index file is shared and now we'll juast have to create the elements and put them here it's called SPA single page application*/}
      <Route path="orders" element={<OrdersPage cart={cart}/>}/>
      <Route path='tracking' element={<>{TrackingPage()}</>}/>
      <Route path='*' element={<PageNotFound/>}></Route>
    </Routes>
  )
}

export default App
