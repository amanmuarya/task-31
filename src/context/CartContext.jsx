import { createContext, useReducer, useState } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        case "UPDATE_QUANTITY":
            return {
                ...state,
                items: state.items
                    .map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
                            : item
                    )
                    .filter((item) => item.quantity > 0),
            };
        case "CLEAR_CART":
            return { ...state, items: [] };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    const [notification, setNotification] = useState(null);

    const addToCart = (shoe) => {
        dispatch({ type: "ADD_ITEM", payload: shoe });
        setNotification(`Added ${shoe.name} to cart!`);
        setTimeout(() => setNotification(null), 2000);
    };

    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart: state.items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
            {notification && (
                <div className="toast-notification">{notification}</div>
            )}
        </CartContext.Provider>
    )
};

