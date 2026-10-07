export default function Profile() {
  const fields = [
    ["First name", "Maulana"],
    ["Last name", "Pratama"],
    ["Email", "maulana@gmail.com"],
    ["Phone number", "860 - 3380 - 5648"],
    ["Role", "CRM Manager"],
    ["Timezone", "(GMT+07:00) Jakarta"],
  ];

  return (
    <div className="card" style={{ maxWidth: 760 }}>
      <h3>Personal information</h3>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {fields.map(([label, value]) => (
          <div key={label}>
            <label>{label}</label>
            <input className="input w-full" defaultValue={value} />
          </div>
        ))}
      </div>
      <br />
      <button className="btn primary">Save changes</button>
    </div>
  );
}
