import { useState, useEffect } from "react";
import api from "../lib/api";
import { DataTable, Toolbar, KpiCard } from "../components/UI";
import { formatCurrency } from "../lib/constants";
import { useAuth } from "../context/AuthContext";

export default function Invoices() {
  const [rows, setRows] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.getAll("invoices").then((data) => {
      setRows(data.map((i) => [i.invoice_no, i.company, formatCurrency(i.amount), i.due_date, i.status]));
    }).catch(() => {});
  }, []);

  return (
    <>
      <p className="muted" style={{ marginTop: 0 }}>🔒 {user?.role} · {user?.description}</p>
      <div className="grid grid-4 mb-md">
        <KpiCard title="Total Invoiced" value="$186.4K" />
        <KpiCard title="Paid" value="$124.8K" />
        <KpiCard title="Pending" value="$48.2K" />
        <KpiCard title="Overdue" value="$13.4K" />
      </div>
      <Toolbar resource="invoice" />
      <DataTable
        columns={["Invoice", "Company", "Amount", "Due date", "Status"]}
        rows={rows} boldCol={0} statusCol={4} avatarCol={-1}
      />
    </>
  );
}
