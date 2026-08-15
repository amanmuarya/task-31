import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

const Navbar = () => {
    const { totalItems } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/")}>
                <span>👟</span>
                <h1>SoleStyle</h1>
            </div>
            <div className="nav-links">
                <Link to="/">Shop</Link>
                <Link to="/cart" className="cart-link">
                    Cart
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;