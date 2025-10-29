import React from "react";
import { HashRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice, createSelector } from "@reduxjs/toolkit";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

// ---------- Data: 6 unique houseplants across ≥3 categories ----------
const PRODUCTS = [
  {
    id: "aloe",
    name: "Aloe Vera",
    price: 499,
    category: "Succulents",
    img: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "snake",
    name: "Snake Plant",
    price: 899,
    category: "Low Light",
    img: "https://images.unsplash.com/photo-1528821154947-1aa3d1a65f2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "monstera",
    name: "Monstera Deliciosa",
    price: 1499,
    category: "Tropical",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pothos",
    name: "Golden Pothos",
    price: 699,
    category: "Low Light",
    img: "https://images.unsplash.com/photo-1593697821254-0c0b4b2a2c73?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    price: 1099,
    category: "Flowering",
    img: "https://images.unsplash.com/photo-1614594854631-6b2b3a2e0f2c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "fern",
    name: "Boston Fern",
    price: 799,
    category: "Tropical",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
  }
];

// ---------- Redux slice for cart ----------
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {} // { [productId]: quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) state.items[id] = 0;
      state.items[id] += 1;
    },
    increase: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) state.items[id] = 0;
      state.items[id] += 1;
    },
    decrease: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;
      state.items[id] -= 1;
      if (state.items[id] <= 0) delete state.items[id];
    },
    remove: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },
    clear: (state) => {
      state.items = {};
    }
  }
});

const { addItem, increase, decrease, remove, clear } = cartSlice.actions;

const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// ---------- Selectors ----------
const selectItems = (state) => state.cart.items;

const selectTotalCount = createSelector([selectItems], (items) =>
  Object.values(items).reduce((a, b) => a + b, 0)
);

const selectTotalCost = createSelector([selectItems], (items) =>
  Object.entries(items).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0)
);

// ---------- UI Helpers ----------
const formatINR = (cents) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    cents
  );

// ---------- Layout Header (shows on both pages) ----------
function Header() {
  const count = useSelector(selectTotalCount);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-semibold text-lg">Leafy Lane</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link className="hover:underline" to="/shop">Shop</Link>
          <Link className="hover:underline" to="/cart">Cart</Link>
          <Link className="hover:underline" to="/">Home</Link>
        </nav>

        <Link to="/cart" className="relative p-2 rounded-full border border-neutral-300 dark:border-neutral-700">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 text-xs bg-emerald-600 text-white rounded-full px-1.5 py-0.5">
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}

// ---------- Landing Page ----------
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-[calc(100vh-64px)] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1600&auto=format&fit=crop)",
      }}
    >
      <div className="min-h-[calc(100vh-64px)] bg-black/40 flex items-center">
        <div className="max-w-3xl mx-auto px-6 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-4"
          >
            Leafy Lane
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl leading-relaxed mb-8"
          >
            We’re a boutique houseplant studio bringing lush, air-purifying greens to
            urban homes. From low‑light heroes to tropical showstoppers, we source
            responsibly and ship with care.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-lg"
          >
            Get Started →
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ---------- Product Card ----------
function ProductCard({ product, inCart, onAdd }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
      <img src={product.img} alt={product.name} className="w-full h-44 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-neutral-500">{product.category}</p>
        <p className="font-medium">{formatINR(product.price)}</p>
        <button
          disabled={inCart}
          onClick={onAdd}
          className={`w-full mt-2 px-3 py-2 rounded-xl transition border ${inCart
            ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed border-neutral-300 dark:border-neutral-700"
            : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700"
            }`}
        >
          {inCart ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

// ---------- Product Listing ----------
function ProductListing() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  // Group by category
  const groups = PRODUCTS.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shop Plants</h2>
      <div className="space-y-10">
        {Object.entries(groups).map(([cat, prods]) => (
          <section key={cat}>
            <h3 className="text-xl font-semibold mb-4">{cat}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {prods.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  inCart={Boolean(items[p.id])}
                  onAdd={() => dispatch(addItem(p.id))}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

// ---------- Cart Page ----------
function CartPage() {
  const items = useSelector(selectItems);
  const totalCount = useSelector(selectTotalCount);
  const totalCost = useSelector(selectTotalCost);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = Object.entries(items).map(([id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return { ...p, qty };
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {/* Totals */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
          Total items: <strong>{totalCount}</strong>
        </div>
        <div className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
          Total cost: <strong>{formatINR(totalCost)}</strong>
        </div>
      </div>

      {cartProducts.length === 0 ? (
        <div className="p-6 border rounded-2xl text-center">
          <p className="mb-4">Your cart is empty.</p>
          <button
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartProducts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 border rounded-2xl p-3 bg-white dark:bg-neutral-900"
            >
              <img src={p.img} alt={p.name} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-neutral-500">Unit: {formatINR(p.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 rounded-lg border hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => dispatch(decrease(p.id))}
                >
                  −
                </button>
                <span className="w-8 text-center">{p.qty}</span>
                <button
                  className="px-3 py-1 rounded-lg border hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => dispatch(increase(p.id))}
                >
                  +
                </button>
              </div>
              <button
                className="ml-2 px-3 py-1 rounded-lg border text-red-600 hover:bg-red-50"
                onClick={() => dispatch(remove(p.id))}
              >
                Delete
              </button>
            </div>
          ))}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-end pt-4">
            <button
              className="px-4 py-2 rounded-xl border hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => alert("Checkout: Coming Soon")}
            >
              Checkout
            </button>
            <button
              className="px-4 py-2 rounded-xl border hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => dispatch(clear())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// ---------- App Shell ----------
function Shell({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Header />
      {children}
      <footer className="max-w-6xl mx-auto px-4 py-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} Leafy Lane. All rights reserved.
      </footer>
    </div>
  );
}

function RouterApp() {
  return (
    <HashRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ProductListing />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Shell>
    </HashRouter>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <RouterApp />
    </Provider>
  );
}
