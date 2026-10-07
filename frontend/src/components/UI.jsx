import { statusColors, avatarColor, initials } from "../lib/constants";

export function Pill({ status }) {
  const color = statusColors[status] || "#9ca3af";
  return (
    <span className="pill" style={{ "--c": color }}>
      {status}
    </span>
  );
}

export function Avatar({ name, size = "sm" }) {
  return (
    <span
      className={`avatar ${size === "lg" ? "lg" : ""}`}
      style={{ background: avatarColor(name) }}
    >
      {initials(name)}
    </span>
  );
}

export function DataTable({ columns, rows, statusCol, avatarCol, boldCol = 0, onRowClick }) {
  return (
    <div className="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            {columns.map((col) => (
              <th key={col}>{col.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? "pointer" : undefined }}
            >
              <td>
                <input type="checkbox" />
              </td>
              {row.map((cell, ci) => (
                <td key={ci}>
                  {ci === statusCol ? (
                    <Pill status={cell} />
                  ) : ci === avatarCol ? (
                    <span className="flex items-center gap-sm">
                      <Avatar name={cell} />
                      {cell}
                    </span>
                  ) : ci === boldCol ? (
                    <b>{cell}</b>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KpiCard({ title, value, change, icon, color }) {
  const isDown = change?.startsWith("↓");
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <span className="muted">
          {icon && (
            <span className="icon-badge" style={{ "--c": color }}>
              {icon}
            </span>
          )}
          {title}
        </span>
        <span className="muted">⋮</span>
      </div>
      <div className="kpi-value">
        {value}{" "}
        {change && (
          <span
            className="pill no-dot"
            style={{ "--c": isDown ? "#c96a6a" : "#5fae9a", fontSize: 14 }}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

export function BarChart({ color, count = 20 }) {
  return (
    <svg viewBox="0 0 200 50" width="100%" height="70" preserveAspectRatio="none">
      {[...Array(count)].map((_, i) => (
        <rect
          key={i}
          className="bar-rect"
          style={{ animationDelay: `${i * 35}ms` }}
          x={i * 10}
          y={50 - 8 - i * 2}
          width="7"
          height={8 + i * 2}
          rx="1.5"
          fill={color}
          opacity={0.3 + i * 0.035}
        />
      ))}
    </svg>
  );
}

export function Toolbar({ resource, onAdd }) {
  return (
    <>
      <div className="toolbar">
        <input
          className="input"
          placeholder={`Search ${resource.toLowerCase()}`}
        />
        {onAdd && (
          <button className="btn primary" onClick={onAdd}>
            + Add {resource.toLowerCase()}
          </button>
        )}
      </div>
      <div className="toolbar">
        <button className="btn">⇅ Sort by</button>
        <button className="btn">Filter</button>
        <button className="btn">List view</button>
        <span style={{ flex: 1 }} />
        <button className="btn">Import/Export</button>
      </div>
    </>
  );
}

export function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function FormCard({ title, fields, onSubmit, onCancel, submitLabel = "Save" }) {
  return (
    <div className="card" style={{ maxWidth: 760 }}>
      <h3>{title}</h3>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {fields.map(([label, value, type]) => (
          <div key={label}>
            <label>{label}</label>
            <input
              className="input w-full"
              type={type || "text"}
              defaultValue={value || ""}
              placeholder={label}
            />
          </div>
        ))}
      </div>
      <br />
      <button className="btn primary" onClick={onSubmit}>
        {submitLabel}
      </button>{" "}
      <button className="btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}

export function DetailCard({ title, status, rows }) {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <Pill status={status} />
      </div>
      <div className="grid grid-3 mt-lg">
        {rows.map(([key, val]) => (
          <div key={key}>
            <small className="muted">{key}</small>
            <br />
            <b>{val}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToggleRow({ title, description, defaultOn, onChange }) {
  return (
    <div
      className="card flex justify-between items-center"
      style={{ marginBottom: 12 }}
    >
      <div>
        <b>{title}</b>
        <br />
        <span className="muted">{description}</span>
      </div>
      <button
        className={`toggle ${defaultOn ? "on" : ""}`}
        onClick={(e) => {
          e.currentTarget.classList.toggle("on");
          onChange?.(!e.currentTarget.classList.contains("on"));
        }}
      />
    </div>
  );
}
