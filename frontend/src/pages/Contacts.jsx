import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { DataTable, Toolbar } from "../components/UI";
import { useAuth } from "../context/AuthContext";

export default function Contacts() {
  const [rows, setRows] = useState([]);
  const { user, isAllowed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.getAll("contacts").then((data) => {
      setRows(
        data.map((c) => {
          const row = [c.name, c.job_title, c.email, c.phone, c.owner, c.status];
          // Support / User cannot see email & phone
          if (user?.role === "Support / User") {
            row[2] = "•••• restricted";
            row[3] = "•••• restricted";
          }
          return row;
        })
      );
    }).catch(() => {});
  }, [user]);

  return (
    <>
      <p className="muted" style={{ marginTop: 0 }}>
        🔒 {user?.role} · {user?.description}
      </p>
      <Toolbar
        resource="contact"
        onAdd={isAllowed("Add contact") ? () => navigate("/add-contact") : undefined}
      />
      <DataTable
        columns={["Person name", "Job title", "Email", "Phone", "Owner", "Status"]}
        rows={rows}
        boldCol={0}
        statusCol={5}
        avatarCol={0}
      />
    </>
  );
}
