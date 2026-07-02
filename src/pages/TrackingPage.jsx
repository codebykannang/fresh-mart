import React, { useState } from 'react';
import { ORDER_STATUSES } from '../data/mockData';
import GPSTracker from '../components/GPSTracker';

export default function TrackingPage({ myOrder, orders, nav }) {
  const [trackId, setTrackId] = useState("");
  const [found, setFound] = useState(myOrder);

  const status = found ? found.status : 0;

  const handleTrack = () => {
    if (!trackId.trim()) return;
    const match = orders.find(o => o.id.toLowerCase() === trackId.trim().toLowerCase());
    setFound(match || null);
  };

  return (
    <div style={{ paddingTop: 90, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 20px", maxWidth: 800, margin: "0 auto" }}>
        <h1 className="section-title fade-in-up" style={{ textAlign: "center" }}>📦 Track Your Order</h1>
        <p className="section-subtitle fade-in-up" style={{ textAlign: "center" }}>Enter your order ID to see real-time delivery status</p>

        {/* Search Box */}
        <div style={{ background: "#fff", borderRadius: 20, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,.08)", marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              className="form-input"
              style={{ flex: 1, minWidth: 180 }}
              placeholder="Enter Order ID (e.g. JL001)"
              value={trackId}
              onChange={e => setTrackId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
            />
            <button className="btn-primary" onClick={handleTrack} style={{ whiteSpace: "nowrap" }}>🔍 Track</button>
          </div>
        </div>

        {found ? (
          <div className="fade-in-up">
            {/* Order Header Card */}
            <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius: 24, padding: 28, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>Order #{found.id}</div>
                  <div style={{ color: "var(--gray600)", fontSize: 14 }}>{found.date}</div>
                </div>
                <div className="badge badge-green" style={{ fontSize: 13, padding: "8px 16px", alignSelf: "flex-start" }}>{ORDER_STATUSES[found.status]}</div>
              </div>

              {/* Tracker Steps — responsive horizontal/vertical */}
              <div className="tracker-container">
                {ORDER_STATUSES.map((s, i) => {
                  const icons = ["📋", "📦", "🚚", "🏠"];
                  const isDone = i < status;
                  const isActive = i === status;
                  const circleClass = isDone ? "done" : isActive ? "active" : "pending";

                  return (
                    <div key={s} className="tracker-step-item">
                      {/* Connector line (before each step except first) */}
                      {i > 0 && (
                        <div className="tracker-connector" style={{
                          background: isDone ? "var(--green)" : "var(--gray200)",
                          transition: "background .4s"
                        }} />
                      )}
                      {/* Circle */}
                      <div className={`tracker-circle ${circleClass}`}>
                        {isDone ? "✓" : icons[i]}
                      </div>
                      {/* Label */}
                      <div style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textAlign: "center",
                        color: isDone || isActive ? "var(--green-dark)" : "var(--gray200)",
                        marginTop: 6
                      }}>
                        {s}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* GPS Live Tracking Map */}
            <div style={{ marginBottom: 24 }}>
              <GPSTracker order={found} />
            </div>

            {/* Items Card */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 16px rgba(0,0,0,.06)", marginBottom: 24 }}>
              <h3 style={{ fontWeight: 800, marginBottom: 12 }}>Ordered Items</h3>
              {found.items.map((item, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f0fdf4", fontSize: 15, color: "var(--gray600)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span>📦</span> {item}
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontWeight: 800, fontSize: 17, paddingTop: 12, borderTop: "2px solid #f0fdf4" }}>
                <span>Total Paid</span>
                <span style={{ color: "var(--green)" }}>₹{found.total}</span>
              </div>
            </div>

            {/* Help Section */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "var(--gray600)", marginBottom: 10 }}>Need help with your order?</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://wa.me/918072377478" target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none", padding: "10px 20px", fontSize: 13 }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp Support
                </a>
                <button className="btn-secondary" style={{ padding: "10px 20px", fontSize: 13 }} onClick={() => nav("contact")}>📞 Contact Us</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div className="float" style={{ fontSize: 64 }}>🔍</div>
            <p style={{ marginTop: 16, color: "var(--gray600)", fontSize: 16, lineHeight: 1.8 }}>
              {trackId ? "Order not found. Please verify the ID and try again." : "Enter your Order ID above to track your delivery in real-time."}
            </p>
            {myOrder && <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setFound(myOrder)}>📦 View Latest Order</button>}
          </div>
        )}
      </div>
    </div>
  );
}
