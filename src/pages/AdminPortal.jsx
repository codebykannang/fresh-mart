import { useState, useRef } from 'react';
import { ORDER_STATUSES } from '../data/mockData';
import GPSTracker from '../components/GPSTracker';

// ── Product Image Upload Field (file upload + URL, with live preview) ───────
function ImageUploadField({ value, onChange }) {
  const [urlMode, setUrlMode] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-group">
      <label className="form-label">Product Image</label>

      {value && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <img src={value} alt="Preview" style={{ width: 72, height: 72, borderRadius: 12, objectFit: "cover", border: "2px solid var(--green-soft)" }} />
          <button
            type="button"
            onClick={() => onChange("")}
            style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}
          >
            ✕ Remove Image
          </button>
        </div>
      )}

      {!urlMode ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
          style={{
            border: `2px dashed ${dragOver ? "var(--green)" : "var(--gray200)"}`,
            borderRadius: 14,
            padding: "22px 16px",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "#f0fdf4" : "#fafafa",
            transition: "all .2s"
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "var(--gray800)" }}>Click to upload or drag & drop</div>
          <div style={{ fontSize: 11, color: "var(--gray600)", marginTop: 2 }}>PNG, JPG up to ~2MB</div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => handleFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <input
          className="form-input"
          placeholder="https://example.com/image.jpg"
          value={value && !value.startsWith("data:") ? value : ""}
          onChange={e => onChange(e.target.value)}
        />
      )}

      <button
        type="button"
        onClick={() => setUrlMode(m => !m)}
        style={{ background: "none", border: "none", color: "var(--green)", fontWeight: 700, fontSize: 12, cursor: "pointer", marginTop: 8, padding: 0 }}
      >
        {urlMode ? "📁 Upload a file instead" : "🔗 Use an image URL instead"}
      </button>
    </div>
  );
}

export default function AdminPortal({ adminLogged, setAdminLogged, adminPage, setAdminPage, products, setProducts, orders, setOrders, nav, showToast }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!adminLogged) {
    return <AdminLogin setAdminLogged={setAdminLogged} nav={nav} />;
  }

  const ADMIN_NAV_ITEMS = [
    ["dashboard", "📊 Dashboard"],
    ["products", "📦 Products"],
    ["add-product", "➕ Add Product"],
    ["orders", "🧾 Orders"],
    ["categories", "🏷 Categories"],
    ["banner", "🖼 Banner"],
  ];
  const currentLabel = ADMIN_NAV_ITEMS.find(([p]) => p === adminPage)?.[1] || "Dashboard";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminTopBar
        currentLabel={currentLabel}
        onToggleMenu={() => setMobileMenuOpen(o => !o)}
        menuOpen={mobileMenuOpen}
      />
      <AdminSidebar
        adminPage={adminPage}
        setAdminPage={(p) => { setAdminPage(p); setMobileMenuOpen(false); }}
        setAdminLogged={setAdminLogged}
        nav={nav}
        items={ADMIN_NAV_ITEMS}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMenu={() => setMobileMenuOpen(false)}
      />
      <div className="admin-content">
        {adminPage === "dashboard" && (
          <AdminDashboard 
            orders={orders} 
            products={products} 
            setTrackingOrder={setTrackingOrder} 
          />
        )}
        {adminPage === "products" && (
          <AdminProducts 
            products={products} 
            setProducts={setProducts} 
            showToast={showToast} 
            setEditingProduct={setEditingProduct}
          />
        )}
        {adminPage === "orders" && (
          <AdminOrders 
            orders={orders} 
            setOrders={setOrders} 
            showToast={showToast} 
            setTrackingOrder={setTrackingOrder}
          />
        )}
        {adminPage === "add-product" && <AdminAddProduct setProducts={setProducts} showToast={showToast} setAdminPage={setAdminPage} />}
        {adminPage === "categories" && <AdminCategories products={products} />}
        {adminPage === "banner" && <AdminBanner showToast={showToast} />}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          setProducts={setProducts} 
          showToast={showToast} 
        />
      )}

      {/* GPS Live Tracking Modal */}
      {trackingOrder && (
        <div className="admin-modal-overlay" onClick={() => setTrackingOrder(null)}>
          <div className="admin-modal-content" style={{ maxWidth: 800 }} onClick={e => e.stopPropagation()}>
            <GPSTracker order={trackingOrder} onClose={() => setTrackingOrder(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function AdminLogin({ setAdminLogged, nav }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const login = () => {
    if (user === "admin" && pass === "admin123") {
      setAdminLogged(true);
    } else {
      setErr("Invalid credentials. Try admin/admin123");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundImage: "url('https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Light green tint so the farm photo stays clearly visible while keeping the card readable */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(20,83,45,0.55), rgba(22,163,74,0.4), rgba(34,197,94,0.35))" }} />
      <div className="bounce-in" style={{ position: "relative", zIndex: 1, background: "#fff", borderRadius: 28, padding: "clamp(24px, 6vw, 44px)", width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,.35)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 56 }}>🌿</div>
          <h2 style={{ fontFamily: "Playfair Display,serif", color: "var(--green-dark)", fontSize: 26 }}>Admin Portal</h2>
          <p style={{ color: "var(--gray600)", fontSize: 14 }}>Jaya Lakshmi Fresh Mart</p>
        </div>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input className="form-input" placeholder="admin" value={user} onChange={e => setUser(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
        </div>
        {err && <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 14 }}>{err}</div>}
        <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 16, justifyContent: "center" }} onClick={login}>🔐 Login to Admin</button>
        <button style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "var(--green)", fontWeight: 700, cursor: "pointer", fontSize: 14 }} onClick={() => nav("home")}>← Back to Website</button>
      </div>
    </div>
  );
}

