import ProductCard from '../components/ProductCard';
import ThreeDScene from '../components/ThreeDScene';
import TiltCard from '../components/TiltCard';
import ScrollReveal from '../components/ScrollReveal';
import Parallax from '../components/Parallax';

const OFFERS = [
  "🎉 FLAT 10% OFF on your first order — use code FRESH10",
  "🚚 FREE delivery on orders above ₹499",
  "🥭 Alphonso Mango Season is here — order now",
  "🌿 100% Organic • Zero Chemical Farming",
  "⚡ Same-day dispatch for orders before 10 AM",
  "💚 500+ Partner Farms across Tamil Nadu",
];

const CATEGORIES = [
  { cat: "Fruits", emoji: "🍎", img: "/img/mango.png" },
  { cat: "Vegetables", emoji: "🥦", img: "/img/brinjal.png" },
  { cat: "Coconut", emoji: "🥥", img: "/img/coconut.png" },
  { cat: "Seeds", emoji: "🌱", img: "/img/seeds.jpg" },
  { cat: "Combos", emoji: "🧺", img: "/img/basket.png" },
];

const TRUST = [
  { icon: "🌾", title: "Direct Farm Sourcing", desc: "Bypasses cold storages and middlemen. Straight from Bodinayakanur orchards." },
  { icon: "🌿", title: "Certified Organic", desc: "Zero synthetic chemical agents. Safe, wholesome nutrition for your family." },
  { icon: "🚚", title: "Express Dispatch", desc: "Dispatch within 3 hours. Order by 10 AM for same-day doorstep delivery." },
  { icon: "💚", title: "Freshness Promise", desc: "Not happy with quality? Instant return or exchange — no questions asked." },
];

