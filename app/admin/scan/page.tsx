'use client'

import { useState, useEffect } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { checkInParticipant } from '@/app/actions/check-in'
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from 'lucide-react'

export default function ScanPage() {
    const [scanResult, setScanResult] = useState<string | null>(null)
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error' | 'warning'>('idle')
    const [message, setMessage] = useState('')
    const [participant, setParticipant] = useState<any>(null)
    const [lastScannedMs, setLastScannedMs] = useState(0)

    const handleScan = async (result: any) => {
        if (!result) return

        // Ambil raw value (library kadang return object atau string)
        const rawValue = result[0]?.rawValue || result

        // Prevent double scan dalam waktu singkat (3 detik)
        const now = Date.now()
        if (now - lastScannedMs < 3000) return
        setLastScannedMs(now)

        setScanResult(rawValue)
        setStatus('processing')
        setMessage('Memproses data...')

        try {
            // Regex update: Support /ticket/UUID or /check-in/UUID
            const match = rawValue.match(/(?:\/ticket\/|\/check-in\/)([a-zA-Z0-9-]+)/)

            if (!match || !match[1]) {
                setStatus('error')
                setMessage(`QR Code tidak valid! Terbaca: ${rawValue}`)
                return
            }

            const id = match[1]

            // Call Server Action
            const res = await checkInParticipant(id)

            if (res.success) {
                setStatus('success')
                setMessage(res.message)
                setParticipant(res.participant)
                playAudio('success')
            } else {
                // Bisa error atau warning (sudah check-in)
                if (res.message.includes('SUDAH Check-in')) {
                    setStatus('warning')
                    setParticipant(res.participant)
                    playAudio('warning')
                } else {
                    setStatus('error')
                }
                setMessage(res.message)
            }

        } catch (err) {
            console.error(err)
            setStatus('error')
            setMessage('Terjadi kesalahan saat memproses data.')
        }
    }

    // Audio Feedback helper
    const playAudio = (type: 'success' | 'warning') => {
        // Bisa tambahkan simple beep sound effect jika perlu, atau skip dulu
    }

    const resetScan = () => {
        setStatus('idle')
        setScanResult(null)
        setParticipant(null)
        setMessage('')
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            {/* Header */}
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center shadow-md z-10">
                <h1 className="font-bold text-lg">Scanner Kehadiran</h1>
                <div className="text-xs bg-slate-700 px-2 py-1 rounded">Petugas</div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-start p-4 gap-6">

                {/* Camera View */}
                <div className="w-full max-w-sm aspect-square bg-black rounded-3xl overflow-hidden relative shadow-2xl border-4 border-slate-700">
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

                                <p className="font-medium text-slate-800 mb-2 leading-snug">
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
                    <div className="text-center text-slate-400 mt-4">
                        <p>Arahkan kamera ke QR Code Tiket</p>
                    </div>
                )}
            </div>
        </div>
    )
}