function AdminTopBar({ currentLabel, onToggleMenu, menuOpen }) {
  return (
    <div className="admin-topbar">
      <button
        className="admin-hamburger"
        onClick={onToggleMenu}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? "hamburger-line open-1" : "hamburger-line"} />
        <span className={menuOpen ? "hamburger-line open-2" : "hamburger-line"} />
        <span className={menuOpen ? "hamburger-line open-3" : "hamburger-line"} />
      </button>
      <div className="admin-topbar-title">🌿 {currentLabel}</div>
    </div>
  );
}

function AdminSidebar({ adminPage, setAdminPage, setAdminLogged, nav, items, mobileMenuOpen, onCloseMenu }) {
  return (
    <>
      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && <div className="admin-sidebar-backdrop" onClick={onCloseMenu} />}

      <div className={`admin-sidebar ${mobileMenuOpen ? "admin-sidebar-open" : ""}`} style={{ minHeight: "100%" }}>
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,.15)", marginBottom: 8 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>🌿</div>
          <div style={{ fontFamily: "Playfair Display,serif", fontSize: 18, fontWeight: 700 }}>Fresh Mart</div>
          <div style={{ fontSize: 12, opacity: .7 }}>Admin Dashboard</div>
        </div>
        {items.map(([p, l]) => (
          <div key={p} className={`sidebar-item ${adminPage === p ? "active" : ""}`} onClick={() => setAdminPage(p)}>{l}</div>
        ))}
        <div className="admin-sidebar-logout">
          <button style={{ width: "100%", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", color: "#fff", padding: "10px", borderRadius: 10, cursor: "pointer", fontFamily: "Nunito", fontWeight: 700 }} onClick={() => { setAdminLogged(false); nav("home"); }}>🚪 Logout</button>
        </div>
      </div>
    </>
  );
}

