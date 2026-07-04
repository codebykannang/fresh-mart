
export default function Footer({ nav }) {
  return (
    <footer style={{ background: "linear-gradient(135deg,#14532d,#166534)", color: "#fff", padding: "60px 20px 24px" }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "Playfair Display,serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>🌿 Jaya Lakshmi</div>
            <div style={{ color: "#86efac", fontWeight: 700, marginBottom: 12 }}>Fresh Mart</div>
            <p style={{ fontSize: 14, opacity: .8, lineHeight: 1.8 }}>Farm-fresh produce delivered to your doorstep. Quality you can taste.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {["📘", "📸", "🐦", "▶️"].map((s, i) => (
                <div key={i} style={{ width: 36, height: 36, background: "rgba(255,255,255,.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, transition: "all .2s" }}>{s}</div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 16, color: "#86efac" }}>Quick Links</h4>
            {[["home", "Home"], ["products", "Shop"], ["about", "About"], ["contact", "Contact"]].map(([p, l]) => (
              <div key={p} style={{ padding: "5px 0", fontSize: 14, opacity: .8, cursor: "pointer", transition: "opacity .2s" }} onClick={() => nav(p)}>{l}</div>
            ))}
          </div>
          
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 16, color: "#86efac" }}>Categories</h4>
            {["Fruits", "Vegetables", "Coconut Products", "Organic Seeds"].map(c => (
              <div key={c} style={{ padding: "5px 0", fontSize: 14, opacity: .8 }}>{c}</div>
            ))}
          </div>
          
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 16, color: "#86efac" }}>Contact</h4>
            <div style={{ fontSize: 14, opacity: .8, lineHeight: 2 }}>
              📱 +91 80723 77478<br />
              📧 info@jayalakshmifresh.com<br />
              🏠 tvkk nagar 100 feet road<br />
              &nbsp;&nbsp;&nbsp;&nbsp;bodinayakanur, theni, tamilnadu 625513<br />
              ⏰ Mon–Sat: 6AM – 8PM
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 13, opacity: .7 }}>
          <span>© {new Date().getFullYear()} Jaya Lakshmi Fresh Mart. All rights reserved.</span>
          <span>Made with 💚 in Tamil Nadu, India</span>
        </div>
      </div>
    </footer>
  );
}
