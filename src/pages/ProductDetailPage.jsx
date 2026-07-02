import React, { useState } from 'react';

// ── Star Rating Selector ─────────────────────────────────────────────────────
function StarSelector({ value, onChange, size = 28 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          style={{
            fontSize: size,
            cursor: "pointer",
            color: star <= (hovered || value) ? "#fbbf24" : "#e5e7eb",
            transition: "color 0.15s, transform 0.15s",
            transform: star <= (hovered || value) ? "scale(1.2)" : "scale(1)",
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
    <div className={isNew ? "bounce-in" : ""} style={{
      background: isNew ? "linear-gradient(135deg,#f0fdf4,#dcfce7)" : "#f9fafb",
      borderRadius: 16,
      padding: 20,
      border: isNew ? "2px solid #86efac" : "1px solid #f0fdf4"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          background: r.color || "var(--green)",
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, flexShrink: 0
        }}>
          {r.avatar || r.name?.[0] || "?"}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, color: "var(--gray800)" }}>{r.name}</div>
          <div style={{ display: "flex", gap: 1 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: s <= r.rating ? "#fbbf24" : "#e5e7eb", fontSize: 13 }}>★</span>
            ))}
          </div>
        </div>
        {isNew && (
          <span className="badge badge-green" style={{ marginLeft: "auto", fontSize: 10 }}>Just Now</span>
        )}
      </div>
      <p style={{ fontSize: 14, color: "var(--gray600)", lineHeight: 1.7, margin: 0 }}>"{r.text}"</p>
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
      <div className="bounce-in" style={{
        background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
        border: "2px solid #86efac"
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
        <div style={{ fontWeight: 800, fontSize: 17, color: "var(--green-dark)", marginBottom: 6 }}>
          Thanks for your review, {name}!
        </div>
        <div style={{ fontSize: 14, color: "var(--gray600)" }}>
          Your feedback helps other customers make better decisions.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: 24,
      border: "2px solid var(--green-soft)",
      boxShadow: "0 4px 20px rgba(22,163,74,0.08)"
    }}>
      <h4 style={{ fontFamily: "Playfair Display,serif", fontSize: 18, color: "var(--green-dark)", marginBottom: 20 }}>
        ✍️ Write a Review
      </h4>

      {error && (
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 14 }}>
          {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Your Name *</label>
        <input
          className="form-input"
          placeholder="e.g. Priya Rajan"
          value={name}
          onChange={e => { setName(e.target.value); setError(""); }}
        />
      </div>

      <div className="form-group">
        <label className="form-label" style={{ marginBottom: 8 }}>Your Rating *</label>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <StarSelector value={rating} onChange={r => { setRating(r); setError(""); }} />
          {rating > 0 && (
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][rating]}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Your Review *</label>
        <textarea
          className="form-input"
          rows={3}
          placeholder="Share your experience with this product..."
          value={text}
          onChange={e => { setText(e.target.value); setError(""); }}
          style={{ resize: "vertical" }}
        />
        <div style={{ fontSize: 11, color: "var(--gray600)", marginTop: 4 }}>
          {text.length} characters {text.length < 10 ? `(${10 - text.length} more needed)` : "✓"}
        </div>
      </div>

      <button
        className="btn-primary pulse-btn"
        style={{ width: "100%", padding: "13px", fontSize: 15, justifyContent: "center" }}
        onClick={handleSubmit}
      >
        🌟 Submit Review
      </button>
    </div>
  );
}

