-- Menambahkan kolom status kehadiran
ALTER TABLE "public"."pendaftar" 
ADD COLUMN IF NOT EXISTS "hadir" boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS "waktu_hadir" timestamp with time zone;

-- Update RLS agar kolom ini bisa diupdate (jika perlu policy update)
-- Untuk admin, kita perlu policy update permisif atau bypass RLS (pakai service role di server action)
