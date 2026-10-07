import { useTheme } from "../context/ThemeContext";
import { ToggleRow } from "../components/UI";

const ACCENT_COLORS = ["#2A3E4B", "#7FA6B8", "#4f7f96", "#5fae9a", "#a9c6d4"];

export default function Settings() {
  const { setTheme } = useTheme();

  return (
    <>
      <div className="card mb-md">
        <h3>Appearance</h3>
        <p className="muted">Theme mode</p>
        {["light", "dark", "system"].map((m) => (
          <button
            key={m}
            className="btn"
            onClick={() => setTheme(m)}
            style={{ marginRight: 8, textTransform: "capitalize" }}
          >
            {m}
          </button>
        ))}
        <p className="muted">Accent color</p>
        {ACCENT_COLORS.map((c) => (
          <button
            key={c}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: 0,
              background: c,
              cursor: "pointer",
              marginRight: 8,
            }}
            onClick={() => document.documentElement.style.setProperty("--btn", c)}
          />
        ))}
      </div>
      <ToggleRow title="Email notifications" description="Receive deal and task updates" defaultOn />
      <ToggleRow title="Two-factor authentication" description="Extra security for your account" />
      <ToggleRow title="Weekly report" description="Summary every Monday" defaultOn />
    </>
  );
}
