import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import { PRODUCTS } from './data/mockData';
import useLocalStorage from './hooks/useLocalStorage';

// Heavier / less-frequently-visited pages are code-split into their own
// chunks so the initial bundle users download on first load is smaller.
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const TrackingPage = lazy(() => import('./pages/TrackingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPortal = lazy(() => import('./pages/AdminPortal'));

function PageLoader() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="spinner" style={{
        width: 44, height: 44, borderRadius: "50%",
        border: "4px solid rgba(16,185,129,0.15)", borderTopColor: "var(--green)",
        animation: "spin 0.8s linear infinite"
      }} />
    </div>
  );
}

// ── Push Notification Component ──────────────────────────────────────────────
function PushNotification({ notifications, onDismiss }) {
  if (!notifications.length) return null;
  return (
    <div style={{
      position: "fixed",
      top: 90,
      right: 20,
      zIndex: 9998,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      maxWidth: 340
    }}>
      {notifications.map(n => (
        <div
          key={n.id}
          className="bounce-in"
          style={{
            background: "#fff",
            border: "2px solid var(--green-soft)",
            borderLeft: "5px solid var(--green)",
            borderRadius: 16,
            padding: "14px 18px",
            boxShadow: "0 8px 30px rgba(22,163,74,0.18)",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            cursor: "pointer"
          }}
          onClick={() => onDismiss(n.id)}
        >
          <div style={{ fontSize: 28, flexShrink: 0 }}>{n.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "var(--green-dark)", marginBottom: 3 }}>{n.title}</div>
            <div style={{ fontSize: 12, color: "var(--gray600)", lineHeight: 1.5 }}>{n.message}</div>
            <div style={{ fontSize: 10, color: "var(--gray600)", marginTop: 4, opacity: 0.7 }}>Tap to dismiss</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  // Cart, orders, last-placed order and wishlist persist to localStorage —
  // refreshing the page or closing the tab no longer wipes them out.
  const [cart, setCart] = useLocalStorage("jl_cart", []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [adminLogged, setAdminLogged] = useState(false);
  const [adminPage, setAdminPage] = useState("dashboard");
  const [pushNotifications, setPushNotifications] = useState([]);
  const [wishlist, setWishlist] = useLocalStorage("jl_wishlist", []);
  const orderStatusRef = useRef(null);
  
  const [orders, setOrders] = useLocalStorage("jl_orders", [
    { id: "JL001", customer: "Priya Rajan", items: ["Alphonso Mango x2", "Coconut Oil x1"], total: 640, status: 2, date: "12 Mar 2026" },
    { id: "JL002", customer: "Karthik S", items: ["Fresh Lemon x1", "Tender Coconut x3"], total: 145, status: 3, date: "13 Mar 2026" },
    { id: "JL003", customer: "Meenakshi D", items: ["Organic Tomato x2", "Organic Spinach Seeds x1"], total: 105, status: 0, date: "15 Mar 2026" },
  ]);
  
  const [filterCat, setFilterCat] = useState("All");
  const [myOrder, setMyOrder] = useLocalStorage("jl_myOrder", null);
  const [products, setProducts] = useState(PRODUCTS);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`);
        return prev.filter(p => p.id !== product.id);
      }
      showToast(`❤️ ${product.name} added to wishlist`);
      return [...prev, product];
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ── Review callback ──────────────────────────────────────────────────────
  const addProductReview = (productId, review) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const newReviews = [review, ...(p.reviews || [])];
      const avgRating = parseFloat(
        (newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length).toFixed(1)
      );
      return { ...p, reviews: newReviews, rating: avgRating };
    }));
  };

  // ── Push notification helper ─────────────────────────────────────────────
  const addPushNotification = (icon, title, message) => {
    const id = Date.now();
    setPushNotifications(prev => [...prev, { id, icon, title, message }]);
    // auto-dismiss after 8 seconds
    setTimeout(() => {
      setPushNotifications(prev => prev.filter(n => n.id !== id));
    }, 8000);
  };

  const dismissNotification = (id) => {
    setPushNotifications(prev => prev.filter(n => n.id !== id));
  };

  // ── Background order status simulation ──────────────────────────────────
  useEffect(() => {
    if (!myOrder) return;

    // Clear previous interval
    if (orderStatusRef.current) clearInterval(orderStatusRef.current);

    const STATUS_MESSAGES = [
      { icon: "📦", title: "Order Packed!", message: `Your order #${myOrder.id} has been packed and is ready for dispatch!` },
      { icon: "🚚", title: "On the Way!", message: `Driver Ramesh Kumar has picked up your order #${myOrder.id}. ETA: 30 mins!` },
      { icon: "🏠", title: "Delivered! 🎉", message: `Order #${myOrder.id} has been delivered. Enjoy your fresh produce!` }
    ];

    let step = myOrder.status;

    orderStatusRef.current = setInterval(() => {
      if (step >= 3) {
        clearInterval(orderStatusRef.current);
        return;
      }
      step++;
      const notif = STATUS_MESSAGES[step - 1];
      if (notif) {
        addPushNotification(notif.icon, notif.title, notif.message);
      }
      // Update order status in list
      setOrders(prev => prev.map(o =>
        o.id === myOrder.id ? { ...o, status: step } : o
      ));
      setMyOrder(prev => prev ? { ...prev, status: step } : prev);
    }, 20000); // Every 20 seconds

    return () => clearInterval(orderStatusRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myOrder?.id]);

  const addToCart = (prod, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === prod.id);
      if (ex) return prev.map(i => i.id === prod.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...prod, qty }];
    });
    showToast(`${prod.name} added to cart!`);
  };

  const removeFromCart = (id) => setCart(p => p.filter(i => i.id !== id));
  const updateQty = (id, delta) => setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const cartTotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const nav = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {page !== "admin" && (
        <Navbar nav={nav} page={page} cartCount={cartCount} wishlistCount={wishlist.length} />
      )}

      {/* Push Notifications (shown on all non-admin pages) */}
      {page !== "admin" && (
        <PushNotification notifications={pushNotifications} onDismiss={dismissNotification} />
      )}
      
      {page === "home" && (
        <HomePage 
          nav={nav} 
          products={products} 
          addToCart={addToCart} 
          setSelectedProduct={setSelectedProduct} 
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      )}
      
      {page === "products" && (
        <ProductsPage 
          nav={nav} 
          products={products} 
          addToCart={addToCart} 
          setSelectedProduct={setSelectedProduct} 
          filterCat={filterCat} 
          setFilterCat={setFilterCat} 
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      )}
      
      {page === "detail" && selectedProduct && (
        <Suspense fallback={<PageLoader />}>
          <ProductDetailPage 
            product={products.find(p => p.id === selectedProduct.id) || selectedProduct}
            addToCart={addToCart} 
            nav={nav}
            addProductReview={addProductReview}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            products={products}
            setSelectedProduct={setSelectedProduct}
          />
        </Suspense>
      )}

      {page === "wishlist" && (
        <WishlistPage
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
          nav={nav}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      
      {page === "cart" && (
        <CartPage 
          cart={cart} 
          removeFromCart={removeFromCart} 
          updateQty={updateQty} 
          cartTotal={cartTotal} 
          nav={nav} 
        />
      )}
      
      {page === "checkout" && (
        <Suspense fallback={<PageLoader />}>
          <CheckoutPage 
            cart={cart} 
            cartTotal={cartTotal} 
            nav={nav} 
            setMyOrder={setMyOrder} 
            setCart={setCart} 
            showToast={showToast} 
            orders={orders} 
            setOrders={setOrders} 
          />
        </Suspense>
      )}
      
      {page === "tracking" && (
        <Suspense fallback={<PageLoader />}>
          <TrackingPage 
            myOrder={myOrder} 
            orders={orders} 
            nav={nav} 
          />
        </Suspense>
      )}
      
      {page === "about" && (
        <Suspense fallback={<PageLoader />}>
          <AboutPage />
        </Suspense>
      )}
      
      {page === "contact" && (
        <Suspense fallback={<PageLoader />}>
          <ContactPage 
            nav={nav} 
            showToast={showToast} 
          />
        </Suspense>
      )}
      
      {page === "admin" && (
        <Suspense fallback={<PageLoader />}>
          <AdminPortal 
            adminLogged={adminLogged} 
            setAdminLogged={setAdminLogged} 
            adminPage={adminPage} 
            setAdminPage={setAdminPage} 
            products={products} 
            setProducts={setProducts} 
            orders={orders} 
            setOrders={setOrders} 
            nav={nav} 
            showToast={showToast} 
          />
        </Suspense>
      )}
      
      {page !== "admin" && <Footer nav={nav} />}
      {page !== "admin" && <WhatsAppFloat />}
      
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
