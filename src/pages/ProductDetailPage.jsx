import { useState } from 'react';
import TiltCard from '../components/TiltCard';

// ── Star Rating Selector ─────────────────────────────────────────────────────
function StarSelector({ value, onChange, size = 28 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          style={{
            fontSize: size,
            cursor: "pointer",
            color: star <= (hovered || value) ? "var(--yellow)" : "#e2e8f0",
            transition: "color 0.15s, transform 0.15s",
            transform: star <= (hovered || value) ? "scale(1.25)" : "scale(1)",
            display: "inline-block"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ── Review Card ───────────────────────────────────────────────────────────────
function ReviewCard({ r, isNew }) {
  return (
    <div 
      className={`glass-panel ${isNew ? "bounce-in" : ""}`} 
      style={{
        background: isNew ? "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(52,211,153,0.08))" : "rgba(255, 255, 255, 0.65)",
        borderRadius: 20,
        padding: 24,
        border: isNew ? "2.5px solid var(--green)" : "1px solid var(--glass-border)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: r.color || "var(--green)",
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, flexShrink: 0,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
        }}>
          {r.avatar || r.name?.[0] || "?"}
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 15, color: "var(--green-dark)" }}>{r.name}</div>
          <div style={{ display: "flex", gap: 2 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: s <= r.rating ? "var(--yellow)" : "#e2e8f0", fontSize: 13 }}>★</span>
            ))}
          </div>
        </div>
        {isNew && (
          <span className="badge" style={{ marginLeft: "auto", fontSize: 11, background: "var(--green)", color: "#ffffff", fontWeight: 800, padding: "4px 10px", borderRadius: 50 }}>Just Now</span>
        )}
      </div>
      <p style={{ fontSize: 14, color: "var(--gray600)", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
        "{r.text}"
      </p>
    </div>
  );
}

// ── Review Form ───────────────────────────────────────────────────────────────
function ReviewForm({ productId, onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const AVATAR_COLORS = ["#fb923c", "#a855f7", "#38bdf8", "#4ade80", "#f87171", "#fbbf24", "#ec4899"];

  const handleSubmit = () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!rating) { setError("Please select a star rating."); return; }
    if (!text.trim() || text.trim().length < 10) { setError("Please write at least 10 characters in your review."); return; }

    const review = {
      name: name.trim(),
      avatar: name.trim()[0].toUpperCase(),
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      rating,
      text: text.trim(),
      isNew: true
    };
    onSubmit(productId, review);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-panel bounce-in" style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(52,211,153,0.08))",
        borderRadius: 24,
        padding: 36,
        textAlign: "center",
        border: "2px solid var(--green)"
      }}>
        <div style={{ fontSize: 56, marginBottom: 12, animation: "floatY 3s ease infinite" }}>🎉</div>
        <div style={{ fontWeight: 900, fontSize: 19, color: "var(--green-dark)", marginBottom: 8 }}>
          Thank you for your feedback, {name}!
        </div>
        <div style={{ fontSize: 14, color: "var(--gray600)", fontWeight: 500 }}>
          Your review will help other organic fresh lovers make healthy choices.
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{
      background: "rgba(255, 255, 255, 0.75)",
      borderRadius: 24,
      padding: 32,
      border: "1px solid var(--glass-border)",
      boxShadow: "var(--glass-shadow)"
    }}>
      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--green-dark)", marginBottom: 24, fontWeight: 900 }}>
        ✍️ Review this Harvest
      </h4>

      {error && (
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px 16px", borderRadius: 12, fontSize: 13, marginBottom: 16, fontWeight: 700 }}>
          {error}
        </div>
      )}

      <div className="form-group" style={{ marginBottom: 20 }}>
        <label className="form-label" style={{ fontWeight: 800, color: "var(--green-dark)", fontSize: 13, textTransform: "uppercase" }}>Your Name *</label>
        <input
          className="premium-input form-input"
          placeholder="e.g. Priya Rajan"
          value={name}
          onChange={e => { setName(e.target.value); setError(""); }}
          style={{ height: 45 }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: 20 }}>
        <label className="form-label" style={{ fontWeight: 800, color: "var(--green-dark)", fontSize: 13, textTransform: "uppercase", marginBottom: 8 }}>Your Rating *</label>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <StarSelector value={rating} onChange={r => { setRating(r); setError(""); }} />
          {rating > 0 && (
            <span style={{ fontSize: 13, fontWeight: 800, color: "var(--green)", background: "rgba(16,185,129,0.12)", padding: "4px 12px", borderRadius: 50 }}>
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][rating]}
            </span>
          )}
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: 24 }}>
        <label className="form-label" style={{ fontWeight: 800, color: "var(--green-dark)", fontSize: 13, textTransform: "uppercase" }}>Your Review *</label>
        <textarea
          className="premium-input form-input"
          rows={4}
          placeholder="Share your experience (taste, smell, freshness) with this farm produce..."
          value={text}
          onChange={e => { setText(e.target.value); setError(""); }}
          style={{ resize: "vertical", padding: 14 }}
        />
        <div style={{ fontSize: 11, color: "var(--gray600)", marginTop: 6, fontWeight: 700 }}>
          {text.length} characters {text.length < 10 ? `(${10 - text.length} more needed)` : "✓ Valid length"}
        </div>
      </div>

      <button
        className="btn-premium"
        style={{ width: "100%", padding: "14px", fontSize: 15, justifyContent: "center", borderRadius: 14 }}
        onClick={handleSubmit}
      >
        🌟 Submit Review
      </button>
    </div>
  );
}

