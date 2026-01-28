-- Hapus constraint unique pada email agar bisa mendaftar berkali-kali
ALTER TABLE "public"."pendaftar" DROP CONSTRAINT IF EXISTS "pendaftar_email_key";
DROP INDEX IF EXISTS "pendaftar_email_key";

-- Pastikan policy INSERT mengizinkan siapa saja (sudah ada di fix_checkin_complete.sql tapi untuk jaga-jaga)
-- Tidak perlu ubah policy insert, cukup constraint-nya saja.
