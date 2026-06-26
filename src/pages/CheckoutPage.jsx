import React, { useState } from 'react';

const PAYMENT_METHODS = [
  {
    val: "cod",
    icon: "💵",
    label: "Cash on Delivery",
    desc: "Pay when delivered at your doorstep",
    color: "#dcfce7",
    border: "#22c55e"
  },
  {
    val: "gpay",
    icon: "📱",
    label: "Google Pay / UPI",
    desc: "Instant payment with any UPI app",
    color: "#e8f4fd",
    border: "#38bdf8"
  },
  {
    val: "card",
    icon: "💳",
    label: "Credit / Debit Card",
    desc: "Visa, Mastercard, Rupay accepted",
    color: "#f3f0ff",
    border: "#a855f7"
  },
  {
    val: "netbanking",
    icon: "🏦",
    label: "Net Banking",
    desc: "All major Indian banks supported",
    color: "#fef9c3",
    border: "#fbbf24"
  }
];

export default function CheckoutPage({ cart, cartTotal, nav, setMyOrder, setCart, showToast, orders, setOrders }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "", payment: "cod" });
  const [locLoading, setLocLoading] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const getLocation = () => {
    setLocLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          upd("address", `📍 GPS: Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`);
          setLocLoading(false);
        },
        () => {
          showToast("❌ Location access denied");
          setLocLoading(false);
        }
      );
    } else {
      showToast("❌ Geolocation not supported");
      setLocLoading(false);
    }
  };

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      showToast("❌ Fill all required fields!");
      return;
    }
    const id = "JL" + Date.now().toString().slice(-4);
    setOrderId(id);
    const newOrder = {
      id,
      customer: form.name,
      items: cart.map(i => `${i.name} x${i.qty}`),
      total: cartTotal,
      status: 0,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    };
    setOrders(o => [newOrder, ...o]);
    setMyOrder(newOrder);
    setCart([]);
    setPlaced(true);
  };

  if (placed) {
    return (
      <div style={{
        paddingTop: 80,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "linear-gradient(135deg,#f0fdf4,#dcfce7)"
      }}>
        <div className="bounce-in" style={{ fontSize: 80 }}>🎉</div>
        <div style={{ background: "var(--green)", color: "#fff", padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>Order Confirmed!</div>
        <h2 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(28px,5vw,40px)", color: "var(--green-dark)", textAlign: "center" }}>Your Order is Placed!</h2>
        <p style={{ color: "var(--gray600)", fontSize: 17 }}>Order ID: <strong style={{ color: "var(--green)" }}>#{orderId}</strong></p>
        <p style={{ color: "var(--gray600)", textAlign: "center", maxWidth: 360, lineHeight: 1.7 }}>You'll receive a WhatsApp confirmation shortly. Estimated delivery: <strong>Same Day!</strong></p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
          <button className="btn-primary" style={{ padding: "13px 28px" }} onClick={() => nav("tracking")}>📦 Track Order</button>
          <button className="btn-secondary" onClick={() => nav("products")}>🛍 Continue Shopping</button>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 16, opacity: .7 }}>
          {[["🚚", "Same Day Delivery"], ["💚", "Quality Assured"], ["📞", "24/7 Support"]].map(([e, l]) => (
            <div key={l} style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "var(--gray600)" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{e}</div>{l}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 90, paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", padding: "40px 20px 30px", textAlign: "center", marginBottom: 0 }}>
        <h1 className="section-title fade-in-up" style={{ marginBottom: 6 }}>💳 Checkout</h1>
        <p style={{ color: "var(--gray600)", fontSize: 15 }}>Secure & fast checkout — just a few steps away!</p>
        {/* Trust badges */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
          {[["🔒", "SSL Secured"], ["🚚", "Free Delivery"], ["✅", "Quality Guaranteed"], ["📞", "24/7 Support"]].map(([e, l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, background: "#fff", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "var(--green-dark)", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
              {e} {l}
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "32px 20px" }}>
        <div className="grid-2" style={{ gap: 32, alignItems: "start" }}>
          {/* Left: Form */}
          <div>
            {/* Delivery Info Card */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,.07)", marginBottom: 20, border: "1px solid #f0fdf4" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid #f0fdf4" }}>
                <div style={{ background: "var(--green)", color: "#fff", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900 }}>1</div>
                <h3 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(17px,4vw,21px)", color: "var(--green-dark)" }}>📋 Delivery Information</h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your Name" value={form.name} onChange={e => upd("name", e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => upd("phone", e.target.value)} />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 16 }}>
                <label className="form-label">Delivery Address *</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="House No, Street, Area, City..."
                  value={form.address}
                  onChange={e => upd("address", e.target.value)}
                  style={{ resize: "vertical" }}
                />
                <button className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13, marginTop: 8 }} onClick={getLocation} disabled={locLoading}>
                  {locLoading ? "📡 Detecting..." : "📍 Use My GPS Location"}
                </button>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Pincode</label>
                <input className="form-input" placeholder="641001" value={form.pincode} onChange={e => upd("pincode", e.target.value)} style={{ maxWidth: 200 }} />
              </div>
            </div>

            {/* Payment Method Card */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,.07)", border: "1px solid #f0fdf4" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid #f0fdf4" }}>
                <div style={{ background: "var(--green)", color: "#fff", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900 }}>2</div>
                <h3 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(17px,4vw,21px)", color: "var(--green-dark)" }}>
                  💳 Secure Payment
                </h3>
                <span className="badge badge-green" style={{ marginLeft: "auto", fontSize: 10 }}>🔒 100% Safe</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {PAYMENT_METHODS.map(({ val, icon, label, desc, color, border }) => (
                  <div
                    key={val}
                    onClick={() => upd("payment", val)}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      border: `2px solid ${form.payment === val ? border : "var(--gray200)"}`,
                      background: form.payment === val ? color : "#fff",
                      cursor: "pointer",
                      transition: "all .2s",
                      transform: form.payment === val ? "scale(1.02)" : "scale(1)",
                      boxShadow: form.payment === val ? `0 4px 16px ${border}40` : "none"
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "var(--gray800)", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 11, color: "var(--gray600)", lineHeight: 1.4 }}>{desc}</div>
                    {form.payment === val && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, color: "var(--green)", fontSize: 12, fontWeight: 700 }}>
                        ✓ Selected
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* UPI QR Section */}
              {form.payment === "gpay" && (
                <div style={{ background: "linear-gradient(135deg,#e8f4fd,#f0f9ff)", borderRadius: 14, padding: 20, marginTop: 16, textAlign: "center", border: "1px solid #bae6fd" }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>📲</div>
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>UPI ID: jayalakshmifresh@okaxis</div>
                  <div style={{ fontSize: 13, color: "var(--gray600)", marginBottom: 12 }}>Pay ₹{cartTotal} and share screenshot on WhatsApp</div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                    {["GPay", "PhonePe", "Paytm", "BHIM"].map(app => (
                      <span key={app} style={{ background: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "var(--green-dark)", border: "1px solid #bae6fd" }}>{app}</span>
                    ))}
                  </div>
                </div>
              )}

              {form.payment === "card" && (
                <div style={{ background: "linear-gradient(135deg,#f3f0ff,#faf5ff)", borderRadius: 14, padding: 20, marginTop: 16, border: "1px solid #e9d5ff" }}>
                  <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: "var(--gray800)" }}>💳 Enter Card Details</div>
                  <div className="form-group" style={{ marginBottom: 12 }}>
                    <label className="form-label">Card Number</label>
                    <input className="form-input" placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Expiry</label>
                      <input className="form-input" placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">CVV</label>
                      <input className="form-input" placeholder="•••" maxLength={3} type="password" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius: 24, padding: 28, position: "sticky", top: 90, border: "1px solid #bbf7d0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ background: "var(--green)", color: "#fff", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900 }}>3</div>
                <h3 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(17px,4vw,21px)", color: "var(--green-dark)" }}>🧾 Order Summary</h3>
              </div>

              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,.05)", alignItems: "center" }}>
                  <img src={item.img} alt={item.name} style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{item.emoji} {item.name}</div>
                    <div style={{ fontSize: 12, color: "var(--gray600)" }}>Qty: {item.qty} × ₹{item.price}</div>
                  </div>
                  <div style={{ fontWeight: 800, color: "var(--green-dark)", fontSize: 15 }}>₹{item.price * item.qty}</div>
                </div>
              ))}

              <div className="divider" />

              {[
                ["Subtotal", `₹${cartTotal}`],
                ["Delivery Charge", "FREE 🎉"],
                ["Discount", "—"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 14 }}>
                  <span style={{ color: "var(--gray600)", fontWeight: 600 }}>{k}</span>
                  <span style={{ fontWeight: 700, color: v === "FREE 🎉" ? "var(--green)" : "var(--gray800)" }}>{v}</span>
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid var(--green-light)", paddingTop: 14, marginTop: 10 }}>
                <span style={{ fontWeight: 900, fontSize: 18 }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: 22, color: "var(--green)" }}>₹{cartTotal}</span>
              </div>

              <button
                className="btn-primary pulse-btn"
                style={{ width: "100%", padding: "16px", fontSize: 16, marginTop: 20, justifyContent: "center", gap: 10 }}
                onClick={placeOrder}
              >
                🎉 Place Order Now
              </button>

              <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "var(--gray600)" }}>
                🔒 Secure checkout · Your data is protected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
