/** Status → color mapping from the original CRM */
export const statusColors = {
  Customer: "#5fae9a",
  Won: "#5fae9a",
  Paid: "#5fae9a",
  Completed: "#5fae9a",
  New: "#7FA6B8",
  Lead: "#7FA6B8",
  Partner: "#7FA6B8",
  Payment: "#7FA6B8",
  Qualified: "#8b8fc4",
  Proposal: "#c9a46a",
  Opportunity: "#c9a46a",
  "Ex-Customer": "#c9a46a",
  Waiting: "#c9a46a",
  Pending: "#c9a46a",
  Lost: "#c96a6a",
  Competitor: "#c96a6a",
  Postponed: "#c96a6a",
  Overdue: "#c96a6a",
  "To-Do": "#9ca3af",
};

/** Calendar event type → color mapping */
export const eventTypeColors = {
  Task: "#7FA6B8",
  Meeting: "#c9a46a",
  Deal: "#4f7f96",
  "Project given": "#8b8fc4",
  Deadline: "#c96a6a",
  "Project completion": "#5fae9a",
};

/** Generate avatar initials color from name */
export function avatarColor(name) {
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0) * 7, 0) % 360;
  return `hsl(${hash} 55% 45%)`;
}

/** Get initials from a name */
export function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

/** Format currency */
export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Navigation structure */
export const NAV_ITEMS = [
  {
    section: "MAIN MENU",
    items: [
      { name: "Dashboard", icon: "▦" },
      { name: "Contacts", icon: "☺" },
      { name: "Companies", icon: "▤" },
      { name: "Deals", icon: "✦" },
      { name: "Tasks", icon: "☑" },
      { name: "Reports", icon: "↗" },
      { name: "Calendar", icon: "▣" },
      { name: "Team", icon: "⚑" },
    ],
  },
  {
    section: "MARKETING",
    items: [
      { name: "Products", icon: "◈" },
      { name: "Emails", icon: "✉" },
      { name: "Invoices", icon: "▥" },
    ],
  },
  {
    section: "PREFERENCES",
    items: [
      { name: "Integrations", icon: "⚙" },
      { name: "Profile", icon: "◉" },
      { name: "Settings", icon: "⚒" },
      { name: "Notifications", icon: "🔔" },
    ],
  },
];