// ── Main Product Detail Page ──────────────────────────────────────────────────
export default function ProductDetailPage({ product: p, addToCart, nav, addProductReview, wishlist = [], toggleWishlist, products = [], setSelectedProduct }) {
  const isWishlisted = wishlist.some(w => w.id === p.id);
  const related = products.filter(item => item.cat === p.cat && item.id !== p.id).slice(0, 4);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");

  const productReviews = p.reviews || [];
  const avgRating = p.rating || (productReviews.length
    ? (productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length).toFixed(1)
    : 4.5);

  return (
    <div style={{ paddingTop: 110, position: "relative" }}>
      {/* Background blobs */}
      <div className="glow-blob glow-blob-green" style={{ width: 400, height: 400, top: "20%", right: "10%" }} />
      <div className="glow-blob glow-blob-gold" style={{ width: 300, height: 300, bottom: "10%", left: "5%" }} />

      <div className="container" style={{ padding: "40px 20px", position: "relative", zIndex: 2 }}>
        <button
          style={{ 
            background: "rgba(255,255,255,0.7)", 
            backdropFilter: "blur(4px)",
            border: "1px solid var(--glass-border)", 
            color: "var(--green-dark)", 
            fontWeight: 800, 
            cursor: "pointer", 
            fontSize: 14, 
            marginBottom: 28,
            padding: "8px 18px",
            borderRadius: 12,
            transition: "all 0.3s"
          }}
          onClick={() => nav("products")}
          onMouseEnter={e => e.currentTarget.style.background = "var(--green-soft)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.7)"}
        >
          ← Back to Catalog
        </button>

        <div className="grid-2" style={{ gap: 60, alignItems: "start" }}>
          
          {/* Left Column: 3D-Tilt Product Showcase */}
          <div className="fade-in-left">
            <TiltCard maxTilt={15} style={{ borderRadius: 28 }}>
              <div 
                className="glass-panel" 
                style={{ 
                  borderRadius: 28, 
                  overflow: "hidden", 
                  background: "rgba(255, 255, 255, 0.75)",
                  padding: 12
                }}
              >
                <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: "clamp(260px, 45vw, 420px)" }}>
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} 
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,44,34,0.3), transparent)" }} />
                </div>
              </div>
            </TiltCard>

            {/* Micro Gallery */}
            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
              {[p.img, p.img, p.img].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  style={{
                    width: 76, 
                    height: 76, 
                    borderRadius: 16, 
                    objectFit: "cover",
                    border: "2.5px solid",
                    borderColor: i === 0 ? "var(--green)" : "rgba(255,255,255,0.8)",
                    boxShadow: i === 0 ? "0 8px 16px rgba(16,185,129,0.2)" : "none",
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.08)";
                    e.currentTarget.style.borderColor = "var(--green)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "scale(1)";
                    if (i !== 0) e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Specifications & CTAs */}
          <div className="fade-in-right">
            {p.organic && (
              <div 
                className="badge" 
                style={{ 
                  marginBottom: 16, 
                  fontSize: 13, 
                  background: "rgba(16,185,129,0.12)", 
                  color: "var(--green-dark)", 
                  fontWeight: 800,
                  padding: "5px 14px",
                  borderRadius: 50,
                  display: "inline-block"
                }}
              >
                🌿 Certified Farm Organic Sourced
              </div>
            )}
            
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", color: "var(--green-dark)", marginBottom: 12, fontWeight: 900 }}>
              {p.emoji} {p.name}
            </h1>

            {/* Rating Summary Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: s <= Math.round(avgRating) ? "var(--yellow)" : "#e2e8f0", fontSize: 20 }}>★</span>
                ))}
              </div>
              <span style={{ fontWeight: 900, color: "var(--green-dark)", fontSize: 18 }}>{avgRating}</span>
              <span style={{ color: "var(--gray600)", fontSize: 13, fontWeight: 700 }}>({productReviews.length} organic customer review{productReviews.length !== 1 ? "s" : ""})</span>
            </div>

            {/* Price Box */}
            <div style={{ fontSize: 44, fontWeight: 900, color: "var(--green)", fontFamily: "'Playfair Display', serif", marginBottom: 28, display: "flex", alignItems: "baseline", gap: 4 }}>
              ₹{p.price}<span style={{ fontSize: 20, color: "var(--gray600)", fontWeight: 700 }}>/{p.unit}</span>
            </div>

            {/* Specifications Box (Glassmorphic) */}
            <div className="glass-panel" style={{ padding: 24, marginBottom: 28, background: "rgba(255,255,255,0.65)" }}>
              {[
                ["🏡 Farm Origin", p.farm],
                ["⚖️ Packaging Weight", p.weight],
                ["✅ Natural Organic", p.organic ? "Yes, 100% Certified" : "Naturally Cultivated"],
                ["📦 In-stock Availability", `${p.stock} units ready`]
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(16,185,129,0.1)", fontSize: 14 }}>
                  <span style={{ fontWeight: 800, color: "var(--gray600)" }}>{label}</span>
                  <span style={{ fontWeight: 800, color: "var(--green-dark)" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(16,185,129,0.08)", borderRadius: 50, padding: "8px 8px" }}>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 34, height: 34, fontSize: 18, fontWeight: 900 }}>−</button>
                <span style={{ fontWeight: 900, fontSize: 20, minWidth: 32, textAlign: "center" }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)} style={{ width: 34, height: 34, fontSize: 18, fontWeight: 900 }}>+</button>
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: "var(--gray600)" }}>Subtotal = <span style={{ color: "var(--green-dark)", fontWeight: 900 }}>₹{p.price * qty}</span></span>
            </div>

            {/* CTA Action Buttons */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button 
                className="btn-premium" 
                style={{ flex: 2, padding: "16px 24px", fontSize: 16, borderRadius: 16, justifyContent: "center" }} 
                onClick={() => addToCart(p, qty)}
              >
                🛒 Add {qty} to Cart
              </button>
              <button 
                className="btn-premium-secondary" 
                style={{ flex: 1, padding: "16px 24px", fontSize: 15, borderRadius: 16, justifyContent: "center" }} 
                onClick={() => { addToCart(p, qty); nav("cart"); }}
              >
                ⚡ Order Now
              </button>
              {toggleWishlist && (
                <button
                  className="btn-premium-secondary"
                  style={{ padding: "16px 18px", fontSize: 18, borderRadius: 16, justifyContent: "center" }}
                  onClick={() => toggleWishlist(p)}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Tabbed Product Details Panels */}
        <div style={{ marginTop: 60 }}>
          <div style={{ display: "flex", borderBottom: "2px solid var(--gray200)", marginBottom: 32, gap: 8, overflowX: "auto" }}>
            {[
              ["desc", "📋 Harvest Description"],
              ["info", "ℹ️ Agricultural Info"],
              ["reviews", `⭐ Reviews (${productReviews.length})`]
            ].map(([t, label]) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "14px 28px",
                    background: "none",
                    border: "none",
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer",
                    color: active ? "var(--green-dark)" : "var(--gray600)",
                    borderBottom: active ? "3px solid var(--green)" : "3px solid transparent",
                    marginBottom: -2,
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap"
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Tab 1 Content */}
          {tab === "desc" && (
            <p style={{ lineHeight: 2, fontSize: 16, color: "var(--gray600)", fontWeight: 500, background: "rgba(255,255,255,0.4)", padding: 24, borderRadius: 16 }}>
              {p.desc}
            </p>
          )}

          {/* Tab 2 Content */}
          {tab === "info" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
              {[
                ["Harvest Category", p.cat],
                ["Farm Origin location", p.farm],
                ["Shipping Weight Options", p.weight],
                ["Farming Style", p.organic ? "Certified Organic Sourced" : "Naturally Grown"],
                ["Available Stock Units", `${p.stock} units`],
                ["Global Quality Rating", `${avgRating} / 5.0`]
              ].map(([k, v]) => (
                <div key={k} className="glass-panel" style={{ padding: 20, background: "rgba(255,255,255,0.65)" }}>
                  <div style={{ fontWeight: 800, color: "var(--gray600)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>{k}</div>
                  <div style={{ fontWeight: 900, color: "var(--green-dark)", fontSize: 16 }}>{v}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3 Content */}
          {tab === "reviews" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              
              {/* Stars summary graph (Glassmorphic) */}
              {productReviews.length > 0 && (
                <div 
                  className="glass-panel" 
                  style={{ 
                    padding: 32, 
                    display: "flex", 
                    gap: 40, 
                    alignItems: "center", 
                    flexWrap: "wrap",
                    background: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(245,158,11,0.06))",
                    border: "1px solid var(--glass-border)"
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 60, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: "var(--green-dark)", lineHeight: 1 }}>{avgRating}</div>
                    <div style={{ display: "flex", gap: 2, justifyContent: "center", margin: "10px 0" }}>
                      {[1,2,3,4,5].map(s => (
                        <span key={s} style={{ color: s <= Math.round(avgRating) ? "var(--yellow)" : "#e2e8f0", fontSize: 24 }}>★</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--gray600)", fontWeight: 800 }}>{productReviews.length} Reviews</div>
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 200 }}>
                    {[5,4,3,2,1].map(star => {
                      const count = productReviews.filter(r => r.rating === star).length;
                      const pct = productReviews.length ? (count / productReviews.length) * 100 : 0;
                      return (
                        <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: "var(--gray600)", width: 14 }}>{star}</span>
                          <span style={{ color: "var(--yellow)", fontSize: 14 }}>★</span>
                          <div style={{ flex: 1, background: "rgba(0,0,0,0.05)", borderRadius: 50, height: 10, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, background: "var(--yellow)", height: "100%", borderRadius: 50, transition: "width 0.6s ease" }} />
                          </div>
                          <span style={{ fontSize: 12, color: "var(--gray600)", fontWeight: 700, width: 20 }}>{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Reviews Card Stack */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 20 }}>
                {productReviews.map((r, i) => (
                  <ReviewCard key={i} r={r} isNew={r.isNew} />
                ))}
              </div>

              {/* Add review form */}
              <ReviewForm productId={p.id} onSubmit={addProductReview} />
            </div>
          )}
        </div>

        {/* Related Products — "Customers also bought" */}
        {related.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "var(--green-dark)", marginBottom: 20 }}>
              🛍 Customers also bought
            </h2>
            <div className="grid-4">
              {related.map(item => {
                const mrp = Math.round(item.price * 1.22);
                const discount = Math.round(100 - (item.price / mrp) * 100);
                return (
                  <TiltCard key={item.id} maxTilt={8} style={{ borderRadius: 20 }}>
                    <div
                      className="glass-panel"
                      onClick={() => { setSelectedProduct && setSelectedProduct(item); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      style={{ overflow: "hidden", borderRadius: 20, cursor: "pointer", position: "relative" }}
                    >
                      <span className="discount-badge">{discount}% OFF</span>
                      <div className="zoom-media" style={{ height: 140 }}>
                        <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ padding: 14 }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: "var(--green-dark)", marginBottom: 6 }}>
                          {item.emoji} {item.name}
                        </div>
                        <div className="price-row">
                          <span className="price-now">₹{item.price}</span>
                          <span className="price-mrp">₹{mrp}</span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
