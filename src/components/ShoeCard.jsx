import { useCart } from "../context/useCart";

const ShoeCard = ({ shoe }) => {
    const { addToCart } = useCart();

    return (
        <div className="shoe-card">
            <div className="shoe-image-wrapper">
                <img src={shoe.image} alt={shoe.name} />
                <span className="category-badge">{shoe.category}</span>
            </div>
            <div className="shoe-info">
                <h3>{shoe.name}</h3>
                <div className="shoe-footer">
                    <span className="price">${shoe.price}</span>
                    <button className="btn-add" onClick={() => addToCart(shoe)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoeCard;