export default function Emails() {
  const mails = [
    ["Bayu Saputra", "Marketing Campaign Brief", "01 Jan 2025"],
    ["Ahmad Fauzi", "Proposal for partnership", "02 Jan 2025"],
    ["Citra Maharani", "Product Launch Plan", "30 Apr 2025"],
    ["Daniel Susanto", "Event Sponsorship Agreement", "20 Jun 2025"],
  ];

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
      <div className="card" style={{ padding: 0 }}>
        {mails.map((m, i) => (
          <div key={i} className="mail-item">
            <b>{m[0]}</b>
            <small className="muted" style={{ float: "right" }}>{m[2]}</small>
            <br />
            {m[1]}
          </div>
        ))}
      </div>
      <div className="card text-center" style={{ paddingTop: 120 }}>
        <b>Oops, email not visible</b>
        <p className="muted">Select the email you want to view first</p>
      </div>
    </div>
  );
}
