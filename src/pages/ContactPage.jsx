import { useState } from 'react';

export default function ContactPage({ nav, showToast }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = () => {
    if (!form.name || !form.message) {
      showToast("❌ Please fill in your name and message!");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      showToast("✅ Message sent! We'll reply via WhatsApp soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 1200);
  };

  const contacts = [
    { icon: "📱", title: "Phone / WhatsApp", val: "+91 80723 77478", color: "#dcfce7", link: "tel:+918072377478" },
    { icon: "📧", title: "Email", val: "info@jayalakshmifresh.com", color: "#fef9c3", link: "mailto:info@jayalakshmifresh.com" },
    { icon: "🏠", title: "Farm Address", val: "tvkk nagar 100 feet road bodinayakanur, theni, tamilnadu pincode 625513", color: "#ffedd5", link: "https://maps.google.com/?q=Bodinayakanur,Theni" },
    { icon: "🕐", title: "Working Hours", val: "Mon–Sat: 6 AM – 8 PM\nSunday: 7 AM – 1 PM", color: "#f0f9ff", link: null },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg,#14532d 0%,#16a34a 60%,#22c55e 100%)",
        padding: "60px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(255,255,255,.04)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -60, left: -20, width: 240, height: 240, background: "rgba(255,255,255,.03)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }} className="float">📞</div>
          <h1 className="section-title fade-in-up" style={{ color: "#fff", marginBottom: 8 }}>Contact Us</h1>
          <p className="fade-in-up" style={{ color: "rgba(255,255,255,.85)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            We're always here to help. Reach us anytime, any day!
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="grid-2" style={{ gap: 48, alignItems: "start" }}>
          {/* Contact Form */}
          <div className="fade-in-left">
            <div style={{ background: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 8px 40px rgba(22,163,74,.1)", border: "1px solid #f0fdf4" }}>
              <h2 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(20px,4vw,26px)", color: "var(--green-dark)", marginBottom: 6 }}>Send us a Message</h2>
              <p style={{ color: "var(--gray600)", fontSize: 14, marginBottom: 24 }}>We usually respond within 30 minutes on WhatsApp.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Your Name *</label>
                  <input className="form-input" placeholder="your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" placeholder="+91 9876543210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 16 }}>
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-input"
                  rows={5}
                  placeholder="How can we help you today?"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ resize: "vertical" }}
                />
              </div>

              <button
                className="btn-primary"
                style={{ width: "100%", padding: "14px", fontSize: 16, justifyContent: "center", opacity: sending ? 0.7 : 1 }}
                onClick={submit}
                disabled={sending}
              >
                {sending ? "📡 Sending..." : "📤 Send Message"}
              </button>

              <button
                className="btn-secondary"
                style={{ width: "100%", padding: "12px", fontSize: 14, justifyContent: "center", marginTop: 10 }}
                onClick={() => nav("products")}
              >
                🛍 Continue Shopping
              </button>

              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                {[["🔒", "Secure & Private"], ["⚡", "Quick Response"], ["💬", "WhatsApp Support"]].map(([icon, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "var(--green-dark)" }}>
                    {icon} {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contacts + Map */}
          <div className="fade-in-right">
            {/* Contact Cards */}
            <div style={{ marginBottom: 20 }}>
              {contacts.map(c => (
                <div
                  key={c.title}
                  className="tilt"
                  style={{ background: c.color, borderRadius: 16, padding: 18, marginBottom: 12, display: "flex", gap: 14, alignItems: "center", cursor: c.link ? "pointer" : "default" }}
                  onClick={() => c.link && window.open(c.link, "_blank")}
                >
                  <div style={{ fontSize: 30, minWidth: 36 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: "var(--green-dark)", marginBottom: 2, fontSize: 14 }}>{c.title}</div>
                    <div style={{ color: "var(--gray600)", fontSize: 13, whiteSpace: "pre-line", lineHeight: 1.6 }}>{c.val}</div>
                  </div>
                  {c.link && <div style={{ marginLeft: "auto", color: "var(--green)", fontSize: 16 }}>→</div>}
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918072377478"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                background: "linear-gradient(135deg,#25D366,#128C7E)",
                color: "#fff",
                padding: "16px 24px",
                borderRadius: 16,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 16,
                boxShadow: "0 8px 24px rgba(37,211,102,.35)",
                transition: "all .3s",
                marginBottom: 20
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
              <span style={{ background: "rgba(255,255,255,.2)", padding: "2px 10px", borderRadius: 20, fontSize: 12 }}>Online</span>
            </a>

            {/* Google Maps Embed */}
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.12)", border: "3px solid #fff" }}>
              <div style={{ background: "var(--green-dark)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>📍</span>
                <div>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>Our Farm Location</div>
                  <div style={{ color: "rgba(255,255,255,.7)", fontSize: 11 }}>Bodinayakanur, Theni 625513</div>
                </div>
                <a
                  href="https://maps.google.com/?q=Bodinayakanur,Theni,Tamil+Nadu"
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: "auto", background: "rgba(255,255,255,.15)", color: "#fff", padding: "5px 12px", borderRadius: 20, textDecoration: "none", fontSize: 12, fontWeight: 700 }}
                >
                  Open ↗
                </a>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=Bodinayakanur,Theni,Tamil+Nadu,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="280"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Jaya Lakshmi Fresh Mart, Theni"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
