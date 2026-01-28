'use client'

import { useState, useEffect } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { checkInParticipant } from '@/app/actions/check-in'
import { CheckCircle2, XCircle, AlertTriangle, Loader2, List, Search, ArrowLeft, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Pendaftar = {
    id: string
    nama_lengkap: string
    email: string
    institusi: string
    hadir: boolean
    waktu_hadir: string | null
}

export default function ScanPage() {
    const [scanResult, setScanResult] = useState<string | null>(null)
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error' | 'warning'>('idle')
    const [message, setMessage] = useState('')
    const [participant, setParticipant] = useState<any>(null)
    const [lastScannedMs, setLastScannedMs] = useState(0)

    // Manual Check-in State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [manualList, setManualList] = useState<Pendaftar[]>([])
    const [filteredList, setFilteredList] = useState<Pendaftar[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loadingList, setLoadingList] = useState(false)

    // --- SCANNER LOGIC ---
    const handleScan = async (result: any) => {
        if (!result) return

        const rawValue = result[0]?.rawValue || result

        const now = Date.now()
        if (now - lastScannedMs < 3000) return
        setLastScannedMs(now)

        setScanResult(rawValue)
        setStatus('processing')
        setMessage('Memproses data...')

        try {
            // Regex update: Support /ticket/UUID or /check-in/UUID
            const match = rawValue.match(/(?:ticket\/|check-in\/)([a-zA-Z0-9-]+)/) ||
                rawValue.match(/^([a-f0-9-]{36})$/i) // Support UUID raw

            // Fallback: if scanning full URL that ends with UUID
            const id = match ? match[1] : null

            if (!id) {
                setStatus('error')
                setMessage(`QR Code tidak valid! Terbaca: ${rawValue.substring(0, 30)}...`)
                return
            }

            await performCheckIn(id)

        } catch (err) {
            console.error(err)
            setStatus('error')
            setMessage('Terjadi kesalahan saat memproses data.')
        }
    }

    const performCheckIn = async (id: string) => {
        const res = await checkInParticipant(id)

        if (res.success) {
            setStatus('success')
            setMessage(res.message)
            setParticipant(res.participant)
        } else {
            if (res.message.includes('SUDAH Check-in')) {
                setStatus('warning')
                setParticipant(res.participant)
            } else {
                setStatus('error')
            }
            setMessage(res.message)
        }
    }

    const resetScan = () => {
        setStatus('idle')
        setScanResult(null)
        setParticipant(null)
        setMessage('')
    }

    // --- MANUAL CHECK-IN LOGIC ---
    const openManualModal = async () => {
        setIsModalOpen(true)
        if (manualList.length === 0) {
            await fetchParticipants()
        }
    }

    const fetchParticipants = async () => {
        setLoadingList(true)
        const { data, error } = await supabase
            .from('pendaftar')
            .select('id, nama_lengkap, email, institusi, hadir, waktu_hadir')
            .order('nama_lengkap', { ascending: true })

        if (data) {
            setManualList(data)
            setFilteredList(data)
        }
        setLoadingList(false)
    }

    useEffect(() => {
        if (searchTerm) {
            const lower = searchTerm.toLowerCase()
            const filtered = manualList.filter(p =>
                p.nama_lengkap.toLowerCase().includes(lower) ||
                p.institusi.toLowerCase().includes(lower)
            )
            setFilteredList(filtered)
        } else {
            setFilteredList(manualList)
        }
    }, [searchTerm, manualList])

    const handleManualCheckIn = async (p: Pendaftar) => {
        if (p.hadir) {
            alert(`${p.nama_lengkap} SUDAH check-in sebelumnya.`)
            return
        }

        const confirm = window.confirm(`Check-in manual untuk ${p.nama_lengkap}?`)
        if (!confirm) return

        // 1. Close Modal & Show Processing on Main Screen
        setIsModalOpen(false)
        setStatus('processing')
        setMessage(`Memproses check-in manual untuk ${p.nama_lengkap}...`)

        // 2. Call API
        const res = await checkInParticipant(p.id)

        if (res.success) {
            // 3. Show Success Card (Back to Scan view with Result)
            setStatus('success')
            setMessage('Berhasil Check-in Manual!')
            setParticipant(res.participant)
        } else {
            // Error handling
            setStatus('error')
            setMessage(res.message)
            // Jika error karena sudah check-in, set warning
            if (res.message.includes('SUDAH')) {
                setStatus('warning')
                setParticipant(res.participant || p) // Fallback to p if participant null
            }
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center z-10">
                <h1 className="font-bold text-lg">Scanner</h1>
                <button
                    onClick={openManualModal}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                >
                    <List size={16} />
                    Manual Check-in
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-start p-4 gap-6 overflow-y-auto">

                {/* Camera View */}
                <div className="w-full max-w-sm aspect-square bg-black rounded-3xl overflow-hidden relative shadow-2xl border-4 border-slate-700 shrink-0">
                    <Scanner
                        onScan={handleScan}
                        allowMultiple={true}
                        scanDelay={2000}
                        components={{
                            finder: true,
                        }}
                        styles={{
                            container: { width: '100%', height: '100%' }
                        }}
                    />

                    {/* Overlay Processing */}
                    {status === 'processing' && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                            <Loader2 className="animate-spin text-primary mb-2" size={48} />
                            <p className="font-semibold">Verifikasi...</p>
                        </div>
                    )}
                </div>

                {/* Result Card */}
                {status !== 'idle' && (
                    <div className={`w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl text-slate-900 animate-slide-up transition-all ${status === 'success' ? 'border-l-8 border-green-500' :
                        status === 'warning' ? 'border-l-8 border-yellow-500' :
                            status === 'error' ? 'border-l-8 border-red-500' : ''
                        }`}>
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 pt-1">
                                {status === 'success' && <CheckCircle2 className="text-green-500" size={32} />}
                                {status === 'warning' && <AlertTriangle className="text-yellow-500" size={32} />}
                                {status === 'error' && <XCircle className="text-red-500" size={32} />}
                            </div>

                            <div className="flex-1">
                                <h3 className={`font-black text-xl mb-1 ${status === 'success' ? 'text-green-700' :
                                    status === 'warning' ? 'text-yellow-700' :
                                        'text-red-700'
                                    }`}>
                                    {status === 'success' ? 'HADIR' :
                                        status === 'warning' ? 'SUDAH SCAN' :
                                            'GAGAL'}
                                </h3>

                                <p className="text-sm font-medium text-slate-800 mb-2 leading-snug break-words">
                                    {message}
                                </p>

                                {participant && (
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2 text-sm">
                                        <div className="font-bold text-slate-900 text-lg">{participant.nama_lengkap}</div>
                                        <div className="text-slate-500">{participant.institusi}</div>
                                        <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{participant.profesi}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={resetScan}
                            className="w-full mt-4 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 active:scale-95 transition-all"
                        >
                            Scan Berikutnya
                        </button>
                    </div>
                )}

                {status === 'idle' && (
                    <div className="text-center text-slate-500 mt-4 text-sm">
                        <p>Arahkan kamera ke QR Code Tiket</p>
                    </div>
                )}
            </div>

            {/* MODAL MANUAL CHECK-IN */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex flex-col animate-fade-in">
                    {/* Modal Header */}
                    <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center shadow-md shrink-0">
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                            <ArrowLeft size={24} />
                        </button>
                        <h2 className="font-bold text-lg text-white">Manual Check-in</h2>
                        <button onClick={fetchParticipants} className="text-slate-400 hover:text-white">
                            <RefreshCw size={20} className={loadingList ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-4 bg-slate-800/50 shrink-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari nama peserta..."
                                className="w-full pl-10 pr-4 py-3 bg-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder-slate-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {loadingList && manualList.length === 0 ? (
                            <div className="text-center text-slate-400 mt-10">Memuat data...</div>
                        ) : filteredList.length === 0 ? (
                            <div className="text-center text-slate-400 mt-10">Tidak ada peserta ditemukan.</div>
                        ) : (
                            filteredList.map((p) => (
                                <div key={p.id} className="bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700 shadow-sm">
                                    <div>
                                        <div className="font-bold text-white">{p.nama_lengkap}</div>
                                        <div className="text-xs text-slate-400">{p.institusi}</div>
                                    </div>

                                    {p.hadir ? (
                                        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold flex items-center gap-1">
                                            <CheckCircle2 size={14} /> Hadir
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleManualCheckIn(p)}
                                            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/80 active:scale-95 transition-all"
                                        >
                                            Check-in
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
