import ScrollReveal from '../components/ScrollReveal';

export default function WishlistPage({ wishlist, toggleWishlist, addToCart, nav, setSelectedProduct }) {
  return (
    <div style={{ paddingTop: 100, position: "relative", minHeight: "70vh" }}>
      <div className="glow-blob glow-blob-green" style={{ width: 300, height: 300, top: "10%", left: "5%" }} />

      <div className="container section" style={{ position: "relative", zIndex: 2 }}>
        <ScrollReveal direction="up">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 className="section-title" style={{ color: "var(--green-dark)", fontWeight: 900 }}>❤️ Your Wishlist</h1>
            <p className="section-subtitle" style={{ color: "var(--gray600)", fontWeight: 500 }}>
              {wishlist.length === 0 ? "Nothing saved yet" : `${wishlist.length} item${wishlist.length !== 1 ? "s" : ""} saved for later`}
            </p>
          </div>
        </ScrollReveal>

        {wishlist.length === 0 ? (
          <ScrollReveal direction="zoom">
            <div className="glass-panel" style={{ textAlign: "center", padding: "80px 40px", background: "rgba(255,255,255,0.6)" }}>
              <div style={{ fontSize: 64 }} className="float">💚</div>
              <p style={{ fontSize: 20, fontWeight: 900, marginTop: 16, color: "var(--green-dark)" }}>Your wishlist is empty</p>
              <p style={{ fontSize: 14, color: "var(--gray600)", marginTop: 6, marginBottom: 24 }}>Tap the heart icon on any product to save it here for later.</p>
              <button className="btn-premium" style={{ padding: "12px 32px", borderRadius: 14 }} onClick={() => nav("products")}>
                🛍 Browse Products
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid-4">
            {wishlist.map((p, i) => (
              <ScrollReveal key={p.id} direction="up" delay={i * 0.06}>
                <div className="glass-panel" style={{ overflow: "hidden", borderRadius: 24, position: "relative" }}>
                  <button
                    onClick={() => toggleWishlist(p)}
                    style={{
                      position: "absolute", top: 12, right: 12, zIndex: 10,
                      width: 34, height: 34, borderRadius: "50%", border: "none",
                      background: "rgba(255,255,255,0.9)", cursor: "pointer", fontSize: 16,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                    }}
                    title="Remove from wishlist"
                  >
                    ❤️
                  </button>
                  <div className="zoom-media" style={{ height: 160, cursor: "pointer" }} onClick={() => { setSelectedProduct(p); nav("detail"); }}>
                    <img src={p.img} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontWeight: 900, fontSize: 16, color: "var(--green-dark)", marginBottom: 8 }}>{p.emoji} {p.name}</div>
                    <div className="price-row" style={{ marginBottom: 14 }}>
                      <span className="price-now">₹{p.price}</span>
                      <span style={{ fontSize: 11, color: "var(--gray600)", fontWeight: 700 }}>/{p.unit}</span>
                    </div>
                    <button
                      className="btn-premium"
                      style={{ width: "100%", padding: "10px", fontSize: 13, borderRadius: 12, justifyContent: "center" }}
                      onClick={() => addToCart(p)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
