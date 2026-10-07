import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { DataTable, Toolbar } from "../components/UI";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const [rows, setRows] = useState([]);
  const { user, isAllowed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.getAll("tasks").then((data) => {
      setRows(data.map((t) => [t.name, t.category, t.due_date, t.team, t.assignee, t.status]));
    }).catch(() => {});
  }, []);

  return (
    <>
      <p className="muted" style={{ marginTop: 0 }}>🔒 {user?.role} · {user?.description}</p>
      <Toolbar resource="task" onAdd={isAllowed("Add task") ? () => navigate("/add-task") : undefined} />
      <DataTable
        columns={["Task name", "Category", "Due date", "Team", "Assignee", "Status"]}
        rows={rows} boldCol={0} statusCol={5} avatarCol={4}
      />
    </>
  );
}
