-- 1. Tambahkan kolom alamat (jika belum ada)
ALTER TABLE "public"."pendaftar" 
ADD COLUMN IF NOT EXISTS "alamat" text;

-- 2. Enable RLS (Biasanya sudah aktif)
alter table "public"."pendaftar" enable row level security;

-- 3. Policy untuk mengizinkan insert data pendaftar oleh siapa saja (public/anon)
create policy "Enable insert for everyone"
on "public"."pendaftar"
as PERMISSIVE
for INSERT
to anon
with check (true);

-- 4. Policy untuk mengizinkan membaca data tiket (Select) oleh siapa saja (untuk halaman tiket)
create policy "Enable select for everyone"
on "public"."pendaftar"
as PERMISSIVE
for SELECT
to anon
using (true);
