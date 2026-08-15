import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
        useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="page empty-cart">
                <div className="empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any shoes yet.</p>
                <Link to="/" className="btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="page cart-page">
            <h2>Shopping Cart ({totalItems} items)</h2>
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                            <h4>{item.name}</h4>
                            <p className="item-price">${item.price}</p>
                        </div>
                        <div className="qty-controls">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                −
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                +
                            </button>
                        </div>
                        <button
                            className="btn-remove"
                            onClick={() => removeFromCart(item.id)}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span className="total-price">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                    className="btn-primary btn-full"
                    onClick={() => navigate("/payment")}
                >
                    Proceed to Payment →
                </button>
                <Link to="/" className="back-link">
                    ← Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default CartPage;