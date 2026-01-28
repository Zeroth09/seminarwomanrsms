'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import QRCode from 'react-qr-code'
import { CheckCircle2, Calendar, MapPin, Share2, Download, Home } from 'lucide-react'

// Pendaftar Type (simplified for client view)
type TicketData = {
    id: string
    nama_lengkap: string
    institusi: string
    profesi: string
    email: string
}

export default function TicketPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const isNew = searchParams.get('new') === 'true'
    const id = params.id as string

    const [ticket, setTicket] = useState<TicketData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTicket = async () => {
            const { data, error } = await supabase
                .from('pendaftar')
                .select('id, nama_lengkap, institusi, profesi, email')
                .eq('id', id)
                .single()

            if (data) setTicket(data)
            setLoading(false)
        }

        if (id) fetchTicket()
    }, [id])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
            </div>
        </div>
    )

    if (!ticket) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Tiket Tidak Ditemukan</h1>
                <p className="text-slate-600 mb-6">Maaf, data tiket tidak ditemukan atau ID salah.</p>
                <Link href="/" className="text-primary hover:underline">Kembali ke Beranda</Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 flex items-center justify-center">
            <div className="max-w-md w-full">

                {/* Success Message (Only if new) */}
                {isNew && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3 items-start animate-fade-in-up">
                        <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-green-800">Pendaftaran Berhasil!</h3>
                            <p className="text-sm text-green-700">
                                Link tiket juga telah dikirim ke WhatsApp Anda. Simpan QR Code ini untuk registrasi ulang.
                            </p>
                        </div>
                    </div>
                )}

                {/* Ticket Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative print:shadow-none">
                    {/* Top Decorative Line */}
                    <div className="h-2 bg-gradient-to-r from-primary via-purple-500 to-secondary"></div>

                    <div className="p-8 text-center relative z-10">
                        <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-4 tracking-wide uppercase">
                            Tiket Masuk Seminar
                        </div>

                        <h1 className="text-2xl font-black text-slate-900 mb-1">
                            WOMAN&apos;S WELLBEING
                        </h1>
                        <p className="text-sm text-slate-500 mb-8 font-medium">HUT RSMS Ke-36</p>

                        {/* QR Code Section */}
                        <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-slate-200 inline-block mb-8 shadow-sm">
                            <QRCode
                                value={`https://portal-seminar.com/check-in/${ticket.id}`}
                                size={180}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                viewBox={`0 0 256 256`}
                            />
                        </div>

                        {/* Attendee Details */}
                        <div className="space-y-1 mb-6">
                            <h2 className="text-xl font-bold text-slate-900">{ticket.nama_lengkap}</h2>
                            <p className="text-slate-600 font-medium">{ticket.institusi}</p>
                            <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded uppercase font-bold">
                                {ticket.profesi}
                            </span>
                        </div>

                        {/* Event Details */}
                        <div className="bg-slate-50 rounded-xl p-4 text-left space-y-3 mb-8">
                            <div className="flex items-start gap-3">
                                <Calendar className="text-primary w-5 h-5 shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase">Waktu</p>
                                    <p className="text-sm font-semibold text-slate-800">Rabu, 04 Feb 2026 • 07.30 WITA</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="text-secondary w-5 h-5 shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase">Lokasi</p>
                                    <p className="text-sm font-semibold text-slate-800">Aula Edelweis RSMS</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3 no-print">
                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm"
                            >
                                <Home size={18} />
                                Beranda
                            </Link>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors text-sm"
                            >
                                <Download size={18} />
                                Simpan / Print
                            </button>
                        </div>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-50/50 to-transparent -z-0"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -z-0 translate-x-10 translate-y-10"></div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-8">
                    Simpan QR Code ini. Tunjukkan kepada panitia<br />saat registrasi ulang di lokasi acara.
                </p>
            </div>
        </div>
    )
}
