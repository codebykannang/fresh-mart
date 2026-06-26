import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackingPage from './pages/TrackingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPortal from './pages/AdminPortal';
import { PRODUCTS } from './data/mockData';

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [adminLogged, setAdminLogged] = useState(false);
  const [adminPage, setAdminPage] = useState("dashboard");
  
  const [orders, setOrders] = useState([
    { id: "JL001", customer: "Priya Rajan", items: ["Alphonso Mango x2", "Coconut Oil x1"], total: 640, status: 2, date: "12 Mar 2026" },
    { id: "JL002", customer: "Karthik S", items: ["Fresh Lemon x1", "Tender Coconut x3"], total: 145, status: 3, date: "13 Mar 2026" },
    { id: "JL003", customer: "Meenakshi D", items: ["Organic Tomato x2", "Organic Spinach Seeds x1"], total: 105, status: 0, date: "15 Mar 2026" },
  ]);
  
  const [filterCat, setFilterCat] = useState("All");
  const [myOrder, setMyOrder] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

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
        <Navbar nav={nav} page={page} cartCount={cartCount} />
      )}
      
      {page === "home" && (
        <HomePage 
          nav={nav} 
          products={products} 
          addToCart={addToCart} 
          setSelectedProduct={setSelectedProduct} 
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
        />
      )}
      
      {page === "detail" && selectedProduct && (
        <ProductDetailPage 
          product={selectedProduct} 
          addToCart={addToCart} 
          nav={nav} 
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
      )}
      
      {page === "tracking" && (
        <TrackingPage 
          myOrder={myOrder} 
          orders={orders} 
          nav={nav} 
        />
      )}
      
      {page === "about" && (
        <AboutPage />
      )}
      
      {page === "contact" && (
        <ContactPage 
          nav={nav} 
          showToast={showToast} 
        />
      )}
      
      {page === "admin" && (
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
      )}
      
      {page !== "admin" && <Footer nav={nav} />}
      {page !== "admin" && <WhatsAppFloat />}
      
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
