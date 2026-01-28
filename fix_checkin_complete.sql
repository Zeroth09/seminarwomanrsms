-- 1. Tambahkan kolom kehadiran (jika belum ada)
ALTER TABLE "public"."pendaftar" 
ADD COLUMN IF NOT EXISTS "hadir" boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS "waktu_hadir" timestamp with time zone;

-- 2. Pastikan RLS aktif
ALTER TABLE "public"."pendaftar" ENABLE ROW LEVEL SECURITY;

-- 3. Izinkan UPDATE data pendaftar untuk publik (anon)
-- Ini diperlukan agar petugas bisa melakukan check-in tanpa login
CREATE POLICY "Enable update for anon"
ON "public"."pendaftar"
AS PERMISSIVE
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- 4. Pastikan Insert dan Select juga boleh (jika belum)
CREATE POLICY "Enable insert for anon"
ON "public"."pendaftar"
AS PERMISSIVE
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Enable select for anon"
ON "public"."pendaftar"
AS PERMISSIVE
FOR SELECT
TO anon
USING (true);
