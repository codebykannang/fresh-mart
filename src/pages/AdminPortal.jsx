import React, { useState } from 'react';
import { ORDER_STATUSES, PRODUCTS } from '../data/mockData';

export default function AdminPortal({ adminLogged, setAdminLogged, adminPage, setAdminPage, products, setProducts, orders, setOrders, nav, showToast }) {
  if (!adminLogged) {
    return <AdminLogin setAdminLogged={setAdminLogged} nav={nav} />;
  }
  
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar adminPage={adminPage} setAdminPage={setAdminPage} setAdminLogged={setAdminLogged} nav={nav} />
      <div className="admin-content">
        {adminPage === "dashboard" && <AdminDashboard orders={orders} products={products} />}
        {adminPage === "products" && <AdminProducts products={products} setProducts={setProducts} showToast={showToast} />}
        {adminPage === "orders" && <AdminOrders orders={orders} setOrders={setOrders} showToast={showToast} />}
        {adminPage === "add-product" && <AdminAddProduct setProducts={setProducts} showToast={showToast} setAdminPage={setAdminPage} />}
        {adminPage === "categories" && <AdminCategories products={products} />}
        {adminPage === "banner" && <AdminBanner showToast={showToast} />}
      </div>
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
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#14532d,#16a34a,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="bounce-in" style={{ background: "#fff", borderRadius: 28, padding: 44, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
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

function AdminSidebar({ adminPage, setAdminPage, setAdminLogged, nav }) {
  const items = [
    ["dashboard", "📊 Dashboard"],
    ["products", "📦 Products"],
    ["add-product", "➕ Add Product"],
    ["orders", "🧾 Orders"],
    ["categories", "🏷 Categories"],
    ["banner", "🖼 Banner"],
  ];
  return (
    <div className="admin-sidebar" style={{ minHeight: "100%" }}>
      <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,.15)", marginBottom: 8 }}>
        <div style={{ fontSize: 28, marginBottom: 4 }}>🌿</div>
        <div style={{ fontFamily: "Playfair Display,serif", fontSize: 18, fontWeight: 700 }}>Fresh Mart</div>
        <div style={{ fontSize: 12, opacity: .7 }}>Admin Dashboard</div>
      </div>
      {items.map(([p, l]) => (
        <div key={p} className={`sidebar-item ${adminPage === p ? "active" : ""}`} onClick={() => setAdminPage(p)}>{l}</div>
      ))}
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, padding: "0 24px" }}>
        <button style={{ width: "100%", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", color: "#fff", padding: "10px", borderRadius: 10, cursor: "pointer", fontFamily: "Nunito", fontWeight: 700 }} onClick={() => { setAdminLogged(false); nav("home"); }}>🚪 Logout</button>
      </div>
    </div>
  );
}

function AdminDashboard({ orders, products }) {
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
      
      <div className="grid-2" style={{ gap: 24 }}>
        <div className="admin-card">
          <h3 style={{ fontWeight: 800, marginBottom: 16, color: "var(--green-dark)" }}>Recent Orders</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0fdf4" }}>
                {["ID", "Customer", "Total", "Status"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, color: "var(--gray600)", fontWeight: 700 }}>{h}</th>)}
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

function AdminProducts({ products, setProducts, showToast }) {
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
                    <button style={{ background: "#dbeafe", color: "#1d4ed8", border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "Nunito", fontWeight: 700, fontSize: 12 }}>✏️ Edit</button>
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

function AdminAddProduct({ setProducts, showToast, setAdminPage }) {
  const [form, setForm] = useState({ name: "", price: "", unit: "kg", cat: "Fruits", stock: "", emoji: "🍎", desc: "", organic: false });
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
      img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80",
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

function AdminOrders({ orders, setOrders, showToast }) {
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
              {["Order ID", "Customer", "Items", "Date", "Total", "Status", "Actions"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 13, color: "var(--gray600)", fontWeight: 700 }}>{h}</th>)}
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