// ── Main Product Detail Page ──────────────────────────────────────────────────
export default function ProductDetailPage({ product: p, addToCart, nav, addProductReview }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");

  const productReviews = p.reviews || [];
  const avgRating = p.rating || (productReviews.length
    ? (productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length).toFixed(1)
    : 4.5);

  return (
    <div style={{ paddingTop: 90 }}>
      <div className="container" style={{ padding: "40px 20px" }}>
        <button
          style={{ background: "none", border: "none", color: "var(--green)", fontWeight: 700, cursor: "pointer", fontSize: 15, marginBottom: 20 }}
          onClick={() => nav("products")}
        >
          ← Back to Products
        </button>

        <div className="grid-2" style={{ gap: 48, alignItems: "start" }}>
          {/* Image Gallery */}
          <div className="fade-in-left">
            <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,.12)" }}>
              <img src={p.img} alt={p.name} style={{ width: "100%", height: "clamp(250px, 40vw, 400px)", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              {[p.img, p.img, p.img].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  style={{
                    width: 72, height: 72, borderRadius: 12, objectFit: "cover",
                    border: "2px solid",
                    borderColor: i === 0 ? "var(--green)" : "var(--gray200)",
                    cursor: "pointer"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Info Block */}
          <div className="fade-in-right">
            {p.organic && <div className="badge badge-green" style={{ marginBottom: 12, fontSize: 13 }}>🌿 Certified Organic</div>}
            <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(26px, 3vw, 40px)", color: "var(--green-dark)", marginBottom: 8 }}>
              {p.emoji} {p.name}
            </h1>

            {/* Rating Summary Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: s <= Math.round(avgRating) ? "#fbbf24" : "#e5e7eb", fontSize: 20 }}>★</span>
                ))}
              </div>
              <span style={{ fontWeight: 800, color: "var(--green-dark)", fontSize: 16 }}>{avgRating}</span>
              <span style={{ color: "var(--gray600)", fontSize: 13 }}>({productReviews.length} review{productReviews.length !== 1 ? "s" : ""})</span>
            </div>

            <div style={{ fontSize: 40, fontWeight: 900, color: "var(--green)", fontFamily: "Playfair Display,serif", marginBottom: 20 }}>
              ₹{p.price}<span style={{ fontSize: 18, color: "var(--gray600)" }}>/{p.unit}</span>
            </div>

            <div style={{ background: "#f0fdf4", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              {[
                ["🏡 Farm", p.farm],
                ["⚖️ Weight Options", p.weight],
                ["✅ Organic", p.organic ? "Yes, Certified" : "No"],
                ["📦 Stock Availability", `${p.stock} units available`]
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #dcfce7", fontSize: 14 }}>
                  <span style={{ fontWeight: 700, color: "var(--gray600)" }}>{label}</span>
                  <span style={{ fontWeight: 600, color: "var(--green-dark)" }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f0fdf4", borderRadius: 50, padding: "6px 6px" }}>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span style={{ fontWeight: 800, fontSize: 18, minWidth: 30, textAlign: "center" }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <span style={{ fontWeight: 700, fontSize: 16, color: "var(--gray600)" }}>= ₹{p.price * qty}</span>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ flex: 1, padding: "14px 20px", fontSize: 15 }} onClick={() => addToCart(p, qty)}>
                🛒 Add {qty} to Cart
              </button>
              <button className="btn-secondary" style={{ padding: "14px 20px", fontSize: 15 }} onClick={() => { addToCart(p, qty); nav("cart"); }}>
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Info */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e5e7eb", marginBottom: 24 }}>
            {[
              ["desc", "📋 Description"],
              ["info", "ℹ️ Product Info"],
              ["reviews", `⭐ Reviews (${productReviews.length})`]
            ].map(([t, label]) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "12px 24px",
                  background: "none",
                  border: "none",
                  fontFamily: "Nunito",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  color: tab === t ? "var(--green)" : "var(--gray600)",
                  borderBottom: tab === t ? "3px solid var(--green)" : "3px solid transparent",
                  marginBottom: -2,
                  transition: "all .2s"
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "desc" && <p style={{ lineHeight: 1.9, fontSize: 16, color: "var(--gray600)" }}>{p.desc}</p>}

          {tab === "info" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
              {[
                ["Category", p.cat],
                ["Farm Origin", p.farm],
                ["Weight Options", p.weight],
                ["Organic", p.organic ? "Yes" : "No"],
                ["Stock", `${p.stock} units`],
                ["Rating", `${avgRating} / 5`]
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#f9fafb", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontWeight: 700, color: "var(--gray600)", fontSize: 12, textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontWeight: 800, color: "var(--green-dark)" }}>{v}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Rating Summary */}
              {productReviews.length > 0 && (
                <div style={{ background: "linear-gradient(135deg,#f0fdf4,#fef9c3)", borderRadius: 20, padding: 24, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 56, fontWeight: 900, fontFamily: "Playfair Display,serif", color: "var(--green-dark)", lineHeight: 1 }}>{avgRating}</div>
                    <div style={{ display: "flex", gap: 2, justifyContent: "center", margin: "6px 0" }}>
                      {[1,2,3,4,5].map(s => (
                        <span key={s} style={{ color: s <= Math.round(avgRating) ? "#fbbf24" : "#e5e7eb", fontSize: 22 }}>★</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--gray600)", fontWeight: 700 }}>{productReviews.length} reviews</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    {[5,4,3,2,1].map(star => {
                      const count = productReviews.filter(r => r.rating === star).length;
                      const pct = productReviews.length ? (count / productReviews.length) * 100 : 0;
                      return (
                        <div key={star} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gray600)", width: 14 }}>{star}</span>
                          <span style={{ color: "#fbbf24", fontSize: 13 }}>★</span>
                          <div style={{ flex: 1, background: "#e5e7eb", borderRadius: 50, height: 8, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, background: "#fbbf24", height: "100%", borderRadius: 50, transition: "width 0.5s ease" }} />
                          </div>
                          <span style={{ fontSize: 12, color: "var(--gray600)", width: 20 }}>{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Review List */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
                {productReviews.map((r, i) => (
                  <ReviewCard key={i} r={r} isNew={r.isNew} />
                ))}
              </div>

              {/* Submit Form */}
              <ReviewForm productId={p.id} onSubmit={addProductReview} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
