-- ============================================
-- Clientra CRM — Supabase SQL Schema
-- Run this in your Supabase SQL editor
-- ============================================

-- Profiles (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Support / User',
  phone TEXT,
  timezone TEXT DEFAULT '(GMT+07:00) Jakarta',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  job_title TEXT,
  email TEXT,
  phone TEXT,
  owner TEXT,
  status TEXT DEFAULT 'Lead',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  url TEXT,
  owner TEXT,
  type TEXT DEFAULT 'Lead',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deals
CREATE TABLE IF NOT EXISTS deals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  price NUMERIC(15,2) DEFAULT 0,
  date_created DATE DEFAULT CURRENT_DATE,
  owner TEXT,
  stage TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  due_date DATE,
  team TEXT,
  assignee TEXT,
  status TEXT DEFAULT 'To-Do',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tags TEXT,
  unit TEXT,
  price NUMERIC(15,2) DEFAULT 0,
  code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  invoice_no TEXT UNIQUE NULL,
  company TEXT,
  amount NUMERIC(15, 2) DEFAULT 0,
  due_date DATE,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Calendar Events
CREATE TABLE IF NOT EXISTS calendar_events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'Task',
  date DATE NOT NULL,
  owner TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security (optional) ──
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access (the backend uses service_role key)
CREATE POLICY "Service role full access" ON contacts FOR ALL USING (true);
CREATE POLICY "Service role full access" ON companies FOR ALL USING (true);
CREATE POLICY "Service role full access" ON deals FOR ALL USING (true);
CREATE POLICY "Service role full access" ON tasks FOR ALL USING (true);
CREATE POLICY "Service role full access" ON products FOR ALL USING (true);
CREATE POLICY "Service role full access" ON invoices FOR ALL USING (true);
CREATE POLICY "Service role full access" ON calendar_events FOR ALL USING (true);
