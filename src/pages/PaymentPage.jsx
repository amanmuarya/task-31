import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

const PaymentPage = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const parts = [];
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substring(i, i + 4));
        }
        return parts.join(" ");
    };

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) return v.substring(0, 2) + "/" + v.substring(2, 4);
        return v;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (cart.length === 0 && !isSuccess) {
        navigate("/cart");
        return null;
    }

    if (isSuccess) {
        return (
            <div className="page success-page">
                <div className="success-icon">✓</div>
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase. Your order has been confirmed.</p>
                <Link to="/" className="btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="page payment-page">
            <h2>Checkout</h2>
            <div className="payment-grid">
                {/* Order Summary */}
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-items">
                        {cart.map((item) => (
                            <div key={item.id} className="summary-item">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-qty">Qty: {item.quantity}</p>
                                </div>
                                <span className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <Link to="/cart" className="back-link">
                        ← Return to Shopping Cart
                    </Link>
                </div>

                {/* Payment Form */}
                <div className="payment-form-wrapper">
                    <div className="form-header">
                        <span>💳</span>
                        <h3>Credit Card Payment</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                value={cardDetails.cardNumber}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cardNumber: formatCardNumber(e.target.value),
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Card Holder Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={cardDetails.cardHolder}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cardHolder: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    value={cardDetails.expiryDate}
                                    onChange={(e) =>
                                        setCardDetails({
                                            ...cardDetails,
                                            expiryDate: formatExpiry(e.target.value),
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input
                                    type="password"
                                    placeholder="123"
                                    maxLength="4"
                                    value={cardDetails.cvv}
                                    onChange={(e) =>
                                        setCardDetails({
                                            ...cardDetails,
                                            cvv: e.target.value.replace(/\D/g, ""),
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn-primary btn-full"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <span className="spinner" />
                                    Processing...
                                </>
                            ) : (
                                `Pay $${totalPrice.toFixed(2)}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;