import Link from 'next/link'
import { CheckCircle2, Calendar, MapPin, Mail, ArrowRight, Sparkles } from 'lucide-react'

export default function SuksesPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 text-center">
                    {/* Success Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mb-8 animate-scale-in shadow-lg shadow-emerald-500/30">
                        <CheckCircle2 className="text-white" size={44} strokeWidth={3} />
                    </div>

                    {/* Success Message */}
                    <div className="mb-8 animate-fade-in-up delay-100">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <Sparkles size={16} />
                            Berhasil!
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                            Pendaftaran Berhasil!
                        </h1>

                        <p className="text-lg text-slate-600 mb-2">
                            Terima kasih telah mendaftar untuk seminar
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                            Woman&apos;s Wellbeing
                        </p>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left animate-fade-in-up delay-200">
                        <h2 className="font-bold text-lg text-slate-900 mb-4">Langkah Selanjutnya:</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-indigo-600" size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">Cek Email Anda</p>
                                    <p className="text-sm text-slate-600">Konfirmasi pendaftaran telah dikirim ke email Anda</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="text-pink-600" size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">Catat Tanggalnya</p>
                                    <p className="text-sm text-slate-600">Rabu, 04 Februari 2026 | 07.30 WITA s/d Selesai</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-purple-600" size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">Lokasi Acara</p>
                                    <p className="text-sm text-slate-600">Aula Edelweis, Rumah Sakit Mutiara Sukma</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl btn-hover"
                        >
                            Kembali ke Beranda
                        </Link>

                        <a
                            href="https://wa.me/6287765315859?text=Halo,%20saya%20sudah%20mendaftar%20seminar%20Woman's%20Wellbeing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-white font-semibold px-6 py-3 rounded-xl btn-hover shadow-lg shadow-indigo-500/30"
                        >
                            <Sparkles size={18} />
                            Hubungi via WhatsApp
                            <ArrowRight size={18} />
                        </a>
                    </div>

                    <p className="mt-8 text-sm text-slate-600 animate-fade-in delay-400">
                        Sampai jumpa di acara! 🎉
                    </p>
                </div>
            </div>
        </div>
    )
}
