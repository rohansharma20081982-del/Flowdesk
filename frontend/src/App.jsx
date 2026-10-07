import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Calendar from "./pages/Calendar";
import Team from "./pages/Team";
import Products from "./pages/Products";
import Emails from "./pages/Emails";
import Invoices from "./pages/Invoices";
import Integrations from "./pages/Integrations";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import {
  CompanyDetail,
  DealDetail,
  ProductDetail,
  EditContact,
  AddContact,
  AddCompany,
  AddDeal,
  AddProduct,
  AddTask,
  ImportCSV,
} from "./pages/DetailPages";
import "./index.css";

/** Route → page title mapping */
const TITLES = {
  "/dashboard": "Dashboard",
  "/contacts": "Contacts",
  "/companies": "Companies",
  "/deals": "Deals",
  "/tasks": "Tasks",
  "/reports": "Reports",
  "/calendar": "Calendar",
  "/team": "Team",
  "/products": "Products",
  "/emails": "Emails",
  "/invoices": "Invoices",
  "/integrations": "Integrations",
  "/profile": "Profile",
  "/settings": "Settings",
  "/notifications": "Notifications",
  "/company-detail": "Company detail",
  "/deal-detail": "Deal detail",
  "/product-detail": "Product detail",
  "/edit-contact": "Edit contact",
  "/add-contact": "Add contact",
  "/add-company": "Add company",
  "/add-deal": "Add deal",
  "/add-product": "Add product",
  "/add-task": "Add task",
  "/import-csv": "Import CSV",
};

/** Route → access control name mapping */
const ACCESS = {
  "/dashboard": "Dashboard",
  "/contacts": "Contacts",
  "/companies": "Companies",
  "/deals": "Deals",
  "/tasks": "Tasks",
  "/reports": "Reports",
  "/calendar": "Calendar",
  "/team": "Team",
  "/products": "Products",
  "/emails": "Emails",
  "/invoices": "Invoices",
  "/integrations": "Integrations",
  "/profile": "Profile",
  "/settings": "Settings",
  "/notifications": "Notifications",
  "/company-detail": "Contacts",
  "/deal-detail": "Deals",
  "/product-detail": "Products",
  "/edit-contact": "Contacts",
  "/add-contact": "Contacts",
  "/add-company": "Companies",
  "/add-deal": "Deals",
  "/add-product": "Products",
  "/add-task": "Tasks",
  "/import-csv": "Contacts",
};

function ProtectedRoute({ children, page }) {
  const { isAllowed } = useAuth();
  if (!isAllowed(page)) return <AccessDenied />;
  return children;
}

function AppLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Login />;

  const title = TITLES[location.pathname] || "Clientra CRM";

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <TopBar title={title} />
        <div className="page-view">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute page="Dashboard"><Dashboard /></ProtectedRoute>} />
            <Route path="/contacts" element={<ProtectedRoute page="Contacts"><Contacts /></ProtectedRoute>} />
            <Route path="/companies" element={<ProtectedRoute page="Companies"><Companies /></ProtectedRoute>} />
            <Route path="/deals" element={<ProtectedRoute page="Deals"><Deals /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute page="Tasks"><Tasks /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute page="Reports"><Reports /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute page="Calendar"><Calendar /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute page="Team"><Team /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute page="Products"><Products /></ProtectedRoute>} />
            <Route path="/emails" element={<ProtectedRoute page="Emails"><Emails /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute page="Invoices"><Invoices /></ProtectedRoute>} />
            <Route path="/integrations" element={<ProtectedRoute page="Integrations"><Integrations /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute page="Profile"><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute page="Settings"><Settings /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute page="Notifications"><Notifications /></ProtectedRoute>} />
            <Route path="/company-detail" element={<ProtectedRoute page="Contacts"><CompanyDetail /></ProtectedRoute>} />
            <Route path="/deal-detail" element={<ProtectedRoute page="Deals"><DealDetail /></ProtectedRoute>} />
            <Route path="/product-detail" element={<ProtectedRoute page="Products"><ProductDetail /></ProtectedRoute>} />
            <Route path="/edit-contact" element={<ProtectedRoute page="Contacts"><EditContact /></ProtectedRoute>} />
            <Route path="/add-contact" element={<ProtectedRoute page="Contacts"><AddContact /></ProtectedRoute>} />
            <Route path="/add-company" element={<ProtectedRoute page="Companies"><AddCompany /></ProtectedRoute>} />
            <Route path="/add-deal" element={<ProtectedRoute page="Deals"><AddDeal /></ProtectedRoute>} />
            <Route path="/add-product" element={<ProtectedRoute page="Products"><AddProduct /></ProtectedRoute>} />
            <Route path="/add-task" element={<ProtectedRoute page="Tasks"><AddTask /></ProtectedRoute>} />
            <Route path="/import-csv" element={<ProtectedRoute page="Contacts"><ImportCSV /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
