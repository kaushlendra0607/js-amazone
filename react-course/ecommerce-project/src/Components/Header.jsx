import { Link, NavLink } from 'react-router';//the <a> tag of html reloads by default but when we're creating ab SPA we dont need to reload For this React gives us Link Element
import './header.css'//Link element lets us go to another page without reloading
//NavLink is used generally for navigation links like the links in header of a page The additional Feature it has is that it knows which website is being loaded unlike Link It adds a specific class to the active link for more use gpt
export function Header() {//Link doesnt uses href it uses to
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo"
                            src="images/logo-white.png" />
                        <img className="mobile-logo"
                            src="images/mobile-logo-white.png" />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" />

                    <button className="search-button">
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">

                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">3</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    );
}