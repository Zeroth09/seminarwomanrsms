'use server'

import { supabase } from '@/lib/supabase'

export async function checkInParticipant(participantId: string) {
    if (!participantId) {
        return { success: false, message: 'ID Peserta tidak valid.' }
    }

    try {
        // 1. Cek data peserta
        const { data: existing, error: fetchError } = await supabase
            .from('pendaftar')
            .select('*')
            .eq('id', participantId)
            .single()

        if (fetchError || !existing) {
            return { success: false, message: 'Peserta tidak ditemukan.' }
        }

        // 2. Cek apakah sudah check-in
        if (existing.hadir) {
            return {
                success: false,
                message: `SUDAH Check-in sebelumnya pada ${new Date(existing.waktu_hadir).toLocaleTimeString()}`,
                participant: existing
            }
        }

        // 3. Update status kehadiran
        const { data: updated, error: updateError } = await supabase
            .from('pendaftar')
            .update({
                hadir: true,
                waktu_hadir: new Date().toISOString()
            })
            .eq('id', participantId)
            .select()
            .single()

        if (updateError) {
            console.error('Check-in Update Error:', updateError)
            return { success: false, message: 'Gagal update status check-in.' }
        }

        return {
            success: true,
            message: 'Berhasil Check-in!',
            participant: updated
        }

    } catch (err) {
        console.error('System Error:', err)
        return { success: false, message: 'Terjadi kesalahan sistem.' }
    }
}
