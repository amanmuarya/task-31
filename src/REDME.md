# SoleStyle - Online Shoe Store with Payment

A modern, responsive online shoe store built with **React** and **Context API** for state management. Features a full shopping cart flow including a credit card payment page.

---

## Features

- Browse shoes by category (Running, Casual, Basketball)
- Add/remove items from cart with quantity controls
- **Context API** manages cart state globally across all components
- "Proceed to Payment" button redirects to secure checkout
- **Payment Page** displays live cart summary (pulled from Context)
- Credit card form with auto-formatting (card number, expiry date)
- Return to cart link for last-minute edits before payment
- Simulated payment processing with success confirmation
- Toast notifications for cart actions
- Fully responsive design

---

## Tech Stack

| Technology | Purpose |

| React | UI library |
| React Router DOM | Client-side routing (`/`, `/cart`, `/payment`) |
| Context API + useReducer | Global state management for cart |
| CSS3 | Styling (no external UI library) |
| Vite | Build tool & dev server |


**Why Context API?**
- Cart data is needed in **Navbar** (badge count), **CartPage** (item list), and **PaymentPage** (order summary)
- Avoids prop drilling through multiple component layers
- Single source of truth ensures cart stays in sync across all views

---

## Setup Instructions

### 1. Create Project

```bash
npm create vite@latest solestyle -- --template react
cd solestyle
```

### 2. Install Dependencies

```bash
npm install react-router-dom
```

### 3. Copy Source Files

Replace the default `src/` contents with the files provided in this project.

### 4. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.


## Usage Flow

| Step | Action | Page

| 1  Browse shoes, click **Add to Cart** | `/` Shop |
| 2  View cart, adjust quantities | `/cart` |
| 3  Click **Proceed to Payment** | → `/payment` |
| 4  Review order summary (from Context) | `/payment` |
| 5  Click **Return to Shopping Cart** to edit | → `/cart` |
| 6  Fill credit card form, click **Pay** | `/payment` |
| 7 See success message, cart clears | `/payment` |


## Component Details

### `CartContext.js`
- Creates `CartContext` with `createContext()`
- `CartProvider` wraps app in `App.jsx`
- `useCart()` custom hook for clean consumption
- `useReducer` handles all cart mutations immutably

### `ShopPage.jsx`
- Displays `SHOES` data filtered by category
- Each `ShoeCard` calls `addToCart()` from Context

### `CartPage.jsx`
- Reads `cart`, `totalItems`, `totalPrice` from Context
- Quantity +/- buttons call `updateQuantity()`
- Trash icon calls `removeFromCart()`
- **Proceed to Payment** button uses `useNavigate()` to `/payment`

### `PaymentPage.jsx`
- **Left column:** Order summary reads `cart` and `totalPrice` directly from Context
- **Right column:** Credit card form with validation
- **Return to Shopping Cart** link routes back to `/cart`
- On submit: simulates 2s processing → `clearCart()` → success screen

## License

MIT
"""
with open("/mnt/agents/output/README.md", "w") as f:
    f.write(readme_content)

print("README.md saved successfully!")
