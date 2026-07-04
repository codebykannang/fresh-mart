import { useState, useRef } from 'react';
import { COUPONS } from '../data/mockData';

const PAYMENT_METHODS = [
  { val: "cod", icon: "💵", label: "Cash on Delivery", desc: "Pay when delivered at your doorstep", color: "#dcfce7", border: "#22c55e" },
  { val: "gpay", icon: "📱", label: "Google Pay / UPI", desc: "Instant payment with any UPI app", color: "#e8f4fd", border: "#38bdf8" },
  { val: "card", icon: "💳", label: "Credit / Debit Card", desc: "Visa, Mastercard, Rupay accepted", color: "#f3f0ff", border: "#a855f7" },
  { val: "netbanking", icon: "🏦", label: "Net Banking", desc: "All major Indian banks supported", color: "#fef9c3", border: "#fbbf24" }
];

// ── Interactive SVG Delivery Map ─────────────────────────────────────────────
function DeliveryMapSelector({ onPinSelect }) {
  const [pin, setPin] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  // Named delivery zones on the simulated map
  const zones = [
    { id: 1, x: 60, y: 60, w: 100, h: 50, label: "Gandhipuram", lat: 11.0168, lng: 76.9558 },
    { id: 2, x: 210, y: 60, w: 100, h: 50, label: "RS Puram", lat: 11.0110, lng: 76.9500 },
    { id: 3, x: 360, y: 60, w: 100, h: 50, label: "Peelamedu", lat: 11.0200, lng: 77.0200 },
    { id: 4, x: 60, y: 160, w: 100, h: 50, label: "Saibaba Colony", lat: 11.0283, lng: 76.9601 },
    { id: 5, x: 210, y: 160, w: 100, h: 50, label: "Race Course", lat: 11.0048, lng: 76.9647 },
    { id: 6, x: 360, y: 160, w: 100, h: 50, label: "Singanallur", lat: 11.0017, lng: 77.0278 },
    { id: 7, x: 60, y: 260, w: 100, h: 50, label: "Hopes College", lat: 11.0329, lng: 76.9835 },
    { id: 8, x: 210, y: 260, w: 100, h: 50, label: "Ukkadam", lat: 10.9932, lng: 76.9694 },
    { id: 9, x: 360, y: 260, w: 100, h: 50, label: "Tidel Park", lat: 11.0060, lng: 77.0098 },
  ];

  const handleClick = (zone) => {
    setPin(zone);
    const address = `${zone.label}, Coimbatore – ${zone.lat.toFixed(4)}°N, ${zone.lng.toFixed(4)}°E`;
    onPinSelect(address, zone.lat, zone.lng);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
        padding: "8px 14px", background: "#f0fdf4", borderRadius: 10,
        fontSize: 13, fontWeight: 700, color: "var(--green-dark)"
      }}>
        <span>🗺️</span>
        <span>Click a zone on the map to set your delivery location</span>
      </div>

      <div className="map-container" style={{ height: 360, position: "relative", cursor: "crosshair" }}>
        <svg
          ref={svgRef}
          viewBox="0 0 480 340"
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        >
          {/* Background roads / grid */}
          <rect x="0" y="0" width="480" height="340" fill="#f1f5f9" />
          {/* Horizontal roads */}
          {[110, 210, 310].map(y => (
            <rect key={y} x="0" y={y} width="480" height="14" fill="#e2e8f0" rx="2" />
          ))}
          {/* Vertical roads */}
          {[160, 310].map(x => (
            <rect key={x} x={x} y="0" width="14" height="340" fill="#e2e8f0" rx="2" />
          ))}
          {/* Road markings */}
          {[110, 210, 310].map(y => (
            <line key={y} x1="0" y1={y + 7} x2="480" y2={y + 7} stroke="#fff" strokeWidth="2" strokeDasharray="16,12" />
          ))}

          {/* Delivery Zones */}
          {zones.map(zone => {
            const isSelected = pin?.id === zone.id;
            return (
              <g key={zone.id} onClick={() => handleClick(zone)} style={{ cursor: "pointer" }}>
                <rect
                  x={zone.x} y={zone.y} width={zone.w} height={zone.h}
                  rx="8" ry="8"
                  fill={isSelected ? "var(--green)" : "#fff"}
                  stroke={isSelected ? "var(--green-dark)" : "#94a3b8"}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  style={{ transition: "all 0.2s", filter: isSelected ? "drop-shadow(0 4px 8px rgba(22,163,74,0.4))" : "none" }}
                  onMouseEnter={() => setTooltip({ zone, x: zone.x + zone.w / 2, y: zone.y - 10 })}
                  onMouseLeave={() => setTooltip(null)}
                />
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 - 5}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isSelected ? "#fff" : "#1e293b"}
                >
                  {zone.label}
                </text>
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 + 10}
                  textAnchor="middle"
                  fontSize="9"
                  fill={isSelected ? "rgba(255,255,255,0.85)" : "#94a3b8"}
                >
                  {zone.lat.toFixed(3)}°N
                </text>
              </g>
            );
          })}

          {/* Warehouse marker */}
          <g>
            <circle cx="240" cy="170" r="14" fill="var(--green-dark)" opacity="0.15" />
            <circle cx="240" cy="170" r="8" fill="var(--green-dark)" />
            <text x="240" y="200" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--green-dark)">
              🏪 Warehouse
            </text>
          </g>

          {/* Tooltip */}
          {tooltip && (
            <g>
              <rect
                x={tooltip.x - 60} y={tooltip.y - 28}
                width="120" height="24" rx="6"
                fill="var(--green-dark)" opacity="0.92"
              />
              <text x={tooltip.x} y={tooltip.y - 12} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">
                📍 {tooltip.zone.label}
              </text>
            </g>
          )}
        </svg>

        {/* Selected pin info overlay */}
        {pin && (
          <div style={{
            position: "absolute", bottom: 12, left: 12, right: 12,
            background: "rgba(20,83,45,0.9)",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: 12,
            fontSize: 12,
            fontFamily: "monospace",
            display: "flex",
            gap: 12,
            alignItems: "center",
            backdropFilter: "blur(6px)"
          }}>
            <span style={{ fontSize: 18 }}>📍</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13 }}>{pin.label}, Coimbatore</div>
              <div style={{ opacity: 0.8 }}>Lat: {pin.lat.toFixed(6)}° N &nbsp;|&nbsp; Lng: {pin.lng.toFixed(6)}° E</div>
            </div>
            <span className="badge badge-green" style={{ marginLeft: "auto", fontSize: 10 }}>📡 Pinned</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Coupon Input ─────────────────────────────────────────────────────────────
