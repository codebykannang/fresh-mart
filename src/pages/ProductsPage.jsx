import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, CAT_COLORS } from '../data/mockData';

export default function ProductsPage({ nav, products, addToCart, setSelectedProduct, filterCat, setFilterCat }) {
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
    <div style={{ paddingTop: 80 }}>
      <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", padding: "50px 20px", textAlign: "center" }}>
        <h1 className="section-title fade-in-up">🛍 Our Fresh Products</h1>
        <p className="section-subtitle fade-in-up">Explore {products.length}+ farm-fresh products</p>
        <div style={{ maxWidth: 480, margin: "0 auto", position: "relative" }}>
          <input 
            className="form-input" 
            placeholder="🔍 Search products..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            style={{ paddingLeft: 20, width: "100%", borderRadius: 50, background: "#fff" }} 
          />
        </div>
      </div>
      
      <div className="container section" style={{ paddingTop: 40 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button 
                key={c} 
                className={`cat-pill ${filterCat === c ? "active" : ""}`} 
                style={{ 
                  background: filterCat === c ? CAT_COLORS[c] : "#fff", 
                  color: filterCat === c ? "#fff" : "var(--gray800)", 
                  borderColor: CAT_COLORS[c] 
                }} 
                onClick={() => setFilterCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          
          <select 
            className="form-input" 
            style={{ width: "auto", borderRadius: 50, padding: "9px 16px" }} 
            value={sort} 
            onChange={e => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        
        <p style={{ marginBottom: 20, color: "var(--gray600)", fontWeight: 600 }}>{filtered.length} products found</p>
        
        <div className="grid-auto">
          {filtered.map((p, i) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              addToCart={addToCart} 
              setSelectedProduct={setSelectedProduct} 
              nav={nav} 
              delay={i * .05} 
            />
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "var(--gray600)" }}>
            <div style={{ fontSize: 64 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 700, marginTop: 12 }}>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
