import { Avatar } from "../components/UI";

const ROLES = {
  "Super Admin": { user: "Maulana Pratama", desc: "All records" },
  Admin: { user: "Ardian Maulana", desc: "All business records" },
  Manager: { user: "Budi Santoso", desc: "Assign team · team records" },
  "Sales Executive": { user: "Clara Kusuma", desc: "Own or assigned records" },
  "Support / User": { user: "Dewi Ayu Lestari", desc: "Assigned support records" },
};

export default function Team() {
  return (
    <>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr><th>MEMBER</th><th>ROLE</th><th>ACCESS</th><th>IN MY TEAM</th></tr>
          </thead>
          <tbody>
            {Object.entries(ROLES).map(([role, data], i) => (
              <tr key={role}>
                <td><span className="flex items-center gap-sm"><Avatar name={data.user} /> {data.user}</span></td>
                <td>{role}</td>
                <td className="muted">{data.desc}</td>
                <td>
                  <button
                    className={`toggle ${i > 2 ? "on" : ""}`}
                    onClick={(e) => e.currentTarget.classList.toggle("on")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card mt-lg">
        <h3>Assign records</h3>
        <div className="flex gap-sm">
          <select className="input">
            <option>Contacts</option><option>Companies</option><option>Deals</option><option>Tasks</option>
          </select>
          <select className="input">
            {Object.values(ROLES).map((r) => <option key={r.user}>{r.user}</option>)}
          </select>
          <button className="btn primary" onClick={(e) => { e.currentTarget.nextElementSibling.textContent = "Assigned ✓"; }}>Assign</button>
          <span className="muted"></span>
        </div>
      </div>
    </>
  );
}
