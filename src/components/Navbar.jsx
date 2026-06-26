import React, { useState, useEffect } from 'react';

export default function Navbar({ nav, page, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    ["home", "🏠 Home"],
    ["products", "🛍 Shop"],
    ["about", "🌾 About"],
    ["contact", "📞 Contact"]
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? "0 4px 30px rgba(22,163,74,.15)" : "0 2px 20px rgba(0,0,0,.06)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px" }}>
        {/* Logo */}
        <div className="nav-logo" onClick={() => { nav("home"); setMenuOpen(false); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 28 }} className="leaf-sway">🌿</span>
          <div>
            <div style={{ lineHeight: 1.2 }}>Jaya Lakshmi</div>
            <div style={{ fontSize: 11, color: "var(--green)", fontFamily: "Nunito", fontWeight: 700, letterSpacing: "0.5px" }}>FRESH MART</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="mobile-hide" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map(([p, l]) => (
            <span key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => nav(p)}>{l}</span>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn-primary" style={{ padding: "9px 16px", fontSize: 13 }} onClick={() => nav("cart")}>
            🛒
            <span className="mobile-hide" style={{ marginLeft: 4 }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: "#ef4444",
                color: "#fff",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 900,
                marginLeft: 4
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <button className="btn-secondary mobile-hide" style={{ padding: "9px 16px", fontSize: 13 }} onClick={() => nav("admin")}>⚙️ Admin</button>

          {/* Hamburger */}
          <button
            className="mobile-show"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: menuOpen ? "var(--green-soft)" : "none",
              border: "2px solid",
              borderColor: menuOpen ? "var(--green)" : "var(--gray200)",
              fontSize: 18,
              cursor: "pointer",
              display: "none",
              borderRadius: 10,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              transition: "all .2s"
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div style={{
          background: "#fff",
          borderTop: "1px solid #f0fdf4",
          padding: "8px 0 16px",
          boxShadow: "0 8px 30px rgba(0,0,0,.08)",
          animation: "fadeInUp 0.2s ease"
        }}>
          {links.map(([p, l]) => (
            <div
              key={p}
              onClick={() => { nav(p); setMenuOpen(false); }}
              style={{
                padding: "13px 24px",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                color: page === p ? "var(--green)" : "var(--gray800)",
                background: page === p ? "var(--green-soft)" : "transparent",
                borderLeft: page === p ? "4px solid var(--green)" : "4px solid transparent",
                transition: "all .2s",
                display: "flex",
                alignItems: "center",
                gap: 10
              }}
            >
              {l}
            </div>
          ))}
          <div style={{ padding: "12px 24px 0", borderTop: "1px solid #f0fdf4", marginTop: 8, display: "flex", gap: 10 }}>
            <button className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: 14 }} onClick={() => { nav("cart"); setMenuOpen(false); }}>
              🛒 Cart {cartCount > 0 && <span style={{ background: "#ef4444", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900 }}>{cartCount}</span>}
            </button>
            <button className="btn-secondary" style={{ flex: 1, padding: "10px", fontSize: 14 }} onClick={() => { nav("admin"); setMenuOpen(false); }}>⚙️ Admin</button>
          </div>
        </div>
      )}
    </nav>
  );
}
