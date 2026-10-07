import { useState, useEffect } from "react";
import api from "../lib/api";
import { KpiCard, BarChart, DataTable } from "../components/UI";
import { formatCurrency } from "../lib/constants";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const FC = [
  { name: "Profit margin", color: "#8b8fc4", data: [11.5,13,16,18,21,23.5,25,23.5,26,24,22,21] },
  { name: "Operating expenses", color: "#c9a46a", data: [8,10,12,14,16,19,19.5,18,17,16,17,18] },
  { name: "Sales revenue", color: "#7FA6B8", data: [5,7,9,11,13,14.5,15,14,13,12,13,14] },
];

function smooth(points) {
  return points.reduce((s, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const prev = points[i - 1];
    const cx = (prev[0] + x) / 2;
    return s + `C${cx},${prev[1]} ${cx},${y} ${x},${y}`;
  }, "");
}

function ForecastChart() {
  const [hover, setHover] = useState(null);

  const fx = (i) => 50 + (i * 730) / 11;
  const fy = (v) => 260 - v * 8;

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h3 style={{ margin: 0 }}>Revenue forecast</h3>
        <select className="btn">
          <option>▣ Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      </div>
      <div style={{ position: "relative", marginTop: 10 }}>
        <svg
          viewBox="0 0 800 300"
          width="100%"
          style={{ display: "block" }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            let i = Math.round(((e.clientX - r.left) / r.width * 800 - 50) / (730 / 11));
            i = Math.max(0, Math.min(11, i));
            setHover(i);
          }}
          onMouseLeave={() => setHover(null)}
        >
          {[0, 6, 12, 18, 24, 30].map((v) => (
            <g key={v}>
              <line x1="50" x2="780" y1={fy(v)} y2={fy(v)} stroke="var(--bd)" strokeDasharray="4" />
              <text x="0" y={fy(v) + 4} fontSize="11" fill="var(--mu)">${v}K</text>
            </g>
          ))}
          {MONTHS.map((m, i) => (
            <text key={m} x={fx(i)} y="288" fontSize="11" textAnchor="middle" fill="var(--mu)">{m}</text>
          ))}
          {hover !== null && (
            <line x1={fx(hover)} x2={fx(hover)} y1="20" y2="260" stroke="var(--mu)" strokeDasharray="3 3" />
          )}
          {FC.map((series, k) => (
            <path
              key={k}
              className="line-path"
              pathLength="1"
              strokeDasharray="1"
              d={smooth(series.data.map((v, i) => [fx(i), fy(v)]))}
              fill="none"
              stroke={series.color}
              strokeWidth="2.5"
              style={{ animationDelay: `${k * 0.2}s` }}
            />
          ))}
          {hover !== null && FC.map((series, k) => (
            <circle
              key={k}
              cx={fx(hover)}
              cy={fy(series.data[hover])}
              r="5"
              fill={series.color}
              stroke="#fff"
              strokeWidth="2"
            />
          ))}
        </svg>
        {hover !== null && (
          <div
            style={{
              position: "absolute",
              top: 30,
              left: `${(fx(hover) / 800) * 100}%`,
              transform: hover > 7 ? "translateX(-100%)" : "none",
              background: "var(--bg)",
              border: "1px solid var(--bd)",
              borderRadius: 10,
              padding: "10px 14px",
              minWidth: 200,
              zIndex: 2,
              boxShadow: "0 8px 24px rgba(0,0,0,.15)",
              pointerEvents: "none",
            }}
          >
            <b>{MONTHS[hover]}</b>
            {FC.map((s) => (
              <div key={s.name} style={{ marginTop: 6 }}>
                <span style={{ color: s.color }}>●</span> {s.name}: <b>${s.data[hover].toFixed(1)}K</b>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="muted flex items-center"
        style={{
          justifyContent: "center",
          gap: 22,
          borderTop: "1px solid var(--bd)",
          marginTop: 14,
          paddingTop: 12,
          flexWrap: "wrap",
        }}
      >
        {FC.map((s) => (
          <span key={s.name}>
            <span style={{ color: s.color }}>●</span> {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

const SOURCES = [
  { name: "Website", count: "6,848", pct: 55, color: "#4f7f96" },
  { name: "Social Media", count: "2,490", pct: 20, color: "#8b8fc4" },
  { name: "Email", count: "1,867", pct: 15, color: "#7FA6B8" },
  { name: "Referral", count: "1,245", pct: 10, color: "#5fae9a" },
];

function SourceDonut() {
  let offset = 0;
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h3 style={{ margin: 0 }}>Source</h3>
        <select className="btn">
          <option>Contacts</option>
          <option>Companies</option>
        </select>
      </div>
      <div style={{ position: "relative", width: 200, margin: "16px auto" }}>
        <svg viewBox="0 0 42 42" style={{ transform: "rotate(-90deg)", display: "block" }}>
          {SOURCES.map((s, i) => {
            const o = offset;
            offset += s.pct;
            return (
              <circle
                key={s.name}
                className="donut-segment"
                cx="21" cy="21" r="15.9"
                fill="none"
                stroke={s.color}
                strokeWidth="5"
                pathLength="100"
                strokeDasharray={`${s.pct} ${100 - s.pct}`}
                strokeDashoffset={-o}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <b style={{ fontSize: 24 }}>12,450</b>
          <small className="muted">Total</small>
        </div>
      </div>
      {SOURCES.map((s) => (
        <div key={s.name} className="flex justify-between" style={{ padding: "6px 0" }}>
          <span style={{ borderLeft: `3px solid ${s.color}`, paddingLeft: 10 }}>{s.name}</span>
          <span>
            <b>{s.count}</b>{" "}
            <span className="muted" style={{ marginLeft: 12 }}>{s.pct}%</span>
          </span>
        </div>
      ))}
      <button className="btn w-full mt-md">View details</button>
    </div>
  );
}

export default function Dashboard() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    api.getDashboard().then((d) => {
      if (d.recentDeals) {
        setDeals(
          d.recentDeals.map((deal) => [
            deal.name,
            deal.company,
            formatCurrency(deal.price),
            deal.date_created,
            deal.owner,
            deal.stage,
          ])
        );
      }
    }).catch(() => {});
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-md" style={{ flexWrap: "wrap", gap: 12 }}>
        <div className="tabs">
          <span className="active">Overview</span>
          <span>Sales</span>
          <span>Order</span>
          <span>Report</span>
        </div>
        <div className="flex gap-sm">
          <button className="btn">⚟ Filter</button>
          <button className="btn primary">⭳ Export all</button>
        </div>
      </div>

      <div className="grid grid-3">
        {[
          ["Total sales", "$28,500", "↑ 10.2%", "#7FA6B8", "$"],
          ["Operating expenses", "$18,200", "↓ 5.75%", "#c9a46a", "▣"],
          ["Gross profit", "$22,500", "↑ 8.55%", "#5fae9a", "↗"],
        ].map(([title, value, change, color, icon]) => (
          <div className="card" key={title}>
            <div className="flex justify-between items-center">
              <span className="muted">
                <span className="icon-badge" style={{ "--c": color }}>{icon}</span> {title}
              </span>
              <span className="muted">⋮</span>
            </div>
            <div className="kpi-value">
              {value}{" "}
              <span
                className="pill no-dot"
                style={{ "--c": change.startsWith("↓") ? "#c96a6a" : "#5fae9a", fontSize: 14 }}
              >
                {change}
              </span>
            </div>
            <BarChart color={color} />
            <span className="muted">VS last week</span>
          </div>
        ))}
      </div>

      <div className="grid grid-2 mt-lg">
        <ForecastChart />
        <SourceDonut />
      </div>

      <div className="flex justify-between items-center mt-lg mb-md" style={{ flexWrap: "wrap", gap: 12 }}>
        <h3 style={{ margin: 0 }}>Table data sales</h3>
        <div className="flex gap-sm">
          <input className="input" placeholder="Search data" />
          <button className="btn">⇅ Sort by</button>
          <button className="btn">Filter</button>
        </div>
      </div>
      <DataTable
        columns={["Deal name", "Company", "Price", "Date created", "Owner", "Stage"]}
        rows={deals}
        boldCol={0}
        statusCol={5}
        avatarCol={4}
      />
    </>
  );
}
