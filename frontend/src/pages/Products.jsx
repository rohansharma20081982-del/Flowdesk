import { useState, useEffect } from "react";
import api from "../lib/api";
import { DataTable, Toolbar } from "../components/UI";
import { formatCurrency } from "../lib/constants";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [rows, setRows] = useState([]);
  const { isAllowed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.getAll("products").then((data) => {
      setRows(data.map((p) => [p.name, p.tags, p.unit, formatCurrency(p.price), p.code]));
    }).catch(() => {});
  }, []);

  return (
    <>
      <Toolbar resource="product" onAdd={isAllowed("Add product") ? () => navigate("/add-product") : undefined} />
      <DataTable
        columns={["Product name", "Tags", "Unit", "Price", "Code"]}
        rows={rows} boldCol={0} statusCol={-1} avatarCol={-1}
      />
    </>
  );
}
