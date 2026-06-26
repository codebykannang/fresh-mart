import React from 'react';

export default function ProductCard({ product: p, addToCart, setSelectedProduct, nav, delay = 0 }) {
  const handleView = () => {
    setSelectedProduct(p);
    nav("detail");
  };

  return (
    <div className="product-card fade-in-up" style={{ animationDelay: `${delay}s` }} onClick={handleView}>
      {p.organic && <div className="label-organic">🌿 Organic</div>}
      <div style={{ overflow: "hidden", height: 200, position: "relative" }}>
        <img className="product-card-img" src={p.img} alt={p.name} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.3),transparent)" }} />
        <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(255,255,255,.9)", borderRadius: 8, padding: "4px 10px", fontWeight: 800, color: "var(--green-dark)", fontSize: 13 }}>₹{p.price}/{p.unit}</div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4, color: "var(--gray800)" }}>{p.emoji} {p.name}</div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-green">{p.cat}</span>
          {p.stock < 50 && <span className="badge badge-red">Low Stock</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-primary" style={{ flex: 1, padding: "9px 12px", fontSize: 13 }} onClick={e => { e.stopPropagation(); addToCart(p); }}>🛒 Add to Cart</button>
          <button className="btn-secondary" style={{ padding: "9px 14px", fontSize: 13 }} onClick={e => { e.stopPropagation(); handleView(); }}>👁</button>
        </div>
      </div>
    </div>
  );
}
