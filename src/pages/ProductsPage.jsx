import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, CAT_COLORS } from '../data/mockData';

export default function ProductsPage({ nav, products, addToCart, setSelectedProduct, filterCat, setFilterCat, wishlist = [], toggleWishlist }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = products
    .filter(p => filterCat === "All" || p.cat === filterCat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ paddingTop: 100, position: "relative" }}>
      {/* Background blobs for premium lighting */}
      <div className="glow-blob glow-blob-green" style={{ width: 300, height: 300, top: "10%", left: "5%" }} />
      <div className="glow-blob glow-blob-gold" style={{ width: 250, height: 250, bottom: "20%", right: "5%" }} />

      {/* Header Panel */}
      <div 
        className="glass-panel" 
        style={{ 
          margin: "0 24px 40px", 
          padding: "60px 20px", 
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.65)"
        }}
      >
        <h1 className="section-title fade-in-up" style={{ color: "var(--green-dark)", fontWeight: 900, marginBottom: 8, fontSize: "2.4rem" }}>
          Explore Our Fresh Harvest
        </h1>
        <p className="section-subtitle fade-in-up" style={{ color: "var(--gray600)", fontWeight: 500, marginBottom: 24 }}>
          Naturally cultivated organic farm produce from local growers in Theni
        </p>
        
        {/* Modern glowing search box */}
        <div style={{ maxWidth: 500, margin: "0 auto", position: "relative" }} className="fade-in-up">
          <input 
            className="premium-input form-input" 
            placeholder="🔍 Search fresh products (e.g. Mango, Lemon, Coconut)..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            style={{ 
              paddingLeft: 24, 
              paddingRight: 24,
              width: "100%", 
              borderRadius: 50, 
              background: "#fff",
              height: 48,
              fontSize: 14,
              fontWeight: 600,
              boxShadow: "0 8px 30px rgba(0,0,0,0.03)"
            }} 
          />
        </div>
      </div>
      
      <div className="container section" style={{ paddingTop: 0, position: "relative", zIndex: 2 }}>
        {/* Filters and sorting layout */}
        <div style={{ display: "flex", gap: 16, marginBottom: 36, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Category Tags */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => {
              const active = filterCat === c;
              return (
                <button 
                  key={c} 
                  className={`cat-pill`} 
                  style={{ 
                    background: active ? CAT_COLORS[c] : "rgba(255,255,255,0.7)", 
                    color: active ? "#fff" : "var(--gray800)", 
                    borderColor: active ? "transparent" : "var(--gray200)",
                    borderWidth: "1.5px",
                    fontWeight: 800,
                    padding: "10px 22px",
                    borderRadius: "50px",
                    boxShadow: active ? `0 10px 20px rgba(0,0,0,0.1)` : "none",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s ease"
                  }} 
                  onClick={() => setFilterCat(c)}
                  onMouseEnter={e => {
                    if(!active) {
                      e.currentTarget.style.background = "var(--green-soft)";
                      e.currentTarget.style.borderColor = "var(--green)";
                    }
                  }}
                  onMouseLeave={e => {
                    if(!active) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                      e.currentTarget.style.borderColor = "var(--gray200)";
                    }
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
          
          {/* Sort Selector */}
          <select 
            className="premium-input form-input" 
            style={{ 
              width: "auto", 
              borderRadius: 50, 
              padding: "10px 24px", 
              fontWeight: 800, 
              fontSize: 13,
              color: "var(--gray800)",
              cursor: "pointer",
              height: 42
            }} 
            value={sort} 
            onChange={e => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        
        {/* Results text */}
        <p style={{ marginBottom: 24, color: "var(--gray600)", fontWeight: 700, fontSize: 14 }}>
          Showing {filtered.length} organic product{filtered.length !== 1 ? "s" : ""} found
        </p>
        
        {/* Products Grid */}
        <div className="grid-auto">
          {filtered.map((p, i) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              addToCart={addToCart} 
              setSelectedProduct={setSelectedProduct} 
              nav={nav} 
              delay={i * .04} 
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
        
        {/* No Products Found State */}
        {filtered.length === 0 && (
          <div 
            className="glass-panel"
            style={{ 
              textAlign: "center", 
              padding: "80px 40px", 
              color: "var(--gray600)",
              background: "rgba(255,255,255,0.6)"
            }}
          >
            <div style={{ fontSize: 64, animation: "floatY 3s ease infinite" }}>🔍</div>
            <p style={{ fontSize: 20, fontWeight: 900, marginTop: 16, color: "var(--green-dark)" }}>No Fresh Produce Found</p>
            <p style={{ fontSize: 14, color: "var(--gray600)", marginTop: 6 }}>Try checking the spelling or search for another category!</p>
          </div>
        )}
      </div>
    </div>
  );
}
