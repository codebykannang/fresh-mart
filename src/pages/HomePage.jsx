import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { REVIEWS } from '../data/mockData';

export default function HomePage({ nav, products, addToCart, setSelectedProduct }) {
  const featured = products.slice(0, 4);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveReview(a => (a + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero-section hero-bg" style={{ minHeight: "100vh", paddingTop: 80 }}>
        <div className="container hero-grid">
          <div className="fade-in-left">
            <div className="badge badge-green" style={{ marginBottom: 16, fontSize: 13 }}><span className="leaf-sway">🌿</span> 100% Farm Fresh • No Middlemen</div>
            <h1 className="hero-title">Fresh Farm Products<br /><span>Delivered to Your</span><br />Doorstep 🚚</h1>
            <p style={{ fontSize: 17, color: "var(--gray600)", margin: "24px 0", lineHeight: 1.8 }}>
              Direct from our farms in Tamil Nadu. Hand-picked, naturally grown, packed with love.
              Experience the true taste of fresh harvest every single day.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
              <button className="btn-primary pulse-btn" style={{ fontSize: 16, padding: "14px 32px" }} onClick={() => nav("products")}>🛍 Shop Now</button>
              <button className="btn-secondary" style={{ fontSize: 16 }} onClick={() => nav("products")}>🥭 Order Fresh Fruits</button>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
              {[["🌾", "500+ Farms"], ["🚚", "Same Day"], ["🌿", "100% Organic"]].map(([e, l]) => (
                <div key={l} style={{ textAlign: "center" }} className="fade-in-up">
                  <div style={{ fontSize: 24 }} className={e === "🌿" || e === "🌾" ? "leaf-sway" : ""}>{e}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--green-dark)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="fade-in-right" style={{ position: "relative", display: "flex", justifySelf: "center", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: 400, aspectRatio: "1 / 1", margin: "0 auto" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "radial-gradient(circle,rgba(34,197,94,.15) 0%,rgba(251,191,36,.1) 100%)", position: "absolute" }} />
            <div className="float" style={{ position: "relative", zIndex: 2, width: "85%", height: "85%" }}>
              <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&q=80" alt="Fresh Fruits" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", boxShadow: "0 20px 60px rgba(22,163,74,.3)", border: "6px solid #fff" }} />
            </div>
            {[["🥭", "top:-5%", "right:-5%"], ["🍋", "bottom:5%", "left:-5%"], ["🥥", "top:50%", "left:-10%"], ["🌿", "bottom:10%", "right:-10%"]].map(([e, t, l], i) => {
              const posStyle = {
                position: "absolute",
                width: "clamp(40px, 12vw, 56px)",
                height: "clamp(40px, 12vw, 56px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(20px, 6vw, 28px)",
                animationDelay: `${i * .5}s`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                zIndex: 3
              };
              posStyle[t.split(":")[0]] = t.split(":")[1];
              posStyle[l.split(":")[0]] = l.split(":")[1];
              return (
                <div key={i} className="float glass-card" style={posStyle}>
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section" style={{ background: "#f0fdf4" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you need from our fresh farm collections</p>
          </div>
          <div className="grid-4">
            {[
              { cat: "Fruits", emoji: "🍎", color: "#fef9c3", border: "#fbbf24", img: "/img/mango.png" },
              { cat: "Vegetables", emoji: "🥦", color: "#dcfce7", border: "#4ade80", img: "/img/brinjal.png" },
              { cat: "Coconut", emoji: "🥥", color: "#f0fdf4", border: "#86efac", img: "/img/coconut.png" },
              { cat: "Seeds", emoji: "🌱", color: "#f7fee7", border: "#a3e635", img: "https://loremflickr.com/400/400/seeds,farm/all" },
            ].map(c => (
              <div key={c.cat} className="card-3d" onClick={() => nav("products")} style={{ cursor: "pointer" }}>
                <div className="card-3d-inner" style={{ background: c.color, borderRadius: 20, border: `2px solid ${c.border}`, overflow: "hidden", padding: "0 0 16px" }}>
                  <img src={c.img} alt={c.cat} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ padding: "12px 16px 0", textAlign: "center" }}>
                    <div style={{ fontSize: 32, marginBottom: 4 }}>{c.emoji}</div>
                    <div style={{ fontFamily: "Playfair Display,serif", fontWeight: 700, fontSize: 20, color: "var(--green-dark)" }}>{c.cat}</div>
                    <div style={{ fontSize: 12, color: "var(--gray600)", marginTop: 4 }}>{products.filter(p => p.cat === c.cat).length} products</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Hand-picked freshness, delivered straight from our farms</p>
          </div>
          <div className="grid-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} nav={nav} setSelectedProduct={setSelectedProduct} delay={i * .1} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: "14px 40px" }} onClick={() => nav("products")}>View All Products →</button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" style={{ background: "linear-gradient(135deg,#f0fdf4,#fef9c3)" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="section-title">Why Jaya Lakshmi?</h2>
            <p className="section-subtitle">We deliver more than just products – we deliver trust</p>
          </div>
          <div className="grid-4">
            {[
              { icon: "🌾", title: "Farm Direct", desc: "No middlemen. Products travel directly from our farms to your home.", color: "#dcfce7" },
              { icon: "🌿", title: "100% Organic", desc: "Grown without harmful chemicals. Safe for your family.", color: "#fef9c3" },
              { icon: "🚚", title: "Same Day Delivery", desc: "Order before 10 AM and get it delivered the same day.", color: "#ffedd5" },
              { icon: "💚", title: "Quality Guaranteed", desc: "Not satisfied? We replace or refund – no questions asked.", color: "#f0f9ff" },
            ].map(w => (
              <div key={w.title} className="tilt" style={{ background: w.color, padding: 28, borderRadius: 20, textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{w.icon}</div>
                <h3 style={{ fontFamily: "Playfair Display,serif", fontSize: 20, color: "var(--green-dark)", marginBottom: 8 }}>{w.title}</h3>
                <p style={{ fontSize: 14, color: "var(--gray600)", lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "linear-gradient(135deg,#14532d,#16a34a,#22c55e)", padding: "60px 20px", textAlign: "center" }}>
        <div className="float" style={{ fontSize: 56, marginBottom: 16 }}>🌾</div>
        <h2 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(28px,4vw,48px)", color: "#fff", marginBottom: 12 }}>Ready for Farm-Fresh Goodness?</h2>
        <p style={{ color: "rgba(255,255,255,.85)", fontSize: 17, marginBottom: 28 }}>Join 2,000+ happy families ordering fresh produce every week</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ background: "#fff", color: "var(--green-dark)", border: "none", padding: "14px 36px", borderRadius: 50, fontFamily: "Nunito", fontWeight: 800, fontSize: 16, cursor: "pointer" }} onClick={() => nav("products")}>🛍 Order Now</button>
          <button style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.7)", padding: "14px 36px", borderRadius: 50, fontFamily: "Nunito", fontWeight: 800, fontSize: 16, cursor: "pointer" }} onClick={() => nav("contact")}>📞 Contact Us</button>
        </div>
      </section>
    </div>
  );
}
