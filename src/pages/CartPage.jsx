
export default function CartPage({ cart, removeFromCart, updateQty, cartTotal, nav }) {
  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: 80, minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifySelf: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ fontSize: 80 }}>🛒</div>
        <h2 style={{ fontFamily: "Playfair Display,serif", color: "var(--green-dark)" }}>Your cart is empty</h2>
        <p style={{ color: "var(--gray600)" }}>Add some fresh farm products!</p>
        <button className="btn-primary" style={{ padding: "14px 36px", fontSize: 16 }} onClick={() => nav("products")}>🛍 Start Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 90 }}>
      <div className="container" style={{ padding: "40px 20px" }}>
        <h1 className="section-title fade-in-up">🛒 Your Cart</h1>
        <p style={{ color: "var(--gray600)", marginBottom: 32 }}>{cart.length} item(s) in your cart</p>
        
        <div className="grid-2" style={{ gap: 32, alignItems: "start" }}>
          <div>
            {cart.map(item => (
              <div 
                key={item.id} 
                className="fade-in-left" 
                style={{ 
                  display: "flex", 
                  gap: 16, 
                  background: "#fff", 
                  borderRadius: 20, 
                  padding: 16, 
                  marginBottom: 16, 
                  boxShadow: "0 4px 16px rgba(0,0,0,.06)", 
                  border: "1px solid #f0fdf4", 
                  alignItems: "center" 
                }}
              >
                <img src={item.img} alt={item.name} style={{ width: 80, height: 80, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{item.emoji} {item.name}</div>
                  <div style={{ color: "var(--green)", fontWeight: 700, fontSize: 15 }}>₹{item.price}/{item.unit}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                    <button className="qty-btn" style={{ width: 28, height: 28, fontSize: 16 }} onClick={() => updateQty(item.id, -1)}>−</button>
                    <span style={{ fontWeight: 800, minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                    <button className="qty-btn" style={{ width: 28, height: 28, fontSize: 16 }} onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 900, fontSize: 18, color: "var(--green-dark)" }}>₹{item.price * item.qty}</div>
                  <button className="btn-danger" style={{ marginTop: 8, padding: "5px 12px", fontSize: 12 }} onClick={() => removeFromCart(item.id)}>🗑 Remove</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="fade-in-right">
            <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius: 24, padding: 28, position: "sticky", top: 90 }}>
              <h3 style={{ fontFamily: "Playfair Display,serif", fontSize: 22, color: "var(--green-dark)", marginBottom: 20 }}>Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,.06)", fontSize: 14 }}>
                  <span style={{ fontWeight: 600 }}>{item.name} × {item.qty}</span>
                  <span style={{ fontWeight: 700 }}>₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="divider" />
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ fontWeight: 700 }}>Subtotal</span>
                <span style={{ fontWeight: 700 }}>₹{cartTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "var(--green)" }}>
                <span style={{ fontWeight: 700 }}>Delivery</span>
                <span style={{ fontWeight: 700, color: "var(--green)" }}>FREE 🎉</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "2px solid var(--green-light)", marginTop: 8 }}>
                <span style={{ fontWeight: 900, fontSize: 18 }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: 20, color: "var(--green)" }}>₹{cartTotal}</span>
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: 16, marginTop: 16, justifyContent: "center" }} onClick={() => nav("checkout")}>
                Proceed to Checkout →
              </button>
              <button className="btn-secondary" style={{ width: "100%", padding: "12px", fontSize: 14, marginTop: 10 }} onClick={() => nav("products")}>
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
