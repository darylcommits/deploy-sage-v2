-- Run this in the Supabase SQL Editor to set up the analytics tables

CREATE TABLE page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  page text NOT NULL,
  referrer text,
  user_agent text,
  ip_address text,
  location text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  element text NOT NULL,
  section text NOT NULL,
  page text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so visitors can be tracked)
CREATE POLICY "Allow anonymous inserts" ON page_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON click_events FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous selects (so the admin dashboard can read the data using the anon key)
-- Note: In a production app, you would restrict SELECT to authenticated admins only.
CREATE POLICY "Allow anonymous selects" ON page_views FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous selects" ON click_events FOR SELECT TO anon USING (true);
