import { useState, useEffect } from 'react';

// Reusable SVG Icons for the Navbar with premium hover and glowing accents
function NavIcon({ name, active }) {
  const color = active ? "var(--green)" : "var(--gray600)";
  const size = 18;

  if (name === "home") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s, transform 0.3s", transform: active ? "scale(1.15)" : "scale(1)" }}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    );
  }
  if (name === "shop") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s, transform 0.3s", transform: active ? "scale(1.15)" : "scale(1)" }}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    );
  }
  if (name === "about") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s, transform 0.3s", transform: active ? "scale(1.15)" : "scale(1)" }}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"/>
        <path d="M9 22v-4h4"/>
      </svg>
    );
  }
  if (name === "contact") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s, transform 0.3s", transform: active ? "scale(1.15)" : "scale(1)" }}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    );
  }
  return null;
}

export default function Navbar({ nav, page, cartCount, wishlistCount = 0 }) {
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
    <nav 
      className="navbar glass-panel" 
      style={{ 
        position: "fixed",
        top: scrolled ? 10 : 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: "1280px",
        margin: "0 auto",
        borderRadius: "24px",
        boxShadow: scrolled ? "0 20px 45px rgba(6,78,59,0.12)" : "0 8px 32px rgba(0,0,0,0.04)",
        border: scrolled ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(255,255,255,0.45)",
        zIndex: 9999,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.65)"
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px" }}>
        {/* Logo */}
        <div 
          className="nav-logo" 
          onClick={() => { nav("home"); setMenuOpen(false); }} 
          style={{ 
            cursor: "pointer", 
            display: "flex", 
            alignItems: "center", 
            gap: 10,
            transition: "transform 0.3s ease" 
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <span style={{ fontSize: 32, display: "inline-block" }} className="leaf-sway">🌿</span>
          <div>
            <div style={{ lineHeight: 1.1, fontWeight: 900, fontSize: 20, color: "var(--green-dark)", fontFamily: "'Playfair Display', serif" }}>Jaya Lakshmi</div>
            <div style={{ fontSize: 10, color: "var(--green)", fontFamily: "Nunito", fontWeight: 800, letterSpacing: "1.5px" }}>FRESH MART</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="mobile-hide" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.map(({ page: p, label, icon }) => {
            const active = page === p;
            return (
              <span 
                key={p} 
                className={`nav-link`} 
                onClick={() => nav(p)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 800,
                  color: active ? "var(--green-dark)" : "var(--gray600)",
                  padding: "8px 16px",
                  borderRadius: 12,
                  transition: "all 0.3s",
                  background: active ? "rgba(16, 185, 129, 0.1)" : "transparent",
                  boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.4)" : "none"
                }}
                onMouseEnter={e => {
                  if(!active) {
                    e.currentTarget.style.color = "var(--green)";
                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.04)";
                  }
                }}
                onMouseLeave={e => {
                  if(!active) {
                    e.currentTarget.style.color = "var(--gray600)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <NavIcon name={icon} active={active} />
                {label}
              </span>
            );
          })}
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Wishlist Button */}
          <button
            className="btn-premium-secondary mobile-hide"
            style={{
              padding: "10px 14px",
              fontSize: 15,
              borderRadius: 14,
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer"
            }}
            onClick={() => nav("wishlist")}
            title="Wishlist"
          >
            ❤️
            {wishlistCount > 0 && (
              <span style={{
                position: "absolute",
                top: -6,
                right: -6,
                background: "var(--orange)",
                color: "#fff",
                borderRadius: "50%",
                width: 18,
                height: 18,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 900,
                boxShadow: "0 0 8px rgba(245, 158, 11, 0.5)"
              }} className="bounce-in">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button 
            className="btn-premium" 
            style={{ 
              padding: "10px 20px", 
              fontSize: 13, 
              gap: 8,
              borderRadius: 14,
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer"
            }} 
            onClick={() => nav("cart")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="mobile-hide">Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: "var(--orange)",
                color: "#fff",
                borderRadius: "50%",
                width: 22,
                height: 22,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 900,
                boxShadow: "0 0 10px rgba(245, 158, 11, 0.5)",
                marginLeft: 4
              }} className="bounce-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Button */}
          <button 
            className="btn-premium-secondary mobile-hide" 
            style={{ 
              padding: "10px 18px", 
              fontSize: 13, 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 8,
              borderRadius: 14,
              cursor: "pointer"
            }} 
            onClick={() => nav("admin")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Admin
          </button>

          {/* Hamburger / Menu toggle for mobile */}
          <button
            className="mobile-show"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: menuOpen ? "rgba(16, 185, 129, 0.15)" : "none",
              border: "1px solid",
              borderColor: menuOpen ? "var(--green)" : "rgba(0,0,0,0.1)",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 12,
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s"
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with glass slider animation */}
      {menuOpen && (
        <div 
          className="glass-panel"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 10,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            animation: "slideInBottom 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            background: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(16,185,129,0.15)"
          }}
        >
          {links.map(({ page: p, label, icon }) => {
            const active = page === p;
            return (
              <div
                key={p}
                onClick={() => { nav(p); setMenuOpen(false); }}
                style={{
                  padding: "14px 24px",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  color: active ? "var(--green-dark)" : "var(--gray800)",
                  background: active ? "rgba(16, 185, 129, 0.08)" : "transparent",
                  borderLeft: active ? "5px solid var(--green)" : "5px solid transparent",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}
              >
                <NavIcon name={icon} active={active} />
                {label}
              </div>
            );
          })}
          <div style={{ padding: "14px 24px", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: 10 }}>
            <button className="btn-premium-secondary" style={{ flex: 1, padding: "11px", fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 12 }} onClick={() => { nav("wishlist"); setMenuOpen(false); }}>
              ❤️ Wishlist {wishlistCount > 0 && <span style={{ background: "var(--orange)", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900 }}>{wishlistCount}</span>}
            </button>
            <button className="btn-premium" style={{ flex: 1, justifyContent: "center", padding: "11px", fontSize: 13, gap: 6, borderRadius: 12 }} onClick={() => { nav("cart"); setMenuOpen(false); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart {cartCount > 0 && <span style={{ background: "var(--orange)", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900 }}>{cartCount}</span>}
            </button>
            <button className="btn-premium-secondary" style={{ flex: 1, padding: "11px", fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 12 }} onClick={() => { nav("admin"); setMenuOpen(false); }}>
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
