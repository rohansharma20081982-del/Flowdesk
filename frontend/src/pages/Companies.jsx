import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { DataTable, Toolbar } from "../components/UI";
import { useAuth } from "../context/AuthContext";

export default function Companies() {
  const [rows, setRows] = useState([]);
  const { user, isAllowed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.getAll("companies").then((data) => {
      setRows(data.map((c) => [c.name, c.address, c.phone, c.url, c.owner, c.type]));
    }).catch(() => {});
  }, []);

  return (
    <>
      <p className="muted" style={{ marginTop: 0 }}>🔒 {user?.role} · {user?.description}</p>
      <Toolbar resource="company" onAdd={isAllowed("Add company") ? () => navigate("/add-company") : undefined} />
      <DataTable
        columns={["Company", "Address", "Phone", "URL", "Owner", "Type"]}
        rows={rows} boldCol={0} statusCol={5} avatarCol={4}
      />
    </>
  );
}