function CouponInput({ onApply }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null);
  const [error, setError] = useState("");

  const applyCode = () => {
    const upper = code.trim().toUpperCase();
    const coupon = COUPONS[upper];
    if (!coupon) {
      setError("Invalid coupon code. Try FRESH10 or WELCOMEMART.");
      setApplied(null);
      onApply(null);
      return;
    }
    setError("");
    setApplied({ code: upper, ...coupon });
    onApply({ code: upper, ...coupon });
  };

  const removeCoupon = () => {
    setCode("");
    setApplied(null);
    setError("");
    onApply(null);
  };

  return (
    <div style={{ marginTop: 20, background: "#f9fafb", borderRadius: 16, padding: 16, border: "1px solid var(--gray200)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>🎫</span>
        <span style={{ fontWeight: 800, fontSize: 14, color: "var(--green-dark)" }}>Apply Promo Code</span>
      </div>

      {!applied ? (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="form-input"
              placeholder="e.g. FRESH10"
              value={code}
              onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
              onKeyDown={e => e.key === "Enter" && applyCode()}
              style={{ flex: 1, fontSize: 14, letterSpacing: "1px", fontWeight: 700 }}
            />
            <button
              className="btn-primary"
              style={{ padding: "10px 18px", fontSize: 13, whiteSpace: "nowrap" }}
              onClick={applyCode}
            >
              Apply
            </button>
          </div>
          {error && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 6, fontWeight: 600 }}>{error}</div>}
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            {["FRESH10", "WELCOMEMART", "SAVE50"].map(c => (
              <span
                key={c}
                onClick={() => setCode(c)}
                style={{
                  background: "var(--green-soft)", color: "var(--green-dark)",
                  padding: "3px 10px", borderRadius: 20, fontSize: 11,
                  fontWeight: 800, cursor: "pointer", letterSpacing: "0.5px",
                  border: "1px solid #86efac"
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--green-soft)", borderRadius: 12, padding: "10px 14px" }}>
          <span style={{ fontSize: 22 }}>✅</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "var(--green-dark)" }}>{applied.code} applied!</div>
            <div style={{ fontSize: 12, color: "var(--green)" }}>{applied.desc}</div>
          </div>
          <button
            onClick={removeCoupon}
            style={{ background: "none", border: "none", color: "#dc2626", fontWeight: 800, cursor: "pointer", fontSize: 13 }}
          >
            ✕ Remove
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Checkout Page ───────────────────────────────────────────────────────
export default function CheckoutPage({ cart, cartTotal, nav, setMyOrder, setCart, showToast, setOrders }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "", payment: "cod", lat: null, lng: null });
  const [locLoading, setLocLoading] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [coupon, setCoupon] = useState(null);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Shipping logic: free over ₹300, else ₹50
  const baseShipping = cartTotal >= 300 ? 0 : 50;
  const shipping = coupon?.type === "shipping" ? 0 : baseShipping;

  // Discount calculation
  let discount = 0;
  if (coupon) {
    if (coupon.type === "percent") discount = Math.round((cartTotal * coupon.value) / 100);
    else if (coupon.type === "flat" && cartTotal >= 300) discount = coupon.value;
  }

  const finalTotal = cartTotal + shipping - discount;

  const handleMapPin = (address, lat, lng) => {
    upd("address", address);
    setForm(f => ({ ...f, address, lat, lng }));
  };

  const getLocation = () => {
    setLocLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          upd("address", `📍 GPS: Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`);
          setForm(f => ({ ...f, lat: pos.coords.latitude, lng: pos.coords.longitude }));
          setLocLoading(false);
        },
        () => { showToast("❌ Location access denied"); setLocLoading(false); }
      );
    } else {
      showToast("❌ Geolocation not supported"); setLocLoading(false);
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
      total: finalTotal,
      status: 0,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      deliveryLat: form.lat,
      deliveryLng: form.lng,
      coupon: coupon?.code || null
    };
    setOrders(o => [newOrder, ...o]);
    setMyOrder(newOrder);
    setCart([]);
    setPlaced(true);
  };

  if (placed) {
    return (
      <div style={{
        paddingTop: 80, minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 16, background: "linear-gradient(135deg,#f0fdf4,#dcfce7)"
      }}>
        <div className="bounce-in" style={{ fontSize: 80 }}>🎉</div>
        <div style={{ background: "var(--green)", color: "#fff", padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>Order Confirmed!</div>
        <h2 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(28px,5vw,40px)", color: "var(--green-dark)", textAlign: "center" }}>
          Your Order is Placed!
        </h2>
        <p style={{ color: "var(--gray600)", fontSize: 17 }}>Order ID: <strong style={{ color: "var(--green)" }}>#{orderId}</strong></p>
        {coupon && (
          <div style={{ background: "var(--green-soft)", color: "var(--green-dark)", padding: "8px 16px", borderRadius: 12, fontSize: 13, fontWeight: 700 }}>
            🎫 Coupon {coupon.code} saved you ₹{coupon.type === "percent" ? `${coupon.value}%` : discount}!
          </div>
        )}
        <p style={{ color: "var(--gray600)", textAlign: "center", maxWidth: 360, lineHeight: 1.7 }}>
          You'll receive a WhatsApp confirmation shortly. Estimated delivery: <strong>Same Day!</strong>
        </p>
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
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
          {[["🔒", "SSL Secured"], ["🚚", "Fast Delivery"], ["✅", "Quality Guaranteed"], ["📞", "24/7 Support"]].map(([e, l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, background: "#fff", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "var(--green-dark)", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
              {e} {l}
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "32px 20px" }}>
        <div className="grid-2" style={{ gap: 32, alignItems: "start" }}>

          {/* LEFT — Delivery + Payment */}
          <div>
            {/* Delivery Info */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,.07)", marginBottom: 20, border: "1px solid #f0fdf4" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid #f0fdf4" }}>
                <div style={{ background: "var(--green)", color: "#fff", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900 }}>1</div>
                <h3 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(17px,4vw,21px)", color: "var(--green-dark)" }}>📋 Delivery Information</h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="checkout-form-row">
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
                  rows={2}
                  placeholder="Click a zone on the map below, or type manually..."
                  value={form.address}
                  onChange={e => upd("address", e.target.value)}
                  style={{ resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                  <button className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13 }} onClick={getLocation} disabled={locLoading}>
                    {locLoading ? "📡 Detecting..." : "📍 Use Device GPS"}
                  </button>
                </div>
              </div>

              {/* Interactive Map */}
              <DeliveryMapSelector onPinSelect={handleMapPin} />

              <div className="form-group" style={{ marginTop: 16, marginBottom: 0 }}>
                <label className="form-label">Pincode</label>
                <input className="form-input" placeholder="641001" value={form.pincode} onChange={e => upd("pincode", e.target.value)} style={{ maxWidth: 200 }} />
              </div>
            </div>

            {/* Payment Method */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,.07)", border: "1px solid #f0fdf4" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid #f0fdf4" }}>
                <div style={{ background: "var(--green)", color: "#fff", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900 }}>2</div>
                <h3 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(17px,4vw,21px)", color: "var(--green-dark)" }}>💳 Secure Payment</h3>
                <span className="badge badge-green" style={{ marginLeft: "auto", fontSize: 10 }}>🔒 100% Safe</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="payment-grid">
                {PAYMENT_METHODS.map(({ val, icon, label, desc, color, border }) => (
                  <div
                    key={val}
                    onClick={() => upd("payment", val)}
                    style={{
                      padding: 16, borderRadius: 14,
                      border: `2px solid ${form.payment === val ? border : "var(--gray200)"}`,
                      background: form.payment === val ? color : "#fff",
                      cursor: "pointer", transition: "all .2s",
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

              {form.payment === "gpay" && (
                <div style={{ background: "linear-gradient(135deg,#e8f4fd,#f0f9ff)", borderRadius: 14, padding: 20, marginTop: 16, textAlign: "center", border: "1px solid #bae6fd" }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>📲</div>
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>UPI ID: jayalakshmifresh@okaxis</div>
                  <div style={{ fontSize: 13, color: "var(--gray600)", marginBottom: 12 }}>Pay ₹{finalTotal} and share screenshot on WhatsApp</div>
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

          {/* RIGHT — Order Summary */}
          <div>
            <div className="checkout-summary-sticky" style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius: 24, padding: 28, position: "sticky", top: 90, border: "1px solid #bbf7d0" }}>
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

              {/* Coupon */}
              <CouponInput cartTotal={cartTotal} shipping={shipping} onApply={setCoupon} />

              <div className="divider" style={{ margin: "16px 0" }} />

              {/* Price breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                  <span style={{ color: "var(--gray600)", fontWeight: 600 }}>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>₹{cartTotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                  <span style={{ color: "var(--gray600)", fontWeight: 600 }}>Delivery Charge</span>
                  <span style={{ fontWeight: 700, color: shipping === 0 ? "var(--green)" : "var(--gray800)" }}>
                    {shipping === 0 ? "FREE 🎉" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div style={{ fontSize: 11, color: "var(--gray600)", textAlign: "right" }}>
                    Free delivery on orders above ₹300
                  </div>
                )}
                {discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                    <span style={{ color: "var(--green)", fontWeight: 700 }}>🎫 Coupon Discount</span>
                    <span style={{ fontWeight: 800, color: "var(--green)" }}>−₹{discount}</span>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid var(--green-light)", paddingTop: 14, marginTop: 12 }}>
                <span style={{ fontWeight: 900, fontSize: 18 }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: 22, color: "var(--green)" }}>₹{finalTotal}</span>
              </div>

              {discount > 0 && (
                <div style={{ background: "var(--green-soft)", color: "var(--green-dark)", padding: "8px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700, textAlign: "center", marginTop: 8 }}>
                  🎉 You saved ₹{discount + (baseShipping - shipping)} on this order!
                </div>
              )}

              <button
                className="btn-primary pulse-btn"
                style={{ width: "100%", padding: "16px", fontSize: 16, marginTop: 16, justifyContent: "center", gap: 10 }}
                onClick={placeOrder}
              >
                🎉 Place Order · ₹{finalTotal}
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
