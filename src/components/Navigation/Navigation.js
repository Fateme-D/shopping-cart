import {NavLink} from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';
import { useCart } from '../../Providers/CartProvider';
import "./Navigation.css"


const Navigation = () => {
    const userData = useAuth();
    const {cart} = useCart();
    return (
        <header className="mainNavigation">
            <nav>
                <ul>
                    <div>logo shopping</div>
                    <li>
                        <NavLink to="/" activeClassName="activeLink" exact> home</NavLink>
                    </li>
                </ul>
                <ul>
                    <li className='cartLink'>
                        <NavLink to="/cart" activeClassName="activeLink" >
                            cart
                        </NavLink>
                        <span>{cart.length} </span>
                    </li>
                    <li>
                        <NavLink to={userData ? "/profile" : "/login"} activeClassName='activeLink'>
                            {userData ? "profile" : "login / signup"}
                        </NavLink>
                    </li>
                </ul>
                
            </nav>
        </header>
    );
};
 
export default Navigation;