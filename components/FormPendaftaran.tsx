'use client'

import { useState, FormEvent } from 'react'
import { supabase, Pendaftar } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle } from 'lucide-react'
import { sendWhatsappNotification } from '@/app/actions/sendNotification'

export default function FormPendaftaran() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState<Omit<Pendaftar, 'id' | 'created_at'>>({
        nama_lengkap: '',
        email: '',
        no_telepon: '',
        institusi: '',
        profesi: '',
        alamat: ''
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // 1. Insert to Supabase (Client Side - Anon Key)
            const { data, error: supabaseError } = await supabase
                .from('pendaftar')
                .insert([formData])
                .select()
                .single()

            if (supabaseError) {
                if (supabaseError.code === '23505') {
                    setError('Email sudah terdaftar. Silakan gunakan email lain.')
                } else {
                    console.error('Supabase Error:', supabaseError)
                    setError(`Gagal mendaftar: ${supabaseError.message}`)
                }
                setLoading(false)
                return
            }

            // 2. Send WA (Server Action) - Fire and wait
            if (data) {
                // Panggil Server Action untuk kirim WA (Token aman di server)
                await sendWhatsappNotification(data)

                // 3. Redirect to Ticket Page
                router.push(`/ticket/${data.id}?new=true`)
            }

        } catch (err) {
            console.error('Submission Error:', err)
            setError('Terjadi kesalahan jaringan/sistem.')
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
            )}

            {/* Nama Lengkap */}
            <div>
                <label htmlFor="nama_lengkap" className="block text-sm font-semibold text-slate-900 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="nama_lengkap"
                    name="nama_lengkap"
                    required
                    value={formData.nama_lengkap}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="Masukkan nama lengkap Anda"
                />
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="contoh@email.com"
                />
            </div>

            {/* No Telepon */}
            <div>
                <label htmlFor="no_telepon" className="block text-sm font-semibold text-slate-900 mb-2">
                    Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    id="no_telepon"
                    name="no_telepon"
                    required
                    value={formData.no_telepon}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="08xxxxxxxxxx"
                />
            </div>

            {/* Institusi */}
            <div>
                <label htmlFor="institusi" className="block text-sm font-semibold text-slate-900 mb-2">
                    Institusi/Organisasi <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="institusi"
                    name="institusi"
                    required
                    value={formData.institusi}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="Nama institusi/organisasi"
                />
            </div>

            {/* Alamat (New Field) */}
            <div>
                <label htmlFor="alamat" className="block text-sm font-semibold text-slate-900 mb-2">
                    Alamat Domisili <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="alamat"
                    name="alamat"
                    required
                    rows={2}
                    value={formData.alamat}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                    placeholder="Masukkan alamat lengkap (Jalan, Kota, Provinsi)"
                />
            </div>

            {/* Profesi */}
            <div>
                <label htmlFor="profesi" className="block text-sm font-semibold text-slate-900 mb-2">
                    Profesi <span className="text-red-500">*</span>
                </label>
                <select
                    id="profesi"
                    name="profesi"
                    required
                    value={formData.profesi}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                    <option value="">Pilih profesi</option>
                    <option value="Tenaga Kesehatan">Tenaga Kesehatan</option>
                    <option value="Tenaga Medis">Tenaga Medis</option>
                    <option value="Akademisi">Akademisi</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Masyarakat Umum">Masyarakat Umum</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg py-4 px-6 rounded-xl hover:shadow-xl hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all btn-hover flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={22} />
                        Memproses...
                    </>
                ) : (
                    'Daftar'
                )}
            </button>

            <p className="text-xs text-slate-500 text-center">
                Dengan mendaftar, Anda menyetujui bahwa data Anda akan digunakan untuk keperluan seminar ini.
            </p>
        </form>
    )
}
