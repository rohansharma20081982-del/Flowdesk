export default function Notifications() {
  const items = [
    ["New deal assigned", "Cloud Infrastructure Migration", "2m ago"],
    ["Task due soon", "LAN optimization for client B", "1h ago"],
    ["Invoice overdue", "INV-2025-0140 · Best Buy Co.", "Yesterday"],
    ["Email received", "Bayu Saputra: Marketing Campaign Brief", "2d ago"],
  ];

  return (
    <div className="card" style={{ padding: 0 }}>
      {items.map((n, i) => (
        <div key={i} className="mail-item">
          <b>{n[0]}</b>
          <small className="muted" style={{ float: "right" }}>{n[2]}</small>
          <br />
          <span className="muted">{n[1]}</span>
        </div>
      ))}
    </div>
  );
}
