import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NAV_ITEMS, avatarColor, initials } from "../lib/constants";

export default function Sidebar() {
  const { user, logout, isAllowed } = useAuth();

  return (
    <aside className="sidebar">
      <div className="logo">Clientra</div>

      <nav>
        {NAV_ITEMS.map((section) => {
          const visible = section.items.filter((item) => isAllowed(item.name));
          if (!visible.length) return null;
          return (
            <div key={section.section}>
              <h6>{section.section}</h6>
              {visible.map((item) => (
                <NavLink
                  key={item.name}
                  to={`/${item.name.toLowerCase().replace(/ /g, "-")}`}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                >
                  <i className="nav-icon">{item.icon}</i>
                  {item.name}
                </NavLink>
              ))}
            </div>
          );
        })}
      </nav>

      {user && (
        <div className="sidebar-user">
          <span
            className="avatar lg"
            style={{ background: avatarColor(user.name) }}
          >
            {initials(user.name)}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <b>{user.name}</b>
            <small>{user.role}</small>
          </div>
          <button
            className="btn"
            style={{ padding: "4px 8px" }}
            title="Sign out"
            onClick={logout}
          >
            ⎋
          </button>
        </div>
      )}
    </aside>
  );
}
