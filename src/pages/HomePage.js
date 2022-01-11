import Layout from "../Layout/Layout";
import * as data from '../data';
import { useCart, useCartActions } from "../Providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from 'react-toastify';

// function checkInCart(cart, product) {
//     return cart.find((c) => c.id === product.id);
// }

const HomePage = () => {
    const {cart} = useCart();
    const dispatch = useCartActions();

    const addProductHandler = (product) => {
        toast.success(`${product.name} added to cart!`);
        dispatch({type: "ADD_TO_CART", payload: product });
    }

    return (
        <Layout>
            <main className="container">
                <section className="productList">
                    {data.products.map((product) => {
                        return (
                            <section className="product" key={product.id}>
                                <div className="productImg" >
                                    <img src={product.image} alt={product.name}></img>
                                </div>
                                <div className="productDesc" >
                                    <p> {product.name} </p>
                                    <p> $ {product.price} </p>
                                    <button onClick={()=> addProductHandler(product)} className="btn primary">
                                       {checkInCart(cart, product) ? "In Cart" : "Add to cart"}
                                    </button>
                                </div>
                            </section>
                        );
                    })} 
                </section>
            </main>
        </Layout>
    );
}
 
export default HomePage;