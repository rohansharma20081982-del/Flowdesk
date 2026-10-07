import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { DataTable, Toolbar } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../lib/constants";

export default function Deals() {
  const [rows, setRows] = useState([]);
  const { user, isAllowed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.getAll("deals").then((data) => {
      setRows(data.map((d) => [d.name, d.company, formatCurrency(d.price), d.date_created, d.owner, d.stage]));
    }).catch(() => {});
  }, []);

  return (
    <>
      <p className="muted" style={{ marginTop: 0 }}>🔒 {user?.role} · {user?.description}</p>
      <Toolbar resource="deal" onAdd={isAllowed("Add deal") ? () => navigate("/add-deal") : undefined} />
      <DataTable
        columns={["Deal name", "Company", "Price", "Date created", "Owner", "Stage"]}
        rows={rows} boldCol={0} statusCol={5} avatarCol={4}
      />
    </>
  );
}
