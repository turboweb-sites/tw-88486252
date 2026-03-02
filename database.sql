-- Auto Detailing Website Database Schema
-- Supabase PostgreSQL

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  source TEXT DEFAULT 'website',
  ghl_contact_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  vehicle_year TEXT,
  vehicle_make TEXT,
  vehicle_model TEXT,
  services_interested TEXT[] DEFAULT '{}',
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
  source TEXT DEFAULT 'website',
  ghl_contact_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  before_image TEXT NOT NULL,
  after_image TEXT NOT NULL,
  vehicle_type TEXT,
  service_type TEXT,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews cache table
CREATE TABLE IF NOT EXISTS reviews_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  time TEXT,
  profile_photo_url TEXT,
  source TEXT DEFAULT 'google',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blocked time slots table (for booking calendar)
CREATE TABLE IF NOT EXISTS blocked_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocked_date DATE NOT NULL,
  blocked_time TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business settings table
CREATE TABLE IF NOT EXISTS business_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email notification log
CREATE TABLE IF NOT EXISTS email_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  template TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery and reviews
CREATE POLICY "Public can view gallery" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON reviews_cache FOR SELECT USING (true);
CREATE POLICY "Public can view blocked slots" ON blocked_slots FOR SELECT USING (true);
CREATE POLICY "Public can view settings" ON business_settings FOR SELECT USING (true);

-- Public can insert bookings and quotes
CREATE POLICY "Public can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create quotes" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX idx_bookings_date ON bookings(preferred_date);
CREATE INDEX idx_quotes_status ON quote_requests(status);
CREATE INDEX idx_gallery_featured ON gallery_items(featured);
CREATE INDEX idx_gallery_sort ON gallery_items(sort_order);
CREATE INDEX idx_blocked_slots_date ON blocked_slots(blocked_date);
CREATE INDEX idx_email_log_created ON email_log(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER quotes_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Insert default business settings
INSERT INTO business_settings (key, value) VALUES
  ('business_hours', '{"monday":{"open":"08:00","close":"18:00"},"tuesday":{"open":"08:00","close":"18:00"},"wednesday":{"open":"08:00","close":"18:00"},"thursday":{"open":"08:00","close":"18:00"},"friday":{"open":"08:00","close":"18:00"},"saturday":{"open":"09:00","close":"17:00"},"sunday":{"open":"10:00","close":"15:00"}}'),
  ('slot_duration', '60'),
  ('max_bookings_per_slot', '2'),
  ('booking_lead_time_hours', '24')
ON CONFLICT (key) DO NOTHING;