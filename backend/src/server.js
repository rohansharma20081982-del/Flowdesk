import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// ── Health check ──
app.get("/", (req, res) => {
  res.json({
    name: "Clientra CRM API",
    version: "1.0.0",
    status: "running",
    mode: process.env.SUPABASE_URL ? "supabase" : "demo",
  });
});

// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Error handler ──
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║    🚀 Clientra CRM API — Port ${PORT}        ║
  ║    Mode: ${process.env.SUPABASE_URL ? "Supabase" : "Demo (in-memory)"}              ║
  ╚═══════════════════════════════════════════╝
  `);
});
