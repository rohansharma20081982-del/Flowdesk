/* ─────────────────────────────────────────────
   In-memory demo data  – used when Supabase
   keys are not configured. Mirrors the original
   single-file CRM exactly.
   ───────────────────────────────────────────── */

export const roles = {
  "Super Admin": {
    user: "Maulana Pratama",
    email: "superadmin@clientra.com",
    description: "All records",
    pages: "*",
    scopeKeys: null,
    home: "Dashboard",
  },
  Admin: {
    user: "Ardian Maulana",
    email: "admin@clientra.com",
    description: "All business records",
    pages: "*",
    scopeKeys: null,
    home: "Dashboard",
  },
  Manager: {
    user: "Budi Santoso",
    email: "manager@clientra.com",
    description: "Assign team · team records",
    pages:
      "Dashboard,Contacts,Companies,Deals,Tasks,Reports,Calendar,Team,Emails,Profile,Notifications",
    scopeKeys: ["Budi", "Clara", "Dewi"],
    home: "Dashboard",
  },
  "Sales Executive": {
    user: "Clara Kusuma",
    email: "sales@clientra.com",
    description: "Own or assigned records",
    pages:
      "Dashboard,Contacts,Companies,Deals,Tasks,Calendar,Emails,Profile,Notifications",
    scopeKeys: ["Clara"],
    home: "Dashboard",
  },
  "Support / User": {
    user: "Dewi Ayu Lestari",
    email: "support@clientra.com",
    description: "Assigned support records & permitted customer details",
    pages: "Contacts,Tasks,Calendar,Profile,Notifications",
    scopeKeys: ["Dewi"],
    home: "Tasks",
  },
};

export const contacts = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    job_title: "Account Executive",
    email: "ahmad@gmail.com",
    phone: "(+62) 80-0685-490",
    owner: "Ardian Maulana",
    status: "Ex-Customer",
  },
  {
    id: 2,
    name: "Bayu Saputra",
    job_title: "Account Manager",
    email: "bayu@gmail.com",
    phone: "(+62) 81-2345-6789",
    owner: "Budi Santoso",
    status: "Customer",
  },
  {
    id: 3,
    name: "Citra Maharani",
    job_title: "Marketing Specialist",
    email: "citra@gmail.com",
    phone: "(+62) 82-9876-5432",
    owner: "Clara Kusuma",
    status: "Qualified",
  },
  {
    id: 4,
    name: "Daniel Susanto",
    job_title: "Sales Executive",
    email: "daniel@gmail.com",
    phone: "(+62) 81-0987-6543",
    owner: "Dewi Ayu Lestari",
    status: "Opportunity",
  },
  {
    id: 5,
    name: "Erna Wijaya",
    job_title: "Business Analyst",
    email: "erna@gmail.com",
    phone: "(+62) 81-2345-0987",
    owner: "Eka Rahman",
    status: "Customer",
  },
  {
    id: 6,
    name: "Oka Pratama",
    job_title: "Marketing Manager",
    email: "oka@gmail.com",
    phone: "(+62) 81-1122-2233",
    owner: "Gina Amelia",
    status: "Lead",
  },
];

export const companies = [
  {
    id: 1,
    name: "Amazon.com, Inc",
    address: "1234 Innovation St",
    phone: "(+1) 408-996-1010",
    url: "amazon.com",
    owner: "Budi Santoso",
    type: "Ex-Customer",
  },
  {
    id: 2,
    name: "Apple, Inc",
    address: "1 Infinite Loop",
    phone: "(+1) 650-681-5000",
    url: "apple.com",
    owner: "Clara Kusuma",
    type: "Competitor",
  },
  {
    id: 3,
    name: "Vodafone Group",
    address: "Vodafone House",
    phone: "(+1) 425-882-8080",
    url: "vodafone.com",
    owner: "Ardian Maulana",
    type: "Partner",
  },
  {
    id: 4,
    name: "Ford Motor Company",
    address: "World HQ",
    phone: "(+1) 312-555-4421",
    url: "ford.com",
    owner: "Clara Kusuma",
    type: "Customer",
  },
  {
    id: 5,
    name: "Tesla, Inc",
    address: "3500 Deer Creek Rd",
    phone: "(+1) 415-800-5959",
    url: "tesla.com",
    owner: "Dewi Ayu Lestari",
    type: "Partner",
  },
];

export const deals = [
  {
    id: 1,
    name: "Cloud Infrastructure Migration",
    company: "Amazon.com, Inc",
    price: 850000,
    date_created: "2025-01-12",
    owner: "Ardian Maulana",
    stage: "New",
  },
  {
    id: 2,
    name: "Online Learning Platform",
    company: "Shopify Inc",
    price: 420000,
    date_created: "2025-01-21",
    owner: "Dwi Wahyu",
    stage: "Qualified",
  },
  {
    id: 3,
    name: "Retail POS System Upgrade",
    company: "Best Buy Co.",
    price: 315500,
    date_created: "2025-01-30",
    owner: "Adinda Ayu",
    stage: "Proposal",
  },
  {
    id: 4,
    name: "Brand Identity Redesign",
    company: "Nike, Inc",
    price: 180000,
    date_created: "2025-02-04",
    owner: "Galih Adi",
    stage: "Won",
  },
  {
    id: 5,
    name: "Travel Booking Integration",
    company: "Traveloka",
    price: 96000,
    date_created: "2025-02-15",
    owner: "Hendra K.",
    stage: "Payment",
  },
  {
    id: 6,
    name: "Pharmacy Inventory Suite",
    company: "PharmaCare",
    price: 240750,
    date_created: "2025-02-27",
    owner: "Maulana P.",
    stage: "Lost",
  },
];

