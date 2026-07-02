import React, { useState, useEffect } from 'react';

// Reusable SVG Icons for the Navbar
function NavIcon({ name, active }) {
  const color = active ? "var(--green)" : "var(--gray600)";
  const size = 18;

  if (name === "home") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    );
  }
  if (name === "shop") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    );
  }
  if (name === "about") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"/>
        <path d="M9 22v-4h4"/>
      </svg>
    );
  }
  if (name === "contact") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    );
  }
  return null;
}

export default function Navbar({ nav, page, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { page: "home", label: "Home", icon: "home" },
    { page: "products", label: "Shop", icon: "shop" },
    { page: "about", label: "About", icon: "about" },
    { page: "contact", label: "Contact", icon: "contact" }
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
          {links.map(({ page: p, label, icon }) => (
            <span 
              key={p} 
              className={`nav-link ${page === p ? "active" : ""}`} 
              onClick={() => nav(p)}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <NavIcon name={icon} active={page === p} />
              {label}
            </span>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn-primary" style={{ padding: "9px 16px", fontSize: 13, gap: 6 }} onClick={() => nav("cart")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="mobile-hide">Cart</span>
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
                marginLeft: 2
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <button className="btn-secondary mobile-hide" style={{ padding: "9px 16px", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => nav("admin")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Admin
          </button>

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
              borderRadius: 10,
              width: 40,
              height: 40,
              display: "none", // responsive display via mobile-show class override
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
          {links.map(({ page: p, label, icon }) => (
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
              <NavIcon name={icon} active={page === p} />
              {label}
            </div>
          ))}
          <div style={{ padding: "12px 24px 0", borderTop: "1px solid #f0fdf4", marginTop: 8, display: "flex", gap: 10 }}>
            <button className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: 14, gap: 6 }} onClick={() => { nav("cart"); setMenuOpen(false); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart {cartCount > 0 && <span style={{ background: "#ef4444", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900 }}>{cartCount}</span>}
            </button>
            <button className="btn-secondary" style={{ flex: 1, padding: "10px", fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => { nav("admin"); setMenuOpen(false); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
