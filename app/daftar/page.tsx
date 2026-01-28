import Link from 'next/link'
import FormPendaftaran from '@/components/FormPendaftaran'
import { ArrowLeft, Shield, Sparkles } from 'lucide-react'

export default function DaftarPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Kembali ke Beranda
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-2xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Sparkles size={16} />
                            Pendaftaran Seminar
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                            Daftar Sekarang
                        </h1>

                        <p className="text-lg text-slate-600 mb-6">
                            Isi formulir di bawah untuk mendaftar ke seminar<br />
                            <span className="font-bold text-slate-900">Woman&apos;s Wellbeing</span>
                        </p>

                        <div className="inline-flex items-center gap-3 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30">
                            <Sparkles size={20} />
                            100% GRATIS
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-10 animate-scale-in delay-200">
                        <FormPendaftaran />
                    </div>

                    {/* Trust Signals */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600 animate-fade-in delay-400">
                        <div className="flex items-center gap-2">
                            <Shield size={18} className="text-indigo-600" />
                            <span>Data aman & terenkripsi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} className="text-pink-600" />
                            <span>Gratis 100%</span>
                        </div>
                    </div>

                    {/* Help */}
                    <div className="mt-8 text-center text-sm text-slate-600 animate-fade-in delay-500">
                        <p>
                            Butuh bantuan? Hubungi kami di WhatsApp:{' '}
                            <a
                                href="https://wa.me/6287765315859"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 underline"
                            >
                                087765315859
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