export const tasks = [
  {
    id: 1,
    name: "LAN optimization for client B",
    category: "Network optimization",
    due_date: "2025-01-20",
    team: "IT Operations team",
    assignee: "Ardian Maulana",
    status: "To-Do",
  },
  {
    id: 2,
    name: "IT maintenance contracts",
    category: "Contract management",
    due_date: "2025-01-26",
    team: "Marketing team",
    assignee: "Budi Santoso",
    status: "Waiting",
  },
  {
    id: 3,
    name: "Data breach investigation",
    category: "Security",
    due_date: "2025-01-21",
    team: "Development team",
    assignee: "Clara Kusuma",
    status: "Waiting",
  },
  {
    id: 4,
    name: "Managed IT services contract",
    category: "Contract management",
    due_date: "2025-02-01",
    team: "Technical team",
    assignee: "Clara Kusuma",
    status: "Completed",
  },
  {
    id: 5,
    name: "Network troubleshooting",
    category: "Network support",
    due_date: "2025-01-22",
    team: "Technical team",
    assignee: "Eka Rahman",
    status: "Postponed",
  },
];

export const products = [
  {
    id: 1,
    name: "AWS Elastic Compute Cloud (EC2)",
    tags: "Operating System, Compute",
    unit: "Service",
    price: 23000,
    code: "GCI-001",
  },
  {
    id: 2,
    name: "Microsoft SQL Server Database",
    tags: "Cloud, Firewall",
    unit: "Service",
    price: 18500,
    code: "MSQ-002",
  },
  {
    id: 3,
    name: "Google Cloud Storage",
    tags: "Firewall, Database",
    unit: "Service",
    price: 7000,
    code: "GCS-003",
  },
  {
    id: 4,
    name: "Cisco Firewall Appliance",
    tags: "Cloud, Compute",
    unit: "Hardware",
    price: 12200,
    code: "CFA-004",
  },
  {
    id: 5,
    name: "Oracle Database 19c",
    tags: "Firewall, Azure",
    unit: "Service",
    price: 25000,
    code: "ODB-007",
  },
];

export const invoices = [
  {
    id: 1,
    invoice_no: "INV-2025-0142",
    company: "Amazon.com, Inc",
    amount: 850000,
    due_date: "2025-02-12",
    status: "Paid",
  },
  {
    id: 2,
    invoice_no: "INV-2025-0141",
    company: "Shopify Inc",
    amount: 420000,
    due_date: "2025-02-21",
    status: "Pending",
  },
  {
    id: 3,
    invoice_no: "INV-2025-0140",
    company: "Best Buy Co.",
    amount: 315500,
    due_date: "2025-02-02",
    status: "Overdue",
  },
  {
    id: 4,
    invoice_no: "INV-2025-0139",
    company: "Nike, Inc",
    amount: 180000,
    due_date: "2025-01-18",
    status: "Paid",
  },
];

export const calendarEvents = [
  {
    id: 1,
    title: "LAN optimization for client B",
    type: "Task",
    date: "2025-01-20",
    owner: "Ardian Maulana Aji",
  },
  {
    id: 2,
    title: "Cloud Infrastructure Migration kickoff",
    type: "Project given",
    date: new Date().toISOString().slice(0, 10),
    owner: "Ahmad Fauzi",
  },
  {
    id: 3,
    title: "Quarterly account review",
    type: "Meeting",
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 4);
      return d.toISOString().slice(0, 10);
    })(),
    owner: "Budi Santoso",
  },
  {
    id: 4,
    title: "Retail POS upgrade deadline",
    type: "Deadline",
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 6);
      return d.toISOString().slice(0, 10);
    })(),
    owner: "Dewi Ayu Lestari",
  },
  {
    id: 5,
    title: "Brand Identity Redesign delivered",
    type: "Project completion",
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 12);
      return d.toISOString().slice(0, 10);
    })(),
    owner: "Galih Adi",
  },
  {
    id: 6,
    title: "Corporate VPN expansion",
    type: "Task",
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 3);
      return d.toISOString().slice(0, 10);
    })(),
    owner: "Dewi Ayu Lestari",
  },
];

export const dashboardKPI = {
  totalSales: { value: 28500, change: 10.2, direction: "up" },
  operatingExpenses: { value: 18200, change: 5.75, direction: "down" },
  grossProfit: { value: 22500, change: 8.55, direction: "up" },
};

export const revenueForecast = {
  profitMargin: [11.5, 13, 16, 18, 21, 23.5, 25, 23.5, 26, 24, 22, 21],
  operatingExpenses: [8, 10, 12, 14, 16, 19, 19.5, 18, 17, 16, 17, 18],
  salesRevenue: [5, 7, 9, 11, 13, 14.5, 15, 14, 13, 12, 13, 14],
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export const leadSources = [
  { name: "Website", count: 6848, percentage: 55, color: "#4f7f96" },
  { name: "Social Media", count: 2490, percentage: 20, color: "#8b8fc4" },
  { name: "Email", count: 1867, percentage: 15, color: "#7FA6B8" },
  { name: "Referral", count: 1245, percentage: 10, color: "#5fae9a" },
];
