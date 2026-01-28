# Portal Pendaftaran Seminar - Woman's Wellbeing

Portal pendaftaran online untuk **Seminar Kesehatan "Woman's Wellbeing"** dalam rangka HUT Rumah Sakit Mutiara Sukma ke-36.

## 🎨 Fitur

- ✨ **Landing Page Modern** dengan desain gradient vibrant (pink-orange-purple)
- 📝 **Form Pendaftaran** dengan validasi lengkap
- ✅ **Halaman Konfirmasi** setelah pendaftaran berhasil
- 📊 **Dashboard Admin** untuk melihat data pendaftar
- 📥 **Export CSV** untuk data pendaftar
- 🎯 **Fully Responsive** - Mobile, Tablet, Desktop
- 🔒 **Supabase Integration** untuk database real-time

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Icons:** Lucide React
- **Deployment Ready:** Vercel/Netlify

## 📋 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

1. Node.js 18+ terinstall
2. Akun Supabase (gratis di [supabase.com](https://supabase.com))

## 🛠️ Setup & Installation

### 1. Install Dependencies

```bash
cd portal-seminar
npm install
```

### 2. Setup Supabase

1. Buat project baru di [Supabase Dashboard](https://app.supabase.com)
2. Buka SQL Editor di Supabase
3. Jalankan script SQL dari file `supabase-schema.sql`

### 3. Konfigurasi Environment Variables

Edit file `.env.local` dan isi dengan kredensial Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Cara mendapatkan kredensial:**
- Buka Supabase Dashboard → Settings → API
- Copy `Project URL` untuk `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key untuk `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📱 Halaman & Routes

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page dengan info seminar |
| `/daftar` | Form pendaftaran peserta |
| `/sukses` | Konfirmasi pendaftaran berhasil |
| `/admin` | Dashboard admin (password: `admin123`) |

## 🔐 Admin Dashboard

Akses dashboard admin di `/admin` dengan password default: `admin123`

**⚠️ PENTING:** Ganti password di file `app/admin/page.tsx` sebelum production!

```typescript
const ADMIN_PASSWORD = 'admin123' // Ganti dengan password yang lebih aman
```

## 📊 Database Schema

Tabel `pendaftar`:
- `id` - UUID (Primary Key)
- `nama_lengkap` - TEXT
- `email` - TEXT (Unique)
- `no_telepon` - TEXT
- `institusi` - TEXT
- `profesi` - TEXT
- `created_at` - TIMESTAMP

## 🎨 Customization

### Mengubah Warna Gradient

Edit file `app/globals.css`:

```css
.gradient-vibrant {
  background: linear-gradient(135deg, 
    #ff1b6b 0%,    /* Hot Pink */
    #ff6b35 25%,   /* Orange */
    #ffa07a 50%,   /* Light Salmon */
    #c471ed 75%,   /* Purple */
    #ff1b6b 100%   /* Back to Pink */
  );
}
```

### Menambahkan Logo Sponsor

Edit file `app/page.tsx` di bagian Header dengan Logo Sponsor.

## 📦 Build untuk Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Tambahkan Environment Variables di Vercel Dashboard
4. Deploy!

### Deploy ke Netlify

1. Push code ke GitHub
2. Import project di [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Tambahkan Environment Variables
6. Deploy!

## 📞 Support

Butuh bantuan? Hubungi:
- **WhatsApp:** [087765315859](https://wa.me/6287765315859)
- **Developer:** webinstant.id
- **Lokasi:** Nusa Tenggara Barat, Kec. Mataram, Kab. Mataram, NTB 83112

## 📄 License

Developed by **webinstant.id** untuk Rumah Sakit Mutiara Sukma.

---

Made with ❤️ by [webinstant.id](https://webinstant.id)
