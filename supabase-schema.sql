-- Tabel untuk menyimpan data pendaftar seminar
CREATE TABLE IF NOT EXISTS pendaftar (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_lengkap TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  no_telepon TEXT NOT NULL,
  institusi TEXT NOT NULL,
  profesi TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index untuk pencarian lebih cepat
CREATE INDEX IF NOT EXISTS idx_pendaftar_email ON pendaftar(email);
CREATE INDEX IF NOT EXISTS idx_pendaftar_created_at ON pendaftar(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE pendaftar ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert (untuk form pendaftaran)
CREATE POLICY "Allow public insert" ON pendaftar
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all (untuk admin dashboard)
CREATE POLICY "Allow authenticated read" ON pendaftar
  FOR SELECT
  TO authenticated
  USING (true);
