import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

export default function Login() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("Sales Executive");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    api.getRoles().then(setRoles).catch(() => {
      // Fallback demo roles
      setRoles([
        { role: "Super Admin", user: "Maulana Pratama", email: "superadmin@clientra.com", description: "All records" },
        { role: "Admin", user: "Ardian Maulana", email: "admin@clientra.com", description: "All business records" },
        { role: "Manager", user: "Budi Santoso", email: "manager@clientra.com", description: "Assign team · team records" },
        { role: "Sales Executive", user: "Clara Kusuma", email: "sales@clientra.com", description: "Own or assigned records" },
        { role: "Support / User", user: "Dewi Ayu Lestari", email: "support@clientra.com", description: "Assigned support records" },
      ]);
    });
  }, []);

  const current = roles.find((r) => r.role === selectedRole);

  async function handleLogin() {
    setLoading(true);
    try {
      await login(selectedRole, current?.email, "demo1234");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="login-screen">
      <div className="card" style={{ width: 580, maxWidth: "100%" }}>
        <div className="logo" style={{ padding: 0 }}>Clientra</div>
        <h2 style={{ margin: "8px 0 4px" }}>Sign in</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          Choose a role to preview its access. Demo only: there is no real authentication.
        </p>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {roles.map((r) => (
            <div
              key={r.role}
              className={`role-card ${r.role === selectedRole ? "active" : ""}`}
              onClick={() => setSelectedRole(r.role)}
            >
              <b>{r.role}</b>
              <br />
              <small className="muted">{r.description}</small>
            </div>
          ))}
        </div>

        <label>Email</label>
        <input
          className="input w-full"
          value={current?.email || ""}
          readOnly
        />

        <label>Password</label>
        <input
          className="input w-full"
          type="password"
          defaultValue="demo1234"
        />

        <br /><br />
        <button
          className="btn primary w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in…" : `Sign in as ${selectedRole}`}
        </button>
      </div>
    </div>
  );
}
