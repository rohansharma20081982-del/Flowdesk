import { useState, useEffect } from "react";
import api from "../lib/api";
import { Pill, Modal } from "../components/UI";
import { eventTypeColors } from "../lib/constants";

const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const fmtDate = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [view, setView] = useState("Month");
  const [selected, setSelected] = useState(fmtDate(today));
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.getEvents().then(setEvents).catch(() => {});
  }, []);

  const eventsOn = (d) => events.filter((e) => e.date === d);
  const todayStr = fmtDate(today);

  function nav(n) {
    if (view === "Month") {
      const d = new Date(year, month + n, 1);
      setYear(d.getFullYear());
      setMonth(d.getMonth());
    } else {
      const d = new Date(selected + "T00:00");
      d.setDate(d.getDate() + n * (view === "Week" ? 7 : 1));
      setSelected(fmtDate(d));
      setYear(d.getFullYear());
      setMonth(d.getMonth());
    }
  }

  function goToday() {
    setSelected(todayStr);
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  async function saveEvent(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const event = {
      title: form.get("title"),
      type: form.get("type"),
      date: form.get("date") || selected,
      owner: form.get("owner"),
    };
    try {
      const created = await api.createEvent(event);
      setEvents((prev) => [...prev, created]);
      setShowModal(false);
    } catch {}
  }

  async function deleteEvent(id) {
    try {
      await api.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch {}
  }

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const selectedDate = new Date(selected + "T00:00");

  const titleMonth = firstDay.toLocaleString("en", { month: "long", year: "numeric" });
  const titleDay = selectedDate.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  // Upcoming 7 days
  const upcoming = events.filter((e) => e.date >= todayStr && e.date <= fmtDate((() => { const d = new Date(); d.setDate(d.getDate() + 7); return d; })())).sort((a, b) => (a.date < b.date ? -1 : 1));

  const selectedEvents = eventsOn(selected);

  function Chip({ ev }) {
    return (
      <div className="mail-item flex gap-md items-center" style={{ alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <b>{ev.title}</b>
          <br />
          <span className="muted">{ev.date} · {ev.owner || ""}</span>
        </div>
        <Pill status={ev.type} />
        <button className="btn" style={{ padding: "2px 8px" }} onClick={() => deleteEvent(ev.id)}>×</button>
      </div>
    );
  }

  let body;
  if (view === "Month") {
    body = (
      <div className="cal-grid">
        {DOW.map((d) => <small key={d} className="muted">{d}</small>)}
        {[...Array(firstDay.getDay())].map((_, i) => <div key={`e${i}`} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const d = fmtDate(new Date(year, month, i + 1));
          return (
            <div
              key={i}
              className={`cal-day ${d === selected ? "selected" : ""} ${d === todayStr && d !== selected ? "today" : ""}`}
              onClick={() => setSelected(d)}
            >
              {i + 1}
              <span className="event-dots">
                {eventsOn(d).slice(0, 4).map((e, j) => (
                  <i key={j} style={{ background: eventTypeColors[e.type] || "#7FA6B8" }} />
                ))}
              </span>
            </div>
          );
        })}
      </div>
    );
  } else if (view === "Week") {
    const w = new Date(selectedDate);
    w.setDate(w.getDate() - w.getDay());
    body = (
      <div className="grid" style={{ gridTemplateColumns: "repeat(7, minmax(90px, 1fr))", gap: 6, overflowX: "auto" }}>
        {[...Array(7)].map((_, i) => {
          const x = new Date(w);
          x.setDate(w.getDate() + i);
          const d = fmtDate(x);
          return (
            <div key={i} className="card" style={{ padding: 8, cursor: "pointer", borderColor: d === selected ? "var(--btn)" : undefined }} onClick={() => setSelected(d)}>
              <small className="muted">{DOW[i]}</small><br /><b>{x.getDate()}</b>
              {eventsOn(d).map((e, j) => (
                <div key={j} style={{ fontSize: 11, marginTop: 4, paddingLeft: 5, borderLeft: `3px solid ${eventTypeColors[e.type] || "#7FA6B8"}` }}>{e.title}</div>
              ))}
            </div>
          );
        })}
      </div>
    );
  } else {
    body = selectedEvents.length
      ? selectedEvents.map((e) => <Chip key={e.id} ev={e} />)
      : <p className="muted">No events on this day.</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-md" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0 }}>Calendar</h2>
          <span className="muted">Track deadlines, project start dates, completions and meetings at a glance</span>
        </div>
        <div className="flex gap-sm items-center">
          <div className="tabs">
            {["Month", "Week", "Day"].map((v) => (
              <span key={v} className={v === view ? "active" : ""} onClick={() => setView(v)}>{v}</span>
            ))}
          </div>
          <button className="btn primary" onClick={() => setShowModal(true)}>+ New event</button>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="flex justify-between items-center mb-md">
            <h3 style={{ margin: 0 }}>{view === "Month" ? titleMonth : view === "Day" ? titleDay : `Week of ${selectedDate.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}`}</h3>
            <div className="flex gap-sm">
              <button className="btn" onClick={() => nav(-1)}>‹</button>
              <button className="btn" onClick={goToday}>Today</button>
              <button className="btn" onClick={() => nav(1)}>›</button>
            </div>
          </div>
          <div className="muted mb-md" style={{ fontSize: 12 }}>
            {Object.entries(eventTypeColors).map(([k, c]) => (
              <span key={k} style={{ marginRight: 12 }}><span style={{ color: c }}>●</span> {k}</span>
            ))}
          </div>
          {body}
        </div>
        <div className="card" style={{ padding: 0, maxHeight: 640, overflowY: "auto" }}>
          <div style={{ padding: "16px 20px" }} className="flex justify-between items-center">
            <div><h3 style={{ margin: 0 }}>Upcoming activities</h3><span className="muted">Next 7 days</span></div>
            <button className="btn" onClick={() => setShowModal(true)}>+</button>
          </div>
          {upcoming.length ? upcoming.map((e) => <Chip key={e.id} ev={e} />) : <p className="muted" style={{ padding: "0 20px" }}>Nothing scheduled.</p>}
          <div style={{ padding: "16px 20px 0" }}>
            <b>{selectedDate.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}</b>
          </div>
          {selectedEvents.length ? selectedEvents.map((e) => <Chip key={e.id} ev={e} />) : <p className="muted" style={{ padding: "0 20px 16px" }}>No events on the selected day.</p>}
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form className="card" style={{ width: 420, maxWidth: "92vw" }} onSubmit={saveEvent}>
            <h3>New event</h3>
            <label>Title</label>
            <input className="input w-full" name="title" placeholder="e.g. Website redesign deadline" required />
            <label>Type</label>
            <select className="input w-full" name="type">
              {Object.keys(eventTypeColors).map((k) => <option key={k}>{k}</option>)}
            </select>
            <label>Date</label>
            <input className="input w-full" name="date" type="date" defaultValue={selected} />
            <label>Assigned to</label>
            <input className="input w-full" name="owner" placeholder="Owner / team member" />
            <br /><br />
            <button type="submit" className="btn primary">Save event</button>{" "}
            <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        </Modal>
      )}
    </>
  );
}
