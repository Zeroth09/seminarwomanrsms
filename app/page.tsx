import Link from 'next/link'
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle2, Sparkles, Heart } from 'lucide-react'
import PosterThumbnail from '@/components/PosterThumbnail'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 max-w-6xl pt-8 pb-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">

            {/* Poster Thumbnail */}
            <PosterThumbnail />

            {/* Info Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="text-secondary w-5 h-5" />
                Detail Acara
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Tanggal</h3>
                    <p className="text-slate-600 text-sm">Rabu, 04 Februari 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-secondary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Waktu</h3>
                    <p className="text-slate-600 text-sm">07.30 WITA s/d Selesai</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-accent shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Lokasi</h3>
                    <p className="text-slate-600 text-sm">Aula Edelweis RSMS</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/daftar"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-slate-800 transition-all btn-hover group"
                >
                  Daftar Sekarang
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs font-semibold text-highlight">
                  <CheckCircle2 size={14} />
                  Gratis 100% • Kuota Terbatas
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Cocok Untuk:</h3>
              <div className="flex flex-wrap gap-2">
                {['Tenaga Kesehatan', 'Tenaga Medis', 'Akademisi', 'Umum'].map((item) => (
                  <span key={item} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg border border-slate-100 hover:border-primary hover:text-primary transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-8 space-y-8">

            {/* Desktop Hero - Poster Style Recreated */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up min-h-[400px] flex items-center">
              {/* Background Image & Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url('/poster-seminar.png')`, // Fallback/Basis kalau mau image asli
                  filter: 'brightness(0.3) blur(20px) saturate(1.5)', // Efek blur untuk background abstrak
                  transform: 'scale(1.2)'
                }}
              ></div>

              {/* Gradient & Curve Overlay mimicking poster */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/80 via-primary/60 to-accent/90 mix-blend-multiply"></div>

              {/* Curve Shape Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none">
                <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d">
                  <path fill="#db2777" fillOpacity="0.4" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  <path fill="#f97316" fillOpacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-30 w-full p-10 md:p-12 text-center text-white">
                <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold mb-6 tracking-wide uppercase shadow-sm">
                  Seminar Kesehatan Dalam Rangka HUT RSMS Ke-36
                </div>

                <h1 className="font-black mb-6 leading-none relative">
                  <span className="block text-5xl md:text-7xl lg:text-8xl tracking-tighter"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '2px #fff',
                      backgroundImage: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.7) 100%)',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                    }}
                  >
                    WOMANS
                  </span>
                  <span className="block text-5xl md:text-7xl lg:text-8xl tracking-tighter text-yellow-300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
                    style={{

                      background: 'linear-gradient(to bottom, #dbeafe 0%, #fef3c7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
                    }}
                  >
                    WELLBEING
                  </span>
                </h1>

                <p className="text-xl md:text-2xl font-bold mb-10 text-white drop-shadow-md tracking-tight uppercase max-w-2xl mx-auto">
                  Issue Kesehatan Jiwa Perempuan<br />di Era Digitalisasi
                </p>

                <div className="flex justify-center">
                  <Link
                    href="/daftar"
                    className="group relative inline-flex items-center justify-center gap-2 bg-white text-secondary px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] ring-4 ring-white/30 hover:ring-white/50"
                  >
                    <span className="relative z-10">AKU MAU DAFTAR</span>
                    <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Narasumber */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-secondary rounded-full"></div>
                <h2 className="text-2xl font-black text-slate-900">
                  Narasumber
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Link href="/narasumber/dr-anak-ayu" className="group bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all card-hover block">
                  <div className="flex items-start gap-4">
                    <img src="/dr-ayu.png" alt="Dr. Ayu" className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">Dr. dr. Anak Ayu Sri Wahyuni</h4>
                      <div className="inline-block px-2 py-0.5 bg-purple-50 text-primary text-[10px] font-bold rounded mt-1 mb-2">
                        Sp.KJ (K)
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Psikiater Rumah Sakit Umum Pusat Prof. dr. I.G.N.G Ngoerah
                      </p>
                      <p className="text-xs text-primary font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Lihat Profil Lengkap <ArrowRight size={12} />
                      </p>
                    </div>
                  </div>
                </Link>

                <Link href="/narasumber/hellen-citra" className="group bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/5 transition-all card-hover block">
                  <div className="flex items-start gap-4">
                    <img src="/hellen-citra.png" alt="Hellen Citra Dewi" className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg group-hover:text-secondary transition-colors">Hellen Citra Dewi</h4>
                      <div className="inline-block px-2 py-0.5 bg-pink-50 text-secondary text-[10px] font-bold rounded mt-1 mb-2">
                        M.Psi., Psikolog
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Psikolog Klinik Rumah Sakit Mutiara Sukma
                      </p>
                      <p className="text-xs text-secondary font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Lihat Profil Lengkap <ArrowRight size={12} />
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Topics */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-accent rounded-full"></div>
                <h2 className="text-2xl font-black text-slate-900">
                  Topik Pembahasan
                </h2>
              </div>

              <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-100 rounded-3xl p-2 space-y-2">
                <div className="bg-white rounded-2xl p-5 border border-slate-100/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 mb-1">Media Sosial & Kesehatan Mental</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Dampak Media Sosial terhadap Kesehatan Mental Perempuan: Kawan atau Lawan?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 mb-1">Stop KBGO</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Stop Kekerasan Berbasis Gender Online: Wujudkan Ruang Digital yang Aman bagi Perempuan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Compact */}
            <div className="text-center pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                Powered by <strong className="text-primary">webinstant.id</strong> • NTB, Indonesia
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
