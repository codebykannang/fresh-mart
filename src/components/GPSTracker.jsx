import React, { useState, useEffect } from 'react';

export default function GPSTracker({ order, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [gpsLogs, setGpsLogs] = useState([]);
  
  // Base coordinates for simulation (Coimbatore, Tamil Nadu area)
  const warehouseLat = 11.0184;
  const warehouseLng = 76.9740;
  
  // Customer coordinates slightly offset based on order id or hash
  const getCustomerOffset = () => {
    if (!order) return { lat: 11.0285, lng: 76.9520 };
    const code = order.id.charCodeAt(order.id.length - 1) || 5;
    return {
      lat: 11.0250 + (code % 7) * 0.0015,
      lng: 76.9450 + (code % 5) * 0.0025
    };
  };
  
  const customerLoc = getCustomerOffset();

  // Interpolated coordinates
  const currentLat = warehouseLat + (customerLoc.lat - warehouseLat) * (progress / 100);
  const currentLng = warehouseLng + (customerLoc.lng - warehouseLng) * (progress / 100);
  const distanceLeft = (3.4 * (1 - progress / 100)).toFixed(1);
  const etaMinutes = Math.ceil(12 * (1 - progress / 100));

  // Simulation timer
  useEffect(() => {
    let interval = null;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => {
          const next = p + 2.5; // increments progress
          if (next >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return next;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  // Generate logs based on progress
  useEffect(() => {
    const logs = [
      { p: 0, text: "📦 Order packed and assigned to delivery executive Ramesh Kumar." },
      { p: 15, text: "🚚 Package picked up from Coimbatore Warehouse (11.0184° N, 76.9740° E)." },
      { p: 40, text: "🚦 Passed Avinashi Road signal. Driver speed stable at 30 km/h." },
      { p: 70, text: "🏍️ Navigating through residential sector. Distance remaining: 1.2 km." },
      { p: 95, text: "🏡 Driver is in your street. Arriving in 1 minute!" },
      { p: 100, text: "✅ Package delivered successfully. Thank you for shopping with Fresh Mart!" }
    ];

    const currentLogs = logs.filter(l => progress >= l.p);
    setGpsLogs(currentLogs.reverse());
  }, [progress]);

  // SVG route details
  // Warehouse: (50, 250) -> Mid 1: (150, 180) -> Mid 2: (280, 180) -> Customer: (350, 80)
  const pathD = "M 50 250 Q 150 180 280 180 T 350 80";
  
  // Calculate point on Bezier path for manual truck icon overlay positioning
  // Q-Curve formula: B(t) = (1-t)^2*P0 + 2(1-t)*t*P1 + t^2*P2
  const t = progress / 100;
  const p0 = { x: 50, y: 250 };
  const p1 = { x: 150, y: 180 };
  const p2 = { x: 280, y: 180 };
  const p3 = { x: 350, y: 80 };
  
  // Cubic Bezier approximation for rendering truck position
  const getBezierPoint = (t) => {
    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;
    
    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;
    
    const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
    const y = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;
    return { x, y };
  };

  const truckPos = getBezierPoint(t);

  const resetSimulation = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #f0fdf4" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }} className="leaf-sway">📍</span>
          <div>
            <h3 style={{ fontSize: 18, color: "var(--green-dark)", fontWeight: 800, margin: 0 }}>Live GPS Delivery Tracking</h3>
            <p style={{ fontSize: 12, color: "var(--gray600)", margin: 0 }}>Order ID: #{order?.id || "JL001"} • Customer: {order?.customer || "Valued Customer"}</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: "var(--green-soft)", border: "none", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", color: "var(--green)", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }} className="checkout-form-row">
        {/* Map Simulator */}
        <div>
          <div className="map-container" style={{ height: 300, position: "relative" }}>
            {/* Map Grid Elements (simulated streets) */}
            <svg style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
              {/* Roads / Streets Grid */}
              <line x1="20" y1="0" x2="20" y2="300" stroke="#cbd5e1" strokeWidth="10" strokeDasharray="5,5" />
              <line x1="120" y1="0" x2="120" y2="300" stroke="#cbd5e1" strokeWidth="12" />
              <line x1="260" y1="0" x2="260" y2="300" stroke="#cbd5e1" strokeWidth="15" />
              <line x1="0" y1="90" x2="400" y2="90" stroke="#cbd5e1" strokeWidth="10" />
              <line x1="0" y1="180" x2="400" y2="180" stroke="#cbd5e1" strokeWidth="14" />
              <line x1="0" y1="240" x2="400" y2="240" stroke="#cbd5e1" strokeWidth="12" strokeDasharray="8,8" />

              {/* Delivery route path */}
              <path d={pathD} fill="none" stroke="var(--green)" strokeWidth="4" strokeLinecap="round" strokeDasharray="6,6" style={{ opacity: 0.85 }} />
              
              {/* Warehouse Pin */}
              <circle cx="50" cy="250" r="10" fill="var(--green-dark)" opacity="0.3" />
              <circle cx="50" cy="250" r="6" fill="var(--green-dark)" />
              <text x="35" y="275" fill="var(--green-dark)" fontSize="11" fontWeight="800">Fresh Mart HQ</text>

              {/* Customer Pin */}
              <circle cx="350" cy="80" r="12" fill="var(--red)" opacity="0.3" className="float" />
              <circle cx="350" cy="80" r="7" fill="var(--red)" />
              <text x="315" y="60" fill="var(--red)" fontSize="11" fontWeight="800">Delivery Home 🏠</text>

              {/* Moving Vehicle */}
              <g transform={`translate(${truckPos.x - 14}, ${truckPos.y - 14})`}>
                <circle cx="14" cy="14" r="16" fill="#fff" stroke="var(--green)" strokeWidth="2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }} />
                <text x="5" y="21" fontSize="18">🚚</text>
              </g>
            </svg>

            {/* Live GPS Coordinates Overlay */}
            <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(15,23,42,0.85)", color: "#fff", padding: "8px 12px", borderRadius: 10, fontSize: 11, fontFamily: "monospace", display: "flex", flexDirection: "column", gap: 2, backdropFilter: "blur(4px)" }}>
              <div>📡 Lat: {currentLat.toFixed(6)}° N</div>
              <div>📡 Lng: {currentLng.toFixed(6)}° E</div>
              <div>⚡ Status: {progress === 100 ? "ARRIVED" : "MOVING"}</div>
            </div>

            {/* Distance / ETA Overlay */}
            <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.9)", color: "var(--green-dark)", padding: "8px 12px", borderRadius: 10, fontSize: 12, fontWeight: 800, display: "flex", gap: 14, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", backdropFilter: "blur(4px)" }}>
              <div>📏 {distanceLeft} km left</div>
              <div>⏱️ {progress === 100 ? "Delivered" : `${etaMinutes} mins`}</div>
            </div>
          </div>

          {/* Simulator Controls */}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13, flex: 1 }} onClick={() => setIsPlaying(!isPlaying)} disabled={progress >= 100}>
              {progress >= 100 ? "✅ Delivered" : isPlaying ? "⏸️ Pause Tracking" : "▶️ Resume Tracking"}
            </button>
            <button className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13 }} onClick={resetSimulation}>
              🔄 Reset Sim
            </button>
          </div>
        </div>

        {/* Driver Details & Logs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Executive Card */}
          <div style={{ background: "var(--green-soft)", borderRadius: 16, padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifySelf: "center", justifyContent: "center", fontSize: 20, fontWeight: 900 }}>
              👨‍✈️
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "var(--green-dark)" }}>Ramesh Kumar</div>
              <div style={{ fontSize: 11, color: "var(--gray600)" }}>Green Delivery Partner</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", marginTop: 2 }}>⚡ Active (Electric Bike)</div>
            </div>
          </div>

          {/* Delivery Logs */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--gray600)", marginBottom: 8, fontWeight: 800 }}>GPS Telemetry Logs</h4>
            <div style={{ flex: 1, border: "1px solid var(--gray200)", borderRadius: 16, padding: 14, background: "#fafafa", overflowY: "auto", maxHeight: 180, display: "flex", flexDirection: "column", gap: 8 }}>
              {gpsLogs.map((log, index) => (
                <div key={index} style={{ fontSize: 12, lineHeight: 1.5, color: index === 0 ? "var(--green-dark)" : "var(--gray600)", fontWeight: index === 0 ? 800 : 500, paddingBottom: 6, borderBottom: index === gpsLogs.length - 1 ? "none" : "1px solid #f1f5f9" }}>
                  {log.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