export default function HomePage({ nav, products, addToCart, setSelectedProduct, wishlist = [], toggleWishlist }) {
  const featured = products.slice(0, 4);
  const deals = products.slice(0, 8);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="glow-blob glow-blob-green" />
      <div className="glow-blob glow-blob-gold" />

      {/* HERO — FULL BLEED REAL PHOTO BACKGROUND (Amazon/DMart banner style) */}
      <section className="hero-photo-section" style={{ paddingTop: 110 }}>
        <Parallax speed={0.28} className="hero-photo-bg" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1920&q=80')"
        }} />
        <div className="hero-photo-overlay" />

        <div className="container hero-grid" style={{ position: "relative", zIndex: 2 }}>

          <div className="fade-in-left" style={{ position: "relative", zIndex: 10 }}>
            <div className="badge badge-green" style={{ marginBottom: 20, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>
              <span className="leaf-sway">🌿</span> 100% Farm Fresh • TVKK Nagar, Bodinayakanur
            </div>

            <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}>
              Premium Farm <br />
              <span style={{ background: "linear-gradient(135deg, #6ee7b7, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Fresh Produce</span> <br />
              Delivered Daily 🚚
            </h1>

            <p style={{ fontSize: 17, margin: "24px 0", lineHeight: 1.8, fontWeight: 500, maxWidth: 520 }}>
              Directly from our organic orchards in Bodinayakanur, Theni. Hand-picked at peak ripeness, naturally farmed, and shipped straight to your table.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 32 }}>
              <button
                className="btn-premium"
                style={{ fontSize: 16, padding: "14px 36px", borderRadius: 16, cursor: "pointer" }}
                onClick={() => nav("products")}
              >
                🛍 Shop Fresh Produce
              </button>
              <button
                className="btn-premium-secondary"
                style={{ fontSize: 16, padding: "14px 32px", borderRadius: 16, cursor: "pointer", background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
                onClick={() => nav("products")}
              >
                🥭 Alphonso Mangoes
              </button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
              {[["🌾", "500+ Partner Farms"], ["🚚", "Lightning Delivery"], ["🌿", "Zero Chemical Farming"]].map(([e, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 10 }} className="fade-in-up">
                  <div style={{ fontSize: 32 }} className={e === "🌿" || e === "🌾" ? "leaf-sway" : ""}>{e}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.3, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Three.js interactive canvas */}
          <div className="hero-image-wrapper fade-in-right mobile-hide" style={{ height: "100%", minHeight: "450px", position: "relative" }}>
            <ThreeDScene />

            <div className="glass-panel" style={{ position: "absolute", top: "10%", right: "5%", padding: "12px 18px", borderRadius: 16, zIndex: 10, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.85)" }}>
              <span style={{ fontSize: 24 }}>🥭</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 900, color: "var(--green-dark)" }}>Alphonso</div>
                <div style={{ fontSize: 10, color: "var(--gray600)" }}>Top Rated</div>
              </div>
            </div>

            <div className="glass-panel" style={{ position: "absolute", bottom: "15%", left: "5%", padding: "12px 18px", borderRadius: 16, zIndex: 10, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.85)" }}>
              <span style={{ fontSize: 24 }}>🥥</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 900, color: "var(--green-dark)" }}>Tender Coconut</div>
                <div style={{ fontSize: 10, color: "var(--green)" }}>100% Organic</div>
              </div>
            </div>
          </div>

          {/* Mobile hero — full-width real photo card, replaces heavy 3D canvas */}
          <div className="mobile-show" style={{ display: "none" }}>
            <ScrollReveal direction="zoom">
              <div style={{
                borderRadius: 24, overflow: "hidden", height: 220, position: "relative",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.2)"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80"
                  alt="Fresh farm produce basket"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* OFFER STRIP — DMart-style scrolling ticker */}
      <div className="offer-strip">
        <div className="offer-strip-track">
          {[...OFFERS, ...OFFERS].map((o, i) => (
            <span className="offer-strip-item" key={i}>{o}</span>
          ))}
        </div>
      </div>

      {/* CATEGORY RAIL — Amazon-style round icons */}
      <section className="section" style={{ paddingBottom: 10, position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal direction="up">
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "var(--green-dark)", marginBottom: 16 }}>Shop by Category</h2>
          </ScrollReveal>
          <div className="category-rail">
            {CATEGORIES.map((c, i) => (
              <ScrollReveal key={c.cat} direction="zoom" delay={i * 0.06}>
                <div className="category-pill-3d" onClick={() => nav("products")}>
                  <div className="category-pill-3d-circle">
                    <img src={c.img} alt={c.cat} loading="lazy" />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "var(--green-dark)", textAlign: "center" }}>
                    {c.emoji} {c.cat}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY'S DEALS — horizontal scroll deal cards */}
      <section className="section" style={{ background: "rgba(16, 185, 129, 0.03)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal direction="left">
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "var(--green-dark)" }}>⚡ Today's Deals</h2>
              <span onClick={() => nav("products")} style={{ fontSize: 13, fontWeight: 800, color: "var(--green)", cursor: "pointer" }}>See all →</span>
            </div>
          </ScrollReveal>

          <div className="deal-rail">
            {deals.map((p, i) => {
              const mrp = Math.round(p.price * 1.22);
              const discount = Math.round(100 - (p.price / mrp) * 100);
              return (
                <ScrollReveal key={p.id} direction="up" delay={i * 0.05} className="deal-card">
                  <TiltCard maxTilt={8} style={{ borderRadius: 20, height: "100%" }}>
                    <div
                      className="glass-panel"
                      onClick={() => { setSelectedProduct(p); nav("detail"); }}
                      style={{ position: "relative", overflow: "hidden", cursor: "pointer", padding: 0, borderRadius: 20 }}
                    >
                      <span className="discount-badge">{discount}% OFF</span>
                      <div className="zoom-media" style={{ height: 130 }}>
                        <img src={p.img} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ padding: 14 }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: "var(--green-dark)", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {p.emoji} {p.name}
                        </div>
                        <div className="price-row">
                          <span className="price-now">₹{p.price}</span>
                          <span className="price-mrp">₹{mrp}</span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="section" style={{ paddingTop: 10, position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal direction="up">
            <div className="trust-strip">
              {[["🚚", "Free Delivery ₹499+"], ["⚡", "Same-Day Dispatch"], ["🔄", "Easy Returns"], ["🔒", "Secure Payments"]].map(([icon, label]) => (
                <div className="trust-strip-item" key={label}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "var(--green-dark)" }}>{label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="section" style={{ position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal direction="up">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 className="section-title" style={{ color: "var(--green-dark)", fontWeight: 900, fontSize: "2.5rem" }}>Featured Freshness</h2>
              <p className="section-subtitle" style={{ color: "var(--gray600)", fontWeight: 500 }}>Harvested this morning, ready for same-day delivery</p>
            </div>
          </ScrollReveal>

          <div className="grid-4">
            {featured.map((p, i) => (
              <ScrollReveal key={p.id} direction="up" delay={i * 0.08}>
                <ProductCard product={p} addToCart={addToCart} nav={nav} setSelectedProduct={setSelectedProduct} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button
              className="btn-premium"
              style={{ fontSize: 16, padding: "14px 44px", borderRadius: 16 }}
              onClick={() => nav("products")}
            >
              View Full catalog →
            </button>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="section" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.03) 0%, rgba(245,158,11,0.03) 100%)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal direction="up">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 className="section-title" style={{ color: "var(--green-dark)", fontWeight: 900, fontSize: "2.5rem" }}>Why Choose Jaya Lakshmi?</h2>
              <p className="section-subtitle" style={{ color: "var(--gray600)", fontWeight: 500 }}>The direct-from-farm difference you can taste and feel</p>
            </div>
          </ScrollReveal>

          <div className="grid-4">
            {TRUST.map((w, i) => (
              <ScrollReveal key={w.title} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
                <TiltCard maxTilt={8} style={{ borderRadius: 24, height: "100%" }}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: 32,
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ fontSize: 52, marginBottom: 16 }} className="leaf-sway">{w.icon}</div>
                    <h3 style={{ fontSize: 20, color: "var(--green-dark)", marginBottom: 12, fontWeight: 900 }}>{w.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--gray600)", lineHeight: 1.7, fontWeight: 500 }}>{w.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <ScrollReveal direction="zoom">
        <section
          className="glass-panel-dark"
          style={{
            margin: "80px 24px",
            padding: "80px 40px",
            textAlign: "center",
            position: "relative",
            zIndex: 3,
            overflow: "hidden",
            borderRadius: 32,
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.3)"
          }}
        >
          <div style={{ position: "absolute", top: "-50%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-50%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />

          <div className="float" style={{ fontSize: 64, marginBottom: 20 }}>🌾</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 54px)", color: "#fff", marginBottom: 16, fontWeight: 900 }}>
            Taste Real Farm Freshness Today
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, marginBottom: 36, maxWidth: 600, margin: "0 auto 36px", fontWeight: 500 }}>
            Join over 2,000+ local families in Bodinayakanur and surrounding areas receiving delicious fresh boxes weekly.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn-premium"
              style={{ padding: "16px 40px", borderRadius: 16, fontSize: 16, cursor: "pointer" }}
              onClick={() => nav("products")}
            >
              🛍 Start Shopping Now
            </button>
            <button
              className="btn-premium-secondary"
              style={{ padding: "16px 40px", borderRadius: 16, fontSize: 16, cursor: "pointer", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
              onClick={() => nav("contact")}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              📞 Get Support
            </button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
