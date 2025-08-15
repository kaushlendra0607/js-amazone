import { Link } from 'react-router';
import './CheckoutHeader.css'

export function CheckoutHeader(){
    return(
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                    <Link to="/">{/* inside href here we should put the path or name of path we provided in Route element in homepage.jsx */}
                        <img className="logo" src="images/logo.png" />
                        <img className="mobile-logo" src="images/mobile-logo.png" />
                    </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link"
                        to="/">3 items</Link>)
                    </div>

                    <div className="checkout-header-right-section">
                    <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>
        </>
    );
}