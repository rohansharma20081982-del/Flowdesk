import jwt from "jsonwebtoken";
import { roles } from "../config/demoData.js";
import supabase from "../config/supabase.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "clientra-demo-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * POST /api/auth/login
 * In demo mode, accepts any role selection.
 * When Supabase is configured, uses Supabase Auth.
 */
export async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    // ── Demo mode (no Supabase) ──
    if (!supabase) {
      const roleData = roles[role];
      if (!roleData) {
        return res.status(400).json({ error: "Invalid role" });
      }

      const token = jwt.sign(
        {
          role,
          email: roleData.email,
          name: roleData.user,
          pages: roleData.pages,
          scopeKeys: roleData.scopeKeys,
          home: roleData.home,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return res.json({
        token,
        user: {
          role,
          email: roleData.email,
          name: roleData.user,
          description: roleData.description,
          pages: roleData.pages,
          scopeKeys: roleData.scopeKeys,
          home: roleData.home,
        },
      });
    }

    // ── Supabase Auth mode ──
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Fetch the user's role from a profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", data.user.id)
      .single();

    const userRole = profile?.role || "Support / User";
    const roleData = roles[userRole] || roles["Support / User"];

    const token = jwt.sign(
      {
        role: userRole,
        email: data.user.email,
        name: profile?.full_name || data.user.email,
        supabaseId: data.user.id,
        pages: roleData.pages,
        scopeKeys: roleData.scopeKeys,
        home: roleData.home,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: {
        role: userRole,
        email: data.user.email,
        name: profile?.full_name || data.user.email,
        description: roleData.description,
        pages: roleData.pages,
        scopeKeys: roleData.scopeKeys,
        home: roleData.home,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * GET /api/auth/roles
 * Returns available demo roles for the login screen.
 */
export function getRoles(req, res) {
  const list = Object.entries(roles).map(([key, val]) => ({
    role: key,
    user: val.user,
    email: val.email,
    description: val.description,
  }));
  res.json(list);
}

/**
 * GET /api/auth/me
 * Returns current user info from the JWT.
 */
export function getMe(req, res) {
  res.json({ user: req.user });
}
