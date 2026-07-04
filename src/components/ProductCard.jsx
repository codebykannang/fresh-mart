import { useState } from 'react';
import TiltCard from './TiltCard';
import SmartImage from './SmartImage';

export default function ProductCard({ product: p, addToCart, setSelectedProduct, nav, delay = 0, wishlist = [], toggleWishlist }) {
  const [qty, setQty] = useState(1);
  const mrp = Math.round(p.price * 1.22);
  const discount = Math.round(100 - (p.price / mrp) * 100);
  const isWishlisted = wishlist.some(w => w.id === p.id);

  const handleView = () => {
    setSelectedProduct(p);
    nav("detail");
  };

  return (
    <TiltCard
      className="fade-in-up"
      style={{ animationDelay: `${delay}s`, borderRadius: '24px' }}
      maxTilt={10}
    >
      <div
        className="glass-panel"
        onClick={handleView}
        style={{
          overflow: "hidden",
          cursor: "pointer",
          background: "rgba(255, 255, 255, 0.75)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          position: "relative"
        }}
      >
        <span className="discount-badge">{discount}% OFF</span>

        {toggleWishlist && (
          <button
            onClick={e => { e.stopPropagation(); toggleWishlist(p); }}
            style={{
              position: "absolute", top: 48, right: 12, zIndex: 10,
              width: 30, height: 30, borderRadius: "50%", border: "none",
              background: "rgba(255,255,255,0.9)", cursor: "pointer", fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)", transition: "transform 0.2s"
            }}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        )}

        {p.organic && (
          <div className="label-organic" style={{
            position: "absolute", top: 12, left: 12, zIndex: 10,
            background: "rgba(6, 78, 59, 0.85)", backdropFilter: "blur(6px)",
            color: "#fff", padding: "4px 12px", borderRadius: "50px",
            fontSize: "11px", fontWeight: "900", border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}>
            🌿 Organic
          </div>
        )}

        <div className="zoom-media" style={{ height: 180, position: "relative" }}>
          <SmartImage
            className="product-card-img"
            src={p.img}
            alt={p.name}
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,44,34,0.4), transparent)" }} />
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)",
            borderRadius: 10, padding: "5px 10px", fontWeight: 900,
            color: "var(--green-dark)", fontSize: 11, boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", gap: 4
          }}>
            ⭐ {p.rating}
          </div>
        </div>

        <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 8, color: "var(--green-dark)" }}>
              {p.emoji} {p.name}
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <span className="badge" style={{ background: "rgba(16, 185, 129, 0.12)", color: "var(--green-dark)", fontWeight: "800", fontSize: "11px", padding: "3px 10px", borderRadius: "50px" }}>{p.cat}</span>
              {p.stock < 50 && (
                <span className="badge" style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--red)", fontWeight: "800", fontSize: "11px", padding: "3px 10px", borderRadius: "50px" }}>
                  Low Stock
                </span>
              )}
            </div>

            <div className="price-row" style={{ marginBottom: 16 }}>
              <span className="price-now">₹{p.price}</span>
              <span className="price-mrp">₹{mrp}</span>
              <span style={{ fontSize: 11, color: "var(--gray600)", fontWeight: 700 }}>/{p.unit}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: "auto", alignItems: "center" }}>
            <div className="qty-stepper" onClick={e => e.stopPropagation()}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              className="btn-premium"
              style={{ flex: 1, padding: "10px 12px", fontSize: 13, borderRadius: 12, justifyContent: "center" }}
              onClick={e => { e.stopPropagation(); addToCart(p, qty); }}
            >
              🛒 Add
            </button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
