'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, CheckCircle2, XCircle, RefreshCw, UserCheck, Clock } from 'lucide-react'

// Tipe data Pendaftar
type Pendaftar = {
    id: string
    nama_lengkap: string
    email: string
    institusi: string
    profesi: string
    no_telepon: string
    hadir: boolean
    waktu_hadir: string | null
    created_at: string
}

export default function AttendancePage() {
    const [participants, setParticipants] = useState<Pendaftar[]>([])
    const [filtered, setFiltered] = useState<Pendaftar[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'absent'>('all')

    // Fetch Data
    const fetchData = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('pendaftar')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching data:', error)
        } else {
            setParticipants(data || [])
            setFiltered(data || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()

        // Real-time subscription (Optional, biar keren live update)
        const channel = supabase
            .channel('realtime_pendaftar')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'pendaftar' }, (payload) => {
                console.log('Change received!', payload)
                fetchData() // Refresh simple
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    // Filter & Search Logic
    useEffect(() => {
        let result = participants

        // Filter Status
        if (filterStatus === 'present') {
            result = result.filter(p => p.hadir)
        } else if (filterStatus === 'absent') {
            result = result.filter(p => !p.hadir)
        }

        // Search
        if (searchTerm) {
            const lower = searchTerm.toLowerCase()
            result = result.filter(p =>
                p.nama_lengkap.toLowerCase().includes(lower) ||
                p.email.toLowerCase().includes(lower) ||
                p.institusi.toLowerCase().includes(lower)
            )
        }

        setFiltered(result)
    }, [participants, searchTerm, filterStatus])

    // Manual Check-in Toggle
    const toggleCheckIn = async (id: string, currentStatus: boolean) => {
        const newStatus = !currentStatus
        const updateData = newStatus
            ? { hadir: true, waktu_hadir: new Date().toISOString() }
            : { hadir: false, waktu_hadir: null }

        const { error } = await supabase
            .from('pendaftar')
            .update(updateData)
            .eq('id', id)

        if (error) {
            alert('Gagal update status!')
            console.error(error)
        } else {
            // UI update handled by realtime subscription or manual refetch
            fetchData()
        }
    }

    // Stats
    const total = participants.length
    const hadir = participants.filter(p => p.hadir).length
    const belum = total - hadir

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header & Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Dashboard Kehadiran</h1>
                        <p className="text-slate-500">Pantau dan kelola kehadiran peserta seminar.</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs text-slate-500 font-bold uppercase">Total</div>
                            <div className="text-xl font-black text-slate-900">{total}</div>
                        </div>
                        <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm">
                            <div className="text-xs text-emerald-600 font-bold uppercase">Hadir</div>
                            <div className="text-xl font-black text-emerald-700">{hadir}</div>
                        </div>
                        <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100 shadow-sm">
                            <div className="text-xs text-red-600 font-bold uppercase">Belum</div>
                            <div className="text-xl font-black text-red-700">{belum}</div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari nama, email, atau institusi..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex w-full md:w-auto gap-2">
                        <select
                            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none font-medium"
                            value={filterStatus}
                            onChange={(e: any) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Semua Status</option>
                            <option value="present">Sudah Hadir</option>
                            <option value="absent">Belum Hadir</option>
                        </select>
                        <button
                            onClick={fetchData}
                            className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                            title="Refresh Data"
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </div>

                {/* Table List */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                    <th className="p-4">Nama Peserta</th>
                                    <th className="p-4">Institusi</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Waktu Check-in</th>
                                    <th className="p-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading && participants.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-500">
                                            <div className="flex justify-center items-center gap-2">
                                                <RefreshCw className="animate-spin" size={16} /> Memuat data...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-500">Tidak ada data ditemukan.</td>
                                    </tr>
                                ) : (
                                    filtered.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="font-bold text-slate-900">{p.nama_lengkap}</div>
                                                <div className="text-xs text-slate-500">{p.email}</div>
                                                <div className="text-xs text-slate-400 mt-0.5">{p.no_telepon}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm text-slate-700">{p.institusi}</div>
                                                <div className="text-xs text-slate-500">{p.profesi}</div>
                                            </td>
                                            <td className="p-4">
                                                {p.hadir ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                                        <CheckCircle2 size={14} /> Hadir
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold">
                                                        <XCircle size={14} /> Belum
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-slate-600">
                                                {p.waktu_hadir ? (
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={14} className="text-slate-400" />
                                                        {new Date(p.waktu_hadir).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} {' '}
                                                        <span className="text-xs text-slate-400">
                                                            ({new Date(p.waktu_hadir).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })})
                                                        </span>
                                                    </span>
                                                ) : '-'}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => toggleCheckIn(p.id, p.hadir)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${p.hadir
                                                            ? 'border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                                                            : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30'
                                                        }`}
                                                >
                                                    {p.hadir ? 'Batal Hadir' : 'Check-in Manual'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center">
                        Menampilkan {filtered.length} dari {total} peserta
                    </div>
                </div>
            </div>
        </div>
    )
}
