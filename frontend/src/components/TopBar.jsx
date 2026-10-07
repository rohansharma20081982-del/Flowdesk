import { useTheme } from "../context/ThemeContext";

export default function TopBar({ title }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="top-bar">
      <h1>{title}</h1>
      <div className="flex gap-sm items-center">
        <button className="btn btn-icon">🔔</button>
        <select
          className="btn"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="system">◐ System</option>
          <option value="light">☀ Light</option>
          <option value="dark">☾ Dark</option>
        </select>
      </div>
    </header>
  );
}
