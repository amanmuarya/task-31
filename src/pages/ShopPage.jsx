import { useState } from "react";
import { SHOES } from "../data/shoes";
import ShoeCard from "../components/ShoeCard";

const ShopPage = () => {
    const [filter, setFilter] = useState("All");
    const categories = ["All", ...new Set(SHOES.map((s) => s.category))];
    const filteredShoes =
        filter === "All" ? SHOES : SHOES.filter((s) => s.category === filter);

    return (
        <div className="page shop-page">
            <div className="page-header">
                <h2>Step Into Style</h2>
                <p>Premium footwear for every occasion</p>
            </div>
            <div className="filter-bar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? "active" : ""}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="shoe-grid">
                {filteredShoes.map((shoe) => (
                    <ShoeCard key={shoe.id} shoe={shoe} />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;