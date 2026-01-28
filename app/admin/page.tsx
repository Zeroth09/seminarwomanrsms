'use client'

import { useEffect, useState } from 'react'
import { supabase, Pendaftar } from '@/lib/supabase'
import GradientBackground from '@/components/GradientBackground'
import { Users, Mail, Phone, Building, Briefcase, Calendar, Loader2, Download } from 'lucide-react'

export default function AdminPage() {
    const [pendaftar, setPendaftar] = useState<Pendaftar[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Simple password protection (untuk production, gunakan proper authentication)
    const ADMIN_PASSWORD = 'admin123' // Ganti dengan password yang lebih aman

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            fetchPendaftar()
        } else {
            setError('Password salah!')
        }
    }

    const fetchPendaftar = async () => {
        try {
            const { data, error: supabaseError } = await supabase
                .from('pendaftar')
                .select('*')
                .order('created_at', { ascending: false })

            if (supabaseError) {
                setError('Gagal mengambil data: ' + supabaseError.message)
                setLoading(false)
                return
            }

            setPendaftar(data || [])
            setLoading(false)
        } catch (err) {
            setError('Terjadi kesalahan saat mengambil data')
            setLoading(false)
        }
    }

    const exportToCSV = () => {
        const headers = ['No', 'Nama Lengkap', 'Email', 'No Telepon', 'Institusi', 'Profesi', 'Tanggal Daftar']
        const csvData = pendaftar.map((p, index) => [
            index + 1,
            p.nama_lengkap,
            p.email,
            p.no_telepon,
            p.institusi,
            p.profesi,
            new Date(p.created_at!).toLocaleString('id-ID')
        ])

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `pendaftar-seminar-${new Date().toISOString().split('T')[0]}.csv`
        link.click()
    }

    if (!isAuthenticated) {
        return (
            <GradientBackground>
                <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-3xl shadow-2xl p-8">
                            <h1 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>

                            <form onSubmit={handleLogin} className="space-y-4">
                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        placeholder="Masukkan password admin"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-smooth"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </GradientBackground>
        )
    }

    return (
        <GradientBackground>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                Dashboard Admin
                            </h1>
                            <p className="text-gray-600">Data Pendaftar Seminar Woman&apos;s Wellbeing</p>
                        </div>

                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-smooth"
                        >
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-4">
                                <Users className="w-12 h-12" />
                                <div>
                                    <p className="text-3xl font-black">{pendaftar.length}</p>
                                    <p className="text-sm opacity-90">Total Pendaftar</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-4">
                                <Calendar className="w-12 h-12" />
                                <div>
                                    <p className="text-3xl font-black">
                                        {pendaftar.filter(p => {
                                            const today = new Date()
                                            const createdAt = new Date(p.created_at!)
                                            return createdAt.toDateString() === today.toDateString()
                                        }).length}
                                    </p>
                                    <p className="text-sm opacity-90">Pendaftar Hari Ini</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-4">
                                <Briefcase className="w-12 h-12" />
                                <div>
                                    <p className="text-3xl font-black">
                                        {new Set(pendaftar.map(p => p.profesi)).size}
                                    </p>
                                    <p className="text-sm opacity-90">Kategori Profesi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="animate-spin w-12 h-12 text-pink-600" />
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    ) : pendaftar.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-semibold">Belum ada pendaftar</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-4 px-4 font-bold text-gray-700">No</th>
                                        <th className="text-left py-4 px-4 font-bold text-gray-700">Nama Lengkap</th>
                                        <th className="text-left py-4 px-4 font-bold text-gray-700">Email</th>
                                        <th className="text-left py-4 px-4 font-bold text-gray-700">No Telepon</th>
                                        <th className="text-left py-4 px-4 font-bold text-gray-700">Institusi</th>
                                        <th className="text-left py-4 px-4 font-bold text-gray-700">Profesi</th>
                                        <th className="text-left py-4 px-4 font-bold text-gray-700">Tanggal Daftar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendaftar.map((p, index) => (
                                        <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4">{index + 1}</td>
                                            <td className="py-4 px-4 font-semibold">{p.nama_lengkap}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-gray-400" />
                                                    {p.email}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Phone size={16} className="text-gray-400" />
                                                    {p.no_telepon}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Building size={16} className="text-gray-400" />
                                                    {p.institusi}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    {p.profesi}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600">
                                                {new Date(p.created_at!).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </GradientBackground>
    )
}