function AdminDashboard({ orders, products, setTrackingOrder }) {
  const totalRev = orders.reduce((s, o) => s + o.total, 0);
  return (
    <div>
      <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 30, color: "var(--green-dark)", marginBottom: 8 }}>📊 Dashboard</h1>
      <p style={{ color: "var(--gray600)", marginBottom: 28 }}>Welcome back! Here's your store overview.</p>
      
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {[
          ["₹" + totalRev, "Total Revenue", "💰", "#16a34a,#22c55e"],
          ["#" + orders.length, "Total Orders", "📦", "#fb923c,#fbbf24"],
          ["#" + products.length, "Products", "🛍", "#a855f7,#c084fc"],
          ["4.8 ⭐", "Avg Rating", "⭐", "#38bdf8,#67e8f9"]
        ].map(([v, l, e, grad]) => (
          <div key={l} className="bounce-in" style={{ background: `linear-gradient(135deg,${grad})`, borderRadius: 20, padding: 24, color: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,.15)" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{e}</div>
            <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "Playfair Display,serif" }}>{v}</div>
            <div style={{ opacity: .85, fontSize: 14, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      
      {/* Interactive Analytics Charts */}
      <AnalyticsCharts products={products} />
      
      <div className="grid-2" style={{ gap: 24 }}>
        <div className="admin-card">
          <h3 style={{ fontWeight: 800, marginBottom: 16, color: "var(--green-dark)" }}>Recent Orders</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0fdf4" }}>
                {["ID", "Customer", "Total", "Status", "Track"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, color: "var(--gray600)", fontWeight: 700 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="table-row" style={{ borderBottom: "1px solid #f0fdf4" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, fontSize: 13 }}>#{o.id}</td>
                  <td style={{ padding: "10px 12px", fontSize: 13 }}>{o.customer}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: "var(--green)", fontSize: 13 }}>₹{o.total}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span className={`badge ${["badge-yellow", "badge-orange", "badge-green", "badge-green"][Math.min(o.status, 3)]}`}>{ORDER_STATUSES[o.status]}</span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <button 
                      onClick={() => setTrackingOrder(o)}
                      style={{ background: "var(--green-soft)", color: "var(--green-dark)", border: "none", padding: "4px 8px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 800 }}
                    >
                      📍 Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="admin-card">
          <h3 style={{ fontWeight: 800, marginBottom: 16, color: "var(--green-dark)" }}>Top Products</h3>
          {products.slice(0, 5).map(p => (
            <div key={p.id} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid #f0fdf4", alignItems: "center" }}>
              <img src={p.img} alt={p.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--gray600)" }}>Stock: {p.stock}</div>
              </div>
              <div style={{ fontWeight: 800, color: "var(--green)" }}>₹{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Vector Interactive Analytics SVG Charts Component
function AnalyticsCharts({ products }) {
  const [hoveredSales, setHoveredSales] = useState(null);

  // Weekly Revenue mock telemetry
  const salesData = [
    { day: "Mon", value: 1200 },
    { day: "Tue", value: 2100 },
    { day: "Wed", value: 1800 },
    { day: "Thu", value: 3200 },
    { day: "Fri", value: 2900 },
    { day: "Sat", value: 4500 },
    { day: "Sun", value: 3800 }
  ];

  const maxSales = 5000;
  const chartWidth = 400;
  const chartHeight = 180;
  const padding = 30;

  const getCoords = (index, value) => {
    const x = padding + (index * (chartWidth - 2 * padding)) / (salesData.length - 1);
    const y = chartHeight - padding - (value * (chartHeight - 2 * padding)) / maxSales;
    return { x, y };
  };

  const points = salesData.map((d, i) => getCoords(i, d.value));
  
  const linePath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaPath = linePath ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z` : "";

  // Category counts computed dynamically
  const categories = ["Fruits", "Vegetables", "Coconut", "Seeds"];
  const catCounts = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.cat === cat).length
  }));

  const maxCount = Math.max(...catCounts.map(c => c.count), 4);
  const barColors = {
    Fruits: "#fbbf24",
    Vegetables: "#4ade80",
    Coconut: "#a3e635",
    Seeds: "#86efac"
  };

  return (
    <div className="grid-2" style={{ gap: 24, marginBottom: 28 }}>
      {/* Revenue Trend Area Chart */}
      <div className="admin-card">
        <h3 style={{ fontWeight: 800, marginBottom: 4, color: "var(--green-dark)" }}>Weekly Revenue Trend</h3>
        <p style={{ fontSize: 12, color: "var(--gray600)", marginBottom: 16 }}>Store sales performance (in INR)</p>
        
        <div style={{ position: "relative" }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--green)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Gridlines & Y-axis labels */}
            {[0, 1250, 2500, 3750, 5000].map((v) => {
              const y = chartHeight - padding - (v * (chartHeight - 2 * padding)) / maxSales;
              return (
                <g key={v}>
                  <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                  <text x={padding - 5} y={y + 4} textAnchor="end" fontSize="9" fill="var(--gray600)">₹{v}</text>
                </g>
              );
            })}

            {/* Area Path */}
            <path d={areaPath} fill="url(#chartGrad)" />

            {/* Line Path */}
            <path d={linePath} fill="none" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Interactive Points and X-axis Labels */}
            {salesData.map((d, i) => {
              const coords = getCoords(i, d.value);
              return (
                <g key={d.day}>
                  <text x={coords.x} y={chartHeight - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--gray600)">{d.day}</text>
                  <circle 
                    cx={coords.x} 
                    cy={coords.y} 
                    r="5" 
                    fill={hoveredSales === i ? "#fff" : "var(--green)"} 
                    stroke="var(--green)" 
                    strokeWidth="2" 
                    style={{ cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={() => setHoveredSales(i)}
                    onMouseLeave={() => setHoveredSales(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Chart Tooltip */}
          {hoveredSales !== null && (() => {
            const d = salesData[hoveredSales];
            const coords = getCoords(hoveredSales, d.value);
            return (
              <div style={{
                position: "absolute",
                left: `${(coords.x / chartWidth) * 100}%`,
                top: `${(coords.y / chartHeight) * 100 - 20}%`,
                transform: "translate(-50%, -100%)",
                background: "var(--green-dark)",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 800,
                pointerEvents: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                whiteSpace: "nowrap",
                zIndex: 10
              }}>
                {d.day}: ₹{d.value}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Category Bar Chart */}
      <div className="admin-card">
        <h3 style={{ fontWeight: 800, marginBottom: 4, color: "var(--green-dark)" }}>Products by Category</h3>
        <p style={{ fontSize: 12, color: "var(--gray600)", marginBottom: 16 }}>Inventory breakdown by product categories</p>
        
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: "100%", height: "auto" }}>
          {/* Gridlines */}
          {[0, Math.ceil(maxCount / 2), maxCount].map((v) => {
            const y = chartHeight - padding - (v * (chartHeight - 2 * padding)) / maxCount;
            return (
              <g key={v}>
                <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={padding - 5} y={y + 4} textAnchor="end" fontSize="9" fill="var(--gray600)">{v}</text>
              </g>
            );
          })}

          {/* Category Bars */}
          {catCounts.map((c, i) => {
            const barWidth = 40;
            const x = padding + 20 + i * ((chartWidth - 2 * padding - 40) / (catCounts.length - 1 || 1));
            const barHeight = (c.count * (chartHeight - 2 * padding)) / maxCount;
            const y = chartHeight - padding - barHeight;
            const color = barColors[c.name] || "var(--green)";

            return (
              <g key={c.name}>
                <rect 
                  x={x - barWidth / 2} 
                  y={y} 
                  width={barWidth} 
                  height={barHeight} 
                  fill={color} 
                  rx="6" 
                  ry="6"
                  style={{ transition: "height 0.3s ease, y 0.3s ease" }}
                />
                <text x={x} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--green-dark)">{c.count}</text>
                <text x={x} y={chartHeight - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--gray600)">{c.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function AdminProducts({ products, setProducts, showToast, setEditingProduct }) {
  const deleteProduct = (id) => {
    setProducts(p => p.filter(x => x.id !== id));
    showToast("🗑 Product deleted");
  };
  
  return (
    <div>
      <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 28, color: "var(--green-dark)", marginBottom: 24 }}>📦 Manage Products</h1>
      <div className="admin-card">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              {["Image", "Product", "Category", "Price", "Stock", "Rating", "Actions"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 13, color: "var(--gray600)", fontWeight: 700 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="table-row" style={{ borderBottom: "1px solid #f0fdf4" }}>
                <td style={{ padding: "10px 14px" }}><img src={p.img} alt={p.name} style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover" }} /></td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.emoji} {p.name}</div>
                  {p.organic && <span className="badge badge-green" style={{ fontSize: 10 }}>Organic</span>}
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{p.cat}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: "var(--green)", fontSize: 14 }}>₹{p.price}/{p.unit}</td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{p.stock}</td>
                <td style={{ padding: "10px 14px" }}><span className="rating-star" style={{ fontSize: 13 }}>★</span> {p.rating}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button 
                      onClick={() => setEditingProduct(p)}
                      style={{ background: "#dbeafe", color: "#1d4ed8", border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "Nunito", fontWeight: 700, fontSize: 12 }}
                    >
                      ✏️ Edit
                    </button>
                    <button className="btn-danger" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => deleteProduct(p.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditProductModal({ product, onClose, setProducts, showToast }) {
  const [form, setForm] = useState({ ...product });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name || !form.price || !form.stock) {
      showToast("❌ Fill all required fields!");
      return;
    }
    
    setProducts(prev => prev.map(p => p.id === product.id ? {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    } : p));

    showToast(`✅ ${form.name} updated successfully!`);
    onClose();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "Playfair Display,serif", color: "var(--green-dark)", margin: 0 }}>✏️ Edit Product details</h2>
          <button onClick={onClose} style={{ background: "var(--green-soft)", border: "none", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", color: "var(--green)", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div className="form-group">
          <label className="form-label">Product Name *</label>
          <input className="form-input" placeholder="e.g. Alphonso Mango" value={form.name} onChange={e => upd("name", e.target.value)} />
        </div>

        <ImageUploadField value={form.img} onChange={v => upd("img", v)} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Price *</label>
            <input className="form-input" type="number" placeholder="180" value={form.price} onChange={e => upd("price", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Unit</label>
            <select className="form-input" value={form.unit} onChange={e => upd("unit", e.target.value)}>
              {["kg", "g", "litre", "piece", "basket", "pack"].map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" value={form.cat} onChange={e => upd("cat", e.target.value)}>
              {["Fruits", "Vegetables", "Coconut", "Seeds"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Stock *</label>
            <input className="form-input" type="number" placeholder="100" value={form.stock} onChange={e => upd("stock", e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Emoji</label>
          <input className="form-input" placeholder="🍎" value={form.emoji} onChange={e => upd("emoji", e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" rows={3} placeholder="Product description..." value={form.desc || ""} onChange={e => upd("desc", e.target.value)} style={{ resize: "vertical" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <input type="checkbox" id="org-edit" checked={form.organic} onChange={e => upd("organic", e.target.checked)} style={{ width: 18, height: 18, accentColor: "var(--green)" }} />
          <label htmlFor="org-edit" style={{ fontWeight: 700, fontSize: 14, color: "var(--green-dark)", cursor: "pointer" }}>🌿 Organic Certified</label>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-primary" style={{ flex: 1, padding: "13px", fontSize: 15, justifyContent: "center" }} onClick={submit}>💾 Save Changes</button>
          <button className="btn-secondary" style={{ padding: "13px 20px" }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function AdminAddProduct({ setProducts, showToast, setAdminPage }) {
  const [form, setForm] = useState({ name: "", price: "", unit: "kg", cat: "Fruits", stock: "", emoji: "🍎", desc: "", organic: false, img: "" });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name || !form.price || !form.stock) {
      showToast("❌ Fill all required fields!");
      return;
    }
    const newProd = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      img: form.img || "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80",
      rating: 4.5,
      reviews: 0,
      farm: "New Farm",
      weight: form.unit
    };
    setProducts(p => [...p, newProd]);
    showToast(`✅ ${form.name} added!`);
    setAdminPage("products");
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 28, color: "var(--green-dark)", marginBottom: 24 }}>➕ Add New Product</h1>
      <div className="admin-card" style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label className="form-label">Product Name *</label>
          <input className="form-input" placeholder="e.g. Alphonso Mango" value={form.name} onChange={e => upd("name", e.target.value)} />
        </div>
        <ImageUploadField value={form.img} onChange={v => upd("img", v)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Price *</label>
            <input className="form-input" type="number" placeholder="180" value={form.price} onChange={e => upd("price", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Unit</label>
            <select className="form-input" value={form.unit} onChange={e => upd("unit", e.target.value)}>
              {["kg", "g", "litre", "piece", "basket", "pack"].map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" value={form.cat} onChange={e => upd("cat", e.target.value)}>
              {["Fruits", "Vegetables", "Coconut", "Seeds"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Stock *</label>
            <input className="form-input" type="number" placeholder="100" value={form.stock} onChange={e => upd("stock", e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Emoji</label>
          <input className="form-input" placeholder="🍎" value={form.emoji} onChange={e => upd("emoji", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" rows={3} placeholder="Product description..." value={form.desc} onChange={e => upd("desc", e.target.value)} style={{ resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <input type="checkbox" id="org" checked={form.organic} onChange={e => upd("organic", e.target.checked)} style={{ width: 18, height: 18, accentColor: "var(--green)" }} />
          <label htmlFor="org" style={{ fontWeight: 700, fontSize: 14, color: "var(--green-dark)", cursor: "pointer" }}>🌿 Organic Certified</label>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-primary" style={{ flex: 1, padding: "13px", fontSize: 15, justifyContent: "center" }} onClick={submit}>✅ Add Product</button>
          <button className="btn-secondary" style={{ padding: "13px 20px" }} onClick={() => setAdminPage("products")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function AdminOrders({ orders, setOrders, showToast, setTrackingOrder }) {
  const updateStatus = (id, delta) => {
    setOrders(o => o.map(x => x.id === id ? { ...x, status: Math.min(3, Math.max(0, x.status + delta)) } : x));
    showToast("✅ Order status updated");
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 28, color: "var(--green-dark)", marginBottom: 24 }}>🧾 Manage Orders</h1>
      <div className="admin-card">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              {["Order ID", "Customer", "Items", "Date", "Total", "Status", "GPS Track", "Actions"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 13, color: "var(--gray600)", fontWeight: 700 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="table-row" style={{ borderBottom: "1px solid #f0fdf4" }}>
                <td style={{ padding: "10px 14px", fontWeight: 800, fontSize: 14, color: "var(--green)" }}>{o.id}</td>
                <td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 14 }}>{o.customer}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--gray600)", maxWidth: 180 }}>{o.items.join(", ")}</td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{o.date}</td>
                <td style={{ padding: "10px 14px", fontWeight: 800, color: "var(--green)" }}>₹{o.total}</td>
                <td style={{ padding: "10px 14px" }}><span className="badge badge-green" style={{ fontSize: 11 }}>{ORDER_STATUSES[o.status]}</span></td>
                <td style={{ padding: "10px 14px" }}>
                  <button 
                    onClick={() => setTrackingOrder(o)}
                    style={{ background: "var(--green-soft)", color: "var(--green-dark)", border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "Nunito", fontWeight: 700, fontSize: 12 }}
                  >
                    📍 Live GPS
                  </button>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => updateStatus(o.id, -1)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12 }} disabled={o.status === 0}>◀</button>
                    <button onClick={() => updateStatus(o.id, 1)} style={{ background: "#dcfce7", color: "#16a34a", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12 }} disabled={o.status === 3}>▶</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCategories({ products }) {
  const cats = [
    { name: "Fruits", count: products.filter(p => p.cat === "Fruits").length, color: "#fef9c3", emoji: "🍎" },
    { name: "Vegetables", count: products.filter(p => p.cat === "Vegetables").length, color: "#dcfce7", emoji: "🥦" },
    { name: "Coconut", count: products.filter(p => p.cat === "Coconut").length, color: "#f0f9ff", emoji: "🥥" },
    { name: "Seeds", count: products.filter(p => p.cat === "Seeds").length, color: "#f7fee7", emoji: "🌱" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 28, color: "var(--green-dark)", marginBottom: 24 }}>🏷 Category Management</h1>
      <div className="grid-2">
        {cats.map(c => (
          <div key={c.name} className="admin-card tilt" style={{ background: c.color, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 48 }}>{c.emoji}</div>
            <div>
              <div style={{ fontFamily: "Playfair Display,serif", fontSize: 22, fontWeight: 900, color: "var(--green-dark)" }}>{c.name}</div>
              <div style={{ color: "var(--gray600)", fontWeight: 600 }}>{c.count} products</div>
              <button style={{ marginTop: 8, background: "var(--green)", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 20, fontFamily: "Nunito", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBanner({ showToast }) {
  const [url, setUrl] = useState("https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80");
  return (
    <div>
      <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 28, color: "var(--green-dark)", marginBottom: 24 }}>🖼 Banner Management</h1>
      <div className="admin-card">
        <img src={url} alt="Banner" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 16, marginBottom: 20 }} />
        <div className="form-group">
          <label className="form-label">Banner Image URL</label>
          <input className="form-input" value={url} onChange={e => setUrl(e.target.value)} style={{ width: "100%" }} />
        </div>
        <button className="btn-primary" style={{ padding: "12px 24px", fontSize: 14 }} onClick={() => showToast("✅ Banner updated!")}>💾 Save Banner</button>
      </div>
    </div>
  );
}
