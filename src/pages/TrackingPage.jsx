import { useState } from 'react';
import { ORDER_STATUSES } from '../data/mockData';
import GPSTracker from '../components/GPSTracker';
import TiltCard from '../components/TiltCard';

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
    <div style={{ paddingTop: 110, minHeight: "85vh", position: "relative" }}>
      {/* Background Blurs */}
      <div className="glow-blob glow-blob-green" style={{ width: 350, height: 350, top: "10%", left: "5%" }} />
      <div className="glow-blob glow-blob-gold" style={{ width: 280, height: 280, bottom: "15%", right: "5%" }} />

      <div className="container" style={{ padding: "40px 20px", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <h1 className="section-title fade-in-up" style={{ textAlign: "center", color: "var(--green-dark)", fontWeight: 900, fontSize: "2.4rem", marginBottom: 8 }}>
          📦 Live Order Tracking
        </h1>
        <p className="section-subtitle fade-in-up" style={{ textAlign: "center", color: "var(--gray600)", fontWeight: 500, marginBottom: 36 }}>
          Monitor your farm-fresh box delivery telemetry in real-time
        </p>

        {/* Search Panel (Glassmorphic) */}
        <div className="glass-panel fade-in-up" style={{ padding: 24, marginBottom: 36, background: "rgba(255, 255, 255, 0.7)" }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <input
              className="premium-input form-input"
              style={{ flex: 1, minWidth: 200, height: 48, borderRadius: 14, fontSize: 14, fontWeight: 700, paddingLeft: 18 }}
              placeholder="Enter your Order ID (e.g. JL001, JL002)..."
              value={trackId}
              onChange={e => setTrackId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
            />
            <button 
              className="btn-premium" 
              onClick={handleTrack} 
              style={{ whiteSpace: "nowrap", padding: "0 28px", height: 48, borderRadius: 14 }}
            >
              🔍 Locate Package
            </button>
          </div>
        </div>

        {found ? (
          <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            
            {/* Tracking Status Card (3D Tiltable Sheet!) */}
            <TiltCard maxTilt={6} style={{ borderRadius: 28 }}>
              <div 
                className="glass-panel" 
                style={{ 
                  background: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(245,158,11,0.06))", 
                  padding: 32,
                  border: "1px solid rgba(16,185,129,0.15)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36, alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 20, color: "var(--green-dark)" }}>Order #{found.id}</div>
                    <div style={{ color: "var(--gray600)", fontSize: 13, fontWeight: 700, marginTop: 4 }}>Placed on: {found.date}</div>
                  </div>
                  <div 
                    className="badge" 
                    style={{ 
                      fontSize: 13, 
                      padding: "8px 20px", 
                      background: "rgba(16, 185, 129, 0.15)", 
                      color: "var(--green-dark)",
                      fontWeight: 800,
                      borderRadius: 50,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.03)"
                    }}
                  >
                    🚀 {ORDER_STATUSES[found.status]}
                  </div>
                </div>

                {/* Status Telemetry Steps */}
                <div className="tracker-container">
                  {ORDER_STATUSES.map((s, i) => {
                    const icons = ["📋", "📦", "🚚", "🏠"];
                    const isDone = i < status;
                    const isActive = i === status;
                    const circleClass = isDone ? "done" : isActive ? "active" : "pending";

                    return (
                      <div key={s} className="tracker-step-item">
                        {/* Connector line */}
                        {i > 0 && (
                          <div 
                            className="tracker-connector" 
                            style={{
                              background: isDone ? "var(--green)" : "var(--gray200)",
                              height: 4,
                              transition: "background .4s"
                            }} 
                          />
                        )}
                        
                        {/* Status Circle */}
                        <div 
                          className={`tracker-circle ${circleClass}`}
                          style={{
                            width: 44,
                            height: 44,
                            fontSize: 18,
                            boxShadow: isActive ? "0 0 15px rgba(16,185,129,0.4)" : "none",
                            transition: "all 0.3s ease"
                          }}
                        >
                          {isDone ? "✓" : icons[i]}
                        </div>
                        
                        {/* Step Label */}
                        <div style={{
                          fontSize: 12,
                          fontWeight: 800,
                          textAlign: "center",
                          color: isDone || isActive ? "var(--green-dark)" : "var(--gray600)",
                          marginTop: 10,
                          letterSpacing: "0.2px"
                        }}>
                          {s}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TiltCard>

            {/* Simulated Live GPS Map Overlay */}
            <div>
              <GPSTracker order={found} />
            </div>

            {/* Ordered Items Glass Sheet */}
            <div className="glass-panel" style={{ padding: 32, background: "rgba(255,255,255,0.75)" }}>
              <h3 style={{ fontWeight: 900, fontSize: 18, color: "var(--green-dark)", marginBottom: 20 }}>Package Manifest</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {found.items.map((item, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      padding: "12px 0", 
                      borderBottom: "1px solid rgba(16,185,129,0.08)", 
                      fontSize: 15, 
                      color: "var(--gray800)", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 12,
                      fontWeight: 600
                    }}
                  >
                    <span style={{ fontSize: 18 }}>📦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, fontWeight: 900, fontSize: 18, paddingTop: 18, borderTop: "2px solid rgba(16,185,129,0.12)" }}>
                <span style={{ color: "var(--gray600)" }}>Total Amount Paid</span>
                <span style={{ color: "var(--green)" }}>₹{found.total}</span>
              </div>
            </div>

            {/* Help Callout */}
            <div style={{ marginTop: 10, textAlign: "center" }}>
              <p style={{ fontSize: 14, color: "var(--gray600)", marginBottom: 16, fontWeight: 700 }}>Need custom shipping instructions or order modifications?</p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <a 
                  href="https://wa.me/918072377478" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-premium" 
                  style={{ textDecoration: "none", padding: "12px 24px", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp Support
                </a>
                <button 
                  className="btn-premium-secondary" 
                  style={{ padding: "12px 24px", fontSize: 14 }} 
                  onClick={() => nav("contact")}
                >
                  📞 Direct Hotline
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="glass-panel fade-in-up" style={{ textAlign: "center", padding: "60px 40px", background: "rgba(255,255,255,0.7)" }}>
            <div className="float" style={{ fontSize: 64 }}>🔍</div>
            <p style={{ marginTop: 20, color: "var(--gray600)", fontSize: 16, lineHeight: 1.8, fontWeight: 700 }}>
              {trackId 
                ? "No matching order record found. Please verify the alphanumeric code and try again." 
                : "Input your Order ID (available in your email/SMS confirmation) above to monitor delivery telemetry."}
            </p>
            {myOrder && (
              <button 
                className="btn-premium" 
                style={{ marginTop: 20, padding: "12px 28px" }} 
                onClick={() => setFound(myOrder)}
              >
                📦 Auto-Track Current Order
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
