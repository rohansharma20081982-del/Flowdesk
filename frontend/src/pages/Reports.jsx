import { KpiCard } from "../components/UI";

export default function Reports() {
  const trend1 = [5, 40, 15, 60, 45, 95, 80];
  const trend2 = [20, 25, 45, 45, 50, 52, 70];
  const max = 100;

  function smooth(points) {
    return points.reduce((s, [x, y], i) => {
      if (i === 0) return `M${x},${y}`;
      const prev = points[i - 1];
      const cx = (prev[0] + x) / 2;
      return s + `C${cx},${prev[1]} ${cx},${y} ${x},${y}`;
    }, "");
  }

  return (
    <>
      <div className="grid grid-4">
        <KpiCard title="Total Revenue" value="$142.8K" change="↑ 14.3% vs last period" />
        <KpiCard title="Deals Won" value="86" change="↑ 9.1% vs last period" />
        <KpiCard title="Conversion Rate" value="24.6%" change="↑ 3.5% vs last period" />
        <KpiCard title="Avg Deal Size" value="$3.4K" change="↓ 2.1% vs last period" />
      </div>
      <div className="card mt-lg">
        <b>Revenue trend</b>
        <svg viewBox="0 0 800 260" width="100%" style={{ marginTop: 10 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" x2="800" y1={i * 60 + 10} y2={i * 60 + 10} stroke="var(--bd)" strokeDasharray="4" />
          ))}
          <path
            className="line-path"
            pathLength="1"
            strokeDasharray="1"
            d={smooth(trend1.map((y, i) => [i * (800 / (trend1.length - 1)), 250 - y * 2.2]))}
            fill="none"
            stroke="#7FA6B8"
            strokeWidth="2.5"
          />
          <path
            className="line-path"
            pathLength="1"
            strokeDasharray="1"
            d={smooth(trend2.map((y, i) => [i * (800 / (trend2.length - 1)), 250 - y * 2.2]))}
            fill="none"
            stroke="#5fae9a"
            strokeWidth="2.5"
            strokeDasharray="4 5"
            style={{ animationDelay: ".3s" }}
          />
        </svg>
      </div>
    </>
  );
}
