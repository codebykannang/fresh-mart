
export default function AboutPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", padding: "80px 20px", textAlign: "center", color: "#fff" }}>
        <h1 className="section-title fade-in-up" style={{ color: "#fff", marginBottom: 16 }}>🌾 Our Story</h1>
        <p className="fade-in-up" style={{ fontSize: 18, opacity: .9, maxWidth: 600, margin: "0 auto" }}>From humble farm roots to your modern doorstep</p>
      </div>
      
      <div className="container section">
        <div className="grid-2" style={{ gap: 48, alignItems: "center", marginBottom: 60 }}>
          <div className="fade-in-left">
            <h2 className="section-title">About Jaya Lakshmi Fresh Mart</h2>
            <p style={{ lineHeight: 1.9, color: "var(--gray600)", fontSize: 16, marginBottom: 16 }}>
              Founded in 2010 by the Jaya Lakshmi family in Bodinayakanur, Theni, Tamil Nadu, we started with a single mango orchard and a dream: to bring the purest farm freshness to every home.
            </p>
            <p style={{ lineHeight: 1.9, color: "var(--gray600)", fontSize: 16, marginBottom: 16 }}>
              Today, we partner with over 500 farmers across Tamil Nadu, Kerala, and Karnataka to bring you the freshest fruits, vegetables, and farm products – with zero middlemen and maximum nutrition.
            </p>
            <p style={{ lineHeight: 1.9, color: "var(--gray600)", fontSize: 16 }}>
              Our promise is simple: if it's not fresh, we won't sell it. Every product is hand-inspected, naturally grown, and delivered with love.
            </p>
          </div>
          <div className="fade-in-right">
            <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80" alt="Farm" style={{ width: "100%", borderRadius: 24, boxShadow: "0 12px 40px rgba(0,0,0,.15)" }} />
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 60 }}>
          {[
            ["500+", "Partner Farms", "#fef9c3"],
            ["50,000+", "Happy Customers", "#dcfce7"],
            ["2000+", "Products Delivered Daily", "#ffedd5"],
            ["10+", "Years of Freshness", "#f0f9ff"]
          ].map(([n, l, c]) => (
            <div key={l} className="tilt" style={{ background: c, borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontFamily: "Playfair Display,serif", fontSize: 44, fontWeight: 900, color: "var(--green)" }}>{n}</div>
              <div style={{ fontWeight: 700, color: "var(--gray600)", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        
        {/* Farming Methods */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 className="section-title">Our Farming Philosophy</h2>
        </div>
        <div className="grid-3">
          {[
            { icon: "🌱", title: "Natural Farming", desc: "We use traditional natural farming methods – no synthetic fertilizers, no harmful pesticides. Just the power of nature." },
            { icon: "💧", title: "Water Conservation", desc: "Drip irrigation and rainwater harvesting ensure our farms use 60% less water than conventional farming." },
            { icon: "♻️", title: "Zero Waste", desc: "Unsold produce goes to compost. Packaging is 100% biodegradable. We care for the earth as much as your health." },
          ].map(m => (
            <div key={m.title} className="tilt" style={{ background: "#f9fafb", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{m.icon}</div>
              <h3 style={{ fontFamily: "Playfair Display,serif", fontSize: 20, color: "var(--green-dark)", marginBottom: 10 }}>{m.title}</h3>
              <p style={{ color: "var(--gray600)", lineHeight: 1.8, fontSize: 14 }}>{m.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Farm gallery */}
        <div style={{ marginTop: 60 }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 24 }}>📸 Farm Gallery</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
            {[
              "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80",
              "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&q=80",
              "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&q=80",
              "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&q=80",
              "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=300&q=80",
              "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=300&q=80",
            ].map((src, i) => (
              <div key={i} className="product-card" style={{ height: 180 }}>
                <img src={src} alt="Farm" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
