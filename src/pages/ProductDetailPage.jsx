import React, { useState } from 'react';
import { REVIEWS } from '../data/mockData';

export default function ProductDetailPage({ product: p, addToCart, nav }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");

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
                    width: 72, 
                    height: 72, 
                    borderRadius: 12, 
                    objectFit: "cover", 
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
            <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(26px, 3vw, 40px)", color: "var(--green-dark)", marginBottom: 8 }}>{p.emoji} {p.name}</h1>
            

            
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
              <button className="btn-primary" style={{ flex: 1, padding: "14px 20px", fontSize: 15 }} onClick={() => addToCart(p, qty)}>🛒 Add {qty} to Cart</button>
              <button className="btn-secondary" style={{ padding: "14px 20px", fontSize: 15 }} onClick={() => { addToCart(p, qty); nav("cart"); }}>⚡ Buy Now</button>
            </div>
          </div>
        </div>

        {/* Tabbed Info */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e5e7eb", marginBottom: 24 }}>
            {[
              ["desc", "📋 Description"],
              ["info", "ℹ️ Product Info"],
              ["reviews", "⭐ Reviews"]
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
                ["Rating", `${p.rating} / 5`]
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#f9fafb", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontWeight: 700, color: "var(--gray600)", fontSize: 12, textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontWeight: 800, color: "var(--green-dark)" }}>{v}</div>
                </div>
              ))}
            </div>
          )}
          
          {tab === "reviews" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
              {REVIEWS.slice(0, 3).map((r, i) => (
                <div key={i} style={{ background: "#f9fafb", borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: r.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{r.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{r.name}</div>
                      <div className="stars" style={{ fontSize: 13 }}>{"★".repeat(r.rating)}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--gray600)", lineHeight: 1.7 }}>"{r.text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
