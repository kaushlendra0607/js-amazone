import { Link, NavLink, useNavigate, useSearchParams } from 'react-router';//the <a> tag of html reloads by default but when we're creating ab SPA we dont need to reload For this React gives us Link Element
import logowhite from "../assets/images/logo-white.png"//for router functions to work they need to be inside a route and in case of these our entire app is in browserRouter while final rendering in main jsx
import carticon from "../assets/images/icons/cart-icon.png"
import searchicon from "../assets/images/icons/search-icon.png"
import './header.css'//Link element lets us go to another page without reloading
import { useState } from 'react';
//NavLink is used generally for navigation links like the links in header of a page The additional Feature it has is that it knows which website is being loaded unlike Link It adds a specific class to the active link for more use gpt
export function Header({ cart = [] } = {}) {//Link doesnt uses href it uses to
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');
    const [search, setSearch] = useState(searchText || null);
    function searchBar(event){
        setSearch(event.target.value);
    };
    const searchProduct = ()=>{
        navigate(`/?search=${search}`);
    }
    let totalQuantity = 0;
    cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity;
    });
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo"
                            src={logowhite} />
                        <img className="mobile-logo"
                            src={logowhite} />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input className="search-bar" value={search} onChange={searchBar} type="text" placeholder="Search" />

                    <button className="search-button" onClick={searchProduct}>
                        <img className="search-icon" src={searchicon} />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">

                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src={carticon} />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    );
}